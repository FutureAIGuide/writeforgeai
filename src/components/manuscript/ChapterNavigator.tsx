"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Chapter } from "@/types";
import { formatNumber } from "@/lib/utils";

interface ChapterNavigatorProps {
  chapters: Chapter[];
  activeChapterId: string | null;
  onSelectChapter: (id: string) => void;
  onAddChapter?: () => void;
}

const statusIcons: Record<string, React.ElementType> = {
  complete: CheckCircle2,
  in_review: Clock,
  draft: FileText,
};

const statusColors: Record<string, string> = {
  complete: "text-wf-success",
  in_review: "text-wf-warning",
  draft: "text-wf-text-muted",
};

const mockChapters: Chapter[] = Array.from({ length: 8 }, (_, i) => ({
  id: `ch-${i + 1}`,
  novel_id: "novel-1",
  title: `Chapter ${i + 1}: ${["The Beginning", "Into the Dark", "First Contact", "The Betrayal", "Flight", "Hidden Truth", "Convergence", "The Choice"][i] ?? "Untitled"}`,
  order_index: i,
  status: i < 5 ? "complete" : i === 5 ? "in_review" : "draft",
  word_count: Math.floor(Math.random() * 3000) + 1500,
  content: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  created_by: "user-1",
  deleted_at: null,
}));

export function ChapterNavigator({ chapters = mockChapters, activeChapterId, onSelectChapter, onAddChapter }: ChapterNavigatorProps) {
  return (
    <div className="flex h-full flex-col border-r border-wf-border bg-wf-panel w-56 shrink-0">
      <div className="flex items-center justify-between border-b border-wf-border px-3 py-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-wf-text-muted">Chapters</span>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onAddChapter}>
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {chapters.map((chapter) => {
          const Icon = statusIcons[chapter.status] ?? FileText;
          const color = statusColors[chapter.status] ?? "text-wf-text-muted";
          const isActive = activeChapterId === chapter.id;
          return (
            <button
              key={chapter.id}
              onClick={() => onSelectChapter(chapter.id)}
              className={cn(
                "flex w-full flex-col gap-0.5 border-b border-wf-border px-3 py-2.5 text-left transition-colors",
                isActive ? "bg-wf-accent/15 border-l-2 border-l-wf-accent" : "hover:bg-wf-panel-elevated"
              )}
            >
              <div className="flex items-center gap-2">
                <Icon className={cn("h-3 w-3 shrink-0", color)} />
                <span className={cn("text-xs font-medium truncate", isActive ? "text-wf-accent" : "text-wf-text")}>
                  {chapter.title}
                </span>
              </div>
              <span className="pl-5 text-[10px] text-wf-text-muted">
                {formatNumber(chapter.word_count)} words
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
