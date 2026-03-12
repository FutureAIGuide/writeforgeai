"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap, AlertTriangle, Eye, Activity, RefreshCw, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InspectorIssue {
  label: string;
  value: string;
  severity: "warning" | "info" | "success" | "error";
  description?: string;
}

interface InspectorPanelProps {
  chapterId?: string;
  healthScore?: number;
  issues?: InspectorIssue[];
  className?: string;
  onRequestAIFix?: (issue: InspectorIssue) => void;
}

const severityColors = {
  warning: "text-wf-warning border-wf-warning/20 bg-wf-warning/5",
  info: "text-blue-400 border-blue-400/20 bg-blue-400/5",
  success: "text-wf-success border-wf-success/20 bg-wf-success/5",
  error: "text-wf-danger border-wf-danger/20 bg-wf-danger/5",
};

const severityIcons = {
  warning: AlertTriangle,
  info: Eye,
  success: Activity,
  error: Zap,
};

const DEFAULT_ISSUES: InspectorIssue[] = [
  { label: "Pacing Detection", value: "Scene dragging (slow) in Para 3", severity: "warning", description: "Consider adding tension or trimming this paragraph" },
  { label: "Show-Don't-Tell", value: "Dialogue is expository", severity: "info", description: "Lines 8-10 tell emotions rather than showing them" },
  { label: "Repetition", value: "Word 'dark' used 4x", severity: "warning", description: "Consider varying your word choice" },
  { label: "Draft Health Score", value: "78/100", severity: "success" },
];

export function InspectorPanel({ chapterId, healthScore = 78, issues = DEFAULT_ISSUES, className, onRequestAIFix }: InspectorPanelProps) {
  const refId = chapterId ? `#${chapterId.slice(0, 6).toUpperCase()}` : "#121212";

  return (
    <aside className={cn("flex h-full flex-col border-l border-wf-border bg-wf-panel-elevated text-[11px]", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-wf-border px-3 py-2.5">
        <div>
          <p className="font-semibold text-wf-text text-xs">Inspector Panel</p>
          <p className="text-wf-text-muted text-[10px]">Quick view ongoing audience</p>
        </div>
        <span className="font-mono text-wf-text-muted">{refId}</span>
      </div>

      {/* Health Score */}
      <div className="border-b border-wf-border p-3">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-wf-text-muted">Draft Health Score</span>
          <span className={cn("font-bold text-sm", healthScore >= 80 ? "text-wf-success" : healthScore >= 60 ? "text-wf-warning" : "text-wf-danger")}>{healthScore}/100</span>
        </div>
        <Progress value={healthScore} className="h-1.5" />
      </div>

      {/* Issues */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-2">
        {issues.map((issue, i) => {
          const Icon = severityIcons[issue.severity];
          return (
            <div key={i} className={cn("rounded-lg border p-2.5 transition-all hover:ring-1 hover:ring-wf-accent/20", severityColors[issue.severity])}>
              <div className="flex items-start justify-between gap-1 mb-0.5">
                <div className="flex items-center gap-1">
                  <Icon className="h-3 w-3 shrink-0" />
                  <span className="font-medium text-[10px] uppercase tracking-wide">{issue.label}</span>
                </div>
                {onRequestAIFix && issue.severity !== "success" && (
                  <button onClick={() => onRequestAIFix(issue)} className="shrink-0 text-wf-accent hover:text-wf-accent-soft">
                    <Zap className="h-2.5 w-2.5" />
                  </button>
                )}
              </div>
              <p className="text-[11px] font-semibold text-current">{issue.value}</p>
              {issue.description && <p className="mt-0.5 text-[10px] opacity-80 leading-tight">{issue.description}</p>}
            </div>
          );
        })}
      </div>

      {/* Refresh */}
      <div className="border-t border-wf-border p-2">
        <Button variant="ghost" size="sm" className="w-full text-wf-text-muted hover:text-wf-accent text-[10px] h-7">
          <RefreshCw className="mr-1.5 h-3 w-3" /> Re-analyze Chapter
        </Button>
      </div>
    </aside>
  );
}
