"use client";
import { useState } from "react";
import { Code2, Bug, Sparkles } from "lucide-react";
import Home from "./Home";
import CodeReview from "./CodeReview";
import ErrorAnalysis from "./ErrorAnalysis";
import { motion, AnimatePresence } from "framer-motion";

const LandingPage = () => {
  const [component, setComponent] = useState("review");

  return (
    <div className="text-white min-h-screen">
      <Home />

      <div className="mx-auto px-4 py-20 relative max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 z-0 pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Premium Tab Navigation */}
            <div className="flex border-b border-white/10 p-2 bg-white/5 backdrop-blur-xl">
              <button
                onClick={() => setComponent("review")}
                className={`flex-1 py-6 rounded-[2rem] flex items-center justify-center gap-3 transition-all relative group ${
                  component === "review" ? "bg-white/10 text-white shadow-xl" : "text-white/40 hover:text-white/60"
                }`}
              >
                <Code2 className={`w-5 h-5 transition-colors ${component === "review" ? "text-cyan-400" : ""}`} />
                <span className="font-bold tracking-tight">Code Review</span>
                {component === "review" && (
                  <motion.div layoutId="activeTab" className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-cyan-400" />
                )}
              </button>

              <button
                onClick={() => setComponent("error")}
                className={`flex-1 py-6 rounded-[2rem] flex items-center justify-center gap-3 transition-all relative group ${
                  component === "error" ? "bg-white/10 text-white shadow-xl" : "text-white/40 hover:text-white/60"
                }`}
              >
                <Bug className={`w-5 h-5 transition-colors ${component === "error" ? "text-purple-400" : ""}`} />
                <span className="font-bold tracking-tight">Error Analysis</span>
                {component === "error" && (
                  <motion.div layoutId="activeTab" className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-purple-400" />
                )}
              </button>
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={component}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {component === "review" ? <CodeReview /> : <ErrorAnalysis />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
};

export default LandingPage;