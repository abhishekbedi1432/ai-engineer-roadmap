"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { LevelNotes } from "@/types/user";
import * as firestoreOps from "@/lib/firebase/firestore";

const NOTES_KEY = (levelId: number) => `roadmap_notes_${levelId}`;

export function useNotes(levelId: number) {
  const { user } = useAuth();
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      if (user) {
        const remote = await firestoreOps.getNotes(user.uid, levelId);
        setNotes(remote?.content ?? "");
      } else if (typeof window !== "undefined") {
        setNotes(localStorage.getItem(NOTES_KEY(levelId)) ?? "");
      }
      setLoading(false);
    }
    load();
  }, [user, levelId]);

  const saveNotes = useCallback(
    (content: string) => {
      setNotes(content);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        const notesObj: LevelNotes = { levelId, content, updatedAt: new Date() };
        if (user) {
          await firestoreOps.saveNotes(user.uid, notesObj);
        } else if (typeof window !== "undefined") {
          localStorage.setItem(NOTES_KEY(levelId), content);
        }
      }, 1500);
    },
    [user, levelId]
  );

  return { notes, loading, saveNotes };
}
