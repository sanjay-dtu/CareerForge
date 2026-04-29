"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import QuizResult from "./quiz-result";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { useQuizSecurity } from "@/hooks/useQuizSecurity";
import { 
  Clock, 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Lock, 
  MousePointerClick,
  Sparkles,
  ArrowRight,
  Monitor,
  Layout
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const security = useQuizSecurity();
  const {
    isQuizActive,
    timeRemaining,
    tabSwitchCount,
    warningCount,
    violations,
    isDisqualified,
    disqualificationReason,
    startQuiz,
    endQuiz,
    formatTime,
  } = security;

  const { loading: generatingQuiz, fn: generateQuizFn, data: quizData } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const handleAnswer = (answer) => {
    if (isDisqualified) return;
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((a, i) => {
      if (a === quizData[i].correctAnswer) correct++;
    });
    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = isDisqualified ? 0 : calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score, {
        isDisqualified,
        disqualificationReason,
        violations,
        tabSwitchCount,
        warningCount,
      });
      if (endQuiz) endQuiz();
      toast.success(isDisqualified ? "Score set to 0 due to violations!" : "Assessment completed");
    } catch {
      toast.error("Failed to save results");
    }
  };

  useEffect(() => {
    if (isDisqualified && quizData && answers.length > 0 && !savingResult) {
      const timer = setTimeout(() => { finishQuiz(); }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isDisqualified]);

  useEffect(() => {
    if (timeRemaining === 0 && isQuizActive && quizData && !savingResult) {
      toast.info("Time's up! Submitting your assessment...");
      const timer = setTimeout(() => { finishQuiz(); }, 1500);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, isQuizActive]);

  const startSecureQuiz = async () => {
    setIsStarting(true);
    try {
      await generateQuizFn();
      setTimeout(() => startQuiz(30), 1200);
    } catch {
      toast.error("Failed to generate quiz");
      setIsStarting(false);
    }
  };

  if (generatingQuiz || savingResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] gap-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="w-8 h-8 text-cyan-500 animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight font-sans">
            {generatingQuiz ? "Crafting Your Assessment..." : "Securing Results..."}
          </h2>
          <p className="text-white/40 text-sm max-w-xs mx-auto">
            Our AI is finalizing the environment to ensure a fair and professional evaluation.
          </p>
        </div>
      </div>
    );
  }

  if (resultData)
    return <QuizResult result={resultData} onStartNew={() => location.reload()} />;

  if (!quizData) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto py-10 px-4"
      >
        <div className="glass-card rounded-[3rem] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 z-0 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="p-12 border-b border-white/10 bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-[1.5rem] bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                  <Shield className="w-10 h-10 text-cyan-400" />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-white tracking-tighter">Secure Assessment Mode</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Environment Ready</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Eye, title: "Tab Switch Tracking", desc: "Monitors active window focus" },
                  { icon: MousePointerClick, title: "Interaction Control", desc: "Right-click & Copy disabled" },
                  { icon: Lock, title: "Shortcut Blocking", desc: "Dev tools access is restricted" },
                  { icon: Clock, title: "Time Management", desc: "Auto-submit on time expiration" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 p-6 bg-white/5 rounded-[2rem] border border-white/5 hover:border-cyan-500/40 transition-all group hover:bg-white/10">
                    <item.icon className="w-8 h-8 text-cyan-400 shrink-0 mt-1" />
                    <div>
                      <p className="text-lg font-black text-white group-hover:text-cyan-400 transition-colors tracking-tight">{item.title}</p>
                      <p className="text-sm text-white/50 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-black text-white flex items-center gap-3 tracking-tight">
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                  Violation Policy
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { n: 1, label: "First Warning", color: "bg-yellow-500", border: "border-yellow-500/30", text: "text-yellow-500" },
                    { n: 2, label: "Final Chance", color: "bg-orange-500", border: "border-orange-500/30", text: "text-orange-500" },
                    { n: 3, label: "Disqualified", color: "bg-red-500", border: "border-red-500/30", text: "text-red-500" },
                  ].map((step) => (
                    <div key={step.n} className={`p-6 rounded-[2.5rem] border ${step.border} bg-white/5 text-center space-y-3 group hover:scale-105 transition-all`}>
                      <div className={`w-10 h-10 rounded-full ${step.color} mx-auto flex items-center justify-center font-black text-black shadow-lg shadow-black/20 text-lg`}>{step.n}</div>
                      <p className={`text-xs font-black uppercase tracking-[0.2em] ${step.text}`}>{step.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 bg-cyan-500/5 border border-cyan-500/10 rounded-[2.5rem] space-y-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Layout className="w-24 h-24 text-cyan-400" />
                 </div>
                 <h4 className="text-xl font-black text-cyan-400 flex items-center gap-3 tracking-tight">
                   <CheckCircle2 className="w-6 h-6" />
                   Final Checklist
                 </h4>
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-white/60">
                   <li className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                     Stable internet connection
                   </li>
                   <li className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                     Quiet, distraction-free space
                   </li>
                   <li className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                     No other active browser tabs
                   </li>
                   <li className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                     Fullscreen mode authorization
                   </li>
                 </ul>
              </div>

              <div className="pt-8 space-y-5">
                <Button 
                  onClick={startSecureQuiz} 
                  disabled={isStarting} 
                  className="w-full h-20 rounded-[2rem] bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-black text-2xl shadow-[0_20px_50px_rgba(34,211,238,0.3)] transition-all group border-none"
                >
                  {isStarting ? (
                    <div className="flex items-center gap-4">
                      <BarLoader color="white" width={150} height={4} />
                      <span className="animate-pulse">Initializing Environment...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Shield className="w-8 h-8" />
                      Start Assessment Now
                      <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
                    </div>
                  )}
                </Button>
                <p className="text-center text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Government Grade Privacy Protection</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const question = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-10">
      {/* Quiz Progress & Status */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-xl">
            <Monitor className="w-7 h-7 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tighter">
              Assessment in Progress
            </h2>
            <div className="flex items-center gap-3 text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              Live Proctoring Active
            </div>
          </div>
        </div>

        {isQuizActive && (
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-[2rem] shadow-2xl backdrop-blur-xl"
          >
            <Clock className="w-6 h-6 text-cyan-400 animate-pulse" />
            <span className="font-mono text-3xl font-black text-white tracking-tight">{formatTime(timeRemaining)}</span>
          </motion.div>
        )}
      </div>

      <div className="glass-card rounded-[3.5rem] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden relative">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 bg-[length:200%_100%] animate-gradient-x"
          />
        </div>

        <div className="relative z-10 p-12 md:p-16">
          <div className="flex items-center justify-between mb-12">
            <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">
              Section 01 <span className="mx-2">•</span> Question {currentQuestion + 1} / {quizData.length}
            </span>
            {warningCount > 0 && (
              <div className="flex items-center gap-3 text-xs font-black text-orange-400 uppercase tracking-widest bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20">
                <AlertTriangle className="w-4 h-4" />
                Strike {warningCount}
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="space-y-12"
            >
              <div className="p-8 bg-white/2 border border-white/10 rounded-[2.5rem] shadow-inner">
                <p className="text-xl md:text-2xl font-bold text-white leading-relaxed text-center max-w-4xl mx-auto">
                  {question.question}
                </p>
              </div>

              <RadioGroup 
                value={answers[currentQuestion]} 
                onValueChange={handleAnswer} 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                disabled={isDisqualified}
              >
                {question.options.map((opt, i) => (
                  <Label 
                    key={i}
                    htmlFor={`opt-${i}`}
                    className={`flex items-center gap-5 p-6 rounded-[2rem] border-2 transition-all cursor-pointer group hover:bg-white/5 relative overflow-hidden ${
                      answers[currentQuestion] === opt 
                        ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.15)]' 
                        : 'border-white/5 bg-white/2'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                       answers[currentQuestion] === opt ? 'border-cyan-400 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'border-white/20'
                    }`}>
                      {answers[currentQuestion] === opt && <div className="w-2 h-2 rounded-full bg-black" />}
                    </div>
                    <RadioGroupItem id={`opt-${i}`} value={opt} className="hidden" />
                    <span className={`text-base font-bold transition-colors leading-relaxed ${
                      answers[currentQuestion] === opt ? 'text-white' : 'text-white/60'
                    }`}>
                      {opt}
                    </span>
                    {answers[currentQuestion] === opt && (
                       <motion.div layoutId="glow" className="absolute inset-0 bg-cyan-500/5 pointer-events-none" />
                    )}
                  </Label>
                ))}
              </RadioGroup>
            </motion.div>
          </AnimatePresence>

          {/* Action Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-12 mt-12 border-t border-white/10 gap-8">
             <div className="flex gap-2">
               {quizData.map((_, i) => (
                 <div key={i} className={`h-2 rounded-full transition-all duration-500 ${
                   i === currentQuestion ? 'w-16 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 
                   answers[i] ? 'w-6 bg-white/30' : 'w-6 bg-white/5'
                 }`} />
               ))}
             </div>

             <Button 
              onClick={handleNext} 
              disabled={!answers[currentQuestion] || isDisqualified || savingResult || timeRemaining === 0}
              className="rounded-full h-20 px-12 bg-white text-black hover:bg-cyan-50 font-black text-xl flex items-center gap-4 group transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95"
            >
              {savingResult ? "Authenticating..." : currentQuestion === quizData.length - 1 ? "Complete Evaluation" : "Next Milestone"}
              <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}