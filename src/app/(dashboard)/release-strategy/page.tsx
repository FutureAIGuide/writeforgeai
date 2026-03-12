"use client";
import React, { useState } from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Rocket, Calendar, Target, Users, TrendingUp, CheckCircle2, Clock, AlertCircle, Wand2, Mail } from "lucide-react";

const launchTimeline = [
  { week: "16 Weeks Out", tasks: ["Finalize manuscript", "Hire cover designer", "Set up author website", "Build ARC reader list"], status: "complete" },
  { week: "12 Weeks Out", tasks: ["Cover design complete", "Begin ARC distribution", "Set up Amazon KDP pre-order", "Draft press kit"], status: "complete" },
  { week: "8 Weeks Out", tasks: ["Send ARCs to influencers", "Schedule blog tour", "Set up email newsletter", "Prepare launch team"], status: "active" },
  { week: "4 Weeks Out", tasks: ["Finalize launch team content", "Schedule social posts", "Send newsletter announcement", "Prep BookTok content"], status: "pending" },
  { week: "Launch Week", tasks: ["Publish book", "Run launch promotion", "Engage with reviews", "Post daily content"], status: "pending" },
  { week: "Post-Launch", tasks: ["Monitor and adjust pricing", "Gather review data", "Plan book 2 announcement", "Run targeted ads"], status: "pending" },
];

const platforms = [
  { name: "Amazon KDP", desc: "Global reach, 70% royalties, Kindle Unlimited option", pros: ["Largest audience", "KU passive income", "Great discoverability"], cons: ["KU exclusivity", "Algorithm dependency"], icon: "📦", recommended: true },
  { name: "Draft2Digital", desc: "Wide distribution to B&N, Apple Books, Kobo, and more", pros: ["Multi-platform", "Simple formatting", "No exclusivity"], cons: ["Lower visibility", "Shared discovery"], icon: "🌐" },
  { name: "IngramSpark", desc: "Access to bookstores and libraries worldwide", pros: ["Bookstore distribution", "Library access", "Print-on-demand"], cons: ["Setup fees", "Longer approval"], icon: "📚" },
  { name: "Wattpad", desc: "Build audience before publishing for serialized fiction", pros: ["Free audience building", "Community", "Paid stories program"], cons: ["Younger demographic", "Perception issues"], icon: "✍️" },
];

const marketingChannels = [
  { name: "BookTok (TikTok)", score: 95, desc: "Highest ROI for fantasy/romance", icon: "🎵" },
  { name: "Bookstagram", score: 82, desc: "Visual-first for literary fiction", icon: "📸" },
  { name: "Goodreads Ads", score: 71, desc: "Targeted reader demographics", icon: "📖" },
  { name: "Amazon Ads", score: 88, desc: "Direct to purchase intent buyers", icon: "🛒" },
  { name: "Newsletter Swap", score: 78, desc: "Cross-promo with authors in genre", icon: "📧" },
  { name: "Blog Tours", score: 65, desc: "Building early reviews and credibility", icon: "🗓️" },
];

export default function ReleaseStrategyPage() {
  const [launchDate, setLaunchDate] = useState("2025-09-15");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-wf-text">Release Strategy</h1>
          <p className="text-sm text-wf-text-muted">Plan your launch, maximize discoverability, and build your author platform.</p>
        </div>
        <Button className="bg-wf-accent hover:bg-wf-accent-soft text-white text-xs">
          <Wand2 className="h-3.5 w-3.5 mr-1.5" /> Generate Full Strategy
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Days to Launch", value: "127", icon: Calendar, color: "text-wf-accent" },
          { label: "ARC Readers", value: "24 / 50", icon: Users, color: "text-blue-400" },
          { label: "Pre-orders", value: "0", icon: Target, color: "text-wf-text-muted" },
          { label: "Platform Setup", value: "40%", icon: TrendingUp, color: "text-wf-success" },
        ].map(({ label, value, icon: Icon, color }) => (
          <GlowCard key={label} className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Icon className={`h-4 w-4 ${color}`} />
              <span className="text-[11px] text-wf-text-muted">{label}</span>
            </div>
            <p className={`text-xl font-bold ${color}`}>{value}</p>
          </GlowCard>
        ))}
      </div>

      <Tabs defaultValue="timeline">
        <TabsList>
          <TabsTrigger value="timeline" className="text-xs gap-1"><Calendar className="h-3.5 w-3.5" />Launch Timeline</TabsTrigger>
          <TabsTrigger value="platforms" className="text-xs gap-1"><Rocket className="h-3.5 w-3.5" />Platforms</TabsTrigger>
          <TabsTrigger value="marketing" className="text-xs gap-1"><TrendingUp className="h-3.5 w-3.5" />Marketing</TabsTrigger>
          <TabsTrigger value="arcs" className="text-xs gap-1"><Users className="h-3.5 w-3.5" />ARC Team</TabsTrigger>
          <TabsTrigger value="newsletter" className="text-xs gap-1"><Mail className="h-3.5 w-3.5" />Newsletter</TabsTrigger>
        </TabsList>

        {/* Timeline */}
        <TabsContent value="timeline" className="mt-4">
          <div className="space-y-3">
            {launchTimeline.map(({ week, tasks, status }) => (
              <GlowCard key={week} className={`p-4 ${status === "active" ? "border-wf-accent/50 bg-wf-accent/3" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-0.5">
                    {status === "complete" ? (
                      <CheckCircle2 className="h-5 w-5 text-wf-success" />
                    ) : status === "active" ? (
                      <Clock className="h-5 w-5 text-wf-accent animate-pulse" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-wf-border" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-sm font-semibold text-wf-text">{week}</h3>
                      {status === "active" && <Badge className="text-[10px] bg-wf-accent/20 text-wf-accent border-wf-accent/30">Current Phase</Badge>}
                    </div>
                    <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
                      {tasks.map((task) => (
                        <div key={task} className={`flex items-center gap-1.5 text-[11px] ${status === "complete" ? "text-wf-success" : "text-wf-text-muted"}`}>
                          <CheckCircle2 className={`h-3 w-3 shrink-0 ${status === "complete" ? "text-wf-success" : "text-wf-border"}`} />
                          {task}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </TabsContent>

        {/* Platforms */}
        <TabsContent value="platforms" className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {platforms.map(({ name, desc, pros, cons, icon, recommended }) => (
              <GlowCard key={name} className={`p-4 ${recommended ? "border-wf-accent/40" : ""}`}>
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{icon}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-wf-text">{name}</h3>
                      {recommended && <Badge className="text-[9px] bg-wf-accent/20 text-wf-accent border-wf-accent/30 mt-0.5">Recommended</Badge>}
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-wf-text-muted mb-3 leading-relaxed">{desc}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] font-semibold text-wf-success mb-1">Pros</p>
                    <ul className="space-y-1">{pros.map((p) => <li key={p} className="text-[10px] text-wf-text-muted flex items-center gap-1"><span className="text-wf-success">+</span>{p}</li>)}</ul>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-wf-warning mb-1">Cons</p>
                    <ul className="space-y-1">{cons.map((c) => <li key={c} className="text-[10px] text-wf-text-muted flex items-center gap-1"><span className="text-wf-warning">-</span>{c}</li>)}</ul>
                  </div>
                </div>
                <Button size="sm" className="mt-3 w-full text-xs h-7 bg-wf-panel-elevated text-wf-text-muted border border-wf-border hover:border-wf-accent hover:text-wf-accent">Set Up Platform</Button>
              </GlowCard>
            ))}
          </div>
        </TabsContent>

        {/* Marketing */}
        <TabsContent value="marketing" className="mt-4">
          <div className="space-y-3">
            {marketingChannels.map(({ name, score, desc, icon }) => (
              <GlowCard key={name} className="p-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-wf-text">{name}</span>
                      <span className={`text-xs font-bold ${score >= 85 ? "text-wf-success" : score >= 70 ? "text-wf-warning" : "text-wf-text-muted"}`}>{score}% ROI score</span>
                    </div>
                    <p className="text-[11px] text-wf-text-muted mb-2">{desc}</p>
                    <Progress value={score} className="h-1.5" />
                  </div>
                  <Button size="sm" className="shrink-0 text-xs h-7 border border-wf-border bg-transparent text-wf-text-muted hover:border-wf-accent hover:text-wf-accent">Plan</Button>
                </div>
              </GlowCard>
            ))}
          </div>
        </TabsContent>

        {/* ARC Team */}
        <TabsContent value="arcs" className="mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-4">
              <GlowCard className="p-4">
                <h3 className="mb-2 text-sm font-semibold text-wf-text">ARC Progress</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="text-wf-text-muted">Recruited</span><span className="text-wf-text">24/50</span></div>
                    <Progress value={48} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="text-wf-text-muted">ARCs Sent</span><span className="text-wf-text">12/24</span></div>
                    <Progress value={50} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="text-wf-text-muted">Reviews Posted</span><span className="text-wf-text">3/12</span></div>
                    <Progress value={25} className="h-2" />
                  </div>
                </div>
              </GlowCard>
              <Button className="w-full bg-wf-accent hover:bg-wf-accent-soft text-white text-xs">
                <Users className="h-3.5 w-3.5 mr-1.5" /> Recruit ARC Readers
              </Button>
            </div>
            <div className="lg:col-span-2">
              <GlowCard className="p-4">
                <h3 className="mb-3 text-sm font-semibold text-wf-text">ARC Reader Management</h3>
                <div className="space-y-2">
                  {[
                    { name: "Kaelira_Reads", platform: "BookTok", followers: "12.4K", status: "sent", review: "pending" },
                    { name: "@fantasy_obsessed", platform: "Instagram", followers: "8.2K", status: "sent", review: "posted" },
                    { name: "The Arcane Shelf", platform: "Blog", followers: "3.1K", status: "recruited", review: "pending" },
                  ].map(({ name, platform, followers, status, review }) => (
                    <div key={name} className="flex items-center gap-3 rounded-lg border border-wf-border p-2.5 hover:border-wf-accent/30 transition-colors">
                      <div className="h-7 w-7 rounded-full bg-wf-accent/20 flex items-center justify-center text-[10px] text-wf-accent font-bold">
                        {name[0].toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-wf-text">{name}</p>
                        <p className="text-[10px] text-wf-text-muted">{platform} · {followers} followers</p>
                      </div>
                      <Badge variant="secondary" className={`text-[9px] ${status === "sent" ? "text-blue-400" : "text-wf-text-muted"}`}>{status}</Badge>
                      <Badge variant="secondary" className={`text-[9px] ${review === "posted" ? "text-wf-success" : "text-wf-warning"}`}>{review}</Badge>
                    </div>
                  ))}
                </div>
              </GlowCard>
            </div>
          </div>
        </TabsContent>

        {/* Newsletter */}
        <TabsContent value="newsletter" className="mt-4">
          <GlowCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="h-8 w-8 text-wf-accent" />
              <div>
                <h3 className="text-base font-semibold text-wf-text">Author Newsletter</h3>
                <p className="text-xs text-wf-text-muted">Grow and manage your reader email list</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
              {[{ label: "Subscribers", value: "0" }, { label: "Open Rate", value: "—" }, { label: "Sequences", value: "0" }].map(({ label, value }) => (
                <div key={label} className="rounded-lg border border-wf-border bg-wf-panel p-3 text-center">
                  <p className="text-2xl font-bold text-wf-accent">{value}</p>
                  <p className="text-[11px] text-wf-text-muted mt-1">{label}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button className="bg-wf-accent hover:bg-wf-accent-soft text-white text-xs">
                <Wand2 className="h-3.5 w-3.5 mr-1.5" /> Generate Welcome Sequence
              </Button>
              <Button variant="outline" className="text-xs border-wf-border text-wf-text-muted">Connect Mailchimp / ConvertKit</Button>
            </div>
          </GlowCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
