"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { CodeEditor } from "./CodeEditor";
import { OutputPanel } from "./OutputPanel";
import { Button } from "@/components/ui/Button";
import { LabConfig } from "@/types/content";

interface LabViewProps {
  lab: LabConfig;
  onSubmitScore: (score: number, code: string) => void;
  savedCode?: string;
}

interface AssertionResult {
  assertion: string;
  passed: boolean;
  error?: string;
}

export function LabView({ lab, onSubmitScore, savedCode }: LabViewProps) {
  const [code, setCode] = useState(savedCode || lab.starterCode);
  const [output, setOutput] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [assertions, setAssertions] = useState<AssertionResult[] | undefined>();
  const [running, setRunning] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Loading Python runtime...");
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const worker = new Worker("/pyodide-worker.js");
    workerRef.current = worker;

    worker.onmessage = (e) => {
      const { type, payload } = e.data;
      switch (type) {
        case "ready":
          if (lab.requiredPackages.length > 0) {
            setLoadingMsg("Installing packages...");
            worker.postMessage({ type: "load-packages", payload: { packages: lab.requiredPackages } });
          } else {
            setPyodideReady(true);
            setLoadingMsg("");
          }
          break;
        case "packages-loaded":
          setPyodideReady(true);
          setLoadingMsg("");
          break;
        case "progress":
          setLoadingMsg(payload.output || "Loading...");
          break;
        case "stdout":
          setOutput((prev) => [...prev, payload.output]);
          break;
        case "stderr":
          setErrors((prev) => [...prev, payload.output]);
          break;
        case "success":
          setRunning(false);
          break;
        case "error":
          setErrors((prev) => [...prev, payload.error]);
          setRunning(false);
          break;
        case "assertion-results":
          setAssertions(payload.assertionResults);
          const passed = payload.assertionResults.filter((a: AssertionResult) => a.passed).length;
          const total = payload.assertionResults.length;
          const score = total > 0 ? Math.round((passed / total) * 100) : 0;
          onSubmitScore(score, code);
          setRunning(false);
          break;
      }
    };

    worker.postMessage({ type: "init" });
    return () => worker.terminate();
  }, []);

  const runCode = useCallback(() => {
    setOutput([]);
    setErrors([]);
    setAssertions(undefined);
    setRunning(true);
    workerRef.current?.postMessage({ type: "run", payload: { code } });
  }, [code]);

  const submitCode = useCallback(() => {
    setOutput([]);
    setErrors([]);
    setAssertions(undefined);
    setRunning(true);
    workerRef.current?.postMessage({
      type: "run-with-assertions",
      payload: { code, assertions: lab.assertions },
    });
  }, [code, lab.assertions]);

  const resetCode = useCallback(() => {
    setCode(lab.starterCode);
    setOutput([]);
    setErrors([]);
    setAssertions(undefined);
  }, [lab.starterCode]);

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-blue-50 p-4 text-sm dark:bg-blue-900/20">
        <p className="font-medium text-blue-800 dark:text-blue-200">Lab Instructions</p>
        <p className="mt-1 text-blue-700 dark:text-blue-300">{lab.instructions}</p>
      </div>

      {!pyodideReady && (
        <div className="flex items-center gap-3 rounded-lg bg-yellow-50 p-4 text-sm dark:bg-yellow-900/20">
          <span className="animate-spin text-lg">&#9881;</span>
          <span className="text-yellow-800 dark:text-yellow-200">{loadingMsg}</span>
        </div>
      )}

      <CodeEditor value={code} onChange={setCode} />

      <div className="flex flex-wrap gap-2">
        <Button onClick={runCode} disabled={!pyodideReady || running} variant="secondary">
          {running ? "Running..." : "Run Code"}
        </Button>
        <Button onClick={submitCode} disabled={!pyodideReady || running}>
          {running ? "Submitting..." : "Submit for Grading"}
        </Button>
        <Button onClick={resetCode} variant="ghost">Reset</Button>
        {lab.hints && (
          <Button onClick={() => setShowHints(!showHints)} variant="ghost">
            {showHints ? "Hide Hints" : "Show Hints"}
          </Button>
        )}
        <Button onClick={() => setShowSolution(!showSolution)} variant="ghost">
          {showSolution ? "Hide Solution" : "Show Solution"}
        </Button>
      </div>

      {showHints && lab.hints && (
        <div className="rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-800">
          <p className="font-medium mb-2">Hints:</p>
          <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-400">
            {lab.hints.map((hint, i) => <li key={i}>{hint}</li>)}
          </ol>
        </div>
      )}

      {showSolution && (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-500">Solution:</p>
          <CodeEditor value={lab.solutionCode} onChange={() => {}} readOnly />
        </div>
      )}

      <OutputPanel output={output} errors={errors} assertions={assertions} loading={running} />
    </div>
  );
}
