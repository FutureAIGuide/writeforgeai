"use client";
import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";
import { cn } from "@/lib/utils";
import type { MetricCardData } from "@/types";

interface MetricCardProps extends MetricCardData {
  iconNode?: React.ReactNode;
}

export function MetricCard({ label, value, delta, deltaType, iconNode }: MetricCardProps) {
  const DeltaIcon = deltaType === "increase" ? TrendingUp : deltaType === "decrease" ? TrendingDown : Minus;
  const deltaColor = deltaType === "increase" ? "text-wf-success" : deltaType === "decrease" ? "text-wf-danger" : "text-wf-text-muted";

  return (
    <GlowCard className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-1 text-xs font-medium text-wf-text-muted uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-wf-text">{value}</p>
          {delta && (
            <div className={cn("mt-1 flex items-center gap-1 text-xs", deltaColor)}>
              <DeltaIcon className="h-3 w-3" />
              <span>{delta}</span>
            </div>
          )}
        </div>
        {iconNode && (
          <div className="rounded-lg bg-wf-accent/10 p-2.5 text-wf-accent">
            {iconNode}
          </div>
        )}
      </div>
    </GlowCard>
  );
}
