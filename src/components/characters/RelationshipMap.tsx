"use client";
import React from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Users } from "lucide-react";

export function RelationshipMap() {
  return (
    <GlowCard className="p-6">
      <div className="mb-4 flex items-center gap-2">
        <Users className="h-4 w-4 text-wf-accent" />
        <h3 className="text-sm font-semibold text-wf-text">Relationship Map</h3>
      </div>
      <div className="flex h-64 items-center justify-center">
        <div className="relative flex h-48 w-64 items-center justify-center">
          {/* Center node */}
          <div className="absolute flex h-14 w-14 items-center justify-center rounded-full border-2 border-wf-accent bg-wf-accent/20 text-center text-xs font-bold text-wf-accent">
            Elara
          </div>
          {/* Relationship nodes */}
          {[
            { label: "Kayn", angle: 0, rel: "Enemy", color: "border-red-500 text-red-400" },
            { label: "Mira", angle: 90, rel: "Ally", color: "border-green-500 text-green-400" },
            { label: "Emperor", angle: 180, rel: "Nemesis", color: "border-red-700 text-red-600" },
            { label: "Torvin", angle: 270, rel: "Mentor", color: "border-blue-500 text-blue-400" },
          ].map(({ label, angle, color }) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * 90;
            const y = Math.sin(rad) * 90;
            return (
              <div
                key={label}
                className={`absolute flex h-11 w-11 items-center justify-center rounded-full border-2 bg-wf-panel-elevated text-xs font-semibold ${color}`}
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                {label}
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-center text-xs text-wf-text-muted">
        Full interactive relationship graph — coming soon
      </p>
    </GlowCard>
  );
}
