"use client";
import React, { useState } from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { LoreEntryCard } from "@/components/worldbuilding/LoreEntryCard";
import { WorldMap } from "@/components/worldbuilding/WorldMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, MapPin, BookOpen, Zap, Clock, Users, Wand2, Plus, Search, ChevronRight } from "lucide-react";
import type { LoreEntry } from "@/types";

const mockLoreEntries: LoreEntry[] = [
  { id: "l1", novel_id: "n1", category: "magic_system", title: "The Ember Weave", content: "The Ember Weave is the fundamental force underlying all magical practice in Ashenveil. Unlike traditional mana systems, it draws from emotional energy rather than physical stamina. A mage who feels deeply can accomplish more than one who trains hard. The rarest gift — Absorption — allows practitioners to pull the Weave from others, potentially draining their life-force in the process.", tags: ["magic", "core-system", "dangerous"], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), created_by: "u1", deleted_at: null },
  { id: "l2", novel_id: "n1", category: "location", title: "Ashenveil", content: "A walled desert city of 200,000 souls built over the ruins of the old Emberfort. Governed by the Mage Council. The city is divided into eleven sectors, with Sector 1 (the Citadel) at the top and Sector 11 (the Dust Quarter) at the bottom. Water is strictly rationed. The last rain fell forty days ago.", tags: ["city", "setting", "central"], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), created_by: "u1", deleted_at: null },
  { id: "l3", novel_id: "n1", category: "faction", title: "The Mage Council", content: "The ruling body of Ashenveil, composed of twelve Elder Mages. Controls water distribution, enforces magical law, and decides who receives formal Weave training. Known for ruthlessness in suppressing unauthorized magic use. Currently under pressure as water supplies dwindle.", tags: ["government", "antagonist", "politics"], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), created_by: "u1", deleted_at: null },
  { id: "l4", novel_id: "n1", category: "history", title: "The Ember Wars (120 years prior)", content: "A series of magical conflicts that devastated the continent and created the Dust Wastes surrounding Ashenveil. The wars ended when the last great Absorber — known as the Hollow King — was sealed away by the original Mage Council founders. The sealing required sacrificing twelve master mages. The mechanism of the seal is now lost knowledge.", tags: ["history", "backstory", "lore"], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), created_by: "u1", deleted_at: null },
];

const categories = [
  { id: "all", label: "All Entries", icon: BookOpen },
  { id: "magic_system", label: "Magic System", icon: Zap },
  { id: "location", label: "Locations", icon: MapPin },
  { id: "faction", label: "Factions", icon: Users },
  { id: "history", label: "History", icon: Clock },
  { id: "culture", label: "Culture", icon: Globe },
];

export default function WorldbuildingPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockLoreEntries.filter((e) => {
    const matchCat = activeCategory === "all" || e.category === activeCategory;
    const matchSearch = !searchQuery || e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-wf-border px-6 py-3">
        <div>
          <h1 className="text-lg font-bold text-wf-text">Worldbuilding System</h1>
          <p className="text-xs text-wf-text-muted">Build your world bible — locations, lore, factions, history, and magic systems.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="text-xs border-wf-border text-wf-text-muted hover:border-wf-accent hover:text-wf-accent h-8">
            <Wand2 className="h-3 w-3 mr-1.5" /> AI World Builder
          </Button>
          <Button size="sm" className="bg-wf-accent hover:bg-wf-accent-soft text-white text-xs h-8">
            <Plus className="h-3 w-3 mr-1.5" /> New Entry
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-52 shrink-0 overflow-y-auto border-r border-wf-border bg-wf-panel scrollbar-thin">
          <div className="p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-wf-text-muted">Categories</p>
            <div className="space-y-0.5">
              {categories.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs transition-colors ${activeCategory === id ? "bg-wf-accent/15 text-wf-accent" : "text-wf-text-muted hover:bg-wf-panel-elevated hover:text-wf-text"}`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {label}
                  <span className="ml-auto text-[10px] opacity-60">
                    {id === "all" ? mockLoreEntries.length : mockLoreEntries.filter((e) => e.category === id).length}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-wf-border">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-wf-text-muted">Quick Tools</p>
              {[
                { label: "Name Generator", icon: Zap },
                { label: "Timeline View", icon: Clock },
                { label: "World Map", icon: MapPin },
                { label: "Export World Bible", icon: BookOpen },
              ].map(({ label, icon: Icon }) => (
                <button key={label} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-wf-text-muted hover:bg-wf-panel-elevated hover:text-wf-text transition-colors">
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {label}
                  <ChevronRight className="ml-auto h-3 w-3 opacity-50" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Tabs defaultValue="entries" className="flex flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-wf-border px-4 py-2">
              <TabsList className="h-8">
                <TabsTrigger value="entries" className="text-xs h-7 gap-1"><BookOpen className="h-3 w-3" />Lore Entries</TabsTrigger>
                <TabsTrigger value="map" className="text-xs h-7 gap-1"><Globe className="h-3 w-3" />World Map</TabsTrigger>
                <TabsTrigger value="timeline" className="text-xs h-7 gap-1"><Clock className="h-3 w-3" />Timeline</TabsTrigger>
              </TabsList>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-wf-text-muted" />
                <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search lore..." className="h-7 pl-7 text-xs w-48" />
              </div>
            </div>

            <TabsContent value="entries" className="flex-1 overflow-y-auto scrollbar-thin p-4">
              {filtered.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-wf-text-muted">No entries found. Try adjusting your search.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((entry) => (
                    <LoreEntryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="map" className="flex-1 overflow-hidden">
              <WorldMap />
            </TabsContent>

            <TabsContent value="timeline" className="flex-1 overflow-y-auto scrollbar-thin p-4">
              <div className="space-y-3">
                {[
                  { year: "Year -120", event: "The Ember Wars begin across the continent", type: "historical" },
                  { year: "Year -100", event: "The Hollow King rises to power", type: "antagonist" },
                  { year: "Year -95", event: "The Sealing: 12 Elder Mages sacrifice themselves", type: "pivotal" },
                  { year: "Year -94", event: "The Mage Council is founded", type: "political" },
                  { year: "Year -90", event: "Ashenveil is formally declared an independent city-state", type: "political" },
                  { year: "Year 0 (Present)", event: "Story begins. No rain in 40 days. Water crisis.", type: "current" },
                ].map(({ year, event, type }) => (
                  <div key={year} className="flex items-start gap-4">
                    <div className="w-28 shrink-0 text-right">
                      <span className="text-xs font-mono text-wf-accent">{year}</span>
                    </div>
                    <div className="relative flex flex-col items-center">
                      <div className={`h-3 w-3 rounded-full border-2 ${type === "current" ? "border-wf-accent bg-wf-accent animate-pulse" : "border-wf-border bg-wf-panel"}`} />
                      <div className="w-0.5 flex-1 bg-wf-border mt-1" />
                    </div>
                    <GlowCard className={`flex-1 p-3 mb-2 ${type === "current" ? "border-wf-accent/40 bg-wf-accent/5" : ""}`}>
                      <p className="text-xs text-wf-text">{event}</p>
                      <Badge variant="secondary" className="mt-1 text-[9px] capitalize">{type}</Badge>
                    </GlowCard>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
