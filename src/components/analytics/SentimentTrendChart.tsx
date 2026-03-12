"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { chapter: "Ch 1", score: 0.65 }, { chapter: "Ch 2", score: 0.72 },
  { chapter: "Ch 3", score: 0.45 }, { chapter: "Ch 4", score: 0.38 },
  { chapter: "Ch 5", score: 0.58 }, { chapter: "Ch 6", score: 0.75 },
  { chapter: "Ch 7", score: 0.80 }, { chapter: "Ch 8", score: 0.70 },
];

export function SentimentTrendChart() {
  return (
    <div className="h-52">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#242424" />
          <XAxis dataKey="chapter" tick={{ fill: "#9CA3AF", fontSize: 10 }} tickLine={false} axisLine={{ stroke: "#242424" }} />
          <YAxis domain={[0, 1]} tick={{ fill: "#9CA3AF", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${Math.round(v * 100)}%`} />
          <Tooltip
            contentStyle={{ backgroundColor: "#181818", border: "1px solid #242424", borderRadius: 8, fontSize: 12 }}
            
          />
          <Line type="monotone" dataKey="score" stroke="#FF6A00" strokeWidth={2} dot={{ fill: "#FF6A00", r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
