"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateCoverLetter } from "@/actions/cover-letter";
import useFetch from "@/hooks/use-fetch";
import { coverLetterSchema } from "@/app/lib/schema";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { Sparkles, Briefcase, Building2, FileText, ArrowRight } from "lucide-react";

export default function CoverLetterGenerator() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
  });

  const {
    loading: generating,
    fn: generateLetterFn,
    data: generatedLetter,
  } = useFetch(generateCoverLetter);

  useEffect(() => {
    if (generatedLetter) {
      toast.success("Cover letter generated successfully!");
      router.push(`/ai-cover-letter/${generatedLetter.id}`);
      reset();
    }
  }, [generatedLetter]);

  const onSubmit = async (data) => {
    try {
      await generateLetterFn(data);
    } catch (error) {
      toast.error(error.message || "Failed to generate cover letter");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl font-bold gradient-title mb-4 tracking-tight">AI Cover Letter Master</h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Craft a compelling, tailored cover letter in seconds. Let our AI analyze the job requirements and highlight your strengths.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 z-0 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="bg-white/5 border-b border-white/10 px-8 py-6 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                <FileText className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Application Details</h2>
                <p className="text-xs text-white/40 uppercase tracking-widest font-medium">Step 1: Context Setting</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium text-white/70 flex items-center gap-2 mb-1.5">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  placeholder="e.g. Google, Apple, Tesla"
                  className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50 h-12 rounded-xl transition-all"
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-red-400 mt-1">
                    {errors.companyName.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-sm font-medium text-white/70 flex items-center gap-2 mb-1.5">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g. Senior Frontend Developer"
                  className="bg-white/5 border-white/10 text-white focus:border-purple-500/50 h-12 rounded-xl transition-all"
                  {...register("jobTitle")}
                />
                {errors.jobTitle && (
                  <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-red-400 mt-1">
                    {errors.jobTitle.message}
                  </motion.p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription" className="text-sm font-medium text-white/70 flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-pink-400" />
                Job Description
              </Label>
              <div className="relative group">
                <Textarea
                  id="jobDescription"
                  placeholder="Paste the key requirements and responsibilities here..."
                  className="min-h-[200px] bg-white/5 border-white/10 text-white focus:border-pink-500/50 rounded-2xl transition-all resize-none custom-scrollbar p-5"
                  {...register("jobDescription")}
                />
                <div className="absolute bottom-4 right-4 text-white/20 text-[10px] uppercase tracking-widest font-bold group-focus-within:text-pink-500/40 transition-colors">
                  AI Context Loader
                </div>
              </div>
              {errors.jobDescription && (
                <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-red-400 mt-1">
                  {errors.jobDescription.message}
                </motion.p>
              )}
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={generating}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-lg shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all group"
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Analyzing & Drafting...
                  </>
                ) : (
                  <>
                    Generate Professional Cover Letter
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
