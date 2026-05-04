"use client";

import { cn } from "@/lib/utils/cn";

interface AssertionResult {
  assertion: string;
  passed: boolean;
  error?: string;
}

interface OutputPanelProps {
  output: string[];
  errors: string[];
  assertions?: AssertionResult[];
  loading?: boolean;
}

export function OutputPanel({ output, errors, assertions, loading }: OutputPanelProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-950 p-4 font-mono text-sm dark:border-gray-700">
      <div className="mb-2 text-xs text-gray-500">Output</div>

      {loading && (
        <div className="flex items-center gap-2 text-yellow-400">
          <span className="animate-spin">&#9881;</span> Running...
        </div>
      )}

      {output.map((line, i) => (
        <div key={i} className="text-green-400">{line}</div>
      ))}

      {errors.map((line, i) => (
        <div key={i} className="text-red-400">{line}</div>
      ))}

      {assertions && assertions.length > 0 && (
        <div className="mt-3 border-t border-gray-700 pt-3">
          <div className="mb-2 text-xs text-gray-500">Assertions</div>
          {assertions.map((a, i) => (
            <div key={i} className={cn("flex items-center gap-2", a.passed ? "text-green-400" : "text-red-400")}>
              <span>{a.passed ? "✅" : "❌"}</span>
              <span>{a.assertion}</span>
              {a.error && !a.passed && <span className="text-gray-500">({a.error})</span>}
            </div>
          ))}
        </div>
      )}

      {!loading && output.length === 0 && errors.length === 0 && !assertions && (
        <div className="text-gray-600">Click &quot;Run Code&quot; to execute</div>
      )}
    </div>
  );
}
