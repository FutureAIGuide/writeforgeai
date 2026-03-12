"use client";
import React from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Globe, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WorldMap() {
  return (
    <GlowCard className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-wf-accent" />
          <h3 className="text-sm font-semibold text-wf-text">World Map</h3>
        </div>
        <Button variant="outline" size="sm">
          <Plus className="h-3.5 w-3.5 mr-1" />
          Upload Map
        </Button>
      </div>
      <div className="flex h-56 flex-col items-center justify-center rounded-lg border border-dashed border-wf-border bg-wf-panel-elevated">
        <Globe className="mb-3 h-12 w-12 text-wf-border" />
        <p className="text-sm font-medium text-wf-text-muted">No world map yet</p>
        <p className="mt-1 text-xs text-wf-text-muted">Upload an image or generate one with AI</p>
        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="outline">Upload Image</Button>
          <Button size="sm">Generate with AI</Button>
        </div>
      </div>
    </GlowCard>
  );
}
