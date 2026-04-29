"use client";
import { FaCode } from "react-icons/fa6";
import { PiBugFill } from "react-icons/pi";
import { motion } from "framer-motion";
import { Sparkles, Terminal, Code2, Bug, ArrowDown } from "lucide-react";

const Home = () => {
  const handleScroll = () => {
    window.scrollBy({ top: window.innerHeight - 20, behavior: "smooth" });
  };

  const features = [
    {
      icon: Code2,
      title: "Smart Code Review",
      desc: "AI-driven explanations for both beginners and experts.",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20"
    },
    {
      icon: Bug,
      title: "Error Analysis",
      desc: "Instant error insights with simplified explanations.",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
  ];

  return (
    <div className="relative pt-10 md:pt-20">
      <section className="relative px-6 text-center space-y-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold uppercase tracking-widest"
        >
          <Terminal className="w-4 h-4" />
          Advanced Code Intelligence
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight"
        >
          Code <span className="gradient-title">Review & Analysis</span> Made Simple
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-medium"
        >
          Get instant, high-quality code reviews and deep error analysis powered by next-generation AI models.
        </motion.p>
      </section>

      <section className="px-6 py-16 flex flex-col items-center gap-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`p-8 rounded-[2.5rem] border ${feature.border} bg-white/5 backdrop-blur-xl relative overflow-hidden group hover:bg-white/10 transition-all`}
            >
              <div className={`absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity`}>
                <feature.icon className="w-20 h-20" />
              </div>
              <div className="relative z-10 space-y-4">
                <div className={`w-12 h-12 rounded-2xl ${feature.bg} flex items-center justify-center border ${feature.border}`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{feature.title}</h3>
                <p className="text-white/40 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={handleScroll}
          className="flex flex-col items-center gap-4 group cursor-pointer"
        >
          <div className="px-10 py-4 bg-white text-black font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl hover:shadow-white/10 text-lg">
             Try It Now
          </div>
          <ArrowDown className="w-5 h-5 text-white/20 group-hover:translate-y-2 group-hover:text-white transition-all" />
        </motion.button>
      </section>
    </div>
  );
};

export default Home;