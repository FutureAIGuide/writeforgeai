"use client";
import React from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Globe, Sword, BookOpen, Building, Sparkles } from "lucide-react";
import type { LoreEntry } from "@/types";
import { truncate } from "@/lib/utils";

const categoryIcons: Record<string, React.ElementType> = {
  magic: Sparkles,
  geography: Globe,
  history: BookOpen,
  factions: Sword,
  cities: Building,
};

interface LoreEntryCardProps {
  entry: LoreEntry;
  onEdit?: (id: string) => void;
}

export function LoreEntryCard({ entry, onEdit }: LoreEntryCardProps) {
  const Icon = categoryIcons[entry.category.toLowerCase()] ?? BookOpen;
  return (
    <GlowCard className="p-4">
      <div className="mb-2 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-wf-accent/10 p-1.5 text-wf-accent">
            <Icon className="h-3.5 w-3.5" />
          </div>
          <h3 className="text-sm font-semibold text-wf-text">{entry.title}</h3>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit?.(entry.id)}>
          <Edit className="h-3 w-3" />
        </Button>
      </div>
      <Badge variant="secondary" className="mb-2 text-[10px]">{entry.category}</Badge>
      <p className="text-xs text-wf-text-muted leading-relaxed">{truncate(entry.content, 150)}</p>
      {entry.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {entry.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-sm border border-wf-border px-1.5 py-0.5 text-[10px] text-wf-text-muted">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </GlowCard>
  );
}
