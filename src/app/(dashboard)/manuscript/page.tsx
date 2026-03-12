"use client";
import React, { useState } from "react";
import { ManuscriptEditor } from "@/components/manuscript/ManuscriptEditor";
import { ChapterNavigator } from "@/components/manuscript/ChapterNavigator";
import { ManuscriptHealthBar } from "@/components/manuscript/ManuscriptHealthBar";
import { InspectorPanel } from "@/components/manuscript/InspectorPanel";
import { AIActionPanel } from "@/components/manuscript/AIActionPanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";

const MOCK_CHAPTERS = [
  { id: "ch-1", title: "Chapter 10", novel_id: "n1", order_index: 10, status: "complete" as const, word_count: 3200, created_at: "", updated_at: "", created_by: "" },
  { id: "ch-2", title: "Chapter 12: The Shift", novel_id: "n1", order_index: 12, status: "draft" as const, word_count: 2800, created_at: "", updated_at: "", created_by: "" },
  { id: "ch-3", title: "Chapter 13", novel_id: "n1", order_index: 13, status: "draft" as const, word_count: 2100, created_at: "", updated_at: "", created_by: "" },
  { id: "ch-4", title: "Chapter 14", novel_id: "n1", order_index: 14, status: "draft" as const, word_count: 1900, created_at: "", updated_at: "", created_by: "" },
  { id: "ch-5", title: "Chapter 15", novel_id: "n1", order_index: 15, status: "draft" as const, word_count: 2400, created_at: "", updated_at: "", created_by: "" },
  { id: "ch-6", title: "Chapter 16", novel_id: "n1", order_index: 16, status: "draft" as const, word_count: 1800, created_at: "", updated_at: "", created_by: "" },
];

const INITIAL_CONTENT = `# Chapter 12: The Shift

Scene: 12

There were some least one of how to show Nell. The nothing amounts and drown, to tilled he lead like a passive and hure on things.

Eroprrvarent fast but was he. *Moment in scene dragging (slow) in Para 3, he theaded to med and that breads'd connocaled with there.* But sone is talk to something nobist it thought.

"What kidamon said," Sorry, to fined."

When wives initation her mor whore to which the pressure of his pashes under parted belares, for boring streeted foecs to hes senserroom entations and hoaring note part of the skills.

From th, the imitation on procent amo top laynroft in while cpot·town-cousters, and hau: that informtate buys contenier, nitrons that we are sncky up tn elath.

AI-identified improvement for seguaments

Untit the haroatients, the uesti haunt, he leaves it the uope of thercom dense by ming or deeping home.

"Heung's a good tar it ons lead for the sometime with open!"`;

export default function ManuscriptPage() {
  const [activeChapterId, setActiveChapterId] = useState<string | null>("ch-2");
  const [isRewriting, setIsRewriting] = useState(false);

  const handleRewriteContext = async () => {
    setIsRewriting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsRewriting(false);
  };

  return (
    <div className="flex h-full flex-col">
      <ManuscriptHealthBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Chapter Navigator */}
        <ChapterNavigator
          chapters={MOCK_CHAPTERS}
          activeChapterId={activeChapterId}
          onSelectChapter={setActiveChapterId}
        />

        {/* Editor area */}
        <div className="flex flex-1 flex-col overflow-hidden relative">
          {/* Chapter header */}
          <div className="flex items-center justify-between border-b border-wf-border bg-wf-panel px-4 py-2">
            <div>
              <h2 className="text-sm font-bold text-wf-text">Chapter 12: The Shift</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-wf-text-muted">Scene: 12</span>
                <Badge variant="secondary" className="text-[10px] h-4">Draft</Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-wf-text-muted">2,847 words</span>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-wf-text-muted">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 overflow-hidden">
            <ManuscriptEditor
              chapterTitle="Chapter 12: The Shift"
              initialContent={INITIAL_CONTENT}
            />
          </div>

          {/* AI Action button (floating) */}
          <div className="absolute bottom-6 right-6 z-20">
            <AIActionPanel
              onRewriteContext={handleRewriteContext}
              isLoading={isRewriting}
              onSimulateReader={() => {}}
              onSuggestContinuation={() => {}}
              onFixShowTell={() => {}}
            />
          </div>
        </div>

        {/* Inspector Panel */}
        <div className="w-56 shrink-0">
          <InspectorPanel
            chapterId="ch-2"
            healthScore={78}
            issues={[
              { label: "Pacing Detection", value: "Scene dragging (slow) in Para 3", severity: "warning", description: "Consider adding tension beats to Para 3" },
              { label: "Show-Don't-Tell", value: "Dialogue is expository", severity: "info", description: "Lines 8-10 tell emotion rather than showing" },
              { label: "Readability", value: "Grade 9 reading level", severity: "success" },
              { label: "Draft Health Score", value: "78/100", severity: "success" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
