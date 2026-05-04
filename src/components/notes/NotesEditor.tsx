"use client";

import { useNotes } from "@/lib/hooks/useNotes";

interface NotesEditorProps {
  levelId: number;
}

export function NotesEditor({ levelId }: NotesEditorProps) {
  const { notes, loading, saveNotes } = useNotes(levelId);

  if (loading) return <div className="animate-pulse h-32 bg-gray-100 rounded-lg dark:bg-gray-800" />;

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Your Notes</label>
      <textarea
        value={notes}
        onChange={(e) => saveNotes(e.target.value)}
        placeholder="Write your notes here... (auto-saved)"
        className="w-full h-40 rounded-lg border border-gray-200 bg-white p-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
      />
      <p className="mt-1 text-xs text-gray-400">Auto-saved after 1.5 seconds of inactivity</p>
    </div>
  );
}
