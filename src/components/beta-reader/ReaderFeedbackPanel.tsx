"use client";
import React from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ThumbsUp, AlertTriangle } from "lucide-react";
import type { BetaPersona } from "@/types";

interface ReaderFeedbackPanelProps {
  persona: BetaPersona | null;
}

export function ReaderFeedbackPanel({ persona }: ReaderFeedbackPanelProps) {
  if (!persona) {
    return (
      <GlowCard className="flex h-full items-center justify-center p-8">
        <p className="text-center text-sm text-wf-text-muted">
          Select a persona to view their detailed feedback
        </p>
      </GlowCard>
    );
  }

  return (
    <GlowCard className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-wf-text">Feedback from {persona.name}</h3>
        <Badge variant="secondary">{persona.type}</Badge>
      </div>

      <div className="space-y-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-wf-text-muted">
            <MessageCircle className="h-3.5 w-3.5" />
            Overall Feedback
          </div>
          <p className="text-sm text-wf-text leading-relaxed">
            {persona.feedback ?? "No feedback available yet."}
          </p>
        </div>

        {(persona.demographics as Record<string, unknown>) && Object.keys(persona.demographics).length > 0 && (
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-wf-text-muted">
              <ThumbsUp className="h-3.5 w-3.5" />
              Demographics
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(persona.demographics).map(([k, v]) => (
                <span key={k} className="rounded-md border border-wf-border px-2 py-0.5 text-xs text-wf-text-muted">
                  {k}: {String(v)}
                </span>
              ))}
            </div>
          </div>
        )}

        {persona.sentiment_data?.length > 0 && (
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-wf-text-muted">
              <AlertTriangle className="h-3.5 w-3.5" />
              Sentiment by Chapter
            </div>
            <div className="flex items-end gap-1">
              {persona.sentiment_data.map((d) => (
                <div key={d.chapter} className="flex flex-col items-center gap-1">
                  <div
                    className="w-5 rounded-sm bg-wf-accent"
                    style={{ height: `${Math.round(d.score * 40)}px`, opacity: 0.4 + d.score * 0.6 }}
                  />
                  <span className="text-[10px] text-wf-text-muted">{d.chapter}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </GlowCard>
  );
}
