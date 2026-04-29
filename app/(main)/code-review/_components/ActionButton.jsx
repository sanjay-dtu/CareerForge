"use client";
import { Search, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ActionButtons = ({ onReview, onExplain, loading, error }) => {
  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {error ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-2 text-sm font-bold text-red-400 py-4 bg-red-500/10 border-x border-b border-white/10 rounded-b-[2rem]"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex border-x border-b border-white/10 rounded-b-[2rem] overflow-hidden bg-white/5 backdrop-blur-md"
          >
            <button
              disabled={loading.reviewLoading || loading.explainationLoading}
              onClick={onReview}
              className={`flex-1 py-5 flex items-center justify-center gap-3 transition-all relative group overflow-hidden ${
                loading.reviewLoading ? "cursor-wait" : "cursor-pointer hover:bg-white/10"
              }`}
            >
              {loading.reviewLoading ? (
                <>
                  <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                  <span className="font-bold text-cyan-400 tracking-tight">AI ANALYZING...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-white/70 group-hover:text-white tracking-tight">Review Code</span>
                </>
              )}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            <div className="w-[1px] bg-white/10 my-4"></div>

            <button
              disabled={loading.reviewLoading || loading.explainationLoading}
              onClick={onExplain}
              className={`flex-1 py-5 flex items-center justify-center gap-3 transition-all relative group overflow-hidden ${
                loading.explainationLoading ? "cursor-wait" : "cursor-pointer hover:bg-white/10"
              }`}
            >
              {loading.explainationLoading ? (
                <>
                  <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                  <span className="font-bold text-purple-400 tracking-tight">EXPLAINING...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-white/70 group-hover:text-white tracking-tight">Explain Logic</span>
                </>
              )}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActionButtons;