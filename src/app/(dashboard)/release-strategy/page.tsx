import React from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Badge } from "@/components/ui/badge";

export default function ReleaseStrategyPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-wf-text">Release Strategy</h1>
        <p className="text-sm text-wf-text-muted">Coming soon — this feature is in active development.</p>
      </div>
      <GlowCard className="p-8 text-center">
        <Badge variant="secondary" className="mb-4">Coming Soon</Badge>
        <h2 className="text-lg font-semibold text-wf-text mb-2">Release Strategy</h2>
        <p className="text-sm text-wf-text-muted max-w-md mx-auto">
          This module is under active development. Sign up for early access notifications.
        </p>
      </GlowCard>
    </div>
  );
}
