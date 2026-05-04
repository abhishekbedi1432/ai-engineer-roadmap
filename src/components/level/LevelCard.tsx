"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LevelContent } from "@/types/content";
import { LevelProgress } from "@/types/user";

interface LevelCardProps {
  level: LevelContent;
  progress?: LevelProgress;
}

export function LevelCard({ level, progress }: LevelCardProps) {
  const score = progress?.totalScore ?? 0;
  const status = progress?.passed ? "success" : score > 0 ? "warning" : "default";
  const statusLabel = progress?.passed ? "Passed" : score > 0 ? "In Progress" : "Not Started";

  return (
    <Link href={`/levels/${level.id}`}>
      <Card hover className="h-full">
        <div className="flex items-start justify-between mb-2">
          <span className="text-2xl font-bold text-gray-300 dark:text-gray-600">
            {String(level.id).padStart(2, "0")}
          </span>
          <Badge variant={status}>{statusLabel}</Badge>
        </div>
        <h3 className="font-semibold mb-1">{level.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{level.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <span>~{level.estimatedHours}h</span>
          <span>{score}%</span>
        </div>
        <ProgressBar value={score} size="sm" />
      </Card>
    </Link>
  );
}
