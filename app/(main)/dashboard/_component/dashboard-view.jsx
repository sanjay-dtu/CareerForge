"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
  Zap,
  Star,
  Activity
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const DashboardView = ({ insights }) => {
  if (
    !insights ||
    !Array.isArray(insights.salaryRanges) ||
    !Array.isArray(insights.topSkills) ||
    !Array.isArray(insights.keyTrends) ||
    !Array.isArray(insights.recommendedSkills)
  ) {
    return (
      <div className="text-center text-sm text-muted-foreground p-12 glass-card rounded-2xl border border-white/10">
        Industry insights are not available right now. Please check back later.
      </div>
    );
  }

  // Determine if the entire dataset is likely in USD by checking the absolute max across all roles.
  // This prevents mixed conversions where one role is treated as USD and another as INR.
  const maxAcrossRoles = Math.max(...insights.salaryRanges.map((r) => r.max));
  const isUSD = maxAcrossRoles < 500000;
  const conversionFactor = isUSD ? 80 : 1; // Multiply by 80 to convert USD to INR

  const salaryData = insights.salaryRanges.map((range) => {
    return {
      name: range.role,
      min: (range.min * conversionFactor) / 100000,
      max: (range.max * conversionFactor) / 100000,
      median: (range.median * conversionFactor) / 100000,
    };
  });

  const getDemandLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case "high":
        return "from-green-500 to-emerald-400";
      case "medium":
        return "from-yellow-500 to-amber-400";
      case "low":
        return "from-red-500 to-rose-400";
      default:
        return "from-gray-500 to-slate-400";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook?.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/10" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-400", bg: "bg-yellow-500/10" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-400", bg: "bg-red-500/10" };
      default:
        return { icon: LineChart, color: "text-gray-400", bg: "bg-gray-500/10" };
    }
  };

  const { icon: OutlookIcon, color: outlookColor, bg: outlookBg } = getMarketOutlookInfo(insights.marketOutlook);
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(new Date(insights.nextUpdate), { addSuffix: true });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="show" 
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs text-white/70 flex items-center gap-2">
          <Activity className="w-3 h-3 text-cyan-400" />
          Last updated: {lastUpdatedDate}
        </div>
      </motion.div>

      {/* Top Metric Cards - Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Market Outlook */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5 border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-white/60">Market Outlook</h3>
            <div className={`p-2 rounded-lg ${outlookBg}`}>
              <OutlookIcon className={`h-5 w-5 ${outlookColor}`} />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              {insights.marketOutlook}
            </div>
            <p className="text-xs text-white/40 mt-1">Next update {nextUpdateDistance}</p>
          </div>
        </motion.div>

        {/* Industry Growth */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5 border border-white/5 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-white/60">Industry Growth</h3>
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{insights.growthRate.toFixed(1)}%</div>
            <div className="h-1.5 w-full bg-white/10 rounded-full mt-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" 
                style={{ width: `${Math.min(insights.growthRate, 100)}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        {/* Demand Level */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5 border border-white/5 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-white/60">Demand Level</h3>
            <div className="p-2 rounded-lg bg-purple-500/10">
              <BriefcaseIcon className="h-5 w-5 text-purple-400" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{insights.demandLevel}</div>
            <div className="h-1.5 w-full bg-white/10 rounded-full mt-3 overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${getDemandLevelColor(insights.demandLevel)} rounded-full w-full`}></div>
            </div>
          </div>
        </motion.div>

        {/* Top Skills Overview */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5 border border-white/5 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-white/60">Top Skills</h3>
            <div className="p-2 rounded-lg bg-pink-500/10">
              <Zap className="h-5 w-5 text-pink-400" />
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {insights.topSkills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="bg-white/5 hover:bg-white/10 text-white/80 border-white/10 text-[10px] py-0.5 px-2">
                {skill}
              </Badge>
            ))}
            {insights.topSkills.length > 3 && (
              <span className="text-[10px] text-white/40 self-center ml-1">+{insights.topSkills.length - 3} more</span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Salary Area Chart */}
      <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 border border-white/5">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">Salary Ranges by Role</h2>
          <p className="text-sm text-white/50">Displaying minimum, median, and maximum salaries (in Lakhs Per Annum)</p>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salaryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMedian" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}L`} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="glass p-4 rounded-xl border border-white/10 shadow-2xl">
                        <p className="font-semibold text-white mb-2">{label}</p>
                        {payload.map((item) => (
                          <div key={item.name} className="flex items-center gap-2 text-sm text-white/80">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span>{item.name}:</span>
                            <span className="font-mono text-white">₹{item.value} LPA</span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area type="monotone" dataKey="max" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorMax)" name="Max Salary" />
              <Area type="monotone" dataKey="median" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorMedian)" name="Median Salary" />
              <Area type="monotone" dataKey="min" stroke="#2dd4bf" strokeWidth={2} fill="none" name="Min Salary" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Bottom Row - Trends & Recommended Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Brain className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Key Industry Trends</h2>
              <p className="text-xs text-white/50">Current shifts shaping the market</p>
            </div>
          </div>
          <ul className="space-y-4">
            {insights.keyTrends.map((trend, index) => (
              <li key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                <span className="text-sm text-white/80 leading-relaxed">{trend}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Star className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Recommended Skills</h2>
              <p className="text-xs text-white/50">High-value skills to develop</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {insights.recommendedSkills.map((skill) => (
              <div 
                key={skill} 
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/70 hover:text-white hover:bg-white/10 hover:border-cyan-500/30 transition-all cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardView;
