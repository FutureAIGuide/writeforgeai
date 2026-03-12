"use client";
import React, { useState } from "react";
import { CharacterCard } from "./CharacterCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/shared/EmptyState";
import { Users, Plus, Search } from "lucide-react";
import type { Character } from "@/types";

const mockCharacters: Character[] = [
  { id: "1", novel_id: "n1", name: "Elara Voss", role: "protagonist", description: "A disgraced mage seeking redemption in a world that has forgotten magic.", motivation: "Restore her family's honor", wound: "Caused the death of her mentor", fear: "Losing control of her power", secret: "She absorbs magic from living things", arc_stage: "Refusal of the Call", backstory: null, voice_profile: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), created_by: "u1", deleted_at: null },
  { id: "2", novel_id: "n1", name: "Kayn Drell", role: "antagonist", description: "The Emperor's Shadowhand, raised from birth to be the perfect assassin.", motivation: "Fulfill his duty to the Emperor", wound: "Watched his family be executed for treason", fear: "Being seen as human", secret: "He's been protecting Elara in secret", arc_stage: "Corruption", backstory: null, voice_profile: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), created_by: "u1", deleted_at: null },
  { id: "3", novel_id: "n1", name: "Mira Sunwhisper", role: "supporting", description: "A half-elf herbalist who serves as Elara's guide in the northern territories.", motivation: "Find her missing brother", wound: "Abandoned by her elven kin", fear: "Commitment", secret: "She can speak to the dead", arc_stage: "Rising", backstory: null, voice_profile: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), created_by: "u1", deleted_at: null },
];

interface CharacterRosterProps {
  characters?: Character[];
  onAdd?: () => void;
}

export function CharacterRoster({ characters = mockCharacters, onAdd }: CharacterRosterProps) {
  const [query, setQuery] = useState("");
  const filtered = characters.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-wf-text-muted" />
          <Input
            placeholder="Search characters..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button size="sm" onClick={onAdd}>
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Add Character
        </Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Users className="h-8 w-8" />}
          title="No characters yet"
          description="Start building your cast of characters."
          action={{ label: "Add First Character", onClick: () => onAdd?.() }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => <CharacterCard key={c.id} character={c} />)}
        </div>
      )}
    </div>
  );
}
