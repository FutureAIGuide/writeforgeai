"use client";
import React, { useState } from "react";
import { BetaRunConfig } from "@/components/beta-reader/BetaRunConfig";
import { BetaPersonaCard } from "@/components/beta-reader/BetaPersonaCard";
import { ReaderFeedbackPanel } from "@/components/beta-reader/ReaderFeedbackPanel";
import { SentimentGraph } from "@/components/beta-reader/SentimentGraph";
import { GlowCard } from "@/components/shared/GlowCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BetaPersona } from "@/types";

const mockPersonas: BetaPersona[] = [
  {
    id: "p1", beta_run_id: "r1", name: "Alex Chen", type: "Genre Enthusiast",
    demographics: { age: "28-35", gender: "Non-binary", readingFrequency: "Daily" },
    preferences: { favoriteGenres: ["Fantasy", "Sci-Fi"] },
    feedback: "The worldbuilding is exceptional! I was completely drawn into Ashenveil from the first page. Elara's voice is distinctive and compelling. The magic system feels fresh. I did find Chapter 3 a bit slow, but the payoff in Chapter 5 more than made up for it. The romantic tension between Elara and Kayn is the highlight for me.",
    sentiment_data: [
      { chapter: 1, score: 0.72, label: "engaged" },
      { chapter: 2, score: 0.68, label: "curious" },
      { chapter: 3, score: 0.45, label: "bored" },
      { chapter: 4, score: 0.55, label: "recovering" },
      { chapter: 5, score: 0.80, label: "thrilled" },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "p2", beta_run_id: "r1", name: "Sarah Mitchell", type: "Casual Reader",
    demographics: { age: "22-30", gender: "Female", readingFrequency: "Weekly" },
    preferences: { favoriteGenres: ["Romance", "Fantasy"] },
    feedback: "Really enjoyed this! The characters feel real and I found myself rooting for Elara immediately. I was a bit lost with some of the magic terminology in Chapter 2, but it became clearer. Kayn is my favorite character—so complex! I need to know what his secret is.",
    sentiment_data: [
      { chapter: 1, score: 0.65, label: "interested" },
      { chapter: 2, score: 0.50, label: "confused" },
      { chapter: 3, score: 0.60, label: "engaged" },
      { chapter: 4, score: 0.72, label: "hooked" },
      { chapter: 5, score: 0.78, label: "excited" },
    ],
    created_at: new Date().toISOString(),
  },
];

export default function BetaReaderPage() {
  const [activePersona, setActivePersona] = useState<BetaPersona | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(true);

  const handleStart = async () => {
    setIsRunning(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsRunning(false);
    setHasRun(true);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-wf-text">Beta Reader Engine</h1>
        <p className="text-sm text-wf-text-muted">AI-powered reader personas give authentic feedback on your manuscript.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div>
          <BetaRunConfig onStart={handleStart} isRunning={isRunning} />
        </div>

        <div className="lg:col-span-2">
          {hasRun ? (
            <Tabs defaultValue="personas">
              <TabsList>
                <TabsTrigger value="personas">Personas</TabsTrigger>
                <TabsTrigger value="sentiment">Sentiment Graph</TabsTrigger>
                <TabsTrigger value="feedback">Detailed Feedback</TabsTrigger>
              </TabsList>

              <TabsContent value="personas">
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {mockPersonas.map((p) => (
                    <BetaPersonaCard
                      key={p.id}
                      persona={p}
                      isActive={activePersona?.id === p.id}
                      onClick={() => setActivePersona(p)}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="sentiment">
                <GlowCard className="mt-4 p-5">
                  <h3 className="mb-4 text-sm font-semibold text-wf-text">Sentiment by Chapter</h3>
                  <SentimentGraph />
                </GlowCard>
              </TabsContent>

              <TabsContent value="feedback">
                <div className="mt-4">
                  <ReaderFeedbackPanel persona={activePersona} />
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <GlowCard className="flex h-64 items-center justify-center p-8">
              <p className="text-center text-sm text-wf-text-muted">
                Configure your beta read on the left and click Start to get feedback.
              </p>
            </GlowCard>
          )}
        </div>
      </div>
    </div>
  );
}
