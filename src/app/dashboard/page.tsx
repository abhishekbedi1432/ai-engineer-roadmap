import { ProgressOverview } from "@/components/dashboard/ProgressOverview";

export const metadata = { title: "Dashboard — AI Engineer Roadmap" };

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold mb-6">Your Progress</h1>
      <ProgressOverview />
    </div>
  );
}
