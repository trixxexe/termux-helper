import { useState, useEffect, useRef } from "react";
import { Search, Terminal as TermIcon, FileText, AlertTriangle, ChevronRight, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { commands, packages, languages, errorGuides, Command, Package, Language, ErrorGuide } from "../data/db";

interface SpotlightSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (type: "package" | "language" | "command" | "error", item: any) => void;
}

export default function SpotlightSearch({ isOpen, onClose, onSelectResult }: SpotlightSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{
    commands: Command[];
    packages: Package[];
    languages: Language[];
    errors: ErrorGuide[];
  }>({ commands: [], packages: [], languages: [], errors: [] });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults({ commands: [], packages: [], languages: [], errors: [] });
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ commands: [], packages: [], languages: [], errors: [] });
      return;
    }

    const q = query.toLowerCase();

    // Command matching
    const matchedCommands = commands.filter(
      (c) =>
        c.command.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );

    // Package matching
    const matchedPackages = packages.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );

    // Language matching
    const matchedLanguages = languages.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q)
    );

    // Troubleshooting matching
    const matchedErrors = errorGuides.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.symptoms.toLowerCase().includes(q) ||
        e.cause.toLowerCase().includes(q)
    );

    setResults({
      commands: matchedCommands,
      packages: matchedPackages,
      languages: matchedLanguages,
      errors: matchedErrors
    });
  }, [query]);

  const hasResults =
    results.commands.length > 0 ||
    results.packages.length > 0 ||
    results.languages.length > 0 ||
    results.errors.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-2xl"
          />

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ type: "spring", duration: 0.35 }}
            className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl flex flex-col max-h-[70vh]"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/5">
              <Search className="text-orange-400 shrink-0" size={20} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type package, command, or error code (e.g. python, git, permission)..."
                className="w-full bg-transparent border-none text-slate-100 placeholder-slate-500 text-sm md:text-base focus:outline-none focus:ring-0"
              />
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-100 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Results Body */}
            <div className="overflow-y-auto p-4 scroll-momentum flex-1 space-y-4">
              {!query.trim() ? (
                <div className="text-center py-10 space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto text-orange-400 border border-white/10">
                    <Search size={22} />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200">Spotlight Search is Live</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Search over commands, packages, shell structures, environments, and troubleshooting guides in real-time.
                  </p>
                </div>
              ) : !hasResults ? (
                <div className="text-center py-10 space-y-2 select-none">
                  <span className="text-3xl">🔍</span>
                  <h4 className="text-sm font-semibold text-slate-400">No match found</h4>
                  <p className="text-xs text-slate-600">Try checking spelling or type another tag category.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Packages Section */}
                  {results.packages.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold font-mono tracking-widest text-slate-500 uppercase block pl-1">
                        📦 Packages ({results.packages.length})
                      </span>
                      {results.packages.map((pkg) => (
                        <button
                          key={pkg.id}
                          onClick={() => onSelectResult("package", pkg)}
                          className="w-full text-left p-3 rounded-xl border border-slate-800/40 bg-slate-950/20 hover:bg-cyan-500/5 hover:border-cyan-500/30 transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <div>
                            <span className="font-semibold text-sm text-slate-200 group-hover:text-cyan-300 transition-colors">
                              {pkg.name}
                            </span>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{pkg.description}</p>
                          </div>
                          <ChevronRight size={14} className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Languages Section */}
                  {results.languages.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold font-mono tracking-widest text-slate-500 uppercase block pl-1">
                        🐍 Languages ({results.languages.length})
                      </span>
                      {results.languages.map((lang) => (
                        <button
                          key={lang.id}
                          onClick={() => onSelectResult("language", lang)}
                          className="w-full text-left p-3 rounded-xl border border-slate-800/40 bg-slate-950/20 hover:bg-violet-500/5 hover:border-violet-500/30 transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <div>
                            <span className="font-semibold text-sm text-slate-200 group-hover:text-violet-300 transition-colors">
                              {lang.name}
                            </span>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{lang.description}</p>
                          </div>
                          <ChevronRight size={14} className="text-slate-600 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Commands Section */}
                  {results.commands.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold font-mono tracking-widest text-slate-500 uppercase block pl-1">
                        💻 Commands ({results.commands.length})
                      </span>
                      {results.commands.map((cmd) => (
                        <button
                          key={cmd.id}
                          onClick={() => onSelectResult("command", cmd)}
                          className="w-full text-left p-3 rounded-xl border border-slate-800/40 bg-slate-950/20 hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex-1 min-w-0 pr-4">
                            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded">
                              {cmd.command}
                            </span>
                            <p className="text-xs text-slate-500 mt-1.5 line-clamp-1">{cmd.description}</p>
                          </div>
                          <ChevronRight size={14} className="text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Troubleshooting Section */}
                  {results.errors.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold font-mono tracking-widest text-slate-500 uppercase block pl-1">
                        ⚠️ Error Fixes ({results.errors.length})
                      </span>
                      {results.errors.map((err) => (
                        <button
                          key={err.id}
                          onClick={() => onSelectResult("error", err)}
                          className="w-full text-left p-3 rounded-xl border border-slate-800/40 bg-slate-950/20 hover:bg-rose-500/5 hover:border-rose-500/30 transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <div>
                            <span className="font-semibold text-sm text-slate-200 group-hover:text-rose-300 transition-colors">
                              {err.title}
                            </span>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{err.symptoms}</p>
                          </div>
                          <ChevronRight size={14} className="text-slate-600 group-hover:text-rose-400 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
