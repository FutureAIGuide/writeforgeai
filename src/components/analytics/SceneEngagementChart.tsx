"use client";
import React from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { subject: "Opening Hook", score: 85 },
  { subject: "Rising Action", score: 72 },
  { subject: "Tension", score: 68 },
  { subject: "Character", score: 91 },
  { subject: "Dialogue", score: 79 },
  { subject: "Pacing", score: 65 },
  { subject: "Resolution", score: 74 },
];

export function SceneEngagementChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#242424" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "#9CA3AF", fontSize: 10 }} />
          <Radar name="Engagement" dataKey="score" stroke="#FF6A00" fill="#FF6A00" fillOpacity={0.2} strokeWidth={2} />
          <Tooltip
            contentStyle={{ backgroundColor: "#181818", border: "1px solid #242424", borderRadius: 8, fontSize: 12 }}
            
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
