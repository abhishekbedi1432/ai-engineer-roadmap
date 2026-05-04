"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { LevelContent } from "@/types/content";
import { Tabs } from "@/components/ui/Tabs";
import { LessonView } from "@/components/level/LessonView";
import { QuizView } from "@/components/level/QuizView";
import { ScoreCard } from "@/components/level/ScoreCard";
import { NotesEditor } from "@/components/notes/NotesEditor";
import { useProgress } from "@/lib/hooks/useProgress";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { levels } from "@/content/levels";

const LabView = dynamic(() => import("@/components/editor/LabView").then((m) => m.LabView), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 rounded-lg bg-gray-50 dark:bg-gray-900">
      <p className="text-gray-500">Loading code editor...</p>
    </div>
  ),
});

interface LevelPageClientProps {
  level: LevelContent;
}

export function LevelPageClient({ level }: LevelPageClientProps) {
  const { progress, saveQuizScore, saveLabScore } = useProgress(level.id);
  const [activeTab, setActiveTab] = useState("lesson");

  const tabs = [
    { id: "lesson", label: "Lesson" },
    ...(level.lab ? [{ id: "lab", label: "Lab" }] : []),
    { id: "quiz", label: "Quiz" },
    { id: "notes", label: "Notes" },
  ];

  const prevLevel = levels.find((l) => l.id === level.id - 1);
  const nextLevel = levels.find((l) => l.id === level.id + 1);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="info">Level {level.id}</Badge>
          <span className="text-sm text-gray-400">~{level.estimatedHours}h</span>
        </div>
        <h1 className="text-2xl font-bold">{level.title}</h1>
        <p className="text-gray-500 dark:text-gray-400">{level.description}</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
        {(tab) => (
          <>
            {tab === "lesson" && <LessonView content={level.lesson} />}
            {tab === "lab" && level.lab && (
              <LabView
                lab={level.lab}
                onSubmitScore={saveLabScore}
                savedCode={progress.labCode || undefined}
              />
            )}
            {tab === "quiz" && (
              <QuizView
                questions={level.quiz}
                onComplete={saveQuizScore}
                previousAnswers={progress.quizAnswers.length > 0 ? progress.quizAnswers : undefined}
              />
            )}
            {tab === "notes" && <NotesEditor levelId={level.id} />}
          </>
        )}
      </Tabs>

      {(progress.quizScore > 0 || progress.labScore > 0) && (
        <ScoreCard
          quizScore={progress.quizScore}
          labScore={progress.labScore}
          totalScore={progress.totalScore}
          passed={progress.passed}
          hasLab={!!level.lab}
        />
      )}

      <div className="mt-8 flex justify-between">
        {prevLevel ? (
          <Link href={`/levels/${prevLevel.id}`} className="text-sm text-blue-600 hover:underline dark:text-blue-400">
            &larr; Level {prevLevel.id}: {prevLevel.title}
          </Link>
        ) : <span />}
        {nextLevel && (
          <Link href={`/levels/${nextLevel.id}`} className="text-sm text-blue-600 hover:underline dark:text-blue-400">
            Level {nextLevel.id}: {nextLevel.title} &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
