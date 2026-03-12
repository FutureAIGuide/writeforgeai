"use client";
import React, { useState } from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wand2, RefreshCw, ChevronRight } from "lucide-react";

interface AISuggestion {
  id: string;
  type: "plot" | "character" | "pacing" | "prose" | "research";
  title: string;
  body: string;
  priority: "high" | "medium" | "low";
}

const mockSuggestions: AISuggestion[] = [
  { id: "1", type: "character", title: "Deepen Elara's motivation", body: "Elara's decision to leave in Ch.9 feels abrupt. Consider adding a flashback to her childhood wound.", priority: "high" },
  { id: "2", type: "pacing", title: "Chapter 7 drags", body: "The middle section of Chapter 7 has low tension. Consider cutting the tavern scene or adding conflict.", priority: "medium" },
  { id: "3", type: "plot", title: "Foreshadow the betrayal", body: "The betrayal in Ch.15 will land harder if Kayn drops subtle hints about loyalty earlier.", priority: "high" },
];

const typeColors: Record<string, string> = {
  plot: "bg-purple-500/20 text-purple-300",
  character: "bg-blue-500/20 text-blue-300",
  pacing: "bg-yellow-500/20 text-yellow-300",
  prose: "bg-green-500/20 text-green-300",
  research: "bg-wf-accent/20 text-wf-accent",
};

const priorityVariant: Record<string, "default" | "warning" | "secondary"> = {
  high: "default",
  medium: "warning",
  low: "secondary",
};

export function AISuggestionsPanel() {
  const [suggestions] = useState<AISuggestion[]>(mockSuggestions);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <GlowCard className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-wf-accent" />
          <h3 className="text-sm font-semibold text-wf-text">AI Suggestions</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>
      <div className="space-y-3">
        {suggestions.map((s) => (
          <div key={s.id} className="group cursor-pointer rounded-lg border border-wf-border bg-wf-panel-elevated p-3 hover:border-wf-accent transition-colors">
            <div className="mb-1.5 flex items-center gap-2">
              <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${typeColors[s.type]}`}>
                {s.type.toUpperCase()}
              </span>
              <Badge variant={priorityVariant[s.priority]} className="text-[10px]">
                {s.priority}
              </Badge>
            </div>
            <p className="mb-1 text-sm font-medium text-wf-text">{s.title}</p>
            <p className="text-xs text-wf-text-muted leading-relaxed">{s.body}</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-wf-accent opacity-0 group-hover:opacity-100 transition-opacity">
              Apply suggestion <ChevronRight className="h-3 w-3" />
            </div>
          </div>
        ))}
      </div>
    </GlowCard>
  );
}
