"use client";

import { useState, useEffect, useCallback } from "react";
import { LevelProgress } from "@/types/user";
import { calculateTotalScore, calculateQuizOnlyScore, isPassed } from "@/lib/utils/scoring";
import { levels } from "@/content/levels";

const STORAGE_KEY = (levelId: number) => `roadmap_progress_${levelId}`;

function getLocalProgress(levelId: number): LevelProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY(levelId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setLocalProgress(progress: LevelProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY(progress.levelId), JSON.stringify(progress));
  } catch {
    // localStorage full or unavailable
  }
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
  const [progress, setProgress] = useState<LevelProgress>(emptyProgress(levelId));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProgress(getLocalProgress(levelId) ?? emptyProgress(levelId));
    setLoading(false);
  }, [levelId]);

  const saveQuizScore = useCallback(
    (score: number, answers: number[]) => {
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
      setLocalProgress(updated);
    },
    [progress]
  );

  const saveLabScore = useCallback(
    (score: number, code: string) => {
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
      setLocalProgress(updated);
    },
    [progress]
  );

  return { progress, loading, saveQuizScore, saveLabScore };
}

export function useAllProgress() {
  const [progressMap, setProgressMap] = useState<Record<number, LevelProgress>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const map: Record<number, LevelProgress> = {};
    if (typeof window !== "undefined") {
      for (const level of levels) {
        const p = getLocalProgress(level.id);
        if (p) map[level.id] = p;
      }
    }
    setProgressMap(map);
    setLoading(false);
  }, []);

  return { progressMap, loading };
}
