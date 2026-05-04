"use client";

import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ value, max = 100, size = "md", showLabel = false, className }: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  const barColor =
    percentage >= 70
      ? "bg-green-500 dark:bg-green-400"
      : percentage >= 40
        ? "bg-yellow-500 dark:bg-yellow-400"
        : "bg-red-500 dark:bg-red-400";

  const sizeStyles = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("w-full rounded-full bg-gray-200 dark:bg-gray-700", sizeStyles[size])}>
        <div
          className={cn("rounded-full transition-all duration-500", barColor, sizeStyles[size])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="mt-1 block text-right text-xs text-gray-500 dark:text-gray-400">{percentage}%</span>
      )}
    </div>
  );
}
