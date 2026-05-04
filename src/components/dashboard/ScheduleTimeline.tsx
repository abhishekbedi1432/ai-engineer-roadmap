"use client";

import { schedule } from "@/content/schedule";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export function ScheduleTimeline() {
  return (
    <div className="space-y-4">
      {schedule.map((week) => (
        <Card key={week.week}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <Badge variant="info">Week {week.week}</Badge>
              <h3 className="mt-2 font-semibold">{week.title}</h3>
            </div>
            <span className="text-sm text-gray-400">~{week.hoursEstimate}h</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {week.levels.map((id) => (
              <Link key={id} href={`/levels/${id}`}>
                <Badge variant="default">Level {id}</Badge>
              </Link>
            ))}
          </div>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            {week.goals.map((goal, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-gray-400">&#x2022;</span> {goal}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
