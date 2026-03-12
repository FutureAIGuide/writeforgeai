"use client";
import React, { useState } from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Star, MessageSquare, Send, Plus, CheckCircle2, Clock, Award } from "lucide-react";

const mockReviews = [
  {
    id: "r1", reviewer: "M. Caldwell", initials: "MC", genre: "YA Fantasy", rating: 4,
    date: "2 days ago", status: "complete",
    content: "The first three chapters are compelling. Elara is immediately sympathetic and the world feels rich without being overwhelming. The magic system is one of the freshest I've encountered in YA fantasy this year. My main concern is the pacing in chapter 4 — it loses momentum after the aqueduct scene. I'd suggest either cutting the extended market sequence or adding a revelation that recontextualizes what we've seen. Kayn's introduction is perfectly timed. Don't change a thing there.",
    strengths: ["Strong protagonist voice", "Fresh magic system", "World feels lived-in"],
    concerns: ["Chapter 4 pacing sags", "Market scene runs long", "Mira's backstory introduced too quickly"],
  },
  {
    id: "r2", reviewer: "T. Okonkwo", initials: "TO", genre: "Fantasy & Sci-Fi", rating: 5,
    date: "5 days ago", status: "complete",
    content: "I read this in one sitting. The stakes are clear from page one and the emotional undercurrent never lets up. Elara's internal conflict is exactly what YA needs right now — not a chosen one who accepts her destiny, but someone who fights against the gift they were given. The prose is clean and controlled. The ending of chapter 3 is the best cliffhanger I've read this year.",
    strengths: ["Excellent stakes", "Complex protagonist psychology", "Strong chapter endings"],
    concerns: ["Council members blur together — give them distinct voices", "More sensory detail in the underground scenes"],
  },
];

const pendingReviews = [
  { title: "The Ember Chronicles - Ch 1-5", requester: "You", deadline: "In 3 days", genre: "YA Fantasy" },
  { title: "Starfall Academy - Draft 2", requester: "L. Brennan", deadline: "In 7 days", genre: "YA Fantasy" },
];

export default function PeerReviewPage() {
  const [newReviewContent, setNewReviewContent] = useState("");
  const [rating, setRating] = useState(0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-wf-text">Peer Review</h1>
          <p className="text-sm text-wf-text-muted">Exchange feedback with writers in your genre. Authentic, constructive, community-powered.</p>
        </div>
        <Button className="bg-wf-accent hover:bg-wf-accent-soft text-white text-xs">
          <Plus className="h-3.5 w-3.5 mr-1.5" /> Request Peer Review
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Reviews Received", value: "2", icon: MessageSquare, color: "text-wf-accent" },
          { label: "Reviews Given", value: "5", icon: Award, color: "text-blue-400" },
          { label: "Avg Rating", value: "4.5 ★", icon: Star, color: "text-wf-warning" },
        ].map(({ label, value, icon: Icon, color }) => (
          <GlowCard key={label} className="p-4 text-center">
            <Icon className={`h-5 w-5 mx-auto mb-1 ${color}`} />
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="text-[11px] text-wf-text-muted">{label}</p>
          </GlowCard>
        ))}
      </div>

      <Tabs defaultValue="received">
        <TabsList>
          <TabsTrigger value="received" className="text-xs gap-1.5"><MessageSquare className="h-3.5 w-3.5" />Received ({mockReviews.length})</TabsTrigger>
          <TabsTrigger value="pending" className="text-xs gap-1.5"><Clock className="h-3.5 w-3.5" />Pending ({pendingReviews.length})</TabsTrigger>
          <TabsTrigger value="give" className="text-xs gap-1.5"><Users className="h-3.5 w-3.5" />Give a Review</TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="mt-4 space-y-4">
          {mockReviews.map((review) => (
            <GlowCard key={review.id} className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-wf-accent/20 text-wf-accent text-xs font-bold">{review.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-wf-text">{review.reviewer}</p>
                    <p className="text-[11px] text-wf-text-muted">{review.genre} reader · {review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "text-wf-warning fill-wf-warning" : "text-wf-border"}`} />
                    ))}
                  </div>
                  <Badge className="text-[10px] text-wf-success bg-wf-success/10"><CheckCircle2 className="h-2.5 w-2.5 mr-1" />Complete</Badge>
                </div>
              </div>

              <p className="text-sm text-wf-text-muted leading-relaxed mb-4">{review.content}</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] font-semibold text-wf-success mb-2">Strengths</p>
                  <ul className="space-y-1">
                    {review.strengths.map((s) => (
                      <li key={s} className="flex items-center gap-1.5 text-[11px] text-wf-text-muted">
                        <span className="text-wf-success">+</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-wf-warning mb-2">Concerns</p>
                  <ul className="space-y-1">
                    {review.concerns.map((c) => (
                      <li key={c} className="flex items-center gap-1.5 text-[11px] text-wf-text-muted">
                        <span className="text-wf-warning">→</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlowCard>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="mt-4 space-y-3">
          {pendingReviews.map(({ title, requester, deadline, genre }) => (
            <GlowCard key={title} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-wf-text">{title}</p>
                  <p className="text-[11px] text-wf-text-muted">{requester} · {genre}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[11px] text-wf-warning">
                    <Clock className="h-3 w-3" />{deadline}
                  </div>
                  {requester !== "You" && (
                    <Button size="sm" className="text-xs h-7 bg-wf-accent hover:bg-wf-accent-soft text-white">Start Review</Button>
                  )}
                  {requester === "You" && (
                    <Badge variant="secondary" className="text-[10px]">Awaiting reviewers</Badge>
                  )}
                </div>
              </div>
            </GlowCard>
          ))}
        </TabsContent>

        <TabsContent value="give" className="mt-4">
          <GlowCard className="p-5">
            <h3 className="mb-4 text-sm font-semibold text-wf-text">Submit a Peer Review</h3>
            <div className="space-y-4">
              <div>
                <p className="text-[11px] text-wf-text-muted mb-2">Your Rating</p>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button key={i} onClick={() => setRating(i + 1)}>
                      <Star className={`h-6 w-6 transition-colors ${i < rating ? "text-wf-warning fill-wf-warning" : "text-wf-border hover:text-wf-warning"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] text-wf-text-muted mb-2">Your Feedback</p>
                <Textarea
                  value={newReviewContent}
                  onChange={(e) => setNewReviewContent(e.target.value)}
                  placeholder="Be specific, constructive, and kind. Focus on what works and what could be improved with clear suggestions..."
                  className="min-h-[200px] text-sm bg-wf-panel-elevated border-wf-border"
                />
                <p className="mt-1 text-[10px] text-wf-text-muted">{newReviewContent.length} characters · Minimum 200 recommended</p>
              </div>
              <Button className="bg-wf-accent hover:bg-wf-accent-soft text-white text-xs" disabled={!newReviewContent || rating === 0}>
                <Send className="h-3.5 w-3.5 mr-1.5" /> Submit Review
              </Button>
            </div>
          </GlowCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
