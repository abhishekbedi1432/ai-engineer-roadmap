import Link from "next/link";
import { levels } from "@/content/levels";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          AI Engineer Roadmap
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Go from zero to production-ready AI engineer in 8 weeks.
          <br />
          Interactive lessons, Python labs, quizzes, and a capstone project.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Start Learning
          </Link>
          <Link
            href="/schedule"
            className="inline-flex items-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
          >
            View Schedule
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {levels.map((level) => (
          <Link
            key={level.id}
            href={`/levels/${level.id}`}
            className="group rounded-xl border border-gray-200 p-5 transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-800 dark:hover:border-blue-700"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-bold text-gray-300 dark:text-gray-600">
                {String(level.id).padStart(2, "0")}
              </span>
              <h3 className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {level.title}
              </h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{level.description}</p>
            <div className="mt-2 flex gap-3 text-xs text-gray-400">
              <span>~{level.estimatedHours}h</span>
              <span>{level.lab ? "Lab + Quiz" : "Quiz only"}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 rounded-xl bg-gray-50 p-8 dark:bg-gray-900">
        <h2 className="text-xl font-semibold mb-4">How it works</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <div className="text-2xl mb-2">&#x1F4D6;</div>
            <h3 className="font-medium mb-1">Learn</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Read the lesson for each level. Covers concepts, patterns, and real-world context.</p>
          </div>
          <div>
            <div className="text-2xl mb-2">&#x1F4BB;</div>
            <h3 className="font-medium mb-1">Practice</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Complete Python labs in your browser. Code runs via Pyodide — no setup needed.</p>
          </div>
          <div>
            <div className="text-2xl mb-2">&#x2705;</div>
            <h3 className="font-medium mb-1">Prove</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pass quizzes and labs with 70%+. Track progress across all 10 levels.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
