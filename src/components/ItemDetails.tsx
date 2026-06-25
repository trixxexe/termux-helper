import { useState, useEffect } from "react";
import { X, Bookmark, Globe, ArrowLeft, Terminal as TermIcon, ShieldAlert, BadgeCheck, HelpCircle, Heart, Star } from "lucide-react";
import { motion } from "motion/react";
import Terminal from "./Terminal";

interface ItemDetailsProps {
  item: any;
  type: "package" | "language" | "command" | "error";
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export default function ItemDetails({ item, type, onClose, isBookmarked, onToggleBookmark }: ItemDetailsProps) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Scroll window to top when detail opens
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [item]);

  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex items-center justify-between py-2 select-none">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors group cursor-pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to list
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onToggleBookmark();
              setLiked(true);
              setTimeout(() => setLiked(false), 1200);
            }}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer relative ${
              isBookmarked
                ? "bg-amber-500/10 border-amber-500/40 text-amber-400"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10"
            }`}
          >
            <Bookmark size={18} className={isBookmarked ? "fill-amber-400" : ""} />
            {liked && (
              <motion.span
                initial={{ opacity: 1, y: 0, scale: 0.8 }}
                animate={{ opacity: 0, y: -20, scale: 1.4 }}
                className="absolute inset-0 flex items-center justify-center text-amber-400 pointer-events-none"
              >
                <Star size={16} className="fill-amber-400" />
              </motion.span>
            )}
          </button>
        </div>
      </div>

      {/* Hero Visual Card */}
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                {type}
              </span>
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                item.difficulty === "beginner"
                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                  : item.difficulty === "intermediate"
                  ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400"
                  : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
              }`}>
                {item.difficulty || "intermediate"}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-100 tracking-tight">
              {item.name || item.title || item.command}
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl">
              {item.description || item.symptoms}
            </p>
          </div>

          {item.homepage && (
            <a
              href={item.homepage}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 self-start sm:self-center px-4 py-2.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl text-xs font-semibold text-white/90 hover:text-white transition-all select-none"
            >
              <Globe size={14} /> Official Site
            </a>
          )}
        </div>
      </div>

      {/* Conditionally Render Information Blocks based on Item Type */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left main pane */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Terminal / Installation Action Blocks */}
          {(type === "package" || type === "language") && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 flex items-center gap-1.5 pl-1 select-none">
                <TermIcon size={12} className="text-cyan-400" /> Terminal Installation Simulation
              </h4>
              <Terminal
                initialCommand={item.installCmd}
                expectedOutput={`pkg install ${item.name || item.id} -y\nProcessing mirrors...\nDownloading binaries...\nVerifying packages...\nDone!`}
              />
            </div>
          )}

          {type === "command" && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 flex items-center gap-1.5 pl-1 select-none">
                <TermIcon size={12} className="text-emerald-400" /> Command Runner Sandbox
              </h4>
              <Terminal
                initialCommand={item.command}
                expectedOutput={item.expectedOutput || "Command ran successfully!"}
              />
            </div>
          )}

          {/* 2. Error Code Step-by-Step Fix */}
          {type === "error" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5">
                <h4 className="text-sm font-semibold text-rose-300 flex items-center gap-1.5 mb-2 select-none">
                  <ShieldAlert size={16} /> Diagnostic Cause
                </h4>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed">{item.cause}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 space-y-3">
                <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5 select-none">
                  <BadgeCheck size={16} /> Recommended Fix Instructions
                </h4>
                <div className="whitespace-pre-line text-slate-300 text-xs md:text-sm leading-relaxed font-mono p-3 rounded-xl bg-slate-950/80 border border-slate-900/60">
                  {item.fix}
                </div>
              </div>

              {item.alternative && (
                <div className="rounded-2xl border border-slate-800/40 bg-slate-900/20 p-5">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 select-none">Alternative approach</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.alternative}</p>
                </div>
              )}
            </div>
          )}

          {/* 3. Package Examples */}
          {item.examples && item.examples.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 pl-1 select-none">Practical Examples</h4>
              <div className="space-y-3">
                {item.examples.map((ex: any, idx: number) => (
                  <div key={idx} className="rounded-2xl border border-slate-800/60 bg-slate-900/10 p-4 space-y-2">
                    <span className="text-xs font-semibold text-slate-200 block">{ex.t || ex.title}</span>
                    <p className="text-xs text-slate-400 leading-relaxed">{ex.d || ex.desc}</p>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/80 border border-slate-900 font-mono text-xs text-cyan-300 overflow-x-auto">
                      <span>{ex.c || ex.cmd}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Language Hello World Sample Project */}
          {item.helloWorld && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 pl-1 select-none">Hello World Template</h4>
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950 overflow-hidden">
                <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800/60 flex items-center justify-between select-none">
                  <span className="text-xs font-mono text-slate-400">{item.helloWorld.filename}</span>
                  <span className="text-[10px] text-slate-500 font-mono">Starter File</span>
                </div>
                <pre className="p-4 font-mono text-xs text-violet-300 overflow-x-auto bg-slate-950">
                  {item.helloWorld.code}
                </pre>
                <div className="bg-slate-950/80 px-4 py-2.5 border-t border-slate-900 text-xs font-mono text-slate-500 flex items-center justify-between">
                  <span>To compile/execute:</span>
                  <span className="text-slate-300 font-semibold">{item.helloWorld.runCmd}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right side info cards sidebar */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Meta Stats */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4 backdrop-blur-md shadow-lg">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block select-none">Package Parameters</span>
            <div className="grid grid-cols-2 gap-3.5 select-none">
              <div className="p-3.5 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Category</span>
                <span className="text-sm font-semibold text-slate-200 mt-0.5 block">{item.category || "Development"}</span>
              </div>
              <div className="p-3.5 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Version status</span>
                <span className="text-sm font-semibold text-slate-200 mt-0.5 block">{item.version || "Stable"}</span>
              </div>
            </div>

            {/* Verification / Upgrade lists */}
            {item.verifyCmd && (
              <div className="space-y-1 select-none">
                <span className="text-[10px] text-slate-500 uppercase font-mono pl-1">How to verify version</span>
                <div className="font-mono text-xs p-2.5 rounded-xl bg-black/40 border border-white/5 text-slate-300">
                  {item.verifyCmd}
                </div>
              </div>
            )}

            {/* Dependencies list */}
            {item.dependencies && item.dependencies.length > 0 && (
              <div className="space-y-2 select-none">
                <span className="text-[10px] text-slate-500 uppercase font-mono pl-1">Core Dependencies</span>
                <div className="flex flex-wrap gap-1.5">
                  {item.dependencies.map((dep: string) => (
                    <span key={dep} className="text-xs font-mono px-2 py-1 rounded-lg bg-white/10 border border-white/5 text-slate-200">
                      {dep}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Libs */}
            {item.recommendedLibs && item.recommendedLibs.length > 0 && (
              <div className="space-y-2 select-none">
                <span className="text-[10px] text-slate-500 uppercase font-mono pl-1">Recommended Libraries</span>
                <div className="flex flex-wrap gap-1.5">
                  {item.recommendedLibs.map((lib: string) => (
                    <span key={lib} className="text-xs font-mono px-2 py-1 rounded-lg bg-white/10 border border-white/5 text-slate-200">
                      {lib}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Troubleshooting Warning card */}
          {item.troubleshooting && (
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5 space-y-2 select-none backdrop-blur-md shadow-md">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase font-mono">
                <ShieldAlert size={14} /> Attention / Known Issue
              </span>
              <p className="text-slate-300 text-xs leading-relaxed">
                {item.troubleshooting}
              </p>
            </div>
          )}

          {/* Common Errors List for Languages */}
          {item.commonErrors && item.commonErrors.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4 backdrop-blur-md shadow-lg">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block select-none">Common Compilation Errors</span>
              <div className="space-y-4">
                {item.commonErrors.map((err: any, idx: number) => (
                  <div key={idx} className="space-y-1.5">
                    <span className="text-xs font-mono text-rose-400 block font-semibold">↳ {err.error}</span>
                    <p className="text-xs text-slate-400 leading-normal pl-3 border-l border-white/10">{err.fix}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
}
