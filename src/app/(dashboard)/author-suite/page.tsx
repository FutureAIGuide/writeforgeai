"use client";
import React, { useState } from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Award, FileText, Mail, Search, Wand2, Star, Copy, Download,
  ChevronRight, Sparkles, BookOpen, Send, Globe, Loader2
} from "lucide-react";

const agentTips = [
  "Personalize the opening with a specific recent title the agent represented",
  "Keep the query under 300 words — agents read hundreds weekly",
  "Lead with your hook, not your backstory",
  "Include comp titles published within the last 3 years",
  "State genre, word count, and title in the first paragraph",
];

const queryTemplate = `Dear [Agent Name],

I am seeking representation for [TITLE], a [GENRE] novel complete at [WORD COUNT] words. It will appeal to fans of [COMP TITLE 1] and [COMP TITLE 2].

[HOOK — One compelling sentence that captures the central conflict and stakes]

[PROTAGONIST NAME] is a [brief description] who [inciting incident]. When [escalation], they must [central conflict] before [ultimate stakes].

[Brief paragraph about the theme or what makes this book unique]

I am a [brief author bio]. [Previous publishing credits if any, or "This is my debut novel."]

Thank you for your time and consideration. I look forward to hearing from you.

[Your Name]
[Contact Info]`;

export default function AuthorSuitePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuery, setGeneratedQuery] = useState("");
  const [blurb, setBlurb] = useState("");
  const [activeAgent, setActiveAgent] = useState("query");

  const handleGenerate = async (type: string) => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1800));
    if (type === "query") {
      setGeneratedQuery(`Dear Ms. [Agent Name],

I am seeking representation for THE EMBER CHRONICLES, a YA Fantasy novel complete at 92,000 words. It will appeal to fans of Leigh Bardugo's Six of Crows and Holly Black's The Cruel Prince.

When seventeen-year-old Elara Voss discovers she can absorb the magic of the dying, she becomes the most wanted person in Ashenveil — by those who want to use her gift, and those who want to bury it.

After unwillingly draining the life-force of her mentor, Elara is forced to flee the Mage Council and enter an underground network of illegal spellcasters. When the Council begins hunting her through the city's forgotten tunnels, she must master her dangerous ability before it consumes her entirely — or before the Council executes her to keep their secrets safe.

THE EMBER CHRONICLES explores what it means to carry power you never asked for, and the cost of survival in a world that fears what it cannot control.

I am a debut novelist with a background in folklore studies. Thank you for your time and consideration.

Sincerely,
[Author Name]`);
    } else {
      setBlurb("In a city where rain hasn't fallen in forty days, Elara Voss is running out of time. A seventeen-year-old mage with a deadly secret — she can drain the life-force of others with a touch — she's spent years hiding what she is. But when she accidentally kills her mentor, Elara becomes Ashenveil's most wanted fugitive.\n\nForced into the city's criminal underground, hunted by the Council she once trusted, Elara must master her terrifying ability or become exactly the monster they've always feared.\n\nThe Ember Chronicles is a pulse-pounding YA fantasy about power, survival, and the price of being extraordinary in a world that punishes difference.");
    }
    setIsGenerating(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-wf-text">Author Suite</h1>
          <p className="text-sm text-wf-text-muted">Query letters, blurbs, marketing copy, and publishing tools.</p>
        </div>
        <Badge className="border-wf-accent/30 bg-wf-accent/10 text-wf-accent text-xs">
          <Sparkles className="h-3 w-3 mr-1" /> AI-Powered
        </Badge>
      </div>

      <Tabs value={activeAgent} onValueChange={setActiveAgent}>
        <TabsList className="h-9">
          <TabsTrigger value="query" className="text-xs gap-1"><Mail className="h-3.5 w-3.5" />Query Letter</TabsTrigger>
          <TabsTrigger value="blurb" className="text-xs gap-1"><BookOpen className="h-3.5 w-3.5" />Book Blurb</TabsTrigger>
          <TabsTrigger value="pitch" className="text-xs gap-1"><Send className="h-3.5 w-3.5" />Elevator Pitch</TabsTrigger>
          <TabsTrigger value="agents" className="text-xs gap-1"><Search className="h-3.5 w-3.5" />Agent Research</TabsTrigger>
          <TabsTrigger value="publishing" className="text-xs gap-1"><Globe className="h-3.5 w-3.5" />Publishing Guide</TabsTrigger>
        </TabsList>

        {/* Query Letter */}
        <TabsContent value="query" className="mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-4">
              <GlowCard className="p-4">
                <h3 className="mb-3 text-sm font-semibold text-wf-text flex items-center gap-2">
                  <FileText className="h-4 w-4 text-wf-accent" /> Query Letter Generator
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-[11px] text-wf-text-muted">Title</label>
                    <Input placeholder="The Ember Chronicles" className="h-8 text-xs" defaultValue="The Ember Chronicles" />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] text-wf-text-muted">Genre</label>
                    <Select defaultValue="ya-fantasy">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ya-fantasy">YA Fantasy</SelectItem>
                        <SelectItem value="adult-fantasy">Adult Fantasy</SelectItem>
                        <SelectItem value="literary">Literary Fiction</SelectItem>
                        <SelectItem value="thriller">Thriller</SelectItem>
                        <SelectItem value="romance">Romance</SelectItem>
                        <SelectItem value="sci-fi">Science Fiction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] text-wf-text-muted">Word Count</label>
                    <Input placeholder="92,000" defaultValue="92,000" className="h-8 text-xs" />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] text-wf-text-muted">Synopsis (brief)</label>
                    <Textarea placeholder="Your story in 2-3 sentences..." className="text-xs min-h-[80px]" defaultValue="Elara discovers she can drain the life-force of others and becomes hunted by the Mage Council." />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] text-wf-text-muted">Comp Titles</label>
                    <Input placeholder="Six of Crows, The Cruel Prince" className="h-8 text-xs" />
                  </div>
                  <Button className="w-full bg-wf-accent hover:bg-wf-accent-soft text-white text-xs h-8" onClick={() => handleGenerate("query")} disabled={isGenerating}>
                    {isGenerating ? <><Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />Generating...</> : <><Wand2 className="h-3.5 w-3.5 mr-1.5" />Generate Query Letter</>}
                  </Button>
                </div>
              </GlowCard>

              <GlowCard className="p-4">
                <h3 className="mb-3 text-sm font-semibold text-wf-text flex items-center gap-2">
                  <Star className="h-4 w-4 text-wf-accent" /> Pro Tips
                </h3>
                <ul className="space-y-2">
                  {agentTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-wf-text-muted">
                      <ChevronRight className="h-3 w-3 shrink-0 mt-0.5 text-wf-accent" /> {tip}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </div>

            <div className="lg:col-span-2">
              <GlowCard className="h-full p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-wf-text">
                    {generatedQuery ? "AI-Generated Query Letter" : "Query Letter Template"}
                  </h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs border-wf-border" onClick={() => {}}>
                      <Copy className="h-3 w-3 mr-1" /> Copy
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs border-wf-border">
                      <Download className="h-3 w-3 mr-1" /> Export
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={generatedQuery || queryTemplate}
                  onChange={() => {}}
                  className="min-h-[420px] font-mono text-xs text-wf-text leading-relaxed bg-wf-panel-elevated border-wf-border"
                  readOnly={!generatedQuery}
                />
                {generatedQuery && (
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" className="bg-wf-accent hover:bg-wf-accent-soft text-white text-xs h-7">
                      <Award className="h-3 w-3 mr-1" /> Rate This Letter
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs h-7 border-wf-border text-wf-text-muted">
                      Regenerate Variation
                    </Button>
                  </div>
                )}
              </GlowCard>
            </div>
          </div>
        </TabsContent>

        {/* Blurb */}
        <TabsContent value="blurb" className="mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div>
              <GlowCard className="p-4">
                <h3 className="mb-3 text-sm font-semibold text-wf-text">Blurb Generator</h3>
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-[11px] text-wf-text-muted">Target Platform</label>
                    <Select defaultValue="amazon">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amazon">Amazon KDP</SelectItem>
                        <SelectItem value="goodreads">Goodreads</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="back-cover">Back Cover</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] text-wf-text-muted">Tone</label>
                    <Select defaultValue="cinematic">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cinematic">Cinematic & Tense</SelectItem>
                        <SelectItem value="lyrical">Lyrical & Literary</SelectItem>
                        <SelectItem value="punchy">Punchy & Commercial</SelectItem>
                        <SelectItem value="emotional">Emotional & Character-driven</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-wf-accent hover:bg-wf-accent-soft text-white text-xs h-8" onClick={() => handleGenerate("blurb")} disabled={isGenerating}>
                    {isGenerating ? <><Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />Generating...</> : <><Wand2 className="h-3.5 w-3.5 mr-1.5" />Generate Blurb</>}
                  </Button>
                </div>
              </GlowCard>
            </div>
            <div className="lg:col-span-2">
              <GlowCard className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-wf-text">Generated Blurb</h3>
                  <Button variant="outline" size="sm" className="h-7 text-xs border-wf-border"><Copy className="h-3 w-3 mr-1" /> Copy</Button>
                </div>
                <Textarea
                  value={blurb || "Configure your blurb settings and click Generate to create compelling marketing copy for your book."}
                  readOnly
                  className="min-h-[200px] text-sm text-wf-text leading-relaxed bg-wf-panel-elevated border-wf-border"
                />
              </GlowCard>
            </div>
          </div>
        </TabsContent>

        {/* Elevator Pitch */}
        <TabsContent value="pitch" className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "One-Line Hook", content: "A teenage mage who kills with her touch must master her deadly gift before the government that hunts her discovers her greatest secret.", chars: 140 },
              { label: "Twitter/X Pitch", content: "When 17yo mage Elara accidentally kills her mentor, she becomes hunted by the same Council she swore to protect. Now she must master her illegal gift — or become the monster they fear.\n\n#PitMad #YAFantasy #TheEmberChronicles", chars: 280 },
              { label: "Agent Pitch (30 sec)", content: "The Ember Chronicles is a YA Fantasy about Elara Voss, a seventeen-year-old mage who can drain life-force with a touch. When she kills her mentor and becomes the Council's most wanted fugitive, she must master her terrifying ability before it destroys her.", chars: 320 },
            ].map(({ label, content, chars }) => (
              <GlowCard key={label} className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-wf-text">{label}</h3>
                  <Badge variant="secondary" className="text-[10px]">{chars} chars</Badge>
                </div>
                <p className="text-xs text-wf-text-muted leading-relaxed whitespace-pre-line">{content}</p>
                <Button variant="ghost" size="sm" className="mt-2 w-full text-[10px] text-wf-accent h-6"><Copy className="h-3 w-3 mr-1" /> Copy</Button>
              </GlowCard>
            ))}
          </div>
        </TabsContent>

        {/* Agent Research */}
        <TabsContent value="agents" className="mt-4">
          <GlowCard className="p-6 text-center">
            <Search className="h-10 w-10 mx-auto mb-3 text-wf-accent opacity-60" />
            <h3 className="text-sm font-semibold text-wf-text mb-2">Agent & Publisher Database</h3>
            <p className="text-xs text-wf-text-muted max-w-sm mx-auto mb-4">Connect with QueryTracker, AgentQuery, and Publisher databases to find your perfect agent match based on genre, recent deals, and wishlist.</p>
            <Button className="bg-wf-accent hover:bg-wf-accent-soft text-white text-xs">
              <Search className="h-3.5 w-3.5 mr-1.5" /> Search Agents (Coming Soon)
            </Button>
          </GlowCard>
        </TabsContent>

        {/* Publishing Guide */}
        <TabsContent value="publishing" className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Traditional Publishing", desc: "Find agents, submit query letters, work with Big 5 publishers. Longer timeline, higher advance potential.", icon: "🏛️", steps: ["Write query letter", "Research agents", "Submit to 10-20 agents", "Sign with agent", "Go on submission to publishers"] },
              { title: "Self-Publishing (KDP)", desc: "Publish directly on Amazon. Keep 70% royalties, full creative control, faster to market.", icon: "📦", steps: ["Format manuscript (Vellum)", "Design cover (canva/hire)", "Set up KDP account", "Price strategically", "Launch with ARC readers"] },
              { title: "Hybrid Publishing", desc: "Use a hybrid publisher for distribution while retaining some creative control.", icon: "⚡", steps: ["Research hybrid publishers", "Compare contracts carefully", "Submit manuscript", "Negotiate terms", "Build your audience"] },
            ].map(({ title, desc, icon, steps }) => (
              <GlowCard key={title} className="p-4">
                <div className="mb-3">
                  <span className="text-2xl">{icon}</span>
                  <h3 className="mt-2 text-sm font-semibold text-wf-text">{title}</h3>
                  <p className="mt-1 text-[11px] text-wf-text-muted leading-relaxed">{desc}</p>
                </div>
                <ul className="space-y-1.5">
                  {steps.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] text-wf-text-muted">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-wf-accent/20 text-[9px] font-bold text-wf-accent">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
