"use client";
import React from "react";
import type { CritiqueIssue } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const severityConfig = {
  critical: { label: "Critical", variant: "destructive" as const, color: "text-red-400" },
  major: { label: "Major", variant: "warning" as const, color: "text-yellow-400" },
  minor: { label: "Minor", variant: "secondary" as const, color: "text-blue-400" },
  suggestion: { label: "Suggestion", variant: "outline" as const, color: "text-wf-text-muted" },
};

interface CritiqueIssueListProps {
  issues: CritiqueIssue[];
  className?: string;
}

export function CritiqueIssueList({ issues, className }: CritiqueIssueListProps) {
  if (issues.length === 0) {
    return (
      <div className={cn("py-8 text-center text-sm text-wf-text-muted", className)}>
        No issues found. Great work!
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {issues.map((issue) => {
        const config = severityConfig[issue.severity];
        return (
          <div key={issue.id} className="rounded-lg border border-wf-border bg-wf-panel-elevated p-4">
            <div className="mb-2 flex items-center gap-2">
              <Badge variant={config.variant}>{config.label}</Badge>
              <span className="text-xs text-wf-text-muted">{issue.category}</span>
              {issue.location && (
                <span className="ml-auto text-xs text-wf-text-muted">{issue.location}</span>
              )}
            </div>
            <p className="mb-2 text-sm text-wf-text">{issue.description}</p>
            {issue.suggestion && (
              <p className={cn("text-xs", config.color)}>
                💡 {issue.suggestion}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
