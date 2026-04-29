"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const terminalSteps = [
  {
    command: "initialize --profile 'Software Engineer'",
    output: [
      "[1] Analyzing resume... DONE",
      "[2] Generating ATS-friendly formatting... DONE",
      "[3] Preparing tailored mock interview questions..."
    ],
    system: "Your resume matches 92% of the keywords for the Target Role. Ready to start the technical mock interview."
  },
  {
    command: "run mock-interview --topic 'System Design'",
    output: [
      "[1] Connecting to AI Interviewer... DONE",
      "[2] Loading system architecture scenarios... DONE",
      "[3] Initializing voice synthesis module..."
    ],
    system: "Question 1: How would you design a scalable chat application like WhatsApp?"
  },
  {
    command: "generate cover-letter --company 'TechCorp'",
    output: [
      "[1] Scanning job description... DONE",
      "[2] Extracting key requirements... DONE",
      "[3] Matching with your past experiences..."
    ],
    system: "Cover letter generated successfully. It highlights your experience with microservices and real-time data processing."
  }
];

const HeroSection = () => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % terminalSteps.length);
    }, 5000); // Change content every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const currentStep = terminalSteps[stepIndex];

  return (
    <section className="relative w-full pt-40 pb-20 overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] -z-10 animate-pulse" style={{ animationDelay: "2s" }}></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 space-y-8 text-center lg:text-left"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4">
              <span className="text-sm font-medium text-cyan-400">✨ The New Standard for Career Growth</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
              Unlock Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Professional Success
              </span>
            </h1>
            
            <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl mx-auto lg:mx-0">
              CareerForge is your all-in-one platform to build ATS-friendly resumes, generate tailored cover letters, and master technical interviews.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto px-8 bg-white text-black hover:bg-gray-200 rounded-full font-semibold transition-all">
                  Get Started for Free
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 rounded-full border-white/10 hover:bg-white/5">
                  Explore Features
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Image/Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="flex-1 w-full max-w-[600px] lg:max-w-none perspective-1000"
          >
            <div className="relative rounded-2xl glass-card p-2 shadow-2xl border border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-cyan-400/10 rounded-2xl mix-blend-overlay"></div>
              
              {/* Cool Animated Terminal / UI Mockup instead of Image */}
              <div className="relative z-10 bg-black/60 backdrop-blur-md rounded-xl border border-white/5 p-6 h-[400px] flex flex-col font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="ml-2 text-white/50 text-xs">interview-os ~ ai-agent</span>
                </div>
                
                <div className="flex-1 overflow-hidden text-cyan-300 relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={stepIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-4 absolute inset-0"
                    >
                      <div>
                        <span className="text-blue-400">➜</span> <span className="text-purple-400">CareerForge</span> {currentStep.command}
                      </div>
                      
                      <div className="text-white/70">
                        {currentStep.output.map((line, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 + (i * 0.5) }}
                          >
                            {line}
                          </motion.div>
                        ))}
                      </div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2.2 }}
                        className="p-4 rounded-lg bg-white/5 border border-white/10 mt-4 text-white"
                      >
                        <p className="text-xs text-blue-300 mb-2">// AI System Output</p>
                        <p className="font-sans">"{currentStep.system}"</p>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
