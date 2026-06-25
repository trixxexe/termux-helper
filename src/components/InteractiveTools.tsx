import React, { useState } from "react";
import { Sparkles, Terminal as TermIcon, Copy, Check, Save, HardDrive, Cpu, Plus, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function InteractiveTools() {
  const [activeTool, setActiveTool] = useState<"generator" | "prompt" | "alias" | "storage">("generator");

  // State for Command Generator
  const [selectedTools, setSelectedTools] = useState<string[]>(["git"]);
  const [useMirrorUpdate, setUseMirrorUpdate] = useState(true);
  const [copiedScript, setCopiedScript] = useState(false);

  // State for Alias Builder
  const [aliases, setAliases] = useState<{ key: string; command: string }[]>([
    { key: "update", command: "pkg update && pkg upgrade -y" },
    { key: "gs", command: "git status" },
    { key: "py", command: "python" }
  ]);
  const [newAliasKey, setNewAliasKey] = useState("");
  const [newAliasCmd, setNewAliasCmd] = useState("");
  const [copiedAliases, setCopiedAliases] = useState(false);

  // State for Shell Customizer
  const [selectedPrompt, setSelectedPrompt] = useState<"standard" | "starship" | "cyberpunk">("starship");
  const [copiedPromptCode, setCopiedPromptCode] = useState(false);

  // State for Storage Estimator
  const [selectedEstimatorPackages, setSelectedEstimatorPackages] = useState<string[]>(["python", "git"]);

  const toggleToolSelection = (toolId: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    );
  };

  const getGeneratedScript = () => {
    const pkgs = selectedTools.join(" ");
    let base = useMirrorUpdate ? "pkg update && pkg upgrade -y" : "";
    if (pkgs.length > 0) {
      if (base) base += " && ";
      base += `pkg install ${pkgs} -y`;
    }
    return base || "echo 'Select packages to generate script!'";
  };

  const handleCopyScript = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddAlias = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAliasKey.trim() || !newAliasCmd.trim()) return;
    setAliases((prev) => [...prev, { key: newAliasKey.trim(), command: newAliasCmd.trim() }]);
    setNewAliasKey("");
    setNewAliasCmd("");
  };

  const handleRemoveAlias = (index: number) => {
    setAliases((prev) => prev.filter((_, idx) => idx !== index));
  };

  const getAliasScriptBlock = () => {
    return aliases.map((a) => `alias ${a.key}="${a.command}"`).join("\n");
  };

  // Static package lists with metadata
  const generatorOptions = [
    { id: "git", label: "Git VCS", icon: "📦", cat: "VCS", size: 45 },
    { id: "python", label: "Python 3", icon: "🐍", cat: "Language", size: 120 },
    { id: "nodejs", label: "Node.js (LTS)", icon: "🟢", cat: "Language", size: 85 },
    { id: "rust", label: "Rust & Cargo", icon: "🦀", cat: "Language", size: 210 },
    { id: "neovim", label: "Neovim IDE", icon: "⚡", cat: "Editor", size: 30 },
    { id: "tmux", label: "Tmux multiplexer", icon: "📺", cat: "Utils", size: 8 },
    { id: "fastfetch", label: "Fastfetch Stats", icon: "📊", cat: "Utils", size: 5 },
    { id: "zsh", label: "Zsh Extended Shell", icon: "🐚", cat: "Custom", size: 15 },
    { id: "starship", label: "Starship Prompt", icon: "⭐", cat: "Custom", size: 22 },
    { id: "proot-distro", label: "PRoot Distro manager", icon: "🐧", cat: "Distro", size: 10 },
    { id: "curl", label: "Curl Fetcher", icon: "🌍", cat: "Network", size: 4 },
    { id: "wget", label: "Wget Downloader", icon: "📥", cat: "Network", size: 3 }
  ];

  const packageSizes: Record<string, { label: string; size: number }> = {
    python: { label: "Python standard environment & pip", size: 120 },
    git: { label: "Git version control runtime", size: 45 },
    nodejs: { label: "NodeJS runtime, npm & npx", size: 85 },
    rust: { label: "Rustup toolchain & Cargo compiler", size: 210 },
    neovim: { label: "Neovim text editor core packages", size: 30 },
    tmux: { label: "Terminal multiplexer system service", size: 8 },
    zsh: { label: "Zsh shell & completions", size: 15 },
    "proot-distro": { label: "PRoot container manager with namespaces", size: 12 },
    ubuntu: { label: "Full-scale Ubuntu base container", size: 250 },
    debian: { label: "Debian stability system container", size: 180 }
  };

  const getEstimatedTotalSize = () => {
    return selectedEstimatorPackages.reduce((acc, id) => acc + (packageSizes[id]?.size || 0), 40); // 40MB base Termux
  };

  return (
    <div className="space-y-6">
      {/* Header Cards with Toggle Pill Menu */}
      <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-1.5 flex flex-wrap gap-1 md:gap-1.5 select-none">
        {[
          { id: "generator", label: "Command Generator", desc: "Build master setups" },
          { id: "alias", label: "Alias Builder", desc: "Speed shortcuts" },
          { id: "prompt", label: "Prompt Customizer", desc: "Beautify shells" },
          { id: "storage", label: "Storage Estimator", desc: "Plan disk spaces" }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTool(t.id as any)}
            className={`flex-1 min-w-[130px] px-3 py-2.5 rounded-xl text-center transition-all duration-200 cursor-pointer ${
              activeTool === t.id
                ? "bg-white/10 text-white border border-white/20 shadow-lg font-medium"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
            }`}
          >
            <span className="block text-xs md:text-sm">{t.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTool === "generator" && (
          <motion.div
            key="generator"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 backdrop-blur-xl relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Sparkles size={80} className="text-cyan-400" />
              </div>
              <h3 className="text-lg font-display font-semibold text-slate-100 flex items-center gap-2 mb-2">
                <span className="p-1.5 bg-cyan-500/10 rounded-lg text-cyan-400"><Sparkles size={16} /></span>
                One-Click Installation Script Generator
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mb-6">
                Avoid copy-pasting multiple install lines sequentially. Tap package cards below to bundle packages into a unified master update script.
              </p>

              <div className="mb-6 flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-200">Force Full Package Update first</span>
                  <span className="text-xs text-slate-500">Executes &apos;pkg update && upgrade&apos; beforehand (Recommended)</span>
                </div>
                <button
                  onClick={() => setUseMirrorUpdate(!useMirrorUpdate)}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer ${
                    useMirrorUpdate ? "bg-cyan-500" : "bg-slate-700"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                      useMirrorUpdate ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Grid of packages to select */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                {generatorOptions.map((opt) => {
                  const selected = selectedTools.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleToolSelection(opt.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between h-24 cursor-pointer relative overflow-hidden group ${
                        selected
                          ? "bg-white/10 border-white/20 ring-1 ring-white/15"
                          : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full select-none">
                        <span className="text-2xl">{opt.icon}</span>
                        <span className="text-[10px] uppercase tracking-wider font-mono px-1.5 py-0.5 rounded bg-slate-900/90 text-slate-400 border border-slate-800/80">
                          {opt.cat}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        <span className={`block text-xs font-semibold ${selected ? "text-cyan-200" : "text-slate-300"}`}>
                          {opt.label}
                        </span>
                        <span className="block text-[10px] text-slate-500">~{opt.size} MB file size</span>
                      </div>
                      {selected && (
                        <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Generated Output */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500">Master Output Setup Script</span>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4 flex items-center justify-between font-mono text-sm leading-relaxed text-orange-200 break-all overflow-hidden relative group">
                  <span className="pr-12">{getGeneratedScript()}</span>
                  <button
                    onClick={() => handleCopyScript(getGeneratedScript(), setCopiedScript)}
                    className="absolute right-3 top-3 p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
                  >
                    {copiedScript ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTool === "alias" && (
          <motion.div
            key="alias"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 backdrop-blur-xl relative shadow-xl">
              <h3 className="text-lg font-display font-semibold text-slate-100 flex items-center gap-2 mb-2">
                <span className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400"><TermIcon size={16} /></span>
                Command Alias Builder
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mb-6">
                Tired of typing long paths repeatedly? Create shorthand abbreviations. They get converted into stable Linux terminal aliases.
              </p>

              {/* Form to add an alias */}
              <form onSubmit={handleAddAlias} className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-6 items-end">
                <div className="sm:col-span-4 space-y-1.5">
                  <label className="text-xs text-slate-400 font-mono">Shortcut Key (e.g. gp)</label>
                  <input
                    type="text"
                    value={newAliasKey}
                    onChange={(e) => setNewAliasKey(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
                    placeholder="gp"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                  />
                </div>
                <div className="sm:col-span-6 space-y-1.5">
                  <label className="text-xs text-slate-400 font-mono">Target Command (e.g. git push)</label>
                  <input
                    type="text"
                    value={newAliasCmd}
                    onChange={(e) => setNewAliasCmd(e.target.value)}
                    placeholder="git push origin main"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                  />
                </div>
                <button
                  type="submit"
                  className="sm:col-span-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-2.5 text-sm font-medium transition-all flex items-center justify-center gap-1 cursor-pointer shadow-lg shadow-indigo-950/20"
                >
                  <Plus size={16} /> Add
                </button>
              </form>

              {/* Alias Lists */}
              <div className="space-y-2 max-h-60 overflow-y-auto scroll-momentum mb-6">
                {aliases.map((a, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-lg">
                        {a.key}
                      </span>
                      <ArrowRight size={14} className="text-slate-600" />
                      <span className="font-mono text-sm text-slate-300 break-all">{a.command}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveAlias(idx)}
                      className="p-1.5 rounded-lg hover:bg-slate-800/60 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Code Blocks To Insert into .bashrc */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-500">Add to your ~/.bashrc / ~/.zshrc</span>
                  <button
                    onClick={() => handleCopyScript(getAliasScriptBlock(), setCopiedAliases)}
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer"
                  >
                    {copiedAliases ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    {copiedAliases ? "Copied!" : "Copy block"}
                  </button>
                </div>
                <pre className="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs md:text-sm text-orange-200 leading-relaxed overflow-x-auto">
                  {getAliasScriptBlock() || "# Add shortcuts using the panel above!"}
                </pre>
              </div>
            </div>
          </motion.div>
        )}

        {activeTool === "prompt" && (
          <motion.div
            key="prompt"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/25 p-5 md:p-6 backdrop-blur-xl">
              <h3 className="text-lg font-display font-semibold text-slate-100 flex items-center gap-2 mb-2">
                <span className="p-1.5 bg-violet-500/10 rounded-lg text-violet-400">⚡</span>
                Shell Prompt Customizer
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mb-6">
                Customize how your active workspace header appears inside Termux. Swap themes instantly.
              </p>

              {/* Theme selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { id: "standard", label: "Retro Green", desc: "Classic Linux hacker style prompt", look: "termux@android ~ $ " },
                  { id: "starship", label: "Starship Minimal", desc: "Rust-compiled spaceship indicators", look: "✦ ~/project [main] ❯ " },
                  { id: "cyberpunk", label: "Neon Cyberpunk", desc: "Vibrant status displays", look: "⚡ CYBER-SHELL://root/ ~> " }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPrompt(p.id as any)}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between h-32 cursor-pointer ${
                      selectedPrompt === p.id
                        ? "bg-white/10 border-white/20 shadow-lg"
                        : "bg-white/5 border-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div>
                      <span className={`block text-sm font-semibold ${selectedPrompt === p.id ? "text-violet-200" : "text-slate-300"}`}>
                        {p.label}
                      </span>
                      <span className="block text-xs text-slate-500 mt-1">{p.desc}</span>
                    </div>
                    <div className="font-mono text-xs p-1.5 bg-slate-950/90 rounded border border-slate-900/80 w-full text-slate-400 truncate">
                      {p.look}
                    </div>
                  </button>
                ))}
              </div>

              {/* Instructions to apply */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-500">Installation Command</span>
                  <button
                    onClick={() => {
                      const cmd = selectedPrompt === "starship"
                        ? "pkg install starship -y && echo 'eval \"$(starship init bash)\"' >> ~/.bashrc"
                        : selectedPrompt === "cyberpunk"
                        ? "echo 'PS1=\"\\[\\033[01;35m\\]⚡ CYBER-SHELL://\\[\\033[01;32m\\]\\u/\\[\\033[01;34m\\] \\w ~> \\[\\033[00m\\]\"' >> ~/.bashrc"
                        : "echo 'PS1=\"termux@android \\w \\$ \"' >> ~/.bashrc";
                      handleCopyScript(cmd, setCopiedPromptCode);
                    }}
                    className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 cursor-pointer"
                  >
                    {copiedPromptCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    Copy command
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs md:text-sm text-slate-300 leading-relaxed space-y-2">
                  {selectedPrompt === "starship" && (
                    <>
                      <div className="text-slate-500"># Installs Starship package and appends script activation to .bashrc</div>
                      <div className="text-violet-300">pkg install starship -y && echo &apos;eval &quot;$(starship init bash)&quot;&apos; &gt;&gt; ~/.bashrc</div>
                    </>
                  )}
                  {selectedPrompt === "cyberpunk" && (
                    <>
                      <div className="text-slate-500"># Adds custom ANSI colorized neon indicators to standard PS1 variable</div>
                      <div className="text-violet-300">echo &apos;PS1=&quot;\[\033[01;35m\]⚡ CYBER-SHELL://\[\033[01;32m\]\u/\[\033[01;34m\] \w ~&gt; \[\033[00m\]&quot;&apos; &gt;&gt; ~/.bashrc</div>
                    </>
                  )}
                  {selectedPrompt === "standard" && (
                    <>
                      <div className="text-slate-500"># Restores standard clean Termux environment parameters</div>
                      <div className="text-violet-300">echo &apos;PS1=&quot;termux@android \w \$ &quot;&apos; &gt;&gt; ~/.bashrc</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTool === "storage" && (
          <motion.div
            key="storage"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/25 p-5 md:p-6 backdrop-blur-xl">
              <h3 className="text-lg font-display font-semibold text-slate-100 flex items-center gap-2 mb-2">
                <span className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400"><HardDrive size={16} /></span>
                Storage Planning Calculator
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mb-6">
                Avoid low disk-space errors on your Android device. Tick planned distros and environments to calculate estimated compiled disk space overheads.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Selector checkboxes */}
                <div className="md:col-span-7 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block mb-2">Select Environments & packages</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {Object.entries(packageSizes).map(([id, p]) => {
                      const active = selectedEstimatorPackages.includes(id);
                      return (
                        <button
                          key={id}
                          onClick={() => {
                            setSelectedEstimatorPackages((prev) =>
                              prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
                            );
                          }}
                          className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer flex justify-between items-center ${
                            active
                              ? "bg-white/10 border-white/20 text-emerald-400"
                              : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                          }`}
                        >
                          <div>
                            <span className="block text-xs font-semibold capitalize">{id.replace("-", " ")}</span>
                            <span className="block text-[10px] text-slate-500 truncate max-w-[150px]">{p.label}</span>
                          </div>
                          <span className="font-mono text-xs text-slate-500 shrink-0">+{p.size} MB</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Disk Space Meter */}
                <div className="md:col-span-5 rounded-xl bg-white/5 border border-white/10 p-5 flex flex-col justify-between h-full min-h-[220px] backdrop-blur-sm">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block">Total Estimated Disk Overhead</span>
                    <div className="flex items-baseline gap-1 mt-3">
                      <span className="text-4xl font-display font-extrabold text-emerald-400 tracking-tight">{getEstimatedTotalSize()}</span>
                      <span className="text-lg font-semibold text-slate-400 font-mono">MB</span>
                    </div>
                    <span className="text-xs text-slate-500 mt-2 block">
                      Includes 40MB base Termux core utilities plus simulated package compilers.
                    </span>
                  </div>

                  {/* Visual Progress bar */}
                  <div className="space-y-1.5 pt-4">
                    <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                      <span>Disk Overhead</span>
                      <span>{Math.min(100, Math.round((getEstimatedTotalSize() / 1000) * 100))}% of 1 GB limits</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-800/80 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                        style={{ width: `${Math.min(100, (getEstimatedTotalSize() / 1000) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
