"use client";
import React, { useState } from "react";
import { CharacterRoster } from "@/components/characters/CharacterRoster";
import { RelationshipMap } from "@/components/characters/RelationshipMap";
import { StoryCodex } from "@/components/characters/StoryCodex";
import { GlowCard } from "@/components/shared/GlowCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Globe, Network, Plus, Sparkles } from "lucide-react";

export default function CharactersPage() {
  const [selectedNode, setSelectedNode] = useState<{ id: string; label: string; type: string; description?: string } | null>(null);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-wf-border px-6 py-3">
        <div>
          <h1 className="text-lg font-bold text-wf-text">Character Studio</h1>
          <p className="text-xs text-wf-text-muted">Build, manage, and explore your cast of characters.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="text-xs border-wf-border text-wf-text-muted hover:border-wf-accent hover:text-wf-accent h-8">
            <Sparkles className="h-3 w-3 mr-1.5" /> AI Character Interview
          </Button>
          <Button size="sm" className="bg-wf-accent hover:bg-wf-accent-soft text-white text-xs h-8">
            <Plus className="h-3 w-3 mr-1.5" /> New Character
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className="w-64 shrink-0 overflow-y-auto border-r border-wf-border scrollbar-thin">
          <div className="p-3">
            <div className="mb-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-wf-text-muted flex items-center gap-1">
                <Users className="h-3 w-3" /> Character Profiles
              </p>
              {[
                { name: "Kaelen", sub: "Protagonist", icon: "🧭" },
                { name: "Lyra", sub: "Literary Critic", icon: "⭐", active: true },
                { name: "Aethel", sub: "Antagonist", icon: "👑" },
                { name: "Amro", sub: "Supporting", icon: "🔍" },
              ].map(({ name, sub, icon, active }) => (
                <div key={name} className={`mb-1 flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition-colors ${active ? "bg-wf-accent/15 text-wf-accent" : "text-wf-text-muted hover:bg-wf-panel-elevated hover:text-wf-text"}`}>
                  <span className="text-sm">{icon}</span>
                  <div>
                    <p className="text-xs font-medium text-wf-text">{name}</p>
                    <p className="text-[10px]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-wf-text-muted flex items-center gap-1">
                <Globe className="h-3 w-3" /> Lore Entries
              </p>
              {[
                { name: "Character Profiles", sub: "Character Profiles", icon: "📋" },
                { name: "Lore Entries", sub: "Lore Entries", icon: "📚" },
                { name: "Lore Entries", sub: "Lore Entries", icon: "📜" },
              ].map(({ name, sub, icon }, i) => (
                <div key={i} className="mb-1 flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-wf-text-muted hover:bg-wf-panel-elevated hover:text-wf-text transition-colors">
                  <span className="text-sm">{icon}</span>
                  <div>
                    <p className="text-xs font-medium text-wf-text">{name}</p>
                    <p className="text-[10px]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Tabs defaultValue="codex" className="flex flex-1 flex-col">
            <div className="border-b border-wf-border px-4">
              <TabsList className="h-10">
                <TabsTrigger value="codex" className="text-xs gap-1.5">
                  <Network className="h-3.5 w-3.5" /> Story Codex
                </TabsTrigger>
                <TabsTrigger value="roster" className="text-xs gap-1.5">
                  <Users className="h-3.5 w-3.5" /> Roster
                </TabsTrigger>
                <TabsTrigger value="relationships" className="text-xs gap-1.5">
                  <Globe className="h-3.5 w-3.5" /> Relationships
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="codex" className="flex-1 overflow-hidden m-0 data-[state=active]:flex data-[state=active]:flex-col">
              <div className="flex flex-1 overflow-hidden">
                {/* The graph */}
                <div className="flex-1 relative">
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
                    <h2 className="text-xl font-bold text-wf-text">Story Codex</h2>
                    <p className="text-[10px] text-wf-text-muted">Interactive 3D animal knowledge graph, of their novel.</p>
                  </div>
                  <StoryCodex onNodeSelect={(n) => setSelectedNode(n)} />
                </div>

                {/* Inspector panel */}
                <div className="w-56 shrink-0 border-l border-wf-border bg-wf-panel-elevated p-3 text-[11px] overflow-y-auto scrollbar-thin">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-semibold text-wf-text text-xs">Inspector Panel</span>
                    <span className="font-mono text-wf-text-muted text-[10px]">#181818</span>
                  </div>
                  <p className="text-wf-text-muted text-[10px] mb-3">Quick view node information</p>

                  {selectedNode ? (
                    <div className="space-y-2">
                      <GlowCard className="p-2.5">
                        <p className="text-wf-text-muted mb-0.5">Node</p>
                        <p className="font-semibold text-wf-accent">{selectedNode.label}</p>
                      </GlowCard>
                      <GlowCard className="p-2.5">
                        <p className="text-wf-text-muted mb-0.5">Type</p>
                        <p className="font-semibold text-wf-text capitalize">{selectedNode.type}</p>
                      </GlowCard>
                      {selectedNode.description && (
                        <GlowCard className="p-2.5">
                          <p className="text-wf-text-muted mb-0.5">Description</p>
                          <p className="text-wf-text leading-relaxed">{selectedNode.description}</p>
                        </GlowCard>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <GlowCard className="p-2.5">
                        <p className="text-wf-text-muted mb-0.5">Node</p>
                        <p className="font-semibold text-wf-accent">Kaelen</p>
                      </GlowCard>
                      <GlowCard className="p-2.5">
                        <p className="text-wf-text-muted mb-0.5">Characters</p>
                        <p className="font-semibold text-wf-text">JetBrains Mono</p>
                      </GlowCard>
                      <GlowCard className="p-2.5">
                        <p className="text-wf-text-muted mb-0.5">Connections</p>
                        <p className="font-semibold text-wf-text">8 active links</p>
                      </GlowCard>
                    </div>
                  )}

                  <div className="mt-4 space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-wf-text-muted flex items-center gap-1">
                      <Sparkles className="h-2.5 w-2.5" /> AI generated suggestions
                    </p>
                    <div className="rounded-lg border border-wf-border bg-wf-panel p-2 text-[10px] text-wf-text-muted leading-relaxed">
                      Expand lore consistency or shape complete lore consistency.
                    </div>
                    <div className="rounded-lg border border-wf-border bg-wf-panel p-2 text-[10px] text-wf-text-muted leading-relaxed">
                      Identify character contradictions to identify AI character relates to entire characters.
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="roster" className="flex-1 overflow-y-auto p-4">
              <CharacterRoster />
            </TabsContent>
            <TabsContent value="relationships" className="flex-1 overflow-y-auto p-4">
              <RelationshipMap />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
