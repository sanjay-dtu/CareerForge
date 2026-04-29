import { getAssessments } from "@/actions/interview";
import StatsCards from "./_components/stats-cards";
import PerformanceChart from "./_components/performace-chart";
import QuizList from "./_components/quiz-list";
import { Brain, Sparkles, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function InterviewPrepPage() {
  const assessments = await getAssessments();

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-10">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full w-fit">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">AI-Powered Prep</span>
          </div>
          <h1 className="text-6xl font-bold gradient-title tracking-tight">Interview Prep</h1>
          <p className="text-white/40 text-lg max-w-2xl">Master your technical and behavioral skills with AI-driven insights and real-time performance tracking.</p>
        </div>
        
        <Link href="/interview/mock">
          <Button className="rounded-[2rem] bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold h-16 px-10 shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all flex items-center gap-3 text-lg border-none group">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform">
              <Plus className="h-5 w-5" />
            </div>
            Start New Assessment
          </Button>
        </Link>
      </div>

      {/* Stats Section */}
      <div className="pt-4">
        <StatsCards assessments={assessments} />
      </div>

      {/* Analytics & History Grid */}
      <div className="grid grid-cols-1 gap-8">
        <div className="glass-card rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 z-0 pointer-events-none group-hover:opacity-100 transition-opacity opacity-50"></div>
          <div className="relative z-10">
            <PerformanceChart assessments={assessments} />
          </div>
        </div>

        <div className="glass-card rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 z-0 pointer-events-none opacity-50"></div>
          <div className="relative z-10">
            <QuizList assessments={assessments} />
          </div>
        </div>
      </div>
    </div>
  );
}
