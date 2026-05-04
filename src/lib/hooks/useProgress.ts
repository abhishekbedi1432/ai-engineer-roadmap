"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { LevelProgress } from "@/types/user";
import { calculateTotalScore, calculateQuizOnlyScore, isPassed } from "@/lib/utils/scoring";
import * as firestoreOps from "@/lib/firebase/firestore";

const STORAGE_KEY = (levelId: number) => `roadmap_progress_${levelId}`;

function getLocalProgress(levelId: number): LevelProgress | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY(levelId));
  return raw ? JSON.parse(raw) : null;
}

function setLocalProgress(progress: LevelProgress): void {
  localStorage.setItem(STORAGE_KEY(progress.levelId), JSON.stringify(progress));
}

function emptyProgress(levelId: number): LevelProgress {
  return {
    levelId,
    quizScore: 0,
    labScore: 0,
    totalScore: 0,
    passed: false,
    quizAnswers: [],
    labCode: "",
    completedAt: null,
    attempts: 0,
  };
}

export function useProgress(levelId: number) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<LevelProgress>(emptyProgress(levelId));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      if (user) {
        const remote = await firestoreOps.getProgress(user.uid, levelId);
        setProgress(remote ?? emptyProgress(levelId));
      } else {
        setProgress(getLocalProgress(levelId) ?? emptyProgress(levelId));
      }
      setLoading(false);
    }
    load();
  }, [user, levelId]);

  const saveQuizScore = useCallback(
    async (score: number, answers: number[]) => {
      const updated: LevelProgress = {
        ...progress,
        quizScore: score,
        quizAnswers: answers,
        totalScore: progress.labScore > 0
          ? calculateTotalScore(score, progress.labScore)
          : calculateQuizOnlyScore(score),
        passed: false,
        attempts: progress.attempts + 1,
      };
      updated.passed = isPassed(updated.totalScore);
      if (updated.passed) updated.completedAt = new Date();
      setProgress(updated);
      if (user) {
        await firestoreOps.saveProgress(user.uid, updated);
      } else {
        setLocalProgress(updated);
      }
    },
    [progress, user]
  );

  const saveLabScore = useCallback(
    async (score: number, code: string) => {
      const updated: LevelProgress = {
        ...progress,
        labScore: score,
        labCode: code,
        totalScore: calculateTotalScore(progress.quizScore, score),
        passed: false,
        attempts: progress.attempts + 1,
      };
      updated.passed = isPassed(updated.totalScore);
      if (updated.passed) updated.completedAt = new Date();
      setProgress(updated);
      if (user) {
        await firestoreOps.saveProgress(user.uid, updated);
      } else {
        setLocalProgress(updated);
      }
    },
    [progress, user]
  );

  return { progress, loading, saveQuizScore, saveLabScore };
}

export function useAllProgress() {
  const { user } = useAuth();
  const [progressMap, setProgressMap] = useState<Record<number, LevelProgress>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const map: Record<number, LevelProgress> = {};
      if (user) {
        const all = await firestoreOps.getAllProgress(user.uid);
        all.forEach((p) => { map[p.levelId] = p; });
      } else if (typeof window !== "undefined") {
        for (let i = 0; i <= 9; i++) {
          const p = getLocalProgress(i);
          if (p) map[i] = p;
        }
      }
      setProgressMap(map);
      setLoading(false);
    }
    load();
  }, [user]);

  return { progressMap, loading };
}
