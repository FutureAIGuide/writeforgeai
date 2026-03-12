"use client";
import React, { useState } from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { AISuggestionsPanel } from "@/components/dashboard/AISuggestionsPanel";
import { ProjectSummary } from "@/components/dashboard/ProjectSummary";
import { GoalTracker } from "@/components/dashboard/GoalTracker";
import { SubscriptionCard } from "@/components/shared/SubscriptionCard";
import { UpgradeModal } from "@/components/shared/UpgradeModal";
import { BookOpen, Flame, CheckCircle2, Activity } from "lucide-react";

export default function DashboardPage() {
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-wf-text">Dashboard</h1>
        <p className="text-sm text-wf-text-muted">Welcome back. Here&apos;s where your story stands.</p>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MetricCard
          label="Total Words"
          value="42,300"
          delta="+1,847 today"
          deltaType="increase"
          iconNode={<BookOpen className="h-4 w-4" />}
        />
        <MetricCard
          label="Writing Streak"
          value="5 days"
          delta="Personal best!"
          deltaType="increase"
          iconNode={<Flame className="h-4 w-4" />}
        />
        <MetricCard
          label="Chapters Done"
          value="7 / 18"
          delta="2 in progress"
          deltaType="neutral"
          iconNode={<CheckCircle2 className="h-4 w-4" />}
        />
        <MetricCard
          label="Health Score"
          value="79/100"
          delta="+3 from last week"
          deltaType="increase"
          iconNode={<Activity className="h-4 w-4" />}
        />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <ProjectSummary />
          <GoalTracker />
          <ActivityFeed />
        </div>
        <div className="space-y-4">
          <AISuggestionsPanel />
          <SubscriptionCard
            plan="free"
            tokensUsed={12500}
            onUpgrade={() => setUpgradeOpen(true)}
          />
        </div>
      </div>

      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} currentPlan="free" />
    </div>
  );
}
