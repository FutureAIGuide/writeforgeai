"use client";
import React, { useState } from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Wand2, BookOpen, Users, Globe, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const templates = [
  { id: "1", title: "Scene Generator", category: "writing", description: "Generate a complete scene from POV, setting, and conflict inputs.", icon: BookOpen },
  { id: "2", title: "Character Voice", category: "character", description: "Write dialogue that perfectly captures a character's unique voice.", icon: Users },
  { id: "3", title: "Plot Hole Detector", category: "critique", description: "Find logical inconsistencies and continuity errors.", icon: MessageSquare },
  { id: "4", title: "World Detail Expander", category: "worldbuilding", description: "Expand a simple location into a richly detailed setting.", icon: Globe },
  { id: "5", title: "Prose Rewriter", category: "prose", description: "Rewrite a passage to improve style, clarity, and flow.", icon: Wand2 },
];

const categories = ["all", "writing", "character", "critique", "worldbuilding", "prose"];

interface PromptLibraryProps {
  onSelect?: (templateId: string) => void;
}

export function PromptLibrary({ onSelect }: PromptLibraryProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = templates.filter((t) =>
    (activeCategory === "all" || t.category === activeCategory) &&
    t.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-wf-text-muted" />
          <Input placeholder="Search templates..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-md border px-2.5 py-1 text-xs transition-colors capitalize",
              activeCategory === cat
                ? "border-wf-accent bg-wf-accent/15 text-wf-accent"
                : "border-wf-border text-wf-text-muted hover:border-wf-text"
            )}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="space-y-2 overflow-y-auto scrollbar-thin">
        {filtered.map((t) => {
          const Icon = t.icon;
          return (
            <GlowCard
              key={t.id}
              className="cursor-pointer p-3"
              onClick={() => onSelect?.(t.id)}
            >
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-wf-accent/10 p-2 text-wf-accent">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-wf-text">{t.title}</p>
                  <p className="mt-0.5 text-xs text-wf-text-muted">{t.description}</p>
                </div>
                <Badge variant="secondary" className="ml-auto shrink-0 text-[10px]">{t.category}</Badge>
              </div>
            </GlowCard>
          );
        })}
      </div>
    </div>
  );
}
