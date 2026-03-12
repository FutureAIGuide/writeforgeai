"use client";
import React from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, User } from "lucide-react";
import type { Character } from "@/types";
import { truncate } from "@/lib/utils";

interface CharacterCardProps {
  character: Character;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const roleColors: Record<string, string> = {
  protagonist: "bg-blue-500",
  antagonist: "bg-red-500",
  supporting: "bg-purple-500",
  minor: "bg-gray-500",
};

const roleBadge: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
  protagonist: "default",
  antagonist: "destructive",
  supporting: "secondary",
  minor: "outline",
};

export function CharacterCard({ character, onEdit, onDelete }: CharacterCardProps) {
  const bg = roleColors[character.role] ?? "bg-wf-accent";
  return (
    <GlowCard className="p-4">
      <div className="mb-3 flex items-start gap-3">
        <Avatar className="h-12 w-12">
          <AvatarFallback className={`${bg} text-white text-base font-bold`}>
            {character.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-wf-text">{character.name}</h3>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit?.(character.id)}>
                <Edit className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-wf-danger" onClick={() => onDelete?.(character.id)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Badge variant={roleBadge[character.role]} className="mt-1 text-[10px]">
            {character.role.charAt(0).toUpperCase() + character.role.slice(1)}
          </Badge>
        </div>
      </div>

      {character.description && (
        <p className="mb-2 text-xs text-wf-text-muted leading-relaxed">
          {truncate(character.description, 100)}
        </p>
      )}

      <div className="mt-3 grid grid-cols-2 gap-2">
        {character.motivation && (
          <div className="rounded-md bg-wf-panel-elevated p-2">
            <p className="text-[10px] font-semibold uppercase text-wf-text-muted">Motivation</p>
            <p className="text-xs text-wf-text">{truncate(character.motivation, 50)}</p>
          </div>
        )}
        {character.fear && (
          <div className="rounded-md bg-wf-panel-elevated p-2">
            <p className="text-[10px] font-semibold uppercase text-wf-text-muted">Fear</p>
            <p className="text-xs text-wf-text">{truncate(character.fear, 50)}</p>
          </div>
        )}
      </div>

      {character.arc_stage && (
        <div className="mt-2 flex items-center gap-1.5">
          <User className="h-3 w-3 text-wf-accent" />
          <span className="text-xs text-wf-text-muted">Arc: {character.arc_stage}</span>
        </div>
      )}
    </GlowCard>
  );
}
