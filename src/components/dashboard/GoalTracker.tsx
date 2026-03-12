"use client";
import React from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Progress } from "@/components/ui/progress";
import { Flame, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DayGoal {
  day: string;
  words: number;
  goal: number;
}

const weekData: DayGoal[] = [
  { day: "Mon", words: 1200, goal: 1000 },
  { day: "Tue", words: 850, goal: 1000 },
  { day: "Wed", words: 1400, goal: 1000 },
  { day: "Thu", words: 0, goal: 1000 },
  { day: "Fri", words: 1100, goal: 1000 },
  { day: "Sat", words: 2100, goal: 1000 },
  { day: "Sun", words: 750, goal: 1000 },
];

export function GoalTracker() {
  const streak = 5;
  const todayWords = 750;
  const dailyGoal = 1000;
  const todayProgress = Math.min(100, Math.round((todayWords / dailyGoal) * 100));

  return (
    <GlowCard className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-wf-text">Writing Goals</h3>
        <div className="flex items-center gap-1.5 text-wf-warning">
          <Flame className="h-4 w-4" />
          <span className="text-sm font-bold">{streak} day streak</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-1.5 flex justify-between text-xs text-wf-text-muted">
          <span>Today&apos;s goal</span>
          <span>{todayWords} / {dailyGoal} words</span>
        </div>
        <Progress value={todayProgress} />
        {todayProgress >= 100 && (
          <div className="mt-1.5 flex items-center gap-1 text-xs text-wf-success">
            <CheckCircle2 className="h-3 w-3" />
            Goal reached!
          </div>
        )}
      </div>

      <div className="flex items-end gap-1.5">
        {weekData.map(({ day, words, goal }) => {
          const pct = Math.min(100, Math.round((words / goal) * 100));
          const met = words >= goal;
          return (
            <div key={day} className="flex flex-1 flex-col items-center gap-1">
              <div className="relative w-full rounded overflow-hidden bg-wf-panel-elevated" style={{ height: 48 }}>
                <div
                  className={cn("absolute bottom-0 w-full rounded transition-all", met ? "bg-wf-accent" : "bg-wf-border")}
                  style={{ height: `${pct}%` }}
                />
              </div>
              <span className="text-[10px] text-wf-text-muted">{day}</span>
            </div>
          );
        })}
      </div>
    </GlowCard>
  );
}
