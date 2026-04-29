"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
  Sparkles,
  CheckCircle2,
  Activity
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { saveResume, improveWithAI } from "@/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";
import html2pdf from "html2pdf.js";
import { motion } from "framer-motion";

export default function ResumeBuilder({ initialContent }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent || "");
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImprovingSummary, setIsImprovingSummary] = useState(false);
  const [atsScore, setAtsScore] = useState(0);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {
        fullName: "",
        email: "",
        mobile: "",
        linkedin: "",
        twitter: "",
      },
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  const watchedValues = watch();

  useEffect(() => {
    if (initialContent && activeTab === "preview") {
      setPreviewContent(initialContent);
    }
  }, [initialContent, activeTab]);

  const getContactMarkdown = () => {
    const contactInfo = watchedValues.contactInfo;
    const parts = [];
    if (contactInfo?.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo?.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo?.linkedin) parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo?.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    const userName = watchedValues.contactInfo?.fullName || user?.fullName || "Your Name";
    return parts.length > 0
      ? `# ${userName}\n\n${parts.join(" | ")}`
      : `# ${userName}`;
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = watchedValues;
    const sections = [
      getContactMarkdown(),
      summary && summary.trim() ? `## Professional Summary\n\n${summary}` : "",
      skills && skills.trim() ? `## Skills\n\n${skills}` : "",
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ];
    return sections.filter(section => section && section.trim()).join("\n\n");
  };

  const displayContent = activeTab === "edit" ? getCombinedContent() : previewContent;

  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);

  useEffect(() => {
    let score = 0;
    if (watchedValues.contactInfo?.email) score += 10;
    if (watchedValues.contactInfo?.mobile) score += 10;
    if (watchedValues.contactInfo?.linkedin) score += 10;
    if (watchedValues.summary?.length > 50) score += 20;
    if (watchedValues.skills?.length > 20) score += 10;
    if (watchedValues.experience?.length > 0) score += 20;
    if (watchedValues.education?.length > 0) score += 10;
    if (watchedValues.projects?.length > 0) score += 10;
    setAtsScore(Math.min(score, 100));
  }, [watchedValues]);

  const handleImproveSummary = async () => {
    const currentSummary = watchedValues.summary;
    if (!currentSummary) {
      toast.error("Please enter a summary first");
      return;
    }
    setIsImprovingSummary(true);
    try {
      const improved = await improveWithAI({
        current: currentSummary,
        type: "professional summary",
      });
      if (improved) {
        setValue("summary", improved);
        toast.success("Summary enhanced successfully!");
      }
    } catch (error) {
      toast.error(error.message || "Failed to improve summary");
    } finally {
      setIsImprovingSummary(false);
    }
  };

  const generatePDF = async () => {
    if (!displayContent || !displayContent.trim()) {
      toast.error("No content to download.");
      return;
    }
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      const element = document.getElementById("resume-pdf-content");
      if (!element) throw new Error("Resume element not found");
      const opt = {
        margin: [15, 15],
        filename: `resume_${new Date().getTime()}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      await html2pdf().set(opt).from(element).save();
      toast.success("PDF downloaded!");
    } catch (error) {
      toast.error("Failed to generate PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async () => {
    if (!displayContent || !displayContent.trim()) {
      toast.error("Cannot save empty resume");
      return;
    }
    try {
      await saveResumeFn(displayContent.trim());
    } catch (error) {
      toast.error("Save failed");
    }
  };

  const handleTabChange = (val) => {
    if (val === "preview" && activeTab === "edit") {
      setPreviewContent(getCombinedContent());
    }
    setActiveTab(val);
  };

  const handleSave = async () => {
    if (activeTab === "edit") {
      // Use react-hook-form's handleSubmit for the editor tab
      await handleSubmit(onSubmit)();
    } else {
      // Directly save for the markdown tab
      await onSubmit();
    }
  };

  return (
    <div data-color-mode="light" className="space-y-6 max-w-[1600px] mx-auto pb-20">
      {/* Floating Action Bar */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card sticky top-20 z-50 rounded-full px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 border border-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.15)] backdrop-blur-xl"
      >
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-2xl text-white tracking-tight">CareerForge Builder</h1>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-white/80">Strength:</span>
            <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${atsScore}%`,
                  background: atsScore > 75 ? 'linear-gradient(to right, #10b981, #34d399)' : atsScore > 40 ? 'linear-gradient(to right, #eab308, #fde047)' : 'linear-gradient(to right, #ef4444, #fca5a5)'
                }}
              />
            </div>
            <span className="text-sm font-bold text-white">{atsScore}%</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="bg-white/5 rounded-full p-1 border border-white/10 h-10 flex items-center">
            <TabsList className="bg-transparent h-full border-none">
              <TabsTrigger value="edit" className="rounded-full data-[state=active]:bg-cyan-500 data-[state=active]:text-black text-white/70 h-full px-6 text-xs font-semibold">Editor</TabsTrigger>
              <TabsTrigger value="preview" className="rounded-full data-[state=active]:bg-cyan-500 data-[state=active]:text-black text-white/70 h-full px-6 text-xs font-semibold">Markdown</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            onClick={handleSave}
            disabled={isSaving || !displayContent?.trim()}
            className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 h-10"
          >
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save
          </Button>
          
          <Button 
            onClick={generatePDF} 
            disabled={isGenerating || !displayContent?.trim()}
            className="rounded-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold h-10"
          >
            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            Export PDF
          </Button>
        </div>
      </motion.div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className={`space-y-6 ${activeTab !== "edit" ? "hidden lg:block lg:opacity-50 pointer-events-none" : ""}`}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                  <span className="text-cyan-400 font-semibold text-sm">1</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Contact Info</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Full Name</label>
                  <Input {...register("contactInfo.fullName")} placeholder="Your Full Name" className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50" />
                  {errors.contactInfo?.fullName && <p className="text-xs text-red-500">{errors.contactInfo.fullName.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Email</label>
                  <Input {...register("contactInfo.email")} type="email" placeholder="your@email.com" className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50" />
                  {errors.contactInfo?.email && <p className="text-xs text-red-500">{errors.contactInfo.email.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Mobile</label>
                  <Input {...register("contactInfo.mobile")} type="tel" placeholder="+1 234 567 8900" className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wider">LinkedIn</label>
                  <Input {...register("contactInfo.linkedin")} type="url" placeholder="https://linkedin.com/in/..." className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Twitter/X</label>
                  <Input {...register("contactInfo.twitter")} type="url" placeholder="https://twitter.com/..." className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50" />
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                    <span className="text-purple-400 font-semibold text-sm">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Summary</h3>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleImproveSummary}
                  disabled={isImprovingSummary || !watchedValues.summary}
                  className="h-8 text-xs bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300 border border-purple-500/20 rounded-full"
                >
                  {isImprovingSummary ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5 mr-1.5" />}
                  Enhance with AI
                </Button>
              </div>
              <Controller
                name="summary"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} className="h-32 bg-white/5 border-white/10 text-white focus:border-purple-500/50 resize-none" placeholder="Write a compelling professional summary..." />
                )}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/20">
                  <span className="text-pink-400 font-semibold text-sm">3</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Skills</h3>
              </div>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} className="h-24 bg-white/5 border-white/10 text-white focus:border-pink-500/50 resize-none" placeholder="React, Node.js, Python, System Design..." />
                )}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <span className="text-blue-400 font-semibold text-sm">4</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Work Experience</h3>
              </div>
              <Controller name="experience" control={control} render={({ field }) => <EntryForm type="Experience" entries={field.value || []} onChange={field.onChange} />} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <span className="text-emerald-400 font-semibold text-sm">5</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Education</h3>
              </div>
              <Controller name="education" control={control} render={({ field }) => <EntryForm type="Education" entries={field.value || []} onChange={field.onChange} />} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                  <span className="text-orange-400 font-semibold text-sm">6</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Projects</h3>
              </div>
              <Controller name="projects" control={control} render={({ field }) => <EntryForm type="Project" entries={field.value || []} onChange={field.onChange} />} />
            </motion.div>
          </form>
        </div>

        <div className={`sticky top-40 h-[calc(100vh-180px)] ${activeTab !== "preview" ? "hidden lg:block" : ""}`}>
          <div className="glass-card rounded-2xl border border-white/10 h-full overflow-hidden flex flex-col shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 z-0 pointer-events-none"></div>
            <div className="relative z-10 bg-white/5 border-b border-white/10 px-4 py-3 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-semibold text-white tracking-wide">Live Preview</span>
              </div>
              {activeTab === "preview" && (
                <Button variant="ghost" size="sm" onClick={() => setResumeMode(resumeMode === "preview" ? "live" : "preview")} className="h-7 text-xs text-white/70 hover:text-white border border-white/10 rounded-full px-3">
                  {resumeMode === "preview" ? "Edit Markdown" : "View Final"}
                </Button>
              )}
            </div>
            
            <div 
              className={`flex-1 overflow-auto relative z-10 ${
                activeTab === "edit" || resumeMode === "preview" 
                ? "bg-[#050505] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-[#050505] to-[#050505] py-8 px-4 custom-scrollbar" 
                : "bg-white"
              }`} 
            >
              <div 
                className={`${
                  activeTab === "edit" || resumeMode === "preview"
                  ? "max-w-[210mm] min-h-[297mm] mx-auto bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.1)] p-8 md:p-12 rounded-sm ring-1 ring-white/10" 
                  : "h-full bg-white text-black"
                }`}
                data-color-mode="light"
              >
                {activeTab === "edit" || (activeTab === "preview" && resumeMode === "preview") ? (
                  <MDEditor.Markdown 
                    source={displayContent} 
                    style={{ background: 'white', color: 'black' }} 
                  />
                ) : (
                  <MDEditor
                    value={previewContent}
                    onChange={setPreviewContent}
                    height="100%"
                    preview="live"
                    className="border-none !shadow-none"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <div id="resume-pdf-content" style={{ width: '210mm', minHeight: '297mm', padding: '20mm', backgroundColor: 'white', fontFamily: 'Arial, sans-serif', fontSize: '12pt', lineHeight: '1.6', color: 'black' }}>
          <MDEditor.Markdown source={displayContent} style={{ background: 'white', color: 'black' }} />
        </div>
      </div>
    </div>
  );
}