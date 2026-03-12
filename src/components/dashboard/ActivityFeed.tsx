"use client";
import React from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { formatRelativeTime } from "@/lib/utils";
import { BookOpen, GitBranch, Eye, MessageSquare, Wand2 } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "manuscript" | "workflow" | "beta-reader" | "critique" | "prompt";
  title: string;
  description: string;
  timestamp: string;
}

const mockActivities: ActivityItem[] = [
  { id: "1", type: "manuscript", title: "Chapter 12 saved", description: "Added 847 words", timestamp: new Date(Date.now() - 1800000).toISOString() },
  { id: "2", type: "beta-reader", title: "Beta run completed", description: "5 personas reviewed Chapters 1-5", timestamp: new Date(Date.now() - 7200000).toISOString() },
  { id: "3", type: "critique", title: "Structure critique done", description: "4 major issues, 2 suggestions", timestamp: new Date(Date.now() - 14400000).toISOString() },
  { id: "4", type: "workflow", title: "Workflow updated", description: "Added marketing node", timestamp: new Date(Date.now() - 86400000).toISOString() },
  { id: "5", type: "prompt", title: "New prompt saved", description: "Scene generator template", timestamp: new Date(Date.now() - 172800000).toISOString() },
];

const typeIcons: Record<string, React.ElementType> = {
  manuscript: BookOpen,
  workflow: GitBranch,
  "beta-reader": Eye,
  critique: MessageSquare,
  prompt: Wand2,
};

const typeColors: Record<string, string> = {
  manuscript: "text-blue-400",
  workflow: "text-purple-400",
  "beta-reader": "text-green-400",
  critique: "text-yellow-400",
  prompt: "text-wf-accent",
};

interface ActivityFeedProps {
  activities?: ActivityItem[];
}

export function ActivityFeed({ activities = mockActivities }: ActivityFeedProps) {
  return (
    <GlowCard className="p-5">
      <h3 className="mb-4 text-sm font-semibold text-wf-text">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity) => {
          const Icon = typeIcons[activity.type] ?? BookOpen;
          const color = typeColors[activity.type] ?? "text-wf-text-muted";
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`mt-0.5 rounded-md bg-wf-panel-elevated p-1.5 ${color}`}>
                <Icon className="h-3 w-3" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-wf-text truncate">{activity.title}</p>
                <p className="text-xs text-wf-text-muted">{activity.description}</p>
              </div>
              <span className="shrink-0 text-xs text-wf-text-muted">
                {formatRelativeTime(activity.timestamp)}
              </span>
            </div>
          );
        })}
      </div>
    </GlowCard>
  );
}
