"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface LessonViewProps {
  content: string;
}

export function LessonView({ content }: LessonViewProps) {
  return (
    <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
