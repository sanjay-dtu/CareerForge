"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Cpu, 
  Zap, 
  Brain, 
  Target, 
  MessageSquare,
  RefreshCcw,
  Terminal,
  ArrowRight,
  ShieldCheck,
  Code,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { chatWithHireMind } from "@/actions/hiremind";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

export default function HireMindPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm **HireMind AI**, your personal career strategist on **CareerForge**. Whether you need to optimize your resume, prepare for a big interview, or scale your job search with automation, I'm here to help. What's on your mind today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = useCallback(async (text) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatWithHireMind([...messages, userMessage]);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      toast.error(error.message || "Failed to connect to HireMind AI.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  const suggestions = [
    { text: "Review my tech stack", icon: Cpu },
    { text: "Mock interview for React", icon: Brain },
    { text: "LinkedIn profile tips", icon: Target },
    { text: "Automation workflow help", icon: Zap },
  ];

  const quickActions = [
    { name: "Improve Resume", icon: FileText, color: "text-blue-400", prompt: "How can I improve my resume for a Senior Frontend role?" },
    { name: "Technical Prep", icon: Code, color: "text-purple-400", prompt: "Give me some advanced technical interview questions for System Design." },
    { name: "Market Insights", icon: Target, color: "text-pink-400", prompt: "What are the most in-demand skills in the AI and Data Science market right now?" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            <Bot className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter flex items-center gap-2">
              HireMind AI
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20 font-black uppercase tracking-widest">Active</span>
            </h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Next-Gen Career Assistant</p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => setMessages([messages[0]])}
          className="rounded-xl border-white/10 bg-white/5 text-white/40 hover:text-white transition-all h-12 gap-2"
        >
          <RefreshCcw className="w-4 h-4" />
          <span className="hidden md:inline">Reset Session</span>
        </Button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden min-h-0">
        {/* Main Chat Area */}
        <div className="flex-1 glass-card rounded-[2.5rem] border border-white/10 flex flex-col relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent z-0 pointer-events-none"></div>
          
          {/* Messages Container */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 relative z-10 scrollbar-thin scrollbar-thumb-white/10"
          >
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-4 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      m.role === "user" ? "bg-purple-500/20 border-purple-500/30" : "bg-cyan-500/20 border-cyan-500/30"
                    }`}>
                      {m.role === "user" ? <User className="w-5 h-5 text-purple-400" /> : <Sparkles className="w-5 h-5 text-cyan-400" />}
                    </div>
                    
                    <div className={`p-5 rounded-3xl text-sm leading-relaxed ${
                      m.role === "user" 
                        ? "bg-purple-600 text-white rounded-tr-none font-medium" 
                        : "bg-white/5 border border-white/10 text-white/80 rounded-tl-none backdrop-blur-xl"
                    }`}>
                      <ReactMarkdown className="prose prose-invert prose-sm max-w-none">
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="flex gap-4 items-center bg-white/5 border border-white/10 p-4 rounded-3xl rounded-tl-none">
                   <div className="flex gap-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                   </div>
                   <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">HireMind is thinking...</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 md:p-8 border-t border-white/10 bg-black/40 backdrop-blur-2xl relative z-10">
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about your career, resume, or jobs..."
                className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 pr-16 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-2 h-12 w-12 rounded-xl bg-cyan-500 text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button 
                  key={i}
                  disabled={isLoading}
                  onClick={() => handleSendMessage(s.text)}
                  className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <s.icon className="w-3 h-3" />
                  {s.text}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Info & Actions */}
        <aside className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
          <div className="glass-card p-8 rounded-[2.5rem] border border-white/10 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldCheck className="w-16 h-16 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-3 relative z-10">
              <Terminal className="w-5 h-5 text-cyan-400" />
              AI Insights
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-1">Current Focus</p>
                <p className="text-xs text-white/60 font-medium leading-relaxed">Personalized career growth and technical interview preparation.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Capabilities</p>
                <ul className="text-[11px] text-white/60 space-y-2 font-medium">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-purple-500"></div>
                    Resume Analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-purple-500"></div>
                    Mock Interviews
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-purple-500"></div>
                    Job Market Trends
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-transparent flex-1 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              Quick Actions
            </h3>
            <div className="grid gap-3">
              {quickActions.map((action, i) => (
                <button 
                  key={i}
                  disabled={isLoading}
                  onClick={() => handleSendMessage(action.prompt)}
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 flex items-center justify-between group transition-all disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <action.icon className={`w-4 h-4 ${action.color}`} />
                    <span className="text-xs font-bold text-white/70 group-hover:text-white">{action.name}</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-white/20 group-hover:translate-x-1 group-hover:text-white transition-all" />
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
