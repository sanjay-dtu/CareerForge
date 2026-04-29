"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { 
  Trophy, 
  Calendar, 
  ArrowRight, 
  History,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function QuizList({ assessments }) {
  const router = useRouter();

  if (!assessments?.length) {
    return null;
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
          <History className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Recent Assessments</h2>
          <p className="text-white/40 text-sm">Review your past performance and insights</p>
        </div>
      </div>

      <div className="grid gap-4">
        {assessments.map((assessment, index) => (
          <motion.div
            key={assessment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group flex flex-col md:flex-row items-center justify-between p-6 bg-white/5 border border-white/5 rounded-3xl hover:border-purple-500/30 transition-all hover:bg-white/10"
          >
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-colors ${
                assessment.quizScore >= 80 ? 'bg-green-500/10 border-green-500/20' : 
                assessment.quizScore >= 50 ? 'bg-yellow-500/10 border-yellow-500/20' : 
                'bg-red-500/10 border-red-500/20'
              }`}>
                {assessment.quizScore >= 80 ? (
                  <Trophy className="w-7 h-7 text-green-400" />
                ) : assessment.quizScore >= 50 ? (
                  <CheckCircle2 className="w-7 h-7 text-yellow-400" />
                ) : (
                  <AlertCircle className="w-7 h-7 text-red-400" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {assessment.category} Assessment
                </h3>
                <div className="flex items-center gap-4 mt-1 text-white/40 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {format(new Date(assessment.createdAt), "MMM d, yyyy")}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-white/10" />
                  <span>{assessment.questions.length} Questions</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 w-full md:w-auto mt-4 md:mt-0 justify-between md:justify-end">
              <div className="text-right">
                <div className={`text-2xl font-bold ${
                  assessment.quizScore >= 80 ? 'text-green-400' : 
                  assessment.quizScore >= 50 ? 'text-yellow-400' : 
                  'text-red-400'
                }`}>
                  {assessment.quizScore.toFixed(1)}%
                </div>
                <div className="text-xs font-bold text-white/20 uppercase tracking-widest mt-0.5">Score</div>
              </div>
              
              <Button 
                onClick={() => router.push(`/interview/assessment/${assessment.id}`)}
                className="rounded-2xl h-12 px-6 bg-purple-600 hover:bg-purple-500 text-white font-bold group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all flex items-center gap-2"
              >
                Review
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
