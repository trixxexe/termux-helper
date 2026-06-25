import { useState, useEffect, useRef } from "react";
import { Terminal as TermIcon, Copy, Check, Play, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TerminalProps {
  initialCommand?: string;
  expectedOutput?: string;
  className?: string;
}

export default function Terminal({
  initialCommand = "pkg update && pkg upgrade -y",
  expectedOutput = "Reading package lists... Done\nBuilding dependency tree... Done\nAll packages up to date!",
  className = ""
}: TerminalProps) {
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(initialCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulateExecution = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setOutputLines([]);

    const steps = [
      `$ ${initialCommand}`,
      "[*] Connecting to remote Termux repositories...",
      "[*] Querying mirror: https://mirrors.grimler.se/termux/...",
      "[*] Verifying package signatures...",
      "[*] Downloading database metadata files..."
    ];

    for (const step of steps) {
      setOutputLines((prev) => [...prev, step]);
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    // Split output by newline and simulate writing it
    const outputArray = expectedOutput.split("\n");
    for (const line of outputArray) {
      setOutputLines((prev) => [...prev, line]);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    setOutputLines((prev) => [...prev, " [SUCCESS] Command execution completed safely."]);
    setIsRunning(false);
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [outputLines]);

  return (
    <div className={`rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden shadow-2xl font-mono text-sm leading-relaxed ${className}`}>
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between bg-white/5 px-4 py-3 border-b border-white/10 select-none">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-slate-300 font-medium pl-2 flex items-center gap-1.5">
            <TermIcon size={12} className="text-orange-400" /> termux@android:~
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
            title="Copy command"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
          <button
            onClick={simulateExecution}
            disabled={isRunning}
            className={`p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-40`}
            title="Simulate execution"
          >
            {isRunning ? (
              <RefreshCw size={14} className="animate-spin text-orange-400" />
            ) : (
              <Play size={14} className="text-orange-400" />
            )}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 overflow-y-auto max-h-72 scroll-momentum bg-black/30 text-slate-200 min-h-[140px] text-xs md:text-sm">
        {outputLines.length === 0 ? (
          <div className="space-y-1.5">
            <div className="flex items-start">
              <span className="text-cyan-400 select-none mr-2 font-bold">~ $</span>
              <span className="text-slate-100 font-medium break-all">{initialCommand}</span>
            </div>
            <div className="text-slate-500 text-xs italic mt-2 flex items-center gap-1 select-none">
              <Play size={12} className="text-slate-600 animate-pulse" /> Tap the play icon above to simulate how Termux compiles this command.
            </div>
          </div>
        ) : (
          <div className="space-y-1.5">
            {outputLines.map((line, idx) => {
              const isCommand = line.startsWith("$");
              const isSuccess = line.includes("[SUCCESS]");
              const isStep = line.startsWith("[*]");
              return (
                <div key={idx} className="flex items-start leading-normal">
                  <span className="text-slate-600 text-right select-none pr-3 w-6 shrink-0">{idx + 1}</span>
                  {isCommand ? (
                    <span className="text-cyan-400 font-semibold break-all">{line}</span>
                  ) : isSuccess ? (
                    <span className="text-emerald-400 font-semibold">{line}</span>
                  ) : isStep ? (
                    <span className="text-sky-400">{line}</span>
                  ) : (
                    <span className="text-slate-300 break-all">{line}</span>
                  )}
                </div>
              );
            })}
            {isRunning && (
              <div className="flex items-center space-x-2 pl-9 pt-1 text-xs text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>Executing logs...</span>
              </div>
            )}
            <div ref={terminalEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}
