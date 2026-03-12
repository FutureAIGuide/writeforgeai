"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Nov 1", words: 1200 }, { date: "Nov 2", words: 450 }, { date: "Nov 3", words: 1800 },
  { date: "Nov 4", words: 0 }, { date: "Nov 5", words: 2100 }, { date: "Nov 6", words: 950 },
  { date: "Nov 7", words: 1650 }, { date: "Nov 8", words: 1200 }, { date: "Nov 9", words: 1950 },
  { date: "Nov 10", words: 800 }, { date: "Nov 11", words: 2400 }, { date: "Nov 12", words: 1100 },
  { date: "Nov 13", words: 1750 }, { date: "Nov 14", words: 600 },
];

export function WritingCadenceChart() {
  return (
    <div className="h-52">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#242424" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: "#9CA3AF", fontSize: 10 }} tickLine={false} axisLine={{ stroke: "#242424" }} interval={1} />
          <YAxis tick={{ fill: "#9CA3AF", fontSize: 10 }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#181818", border: "1px solid #242424", borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: "#9CA3AF" }}
            
          />
          <Bar dataKey="words" fill="#FF6A00" radius={[3, 3, 0, 0]} opacity={0.9} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
