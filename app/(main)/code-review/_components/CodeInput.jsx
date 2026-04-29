"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { 
  Code2, 
  Settings2, 
  Type, 
  WrapText, 
  Map, 
  Palette,
  Check
} from "lucide-react";

const themes = ["vs-dark", "light"];
const languages = [
  "javascript", "typescript", "python", "java", "cpp", "c", "csharp",
  "html", "css", "json", "sql", "markdown", "xml", "php", "go",
  "rust", "swift", "dart", "ruby", "kotlin", "shell"
];
const fontSizes = [12, 14, 16, 18, 20, 22];

const CodeInput = ({ code, setCode }) => {
  const [options, setOptions] = useState({
    fontSize: 16,
    minimap: { enabled: true },
    wordWrap: "off",
    theme: "vs-dark",
    language: "javascript",
  });

  const handleToggle = (key, value) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="w-full mx-auto max-w-5xl rounded-[2rem] overflow-hidden border border-white/10 bg-[#1e1e1e] shadow-2xl">
      {/* Premium Editor Toolbar */}
      <div className="bg-white/5 backdrop-blur-md px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
        <div className="flex items-center gap-6">
          {/* Language Selector */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all group">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <select
              className="bg-transparent outline-none text-xs font-bold text-white/70 group-hover:text-white cursor-pointer"
              value={options.language}
              onChange={(e) => handleToggle("language", e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang} className="bg-[#1e1e1e] text-white">
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Selector */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all group">
            <Palette className="w-4 h-4 text-purple-400" />
            <select
              className="bg-transparent outline-none text-xs font-bold text-white/70 group-hover:text-white cursor-pointer"
              value={options.theme}
              onChange={(e) => handleToggle("theme", e.target.value)}
            >
              {themes.map((theme) => (
                <option key={theme} value={theme} className="bg-[#1e1e1e] text-white">
                  {theme === "vs-dark" ? "DARK MODE" : "LIGHT MODE"}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 hover:border-pink-500/50 transition-all group">
            <Type className="w-4 h-4 text-pink-400" />
            <select
              className="bg-transparent outline-none text-xs font-bold text-white/70 group-hover:text-white cursor-pointer"
              value={options.fontSize}
              onChange={(e) => handleToggle("fontSize", parseInt(e.target.value))}
            >
              {fontSizes.map((size) => (
                <option key={size} value={size} className="bg-[#1e1e1e] text-white">
                  {size}PX
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleToggle("wordWrap", options.wordWrap === "on" ? "off" : "on")}
            className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 ${
              options.wordWrap === "on" ? "bg-cyan-500/20 border-cyan-500 text-cyan-400" : "bg-white/5 border-white/10 text-white/40 hover:text-white"
            }`}
          >
            <WrapText className="w-3.5 h-3.5" />
            Word Wrap
          </button>

          <button
            onClick={() => handleToggle("minimap", { enabled: !options.minimap.enabled })}
            className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 ${
              options.minimap.enabled ? "bg-purple-500/20 border-purple-500 text-purple-400" : "bg-white/5 border-white/10 text-white/40 hover:text-white"
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            Minimap
          </button>
        </div>
      </div>

      <Editor
        height="60vh"
        width="100%"
        language={options.language}
        theme={options.theme}
        value={code}
        onChange={setCode}
        options={{
          fontSize: options.fontSize,
          minimap: { enabled: options.minimap.enabled },
          lineNumbers: "on",
          wordWrap: options.wordWrap,
          scrollBeyondLastLine: true,
          automaticLayout: true,
          padding: { top: 20, bottom: 20 },
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,
          fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
          fontLigatures: true,
        }}
      />
    </div>
  );
};

export default CodeInput;