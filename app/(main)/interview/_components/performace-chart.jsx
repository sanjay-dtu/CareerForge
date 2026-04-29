"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Activity, TrendingUp } from "lucide-react";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      })).reverse();
      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <div className="p-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Activity className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Performance Trend</h2>
            <p className="text-white/40 text-sm font-medium">Visualizing your growth over {chartData.length} sessions</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Growth Analytics Active</span>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="5 5" stroke="#ffffff10" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#ffffff40" 
              fontSize={11} 
              fontWeight={600}
              tickLine={false} 
              axisLine={false}
              dy={15}
            />
            <YAxis 
              domain={[0, 100]} 
              stroke="#ffffff40" 
              fontSize={11} 
              fontWeight={600}
              tickLine={false} 
              axisLine={false}
              tickFormatter={(val) => `${val}%`}
              dx={-5}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload?.length) {
                  return (
                    <div className="glass-card border border-white/20 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2 text-center">
                        {payload[0].payload.date}
                      </p>
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-8 bg-cyan-500 rounded-full"></div>
                         <p className="text-3xl font-black text-white">
                           {payload[0].value}<span className="text-lg text-cyan-400 ml-1">%</span>
                         </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
              cursor={{ stroke: '#ffffff20', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#22d3ee"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorScore)"
              animationDuration={2500}
              dot={{ r: 6, fill: '#000', stroke: '#22d3ee', strokeWidth: 3 }}
              activeDot={{ r: 8, fill: '#22d3ee', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
