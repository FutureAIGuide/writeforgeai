"use client";
import React, { useState } from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image, Film, Music, Palette, Download, Wand2, Loader2, Plus, Star } from "lucide-react";

const mockCovers = [
  { id: "1", style: "Epic Fantasy", gradient: "from-orange-950 to-black", accent: "#FF6A00", title: "The Ember Chronicles" },
  { id: "2", style: "Dark Academia", gradient: "from-slate-950 to-slate-800", accent: "#60A5FA", title: "The Ember Chronicles" },
  { id: "3", style: "Minimalist", gradient: "from-zinc-900 to-zinc-950", accent: "#A78BFA", title: "The Ember Chronicles" },
  { id: "4", style: "Cinematic", gradient: "from-red-950 to-zinc-950", accent: "#F87171", title: "The Ember Chronicles" },
];

export default function MediaStudioPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCover, setSelectedCover] = useState("1");

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsGenerating(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-wf-text">Media Studio</h1>
          <p className="text-sm text-wf-text-muted">Create promotional assets, book covers, trailers, and marketing materials.</p>
        </div>
        <Badge className="border-wf-accent/30 bg-wf-accent/10 text-wf-accent text-xs">
          <Star className="h-3 w-3 mr-1" /> AI-Powered
        </Badge>
      </div>

      <Tabs defaultValue="covers">
        <TabsList>
          <TabsTrigger value="covers" className="text-xs gap-1.5"><Image className="h-3.5 w-3.5" />Book Covers</TabsTrigger>
          <TabsTrigger value="characters" className="text-xs gap-1.5"><Palette className="h-3.5 w-3.5" />Character Art</TabsTrigger>
          <TabsTrigger value="trailer" className="text-xs gap-1.5"><Film className="h-3.5 w-3.5" />Book Trailer</TabsTrigger>
          <TabsTrigger value="social" className="text-xs gap-1.5"><Star className="h-3.5 w-3.5" />Social Assets</TabsTrigger>
          <TabsTrigger value="music" className="text-xs gap-1.5"><Music className="h-3.5 w-3.5" />Ambience</TabsTrigger>
        </TabsList>

        {/* Book Covers */}
        <TabsContent value="covers" className="mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-4">
              <GlowCard className="p-4">
                <h3 className="mb-3 text-sm font-semibold text-wf-text">Cover Configuration</h3>
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-[11px] text-wf-text-muted">Title</label>
                    <Input defaultValue="The Ember Chronicles" className="h-8 text-xs" />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] text-wf-text-muted">Subtitle / Series</label>
                    <Input placeholder="Book 1" className="h-8 text-xs" />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] text-wf-text-muted">Genre Style</label>
                    <Select defaultValue="fantasy">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fantasy">Epic Fantasy</SelectItem>
                        <SelectItem value="ya">YA Fantasy</SelectItem>
                        <SelectItem value="thriller">Dark Thriller</SelectItem>
                        <SelectItem value="romance">Romantic Fantasy</SelectItem>
                        <SelectItem value="literary">Literary Fiction</SelectItem>
                        <SelectItem value="scifi">Sci-Fi</SelectItem>
                        <SelectItem value="horror">Horror</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] text-wf-text-muted">Visual Description</label>
                    <Textarea placeholder="Describe what you envision for the cover..." className="text-xs min-h-[80px]" defaultValue="Dark city at night, a figure with glowing hands standing at the edge of a crumbling tower. Orange ember light. Moody and cinematic." />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] text-wf-text-muted">Color Palette</label>
                    <div className="flex gap-2 mt-1">
                      {["#FF6A00", "#1a1a2e", "#4a0e0e", "#0d1b2a", "#2d1b4e"].map((c) => (
                        <button key={c} className="h-6 w-6 rounded-full border-2 border-wf-border hover:border-wf-accent transition-all" style={{ background: c }} />
                      ))}
                      <button className="h-6 w-6 rounded-full border-2 border-dashed border-wf-border flex items-center justify-center">
                        <Plus className="h-3 w-3 text-wf-text-muted" />
                      </button>
                    </div>
                  </div>
                  <Button className="w-full bg-wf-accent hover:bg-wf-accent-soft text-white text-xs h-8" onClick={handleGenerate} disabled={isGenerating}>
                    {isGenerating ? <><Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />Generating Covers...</> : <><Wand2 className="h-3.5 w-3.5 mr-1.5" />Generate 4 Covers</>}
                  </Button>
                </div>
              </GlowCard>
              <GlowCard className="p-4">
                <h3 className="mb-2 text-xs font-semibold text-wf-text">Export Options</h3>
                <div className="space-y-2">
                  {[{ label: "Amazon KDP (2560×1600)", key: "kdp" }, { label: "Kindle Ebook (1600×2560)", key: "kindle" }, { label: "Print 6×9 (300 DPI)", key: "print" }, { label: "Social 1200×1200", key: "social" }].map(({ label, key }) => (
                    <button key={key} className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-[11px] text-wf-text-muted hover:bg-wf-panel-elevated hover:text-wf-text transition-colors">
                      <span>{label}</span>
                      <Download className="h-3 w-3" />
                    </button>
                  ))}
                </div>
              </GlowCard>
            </div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                {mockCovers.map((cover) => (
                  <button
                    key={cover.id}
                    onClick={() => setSelectedCover(cover.id)}
                    className={`relative overflow-hidden rounded-xl border-2 transition-all ${selectedCover === cover.id ? "border-wf-accent shadow-[0_0_20px_rgba(255,106,0,0.3)]" : "border-wf-border hover:border-wf-accent/50"}`}
                  >
                    <div className={`bg-gradient-to-b ${cover.gradient} h-64 flex flex-col items-center justify-end p-4`}>
                      {/* Simulated cover decoration */}
                      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full opacity-40 blur-xl" style={{ background: cover.accent }} />
                      <div className="relative z-10 text-center">
                        <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: cover.accent }}>
                          {cover.style}
                        </p>
                        <p className="text-sm font-bold text-white leading-tight">{cover.title}</p>
                      </div>
                    </div>
                    {selectedCover === cover.id && (
                      <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-wf-accent flex items-center justify-center">
                        <Star className="h-3 w-3 text-white fill-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex gap-3 justify-end">
                <Button variant="outline" size="sm" className="text-xs border-wf-border text-wf-text-muted">Customize Selected</Button>
                <Button size="sm" className="bg-wf-accent hover:bg-wf-accent-soft text-white text-xs">
                  <Download className="h-3.5 w-3.5 mr-1.5" /> Export Cover
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Character Art */}
        <TabsContent value="characters" className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Elara Voss", desc: "Copper hair, glowing hands, determined expression, fantasy attire", color: "from-orange-950" },
              { name: "Kayn Ashveil", desc: "Dark hair, shadowed eyes, mysterious, court fashion", color: "from-slate-900" },
              { name: "Mira Sunwhisper", desc: "Half-elf, lavender scent, road-worn traveler, gentle", color: "from-violet-950" },
              { name: "The Council Elder", desc: "Ancient mage, robes, commanding, cold authority", color: "from-zinc-900" },
            ].map(({ name, desc, color }) => (
              <GlowCard key={name} className="overflow-hidden p-0">
                <div className={`bg-gradient-to-b ${color} to-black h-40 flex items-center justify-center`}>
                  <div className="text-4xl opacity-60">👤</div>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-wf-text mb-1">{name}</p>
                  <p className="text-[10px] text-wf-text-muted leading-relaxed mb-2">{desc}</p>
                  <Button size="sm" className="w-full bg-wf-accent/20 hover:bg-wf-accent/30 text-wf-accent text-[10px] h-6 border border-wf-accent/30">
                    <Wand2 className="h-2.5 w-2.5 mr-1" /> Generate Art
                  </Button>
                </div>
              </GlowCard>
            ))}
          </div>
        </TabsContent>

        {/* Book Trailer */}
        <TabsContent value="trailer" className="mt-4">
          <GlowCard className="p-8 text-center">
            <Film className="h-12 w-12 mx-auto mb-4 text-wf-accent opacity-70" />
            <h3 className="text-base font-semibold text-wf-text mb-2">Book Trailer Generator</h3>
            <p className="text-sm text-wf-text-muted max-w-md mx-auto mb-6">
              Generate a cinematic book trailer using AI-generated scenes, atmospheric music, and dramatic text overlays — no video editing experience required.
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-6">
              {["Scene Images", "Voiceover Script", "Background Music"].map((step, i) => (
                <div key={step} className="rounded-lg border border-wf-border bg-wf-panel p-3 text-center">
                  <span className="text-lg font-bold text-wf-accent">{i + 1}</span>
                  <p className="text-[10px] text-wf-text-muted mt-1">{step}</p>
                </div>
              ))}
            </div>
            <Button className="bg-wf-accent hover:bg-wf-accent-soft text-white">
              <Film className="h-4 w-4 mr-2" /> Create Book Trailer
            </Button>
          </GlowCard>
        </TabsContent>

        {/* Social Assets */}
        <TabsContent value="social" className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { platform: "Instagram Post", size: "1080×1080", icon: "📸" },
              { platform: "Twitter/X Banner", size: "1500×500", icon: "🐦" },
              { platform: "TikTok Cover", size: "1080×1920", icon: "🎵" },
              { platform: "Facebook Cover", size: "820×312", icon: "👥" },
              { platform: "Newsletter Header", size: "600×200", icon: "📧" },
              { platform: "ARC Announcement", size: "1200×630", icon: "📢" },
            ].map(({ platform, size, icon }) => (
              <GlowCard key={platform} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-wf-text">{platform}</p>
                    <p className="text-[10px] text-wf-text-muted">{size}</p>
                  </div>
                </div>
                <Button size="sm" className="w-full bg-wf-accent/15 hover:bg-wf-accent/25 text-wf-accent text-xs h-7 border border-wf-accent/20">
                  <Wand2 className="h-3 w-3 mr-1" /> Generate
                </Button>
              </GlowCard>
            ))}
          </div>
        </TabsContent>

        {/* Ambience Music */}
        <TabsContent value="music" className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Dark Fantasy", desc: "Ominous strings, distant drums, eerie atmosphere", emoji: "🌑", playing: false },
              { name: "Epic Battle", desc: "Orchestral swells, percussion, cinematic tension", emoji: "⚔️", playing: false },
              { name: "Quiet Study", desc: "Ambient rain, soft piano, focus-enhancing", emoji: "🌧️", playing: true },
              { name: "Magic Awakening", desc: "Ethereal pads, choir, mysterious wonder", emoji: "✨", playing: false },
              { name: "Romance", desc: "Soft strings, warm tones, emotional depth", emoji: "💫", playing: false },
              { name: "Chase Scene", desc: "Fast percussion, urgent strings, tension", emoji: "🏃", playing: false },
              { name: "Tavern Night", desc: "Lute, crowd murmur, warm medieval ambience", emoji: "🍺", playing: false },
              { name: "Dawn Breaking", desc: "Hopeful, gentle crescendo, new beginning", emoji: "🌅", playing: false },
            ].map(({ name, desc, emoji, playing }) => (
              <GlowCard key={name} className={`p-4 cursor-pointer transition-all ${playing ? "border-wf-accent bg-wf-accent/5" : ""}`}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xl">{emoji}</span>
                  {playing && <Badge className="text-[9px] bg-wf-accent/20 text-wf-accent border-wf-accent/30">Playing</Badge>}
                </div>
                <p className="text-xs font-semibold text-wf-text mb-1">{name}</p>
                <p className="text-[10px] text-wf-text-muted leading-relaxed">{desc}</p>
              </GlowCard>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
