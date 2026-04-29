'use client';

import { motion } from 'framer-motion';
import { 
  Compass, 
  Map, 
  Sparkles, 
  ChevronRight, 
  Code2, 
  Server, 
  Settings, 
  Layers, 
  Cpu, 
  Database, 
  Smartphone, 
  ShieldCheck, 
  Palette, 
  Gamepad2, 
  PenTool, 
  Briefcase, 
  Users, 
  LineChart,
  Binary
} from 'lucide-react';

const roles = [
  { name: 'Frontend', icon: Code2, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { name: 'Backend', icon: Server, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { name: 'Full Stack', icon: Layers, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { name: 'AI Engineer', icon: Cpu, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { name: 'DevOps', icon: Settings, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { name: 'Data Analyst', icon: LineChart, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { name: 'AI and Data Scientist', icon: Binary, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { name: 'Android', icon: Smartphone, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { name: 'iOS', icon: Smartphone, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { name: 'PostgreSQL', icon: Database, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { name: 'Blockchain', icon: Layers, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { name: 'QA', icon: ShieldCheck, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { name: 'Software Architect', icon: Map, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { name: 'Cyber Security', icon: ShieldCheck, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { name: 'UX Design', icon: Palette, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { name: 'Game Developer', icon: Gamepad2, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { name: 'Technical Writer', icon: PenTool, color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20' },
  { name: 'Product Manager', icon: Briefcase, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { name: 'Engineering Manager', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { name: 'Prompt Engineering', icon: Sparkles, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' }
];

const pdfBase = 'https://roadmap.sh/pdfs/roadmaps/';
const roleLinks = {
  'Frontend': `https://docs.google.com/viewer?url=${pdfBase}frontend.pdf&embedded=true`,
  'Backend': `https://docs.google.com/viewer?url=${pdfBase}backend.pdf&embedded=true`,
  'DevOps': `https://docs.google.com/viewer?url=${pdfBase}devops.pdf&embedded=true`,
  'Full Stack': `https://docs.google.com/viewer?url=${pdfBase}full-stack.pdf&embedded=true`,
  'AI Engineer': `https://docs.google.com/viewer?url=${pdfBase}ai-engineer.pdf&embedded=true`,
  'Data Analyst': `https://docs.google.com/viewer?url=${pdfBase}data-analyst.pdf&embedded=true`,
  'AI and Data Scientist': `https://docs.google.com/viewer?url=${pdfBase}ai-data-scientist.pdf&embedded=true`,
  'Android': `https://docs.google.com/viewer?url=${pdfBase}android.pdf&embedded=true`,
  'iOS': `https://docs.google.com/viewer?url=${pdfBase}ios.pdf&embedded=true`,
  'PostgreSQL': `https://docs.google.com/viewer?url=${pdfBase}postgresql-dba.pdf&embedded=true`,
  'Blockchain': `https://docs.google.com/viewer?url=${pdfBase}blockchain.pdf&embedded=true`,
  'QA': `https://docs.google.com/viewer?url=${pdfBase}qa.pdf&embedded=true`,
  'Software Architect': `https://docs.google.com/viewer?url=${pdfBase}software-architect.pdf&embedded=true`,
  'Cyber Security': `https://docs.google.com/viewer?url=${pdfBase}cyber-security.pdf&embedded=true`,
  'UX Design': `https://docs.google.com/viewer?url=${pdfBase}ux-design.pdf&embedded=true`,
  'Game Developer': `https://docs.google.com/viewer?url=${pdfBase}game-developer.pdf&embedded=true`,
  'Technical Writer': `https://docs.google.com/viewer?url=${pdfBase}technical-writer.pdf&embedded=true`,
  'Product Manager': `https://docs.google.com/viewer?url=${pdfBase}product-manager.pdf&embedded=true`,
  'Engineering Manager': `https://docs.google.com/viewer?url=${pdfBase}engineering-manager.pdf&embedded=true`,
  'Prompt Engineering': `https://docs.google.com/viewer?url=${pdfBase}prompt-engineering.pdf&embedded=true`
};

export default function Page() {
  const handleRoleClick = (role) => {
    window.open(roleLinks[role], '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-12">
      {/* Premium Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">
          <Compass className="w-4 h-4" />
          Career Navigator
        </div>
        <h1 className="text-6xl font-black text-white tracking-tighter">Explore Roadmaps</h1>
        <p className="text-white/40 text-lg italic leading-relaxed">
          "A roadmap is not a rulebook — it's your professional compass through the chaos of modern technology."
        </p>
      </motion.div>

      {/* Grid of Roadmaps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
        {roles.map((role, index) => (
          <motion.div
            key={role.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => handleRoleClick(role.name)}
            className="group relative cursor-pointer"
          >
            <div className={`absolute inset-0 ${role.bg} blur-2xl rounded-[2.5rem] opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>
            
            <div className={`relative glass-card rounded-[2.5rem] border ${role.border} p-8 flex flex-col items-center text-center gap-6 h-full transition-all duration-300 group-hover:translate-y-[-10px] group-hover:bg-white/10 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]`}>
              <div className={`w-16 h-16 rounded-[1.5rem] ${role.bg} flex items-center justify-center border ${role.border} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                <role.icon className={`w-8 h-8 ${role.color}`} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">{role.name}</h3>
                <div className="flex items-center justify-center gap-2 text-white/20 text-[10px] font-black uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                  View Roadmap
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Callout */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="pt-20 text-center"
      >
        <p className="text-white/20 text-xs font-bold uppercase tracking-[0.5em]">Powered by Roadmap.sh</p>
      </motion.div>
    </div>
  );
}