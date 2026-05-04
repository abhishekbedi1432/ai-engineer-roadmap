"use client";

import { levels } from "@/content/levels";
import { LevelCard } from "@/components/level/LevelCard";
import { useAllProgress } from "@/lib/hooks/useProgress";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function ProgressOverview() {
  const { progressMap, loading } = useAllProgress();

  const completed = Object.values(progressMap).filter((p) => p.passed).length;
  const overallPercent = Math.round((completed / levels.length) * 100);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Overall Progress</h2>
          <span className="text-sm text-gray-500">{completed}/{levels.length} levels completed</span>
        </div>
        <ProgressBar value={overallPercent} size="lg" showLabel />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {levels.map((level) => (
          <LevelCard key={level.id} level={level} progress={progressMap[level.id]} />
        ))}
      </div>
    </div>
  );
}
