"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface ScoreCardProps {
  quizScore: number;
  labScore: number;
  totalScore: number;
  passed: boolean;
  hasLab: boolean;
}

export function ScoreCard({ quizScore, labScore, totalScore, passed, hasLab }: ScoreCardProps) {
  return (
    <Card className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Your Score</h3>
        <Badge variant={passed ? "success" : "warning"}>
          {passed ? "PASS" : "IN PROGRESS"}
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Quiz {hasLab ? "(40%)" : "(100%)"}</span>
            <span className="font-mono">{quizScore}%</span>
          </div>
          <ProgressBar value={quizScore} />
        </div>

        {hasLab && (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Lab (60%)</span>
              <span className="font-mono">{labScore}%</span>
            </div>
            <ProgressBar value={labScore} />
          </div>
        )}

        <div className="border-t pt-3 dark:border-gray-700">
          <div className="flex justify-between text-sm font-semibold mb-1">
            <span>Total</span>
            <span className="font-mono">{totalScore}%</span>
          </div>
          <ProgressBar value={totalScore} size="lg" />
        </div>
      </div>
    </Card>
  );
}
