import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/cover-letter-list";
import { motion } from "framer-motion";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-6xl font-bold gradient-title tracking-tight mb-2">My Cover Letters</h1>
          <p className="text-white/40 text-lg">Manage and track all your AI-generated professional cover letters.</p>
        </div>
        <Link href="/ai-cover-letter/new">
          <Button className="rounded-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold h-12 px-8 shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New
          </Button>
        </Link>
      </div>

      <div className="glass-card rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden relative min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 z-0 pointer-events-none"></div>
        <div className="relative z-10">
          <CoverLetterList coverLetters={coverLetters} />
        </div>
      </div>
    </div>
  );
}
