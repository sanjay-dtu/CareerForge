"use client";

import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Save, 
  Loader2, 
  Monitor, 
  FileText, 
  History,
  Maximize2,
  Edit3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";
import { updateCoverLetter } from "@/actions/cover-letter";
import useFetch from "@/hooks/use-fetch";

const CoverLetterPreview = ({ id, content: initialContent }) => {
  const [content, setContent] = useState(initialContent);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeMode, setResumeMode] = useState("preview"); // 'preview' or 'live'
  const [isFullScreen, setIsFullScreen] = useState(false);

  const {
    loading: isSaving,
    fn: updateLetterFn,
    data: saveResult,
  } = useFetch(updateCoverLetter);

  useEffect(() => {
    if (saveResult) {
      toast.success("Cover letter updated successfully!");
    }
  }, [saveResult]);

  const handleSave = async () => {
    if (!content?.trim()) {
      toast.error("Cannot save empty content");
      return;
    }
    try {
      await updateLetterFn(id, content.trim());
    } catch (error) {
      toast.error("Failed to save changes");
    }
  };

  const generatePDF = async () => {
    if (!content?.trim()) {
      toast.error("No content to export");
      return;
    }

    setIsGenerating(true);
    try {
      const element = document.getElementById("cover-letter-pdf-content");
      if (!element) throw new Error("Element not found");

      const opt = {
        margin: [20, 20],
        filename: `cover_letter_${id}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
      toast.success("PDF downloaded!");
    } catch (error) {
      toast.error("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Premium Toolbar */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-full px-6 py-3 flex flex-wrap justify-between items-center gap-4 border border-white/10 shadow-xl backdrop-blur-xl sticky top-20 z-40"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <Edit3 className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-white/80">Editor Mode</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
          <div className="flex items-center gap-2 text-white/40 text-xs font-medium uppercase tracking-widest">
            <History className="w-3.5 h-3.5" />
            Auto-Sync Ready
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setResumeMode(resumeMode === "preview" ? "live" : "preview")}
            className="rounded-full h-9 bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 px-4"
          >
            {resumeMode === "preview" ? (
              <><Edit3 className="w-4 h-4 mr-2" /> Markdown Editor</>
            ) : (
              <><Monitor className="w-4 h-4 mr-2" /> Visual Preview</>
            )}
          </Button>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-full h-9 bg-white/10 hover:bg-white/20 text-white border border-white/10 px-6 transition-all"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>

          <Button 
            onClick={generatePDF} 
            disabled={isGenerating}
            className="rounded-full h-9 bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-6 shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
            Export PDF
          </Button>
        </div>
      </motion.div>

      {/* Main Split Layout */}
      <div className={`grid grid-cols-1 ${resumeMode === "preview" ? "lg:grid-cols-1" : "lg:grid-cols-2"} gap-6`}>
        {/* Left Side: Markdown Editor */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`glass-card rounded-3xl overflow-hidden border border-white/5 flex flex-col min-h-[700px] ${resumeMode === "preview" ? "hidden" : "block"}`}
        >
          <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-bold text-white tracking-wide">Markdown Content</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white" onClick={() => setIsFullScreen(!isFullScreen)}>
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1" data-color-mode="dark">
            <MDEditor
              value={content}
              onChange={setContent}
              height="100%"
              preview="edit"
              hideToolbar={false}
              className="border-none !bg-transparent min-h-[600px] custom-scrollbar"
            />
          </div>
        </motion.div>

        {/* Right Side: Visual A4 Preview */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`flex flex-col h-full ${resumeMode === "preview" ? "col-span-full" : ""}`}
        >
          <div className="glass-card rounded-3xl border border-white/10 h-full overflow-hidden flex flex-col shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 z-0 pointer-events-none"></div>
            <div className="relative z-10 bg-white/5 border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-white tracking-wide uppercase">Physical A4 Preview</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto bg-[#050505] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-[#050505] to-[#050505] py-12 px-4 custom-scrollbar relative z-10">
              {/* The Paper */}
              <div 
                className="max-w-[210mm] min-h-[297mm] mx-auto bg-white text-black shadow-[0_0_60px_rgba(255,255,255,0.05)] p-12 md:p-20 rounded-sm ring-1 ring-white/10"
                data-color-mode="light"
              >
                <MDEditor.Markdown 
                  source={content} 
                  style={{ background: 'white', color: 'black', fontSize: '1.1rem' }} 
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hidden PDF Container for High-Quality Export */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0, opacity: 0 }}>
        <div 
          id="cover-letter-pdf-content" 
          style={{ 
            width: '210mm', 
            minHeight: '297mm', 
            padding: '25mm 25mm', 
            backgroundColor: 'white', 
            color: 'black', 
            fontFamily: "'Times New Roman', Times, serif", 
            fontSize: '12pt', 
            lineHeight: '1.5',
            textAlign: 'left'
          }}
          className="prose prose-slate max-w-none"
        >
          <style>{`
            #cover-letter-pdf-content h1 { font-size: 22pt; margin-bottom: 25pt; text-align: center; color: #000; font-weight: bold; border-bottom: 1px solid #eee; padding-bottom: 10pt; }
            #cover-letter-pdf-content h2 { font-size: 14pt; margin-top: 15pt; margin-bottom: 8pt; color: #333; font-weight: bold; }
            #cover-letter-pdf-content p { margin-bottom: 12pt; white-space: pre-wrap; }
            #cover-letter-pdf-content ul { margin-bottom: 12pt; padding-left: 15pt; }
            #cover-letter-pdf-content li { margin-bottom: 4pt; }
            #cover-letter-pdf-content strong { font-weight: bold; }
            #cover-letter-pdf-content hr { border: none; border-top: 1px solid #ddd; margin: 20pt 0; }
          `}</style>
          <MDEditor.Markdown 
            source={content} 
            style={{ background: 'white', color: 'black' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPreview;
