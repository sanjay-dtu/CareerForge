"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { 
  Edit2, 
  Eye, 
  Trash2, 
  Calendar, 
  Building2, 
  Briefcase,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCoverLetter } from "@/actions/cover-letter";
import { motion } from "framer-motion";

export default function CoverLetterList({ coverLetters }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  if (!coverLetters?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-2xl">
          <FileText className="w-10 h-10 text-white/20" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">No Cover Letters Yet</h3>
        <p className="text-white/40 max-w-md">
          Create your first professional cover letter using our AI-powered generator to start your application journey.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
      {coverLetters.map((letter, index) => (
        <motion.div
          key={letter.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="group glass-card rounded-[2rem] border border-white/5 hover:border-cyan-500/30 p-6 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
             <AlertDialog>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push(`/ai-cover-letter/${letter.id}`)}
                    className="h-9 w-9 rounded-full bg-white/5 hover:bg-cyan-500 hover:text-black transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-white/5 hover:bg-red-500 hover:text-white transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                </div>
                <AlertDialogContent className="bg-[#0a0a0a] border-white/10 rounded-3xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white text-xl">Delete Cover Letter?</AlertDialogTitle>
                    <AlertDialogDescription className="text-white/60">
                      This will permanently remove your cover letter for <span className="text-cyan-400 font-bold">{letter.jobTitle}</span> at <span className="text-purple-400 font-bold">{letter.companyName}</span>.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-full bg-white/5 border-white/10 text-white hover:bg-white/10">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(letter.id)}
                      className="rounded-full bg-red-500 hover:bg-red-600 text-white border-none"
                    >
                      Delete Permanently
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 shrink-0">
                <Briefcase className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="pr-12">
                <h3 className="text-xl font-bold text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">
                  {letter.jobTitle}
                </h3>
                <div className="flex items-center gap-2 text-white/40 text-sm mt-1">
                  <Building2 className="w-3.5 h-3.5" />
                  <span className="font-medium">{letter.companyName}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
               <p className="text-white/60 text-sm line-clamp-2 italic leading-relaxed">
                "{letter.jobDescription}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white/20 uppercase tracking-widest">
                <Calendar className="w-3.5 h-3.5" />
                {format(new Date(letter.createdAt), "MMM d, yyyy")}
              </div>
              <Button 
                variant="link" 
                className="text-cyan-400 p-0 h-auto font-bold text-sm hover:text-cyan-300 group-hover:translate-x-1 transition-all"
                onClick={() => router.push(`/ai-cover-letter/${letter.id}`)}
              >
                View Details →
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
