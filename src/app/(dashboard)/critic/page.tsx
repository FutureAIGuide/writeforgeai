"use client";
import React, { useState } from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { CritiqueIssueList } from "@/components/shared/CritiqueIssueList";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Play, CheckCircle2 } from "lucide-react";
import { CRITIQUE_PASS_TYPES } from "@/lib/constants";
import type { CritiqueIssue } from "@/types";

const mockIssues: CritiqueIssue[] = [
  { id: "1", severity: "major", category: "Structure", description: "Chapter 7 lacks a clear inciting incident. The chapter begins and ends without meaningfully advancing either the plot or character arc.", location: "Chapter 7, Scene 2", suggestion: "Add a discovery or decision that forces Elara to change her plan." },
  { id: "2", severity: "minor", category: "Prose", description: "Adverb overuse in dialogue tags. Found 14 instances of '-ly' adverbs modifying dialogue verbs (whispered softly, said quietly, etc.).", location: "Chapters 3-8", suggestion: "Replace with stronger verbs or physical action beats." },
  { id: "3", severity: "suggestion", category: "Character", description: "Mira disappears from the narrative for 3 chapters (8-10). Consider adding a brief check-in to maintain her presence.", location: "Chapters 8-10", suggestion: "A short scene or mention of Mira's whereabouts keeps readers anchored." },
  { id: "4", severity: "critical", category: "Pacing", description: "The second act sags severely between chapters 9-12. There is insufficient escalation, and the reader's investment may drop.", location: "Chapters 9-12", suggestion: "Introduce a ticking clock or complicate Elara's primary goal during this section." },
];

export default function CriticPage() {
  const [passType, setPassType] = useState("structure");
  const [isRunning, setIsRunning] = useState(false);
  const [hasResults, setHasResults] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleRun = async () => {
    setIsRunning(true);
    setHasResults(false);
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise((r) => setTimeout(r, 200));
    }
    setIsRunning(false);
    setHasResults(true);
  };

  const score = 71;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-wf-text">Critic Engine</h1>
        <p className="text-sm text-wf-text-muted">Multi-pass AI critique to professional editing standards.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div>
          <GlowCard className="p-5">
            <h3 className="mb-4 text-sm font-semibold text-wf-text">Configure Critique</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs text-wf-text-muted">Pass Type</label>
                <Select value={passType} onValueChange={setPassType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CRITIQUE_PASS_TYPES.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-wf-text-muted">Scope</label>
                <Select defaultValue="full">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Manuscript</SelectItem>
                    <SelectItem value="chapter">Current Chapter</SelectItem>
                    <SelectItem value="selection">Selected Text</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {isRunning && (
                <div>
                  <p className="mb-1 text-xs text-wf-text-muted">Analyzing manuscript…</p>
                  <Progress value={progress} />
                </div>
              )}
              <Button className="w-full" onClick={handleRun} disabled={isRunning}>
                <Play className="mr-2 h-4 w-4" />
                {isRunning ? "Running…" : "Run Critique"}
              </Button>
            </div>
          </GlowCard>

          {hasResults && (
            <GlowCard className="mt-4 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-wf-text">Score</h3>
                <MessageSquare className="h-4 w-4 text-wf-accent" />
              </div>
              <div className="text-center">
                <span className={`text-5xl font-bold ${score >= 80 ? "text-wf-success" : score >= 60 ? "text-wf-warning" : "text-wf-danger"}`}>
                  {score}
                </span>
                <span className="text-wf-text-muted">/100</span>
              </div>
              <div className="mt-4 space-y-1.5">
                {[{ label: "Critical", count: 1, color: "text-wf-danger" }, { label: "Major", count: 1, color: "text-wf-warning" }, { label: "Minor", count: 1, color: "text-blue-400" }, { label: "Suggestions", count: 1, color: "text-wf-text-muted" }].map(({ label, count, color }) => (
                  <div key={label} className="flex justify-between text-xs">
                    <span className={color}>{label}</span>
                    <Badge variant="secondary" className="text-[10px]">{count}</Badge>
                  </div>
                ))}
              </div>
            </GlowCard>
          )}
        </div>

        <div className="lg:col-span-2">
          {hasResults ? (
            <div>
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-wf-success" />
                <h3 className="text-sm font-semibold text-wf-text">Issues Found</h3>
                <Badge variant="secondary">{mockIssues.length} total</Badge>
              </div>
              <CritiqueIssueList issues={mockIssues} />
            </div>
          ) : (
            <GlowCard className="flex h-full items-center justify-center p-8">
              <p className="text-sm text-wf-text-muted">Run a critique to see results here.</p>
            </GlowCard>
          )}
        </div>
      </div>
    </div>
  );
}
