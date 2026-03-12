"use client";
import React from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, Calendar } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface ProjectSummaryProps {
  title?: string;
  genre?: string;
  wordCount?: number;
  targetWordCount?: number;
  chapterCount?: number;
  completedChapters?: number;
  daysActive?: number;
}

export function ProjectSummary({
  title = "The Ember Chronicles",
  genre = "Fantasy",
  wordCount = 42300,
  targetWordCount = 100000,
  chapterCount = 18,
  completedChapters = 7,
  daysActive = 47,
}: ProjectSummaryProps) {
  const progress = Math.round((wordCount / targetWordCount) * 100);
  const chaptersProgress = Math.round((completedChapters / chapterCount) * 100);

  return (
    <GlowCard className="p-5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-base font-bold text-wf-text">{title}</h3>
          <Badge variant="secondary" className="mt-1 text-xs">{genre}</Badge>
        </div>
        <BookOpen className="h-5 w-5 text-wf-accent" />
      </div>

      <div className="space-y-4">
        <div>
          <div className="mb-1.5 flex justify-between text-xs text-wf-text-muted">
            <div className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              <span>Word count</span>
            </div>
            <span>{formatNumber(wordCount)} / {formatNumber(targetWordCount)}</span>
          </div>
          <Progress value={progress} />
          <p className="mt-1 text-right text-xs text-wf-accent">{progress}% complete</p>
        </div>

        <div>
          <div className="mb-1.5 flex justify-between text-xs text-wf-text-muted">
            <span>Chapters</span>
            <span>{completedChapters} / {chapterCount} done</span>
          </div>
          <Progress value={chaptersProgress} />
        </div>

        <div className="flex items-center gap-1.5 text-xs text-wf-text-muted">
          <Calendar className="h-3 w-3" />
          <span>{daysActive} days active</span>
          <span className="ml-auto font-medium text-wf-text">
            ~{Math.round((targetWordCount - wordCount) / Math.max(wordCount / daysActive, 1))} days remaining
          </span>
        </div>
      </div>
    </GlowCard>
  );
}
