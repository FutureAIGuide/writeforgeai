"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HealthMetric {
  label: string;
  score: number;
  tooltip: string;
}

const metrics: HealthMetric[] = [
  { label: "Prose", score: 82, tooltip: "Prose quality score based on clarity and style" },
  { label: "Pacing", score: 68, tooltip: "Story pacing across chapters" },
  { label: "Character", score: 91, tooltip: "Character depth and consistency" },
  { label: "Structure", score: 74, tooltip: "Overall narrative structure" },
  { label: "Dialogue", score: 79, tooltip: "Dialogue naturalness and purpose" },
];

function getScoreColor(score: number) {
  if (score >= 80) return "bg-wf-success";
  if (score >= 60) return "bg-wf-warning";
  return "bg-wf-danger";
}

export function ManuscriptHealthBar() {
  const overallScore = Math.round(metrics.reduce((a, m) => a + m.score, 0) / metrics.length);

  return (
    <TooltipProvider>
      <div className="flex items-center gap-4 border-b border-wf-border bg-wf-panel px-4 py-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-wf-text-muted">Health:</span>
          <span className={cn("text-xs font-bold", overallScore >= 80 ? "text-wf-success" : overallScore >= 60 ? "text-wf-warning" : "text-wf-danger")}>
            {overallScore}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {metrics.map((m) => (
            <Tooltip key={m.label}>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5 cursor-default">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-wf-panel-elevated">
                    <div
                      className={cn("h-full rounded-full transition-all", getScoreColor(m.score))}
                      style={{ width: `${m.score}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-wf-text-muted">{m.label}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{m.tooltip}</p>
                <p className="font-semibold">Score: {m.score}/100</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
