"use client";
import React, { useState } from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, ExternalLink, Plus, Bookmark } from "lucide-react";

const mockNotes = [
  { id: "1", title: "Medieval Siege Warfare", content: "Trebuchets could hurl 300lb stones up to 300 meters. A siege of a well-supplied castle could last months or years. Common tactics included mining under walls to collapse them.", tags: ["warfare", "medieval", "ch12"], source: "Historical Encyclopedia of Warfare" },
  { id: "2", title: "Desert Ecology & Survival", content: "Humans can survive 3-4 days without water in desert conditions. Cacti store water in their tissue but require preparation. Sandstorms can travel at 60mph and reduce visibility to zero.", tags: ["survival", "environment", "worldbuilding"], source: "Desert Survival Manual" },
  { id: "3", title: "Psychology of Trauma", content: "Complex PTSD develops from repeated trauma rather than single events. Symptoms include emotional dysregulation, negative self-perception, and difficulty with relationships. Recovery is non-linear.", tags: ["psychology", "character", "elara"], source: "Trauma and Recovery by Judith Herman" },
];

export default function ResearchPage() {
  const [query, setQuery] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleAISearch = async () => {
    if (!aiQuery.trim()) return;
    setIsSearching(true);
    await new Promise((r) => setTimeout(r, 1500));
    setAiResult(`Research findings for "${aiQuery}":\n\nBased on historical and scientific sources, here are key facts relevant to your story:\n\n1. [Relevant finding 1] - This would be populated by an AI using OpenRouter\n2. [Relevant finding 2] - Cross-referenced with academic databases\n3. [Relevant finding 3] - Specific details for fiction accuracy\n\nThese facts have been curated for narrative authenticity.`);
    setIsSearching(false);
  };

  const filtered = mockNotes.filter((n) =>
    n.title.toLowerCase().includes(query.toLowerCase()) ||
    n.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-wf-text">Research Assistant</h1>
        <p className="text-sm text-wf-text-muted">AI-powered research to keep your fiction accurate and detailed.</p>
      </div>

      {/* AI Research */}
      <GlowCard className="mb-6 p-5">
        <h2 className="mb-3 text-sm font-semibold text-wf-text flex items-center gap-2">
          <Search className="h-4 w-4 text-wf-accent" />
          AI Research Query
        </h2>
        <div className="flex gap-3">
          <Input
            placeholder="e.g. How would a 14th century blacksmith make a sword?"
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAISearch()}
          />
          <Button onClick={handleAISearch} disabled={isSearching}>
            {isSearching ? "Searching…" : "Research"}
          </Button>
        </div>
        {aiResult && (
          <div className="mt-4 rounded-lg bg-wf-panel-elevated p-4">
            <pre className="whitespace-pre-wrap text-sm text-wf-text leading-relaxed">{aiResult}</pre>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" size="sm"><Bookmark className="h-3.5 w-3.5 mr-1" />Save Note</Button>
            </div>
          </div>
        )}
      </GlowCard>

      {/* Notes */}
      <div className="mb-3 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-wf-text-muted" />
          <Input placeholder="Search notes..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />New Note</Button>
      </div>

      <div className="space-y-3">
        {filtered.map((note) => (
          <GlowCard key={note.id} className="p-4">
            <div className="mb-2 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-wf-accent" />
                <h3 className="text-sm font-semibold text-wf-text">{note.title}</h3>
              </div>
              <button className="text-wf-text-muted hover:text-wf-accent" onClick={() => {}}>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mb-2 text-xs text-wf-text-muted leading-relaxed">{note.content}</p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {note.tags.map((t) => <Badge key={t} variant="secondary" className="text-[10px]">#{t}</Badge>)}
              </div>
              <span className="text-[10px] text-wf-text-muted italic">{note.source}</span>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}
