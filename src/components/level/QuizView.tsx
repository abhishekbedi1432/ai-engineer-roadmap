"use client";

import { useState } from "react";
import { QuizQuestion } from "@/types/content";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

interface QuizViewProps {
  questions: QuizQuestion[];
  onComplete: (score: number, answers: number[]) => void;
  previousAnswers?: number[];
}

export function QuizView({ questions, onComplete, previousAnswers }: QuizViewProps) {
  const [answers, setAnswers] = useState<number[]>(previousAnswers ?? new Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(!!previousAnswers?.length);

  function handleSelect(questionIdx: number, optionIdx: number) {
    if (submitted) return;
    const next = [...answers];
    next[questionIdx] = optionIdx;
    setAnswers(next);
  }

  function handleSubmit() {
    const correct = answers.filter((a, i) => a === questions[i].correctIndex).length;
    const score = Math.round((correct / questions.length) * 100);
    setSubmitted(true);
    onComplete(score, answers);
  }

  function handleRetry() {
    setAnswers(new Array(questions.length).fill(-1));
    setSubmitted(false);
  }

  return (
    <div className="space-y-8">
      {questions.map((q, qi) => (
        <div key={qi} className="rounded-lg border border-gray-200 p-5 dark:border-gray-700">
          <p className="mb-4 font-medium">
            <span className="mr-2 text-blue-600 dark:text-blue-400">Q{qi + 1}.</span>
            {q.question}
          </p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi;
              const isCorrect = q.correctIndex === oi;
              let optClass = "border-gray-200 dark:border-gray-700 hover:border-blue-300";
              if (submitted && isCorrect) optClass = "border-green-500 bg-green-50 dark:bg-green-900/20";
              else if (submitted && selected && !isCorrect) optClass = "border-red-500 bg-red-50 dark:bg-red-900/20";
              else if (selected) optClass = "border-blue-500 bg-blue-50 dark:bg-blue-900/20";

              return (
                <button
                  key={oi}
                  onClick={() => handleSelect(qi, oi)}
                  className={cn(
                    "w-full text-left rounded-lg border p-3 text-sm transition-colors",
                    optClass,
                    !submitted && "cursor-pointer"
                  )}
                >
                  <span className="mr-2 font-mono text-xs text-gray-400">{String.fromCharCode(65 + oi)}</span>
                  {opt}
                </button>
              );
            })}
          </div>
          {submitted && answers[qi] !== q.correctIndex && (
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              {q.explanation}
            </p>
          )}
        </div>
      ))}

      <div className="flex gap-3">
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={answers.some((a) => a === -1)}>
            Submit Quiz
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleRetry}>
            Retry Quiz
          </Button>
        )}
      </div>
    </div>
  );
}
