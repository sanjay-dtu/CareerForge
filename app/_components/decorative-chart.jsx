"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const data = [
  { name: "Jan", score: 40 },
  { name: "Feb", score: 30 },
  { name: "Mar", score: 60 },
  { name: "Apr", score: 45 },
  { name: "May", score: 75 },
  { name: "Jun", score: 55 },
  { name: "Jul", score: 85 },
];

export default function DecorativeChart() {
  return (
    <div className="w-full h-full p-4 overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "rgba(0,0,0,0.8)", 
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              fontSize: "12px"
            }}
            itemStyle={{ color: "#22d3ee" }}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#22d3ee"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorScore)"
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
