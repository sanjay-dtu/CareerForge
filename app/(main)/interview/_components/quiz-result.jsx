"use client";

import { Trophy, CheckCircle2, XCircle, AlertTriangle, Shield, Sparkles, RefreshCcw, ArrowRight, Brain, History as HistoryIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  if (!result) return null;

  const isDisqualified = result.securityViolations?.isDisqualified || false;
  const violations = result.securityViolations?.violations || [];

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-10">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          Assessment Complete
        </div>
        <h1 className="text-5xl font-bold text-white tracking-tight">
          {isDisqualified ? "Assessment Disqualified" : "Great Job!"}
        </h1>
        <p className="text-white/40 text-lg max-w-xl mx-auto">
          {isDisqualified 
            ? "Your assessment was terminated due to security policy violations." 
            : "You've successfully completed the AI-driven assessment. Here's your detailed performance analysis."}
        </p>
      </motion.div>

      {/* Main Score Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden relative"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${isDisqualified ? 'from-red-500/10 to-transparent' : 'from-cyan-500/10 to-purple-500/10'} z-0 pointer-events-none`}></div>
        
        <div className="relative z-10 p-10 space-y-10">
          {/* Score Circle/Display */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className={`w-40 h-40 rounded-full flex flex-col items-center justify-center border-4 ${isDisqualified ? 'border-red-500/50 bg-red-500/10' : 'border-cyan-500/50 bg-cyan-500/10'} shadow-[0_0_50px_rgba(34,211,238,0.2)]`}>
              <span className={`text-5xl font-bold ${isDisqualified ? 'text-red-400' : 'text-white'}`}>
                {result.quizScore.toFixed(0)}%
              </span>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Final Score</span>
            </div>

            <div className="w-full max-w-md space-y-3">
              <div className="flex justify-between text-sm font-medium text-white/60">
                <span>Performance Progress</span>
                <span>{result.quizScore.toFixed(1)}%</span>
              </div>
              <Progress 
                value={result.quizScore} 
                className={`h-3 rounded-full bg-white/5 ${isDisqualified ? '[&>div]:bg-red-500' : '[&>div]:bg-gradient-to-r from-cyan-500 to-purple-500'}`} 
              />
            </div>
          </div>

          {/* Security & Alerts */}
          {isDisqualified && (
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-[2rem] space-y-4">
              <div className="flex items-center gap-3 text-red-400 font-bold">
                <Shield className="h-6 w-6" />
                <span className="text-lg">Security Policy Enforcement</span>
              </div>
              <p className="text-red-400/70 text-sm leading-relaxed">
                {result.securityViolations.disqualificationReason}
              </p>
              {violations.length > 0 && (
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold text-white/20 uppercase tracking-widest">Logged Violations</p>
                  <div className="space-y-2">
                    {violations.map((violation, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-white/80">{violation.message}</span>
                        </div>
                        <span className="text-[10px] font-mono text-white/30">
                          {new Date(violation.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Improvement Tip */}
          {result.improvementTip && !isDisqualified && (
            <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6">
                <Brain className="w-12 h-12 text-white/5 group-hover:text-purple-500/20 transition-colors" />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3 text-purple-400 font-bold">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-lg">AI Performance Insight</span>
                </div>
                <p className="text-white/70 leading-relaxed italic text-lg">
                  "{result.improvementTip}"
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Questions Review Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3 px-4">
          <HistoryIcon className="w-6 h-6 text-cyan-400" />
          Question Breakdown
        </h3>
        
        <div className="grid gap-6">
          {result.questions.map((q, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="glass-card rounded-[2rem] border border-white/5 p-8 space-y-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8">
                {q.isCorrect ? (
                  <CheckCircle2 className="h-10 w-10 text-green-500/20 group-hover:text-green-500/40 transition-colors" />
                ) : (
                  <XCircle className="h-10 w-10 text-red-500/20 group-hover:text-red-500/40 transition-colors" />
                )}
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${q.isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {index + 1}
                  </div>
                  <p className="text-xl font-bold text-white leading-tight pr-12">{q.question}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className={`p-4 rounded-2xl border ${q.isCorrect ? 'bg-green-500/5 border-green-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest block mb-1">Your Answer</span>
                    <p className={`text-lg font-medium ${q.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{q.userAnswer}</p>
                  </div>
                  {!q.isCorrect && (
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest block mb-1">Correct Answer</span>
                      <p className="text-lg font-medium text-white/90">{q.answer}</p>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400 font-bold text-sm">
                    <Brain className="w-4 h-4" />
                    AI Explanation
                  </div>
                  <p className="text-white/60 leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {!hideStartNew && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center pt-10"
        >
          <Button 
            onClick={onStartNew} 
            className="rounded-full h-16 px-12 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-lg shadow-2xl hover:shadow-cyan-500/20 transition-all group"
          >
            <RefreshCcw className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-500" />
            Try Another Assessment
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
