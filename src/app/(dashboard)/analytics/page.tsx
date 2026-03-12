import React from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { WritingCadenceChart } from "@/components/analytics/WritingCadenceChart";
import { SentimentTrendChart } from "@/components/analytics/SentimentTrendChart";
import { SceneEngagementChart } from "@/components/analytics/SceneEngagementChart";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { BookOpen, Clock, TrendingUp, Zap } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-wf-text">Analytics</h1>
        <p className="text-sm text-wf-text-muted">Deep insights into your writing patterns and story health.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MetricCard label="Avg Daily Words" value="1,247" delta="+12% this week" deltaType="increase" iconNode={<BookOpen className="h-4 w-4" />} />
        <MetricCard label="Session Avg" value="47 min" delta="+8 min" deltaType="increase" iconNode={<Clock className="h-4 w-4" />} />
        <MetricCard label="Readability" value="Grade 8" delta="Accessible" deltaType="neutral" iconNode={<TrendingUp className="h-4 w-4" />} />
        <MetricCard label="Tokens Used" value="12.5k" delta="25% of free limit" deltaType="neutral" iconNode={<Zap className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <GlowCard className="p-5">
          <h3 className="mb-4 text-sm font-semibold text-wf-text">Writing Cadence (last 14 days)</h3>
          <WritingCadenceChart />
        </GlowCard>
        <GlowCard className="p-5">
          <h3 className="mb-4 text-sm font-semibold text-wf-text">Reader Sentiment Trend</h3>
          <SentimentTrendChart />
        </GlowCard>
      </div>

      <GlowCard className="p-5">
        <h3 className="mb-4 text-sm font-semibold text-wf-text">Scene Engagement Radar</h3>
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <SceneEngagementChart />
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
