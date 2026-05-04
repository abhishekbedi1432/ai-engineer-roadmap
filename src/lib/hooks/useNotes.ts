"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const NOTES_KEY = (levelId: number) => `roadmap_notes_${levelId}`;

export function useNotes(levelId: number) {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        setNotes(localStorage.getItem(NOTES_KEY(levelId)) ?? "");
      } catch {
        // localStorage unavailable
      }
    }
    setLoading(false);
  }, [levelId]);

  const saveNotes = useCallback(
    (content: string) => {
      setNotes(content);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        try {
          if (typeof window !== "undefined") {
            localStorage.setItem(NOTES_KEY(levelId), content);
          }
        } catch {
          // localStorage full or unavailable
        }
      }, 1500);
    },
    [levelId]
  );

  return { notes, loading, saveNotes };
}
