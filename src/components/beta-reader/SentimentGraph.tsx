"use client";
import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import type { SentimentDataPoint } from "@/types";

const mockData = [
  { chapter: 1, "Genre Enthusiast": 0.72, "Casual Reader": 0.65, "Literary Critic": 0.58 },
  { chapter: 2, "Genre Enthusiast": 0.68, "Casual Reader": 0.71, "Literary Critic": 0.62 },
  { chapter: 3, "Genre Enthusiast": 0.45, "Casual Reader": 0.40, "Literary Critic": 0.38 },
  { chapter: 4, "Genre Enthusiast": 0.55, "Casual Reader": 0.50, "Literary Critic": 0.48 },
  { chapter: 5, "Genre Enthusiast": 0.80, "Casual Reader": 0.75, "Literary Critic": 0.71 },
];

const COLORS = ["#FF6A00", "#60A5FA", "#34D399"];

interface SentimentGraphProps {
  data?: typeof mockData;
  personas?: string[];
}

export function SentimentGraph({ data = mockData, personas = ["Genre Enthusiast", "Casual Reader", "Literary Critic"] }: SentimentGraphProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            {personas.map((persona, i) => (
              <linearGradient key={persona} id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0.3} />
                <stop offset="95%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#242424" />
          <XAxis dataKey="chapter" tick={{ fill: "#9CA3AF", fontSize: 11 }} tickLine={false} axisLine={{ stroke: "#242424" }} label={{ value: "Chapter", position: "insideBottom", fill: "#9CA3AF", fontSize: 11 }} />
          <YAxis domain={[0, 1]} tick={{ fill: "#9CA3AF", fontSize: 11 }} tickLine={false} axisLine={{ stroke: "#242424" }} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
          <Tooltip
            contentStyle={{ backgroundColor: "#181818", border: "1px solid #242424", borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: "#9CA3AF" }}
            
          />
          <Legend wrapperStyle={{ fontSize: 11, color: "#9CA3AF", paddingTop: 8 }} />
          {personas.map((persona, i) => (
            <Area
              key={persona}
              type="monotone"
              dataKey={persona}
              stroke={COLORS[i % COLORS.length]}
              strokeWidth={2}
              fill={`url(#grad-${i})`}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
