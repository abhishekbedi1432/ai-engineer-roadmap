"use client";

import { useRef, useCallback } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { Skeleton } from "@/components/ui/Skeleton";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

export function CodeEditor({ value, onChange, readOnly }: CodeEditorProps) {
  const editorRef = useRef<any>(null);

  const handleMount: OnMount = useCallback((editor) => {
    editorRef.current = editor;
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      <Editor
        height="400px"
        defaultLanguage="python"
        value={value}
        onChange={(val) => onChange(val ?? "")}
        onMount={handleMount}
        theme="vs-dark"
        loading={<Skeleton className="h-[400px]" />}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          automaticLayout: true,
          scrollBeyondLastLine: false,
          readOnly,
          padding: { top: 12 },
        }}
      />
    </div>
  );
}
