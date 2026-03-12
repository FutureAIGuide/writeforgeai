"use client";
import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { cn } from "@/lib/utils";
import {
  Lightbulb, Search, Users, List, FileText, MessageSquare, Eye, Megaphone
} from "lucide-react";

type NodeType = "idea" | "research" | "character" | "outline" | "draft" | "critic" | "beta-reader" | "marketing";

const nodeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  idea: { icon: Lightbulb, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30" },
  research: { icon: Search, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" },
  character: { icon: Users, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30" },
  outline: { icon: List, color: "text-green-400", bg: "bg-green-500/10 border-green-500/30" },
  draft: { icon: FileText, color: "text-wf-accent", bg: "bg-wf-accent/10 border-wf-accent/30" },
  critic: { icon: MessageSquare, color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" },
  "beta-reader": { icon: Eye, color: "text-teal-400", bg: "bg-teal-500/10 border-teal-500/30" },
  marketing: { icon: Megaphone, color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/30" },
};

interface WorkflowNodeProps {
  data: {
    label: string;
    nodeType: NodeType;
    description?: string;
    status?: "idle" | "running" | "complete" | "error";
  };
  selected?: boolean;
}

export const WorkflowNode = memo(({ data, selected }: WorkflowNodeProps) => {
  const config = nodeConfig[data.nodeType] ?? nodeConfig.idea;
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "min-w-[140px] rounded-xl border-2 px-4 py-3 transition-all",
        config.bg,
        selected ? "shadow-[0_0_12px_rgba(255,106,0,0.4)]" : "shadow-md"
      )}
    >
      <Handle type="target" position={Position.Top} className="!border-wf-border !bg-wf-panel-elevated" />
      <div className="flex items-center gap-2">
        <Icon className={cn("h-4 w-4 shrink-0", config.color)} />
        <span className="text-sm font-semibold text-wf-text">{data.label}</span>
      </div>
      {data.description && (
        <p className="mt-1 text-xs text-wf-text-muted">{data.description}</p>
      )}
      {data.status && data.status !== "idle" && (
        <div className={cn(
          "mt-2 h-1 rounded-full",
          data.status === "complete" ? "bg-wf-success" :
          data.status === "running" ? "animate-pulse bg-wf-accent" :
          "bg-wf-danger"
        )} />
      )}
      <Handle type="source" position={Position.Bottom} className="!border-wf-border !bg-wf-panel-elevated" />
    </div>
  );
});
WorkflowNode.displayName = "WorkflowNode";
