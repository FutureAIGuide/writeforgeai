"use client";
import React, { useState } from "react";
import { LoreEntryCard } from "@/components/worldbuilding/LoreEntryCard";
import { WorldMap } from "@/components/worldbuilding/WorldMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { LoreEntry } from "@/types";

const mockLore: LoreEntry[] = [
  { id: "1", novel_id: "n1", category: "Magic", title: "The Ember Arts", content: "Magic in Ashenveil is drawn from emotional resonance. Practitioners, known as Embers, channel raw feeling—grief, joy, rage—into tangible force. The stronger the emotion, the greater the power, but prolonged use erodes the mage's capacity to feel.", tags: ["magic", "world", "core"], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), created_by: "u1", deleted_at: null },
  { id: "2", novel_id: "n1", category: "Geography", title: "Ashenveil City", content: "A city built on three levels: the Highground for nobles and merchants, the Midring for tradespeople, and the Lowbowl for laborers and criminals. The ancient aqueduct system, now crumbling, once brought water from the Crystalmere glaciers.", tags: ["city", "setting", "geography"], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), created_by: "u1", deleted_at: null },
  { id: "3", novel_id: "n1", category: "Factions", title: "The Shadowhand", content: "The Emperor's elite intelligence and assassination force, established 200 years ago. Members are taken as children and trained from birth. Loyalty is absolute, enforced through a magical binding that causes physical pain upon disobedience.", tags: ["faction", "antagonist", "empire"], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), created_by: "u1", deleted_at: null },
];

export default function WorldbuildingPage() {
  const [query, setQuery] = useState("");
  const filtered = mockLore.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-wf-text">Worldbuilding</h1>
        <p className="text-sm text-wf-text-muted">Build your world&apos;s lore, geography, and history.</p>
      </div>
      <Tabs defaultValue="lore">
        <TabsList>
          <TabsTrigger value="lore">Lore Entries</TabsTrigger>
          <TabsTrigger value="map">World Map</TabsTrigger>
        </TabsList>
        <TabsContent value="lore" className="mt-4">
          <div className="mb-4 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-wf-text-muted" />
              <Input placeholder="Search lore..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Add Entry</Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e) => <LoreEntryCard key={e.id} entry={e} />)}
          </div>
        </TabsContent>
        <TabsContent value="map" className="mt-4">
          <WorldMap />
        </TabsContent>
      </Tabs>
    </div>
  );
}
