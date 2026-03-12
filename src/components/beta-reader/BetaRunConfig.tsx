"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Users } from "lucide-react";
import { BETA_PERSONA_TYPES, AI_MODELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BetaRunConfigProps {
  onStart: (config: { personaTypes: string[]; model: string; focusAreas: string[] }) => void;
  isRunning?: boolean;
}

const focusAreaOptions = ["Plot", "Pacing", "Character", "Dialogue", "Worldbuilding", "Emotion", "Clarity"];

export function BetaRunConfig({ onStart, isRunning }: BetaRunConfigProps) {
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>(["Genre Enthusiast", "Casual Reader"]);
  const [model, setModel] = useState("openai/gpt-4o-mini");
  const [focusAreas, setFocusAreas] = useState<string[]>(["Character", "Pacing"]);

  const togglePersona = (p: string) =>
    setSelectedPersonas((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);

  const toggleFocus = (f: string) =>
    setFocusAreas((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);

  return (
    <div className="space-y-5 rounded-xl border border-wf-border bg-wf-panel p-5">
      <div>
        <Label className="mb-2 block text-xs text-wf-text-muted uppercase tracking-wider">
          <Users className="mr-1 inline h-3 w-3" />
          Reader Personas ({selectedPersonas.length} selected)
        </Label>
        <div className="flex flex-wrap gap-2">
          {BETA_PERSONA_TYPES.map((p) => (
            <button
              key={p}
              onClick={() => togglePersona(p)}
              className={cn(
                "rounded-md border px-2.5 py-1 text-xs transition-colors",
                selectedPersonas.includes(p)
                  ? "border-wf-accent bg-wf-accent/15 text-wf-accent"
                  : "border-wf-border text-wf-text-muted hover:border-wf-text"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-2 block text-xs text-wf-text-muted uppercase tracking-wider">Focus Areas</Label>
        <div className="flex flex-wrap gap-2">
          {focusAreaOptions.map((f) => (
            <button
              key={f}
              onClick={() => toggleFocus(f)}
              className={cn(
                "rounded-md border px-2.5 py-1 text-xs transition-colors",
                focusAreas.includes(f)
                  ? "border-wf-accent bg-wf-accent/15 text-wf-accent"
                  : "border-wf-border text-wf-text-muted hover:border-wf-text"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-2 block text-xs text-wf-text-muted uppercase tracking-wider">AI Model</Label>
        <Select value={model} onValueChange={setModel}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {AI_MODELS.map((m) => (
              <SelectItem key={m.id} value={m.id}>{m.name} ({m.provider})</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        className="w-full"
        onClick={() => onStart({ personaTypes: selectedPersonas, model, focusAreas })}
        disabled={isRunning || selectedPersonas.length === 0}
      >
        <Play className="mr-2 h-4 w-4" />
        {isRunning ? "Running Beta Read…" : "Start Beta Read"}
      </Button>
    </div>
  );
}
