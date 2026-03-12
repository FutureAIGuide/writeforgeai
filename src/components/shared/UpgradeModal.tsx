"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap } from "lucide-react";
import { PLANS } from "@/lib/constants";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  currentPlan?: string;
}

const planFeatures: Record<string, string[]> = {
  starter: ["500K tokens/mo", "Unlimited manuscripts", "Beta reader (3 personas)", "Basic critique passes"],
  pro: ["2M tokens/mo", "Everything in Starter", "Beta reader (10 personas)", "All critique passes", "Workflow builder", "Priority support"],
  studio: ["10M tokens/mo", "Everything in Pro", "Unlimited personas", "Team collaboration", "API access", "White-label options"],
};

export function UpgradeModal({ open, onClose, currentPlan = "free" }: UpgradeModalProps) {
  const handleUpgrade = async (plan: string) => {
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Zap className="h-5 w-5 text-wf-accent" />
            Upgrade Write Forge AI
          </DialogTitle>
          <DialogDescription>
            Unlock the full power of AI-assisted writing.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {(["starter", "pro", "studio"] as const).map((plan) => {
            const info = PLANS[plan];
            const isCurrentPlan = plan === currentPlan;
            const isPro = plan === "pro";
            return (
              <div
                key={plan}
                className={`relative rounded-xl border p-5 ${isPro ? "border-wf-accent shadow-[0_0_20px_rgba(255,106,0,0.2)]" : "border-wf-border"}`}
              >
                {isPro && (
                  <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-wf-accent">
                    Most Popular
                  </Badge>
                )}
                <h3 className="mb-1 font-semibold text-wf-text">{info.name}</h3>
                <p className="mb-4 text-2xl font-bold text-wf-text">
                  ${(info.price / 100).toFixed(0)}
                  <span className="text-sm font-normal text-wf-text-muted">/mo</span>
                </p>
                <ul className="mb-5 space-y-2">
                  {planFeatures[plan]?.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-wf-text-muted">
                      <Check className="h-3 w-3 shrink-0 text-wf-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={isPro ? "default" : "outline"}
                  size="sm"
                  disabled={isCurrentPlan}
                  onClick={() => handleUpgrade(plan)}
                >
                  {isCurrentPlan ? "Current Plan" : "Upgrade"}
                </Button>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
