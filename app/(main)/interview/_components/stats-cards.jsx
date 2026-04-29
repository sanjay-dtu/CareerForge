"use client";

import { Brain, Target, Trophy, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsCards({ assessments }) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  const stats = [
    {
      title: "Average Score",
      value: `${getAverageScore()}%`,
      description: "Across all assessments",
      icon: Trophy,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      glow: "shadow-[0_0_20px_rgba(34,211,238,0.1)]",
    },
    {
      title: "Questions Practiced",
      value: getTotalQuestions(),
      description: "Total questions solved",
      icon: Brain,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      glow: "shadow-[0_0_20px_rgba(168,85,247,0.1)]",
    },
    {
      title: "Latest Score",
      value: `${getLatestAssessment()?.quizScore.toFixed(1) || 0}%`,
      description: "Most recent quiz result",
      icon: Target,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
      border: "border-pink-500/20",
      glow: "shadow-[0_0_20px_rgba(236,72,153,0.1)]",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`glass-card rounded-3xl p-6 border ${stat.border} ${stat.glow} relative overflow-hidden group hover:scale-[1.02] transition-all duration-300`}
        >
          <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} blur-3xl -mr-8 -mt-8 opacity-50 group-hover:opacity-80 transition-opacity`}></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center border ${stat.border}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <TrendingUp className="w-4 h-4 text-white/10 group-hover:text-white/30 transition-colors" />
          </div>

          <div className="mt-6 relative z-10">
            <div className="text-3xl font-bold text-white tracking-tight">{stat.value}</div>
            <div className="flex flex-col mt-1">
              <span className="text-sm font-medium text-white/70">{stat.title}</span>
              <span className="text-xs text-white/30">{stat.description}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
