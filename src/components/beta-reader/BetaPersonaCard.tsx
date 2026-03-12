"use client";
import React from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, MessageCircle } from "lucide-react";
import type { BetaPersona } from "@/types";
import { truncate } from "@/lib/utils";

interface BetaPersonaCardProps {
  persona: BetaPersona;
  isActive?: boolean;
  onClick?: () => void;
}

const personaColors: Record<string, string> = {
  "Genre Enthusiast": "bg-purple-500",
  "Casual Reader": "bg-blue-500",
  "Literary Critic": "bg-amber-500",
  "Young Adult": "bg-green-500",
  "Academic": "bg-red-500",
  "Book Club Member": "bg-pink-500",
  "Sensitivity Reader": "bg-teal-500",
};

export function BetaPersonaCard({ persona, isActive, onClick }: BetaPersonaCardProps) {
  const avgSentiment = persona.sentiment_data?.length
    ? persona.sentiment_data.reduce((a, d) => a + d.score, 0) / persona.sentiment_data.length
    : 0;
  const stars = Math.round(avgSentiment * 5);
  const bgColor = personaColors[persona.type] ?? "bg-wf-accent";

  return (
    <GlowCard
      className={`cursor-pointer p-4 transition-all ${isActive ? "border-wf-accent shadow-[0_0_16px_rgba(255,106,0,0.2)]" : ""}`}
      onClick={onClick}
    >
      <div className="mb-3 flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback className={`${bgColor} text-white text-sm font-semibold`}>
            {persona.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold text-wf-text">{persona.name}</p>
          <Badge variant="secondary" className="text-[10px]">{persona.type}</Badge>
        </div>
        <div className="ml-auto flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < stars ? "fill-wf-accent text-wf-accent" : "text-wf-border"}`}
            />
          ))}
        </div>
      </div>

      {persona.feedback && (
        <div className="flex gap-2">
          <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-wf-text-muted" />
          <p className="text-xs text-wf-text-muted leading-relaxed">
            {truncate(persona.feedback, 120)}
          </p>
        </div>
      )}
    </GlowCard>
  );
}
