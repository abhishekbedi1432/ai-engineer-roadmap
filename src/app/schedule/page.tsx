import { ScheduleTimeline } from "@/components/dashboard/ScheduleTimeline";

export const metadata = { title: "8-Week Schedule — AI Engineer Roadmap" };

export default function SchedulePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold mb-2">8-Week Study Plan</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Suggested pace to complete the full AI Engineer roadmap.</p>
      <ScheduleTimeline />
    </div>
  );
}
