"use client";
import React from "react";
import { GlowCard } from "./GlowCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";
import { PLANS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

interface SubscriptionCardProps {
  plan: string;
  tokensUsed: number;
  onUpgrade: () => void;
}

export function SubscriptionCard({ plan, tokensUsed, onUpgrade }: SubscriptionCardProps) {
  const planInfo = PLANS[plan as keyof typeof PLANS] ?? PLANS.free;
  const usagePercent = Math.min(100, Math.round((tokensUsed / planInfo.tokens) * 100));

  return (
    <GlowCard className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-wf-accent" />
          <span className="text-sm font-medium text-wf-text">Token Usage</span>
        </div>
        <Badge variant={plan === "free" ? "secondary" : "default"}>
          {planInfo.name}
        </Badge>
      </div>
      <div className="mb-2 flex justify-between text-xs text-wf-text-muted">
        <span>{formatNumber(tokensUsed)} used</span>
        <span>{formatNumber(planInfo.tokens)} limit</span>
      </div>
      <Progress value={usagePercent} className="mb-3" />
      {plan === "free" && (
        <Button size="sm" className="w-full" onClick={onUpgrade}>
          Upgrade for more tokens
        </Button>
      )}
    </GlowCard>
  );
}
