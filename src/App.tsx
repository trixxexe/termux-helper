import { useState, useEffect } from "react";
import {
  Terminal as TermIcon,
  BookOpen,
  Settings as SettingsIcon,
  Compass,
  Sparkles,
  Bookmark,
  Search,
  Check,
  Copy,
  ChevronRight,
  GraduationCap,
  Flame,
  ArrowRight,
  ShieldCheck,
  Heart,
  User,
  Info,
  Moon,
  Eye,
  RotateCcw,
  AlertTriangle,
  Play,
  HelpCircle,
  Layers,
  BadgeCheck,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import {
  commands,
  packages,
  languages,
  errorGuides,
  learningStages,
  Command,
  Package,
  Language,
  ErrorGuide,
  LearningStage
} from "./data/db";

import Terminal from "./components/Terminal";
import InteractiveTools from "./components/InteractiveTools";
import SpotlightSearch from "./components/SpotlightSearch";
import ItemDetails from "./components/ItemDetails";

export default function App() {
  // Navigation & Shell State
  const [activeTab, setActiveTab] = useState<"home" | "explore" | "tools" | "library" | "settings">("home");
  const [selectedDetail, setSelectedDetail] = useState<{
    type: "package" | "language" | "command" | "error";
    data: any;
  } | null>(null);

  // Search trigger
  const [spotlightOpen, setSpotlightOpen] = useState(false);

  // User Progress & Storage Persistence States
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [userStreak, setUserStreak] = useState(1);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [onboardStep, setOnboardStep] = useState(0);

  // Settings / Theme Preferences
  const [accentColor, setAccentColor] = useState<"cyan" | "indigo" | "violet" | "emerald" | "amber">("cyan");
  const [oledMode, setOledMode] = useState(false);
  const [copiedDailyTip, setCopiedDailyTip] = useState(false);

  // Active Learning Stage / Lesson State (If user is inside a lesson)
  const [activeStage, setActiveStage] = useState<LearningStage | null>(null);
  const [activeLessonIdx, setActiveLessonIdx] = useState<number | null>(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSuccess, setQuizSuccess] = useState<boolean | null>(null);

  // Explore filtering State
  const [exploreFilter, setExploreFilter] = useState<"all" | "packages" | "languages" | "trouble">("all");

  // Load persistence parameters on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("termux_bookmarks");
    if (savedBookmarks) setBookmarkedIds(JSON.parse(savedBookmarks));

    const savedLessons = localStorage.getItem("termux_completed_lessons");
    if (savedLessons) setCompletedLessonIds(JSON.parse(savedLessons));

    const onboardState = localStorage.getItem("termux_onboarded");
    if (onboardState) setHasOnboarded(JSON.parse(onboardState));

    const savedAccent = localStorage.getItem("termux_accent");
    if (savedAccent) setAccentColor(savedAccent as any);

    const savedOled = localStorage.getItem("termux_oled");
    if (savedOled) setOledMode(JSON.parse(savedOled));

    // Simulate streak calculation based on daily check-ins
    const lastCheckIn = localStorage.getItem("termux_last_checkin");
    const todayStr = new Date().toDateString();
    if (lastCheckIn !== todayStr) {
      const streak = Number(localStorage.getItem("termux_streak") || "0");
      const yesterdayStr = new Date(Date.now() - 86400000).toDateString();
      const nextStreak = lastCheckIn === yesterdayStr ? streak + 1 : 1;
      setUserStreak(nextStreak);
      localStorage.setItem("termux_streak", String(nextStreak));
      localStorage.setItem("termux_last_checkin", todayStr);
    } else {
      setUserStreak(Number(localStorage.getItem("termux_streak") || "1"));
    }
  }, []);

  const toggleBookmark = (id: string) => {
    let updated;
    if (bookmarkedIds.includes(id)) {
      updated = bookmarkedIds.filter((bId) => bId !== id);
    } else {
      updated = [...bookmarkedIds, id];
    }
    setBookmarkedIds(updated);
    localStorage.setItem("termux_bookmarks", JSON.stringify(updated));
  };

  const completeLesson = (lessonId: string) => {
    if (!completedLessonIds.includes(lessonId)) {
      const updated = [...completedLessonIds, lessonId];
      setCompletedLessonIds(updated);
      localStorage.setItem("termux_completed_lessons", JSON.stringify(updated));
    }
  };

  const handleSkipOnboarding = () => {
    setHasOnboarded(true);
    localStorage.setItem("termux_onboarded", "true");
  };

  const handleNextOnboard = () => {
    if (onboardStep < 2) {
      setOnboardStep(onboardStep + 1);
    } else {
      handleSkipOnboarding();
    }
  };

  // Accent mapping helpers
  const accentClasses = {
    cyan: {
      text: "text-cyan-400",
      bg: "bg-cyan-500",
      border: "border-white/10",
      glow: "shadow-cyan-500/10",
      glassBg: "bg-cyan-500/10 backdrop-blur-md border border-white/10",
      badge: "text-cyan-300 bg-white/5 border border-white/10 backdrop-blur-sm"
    },
    indigo: {
      text: "text-indigo-400",
      bg: "bg-indigo-600",
      border: "border-white/10",
      glow: "shadow-indigo-500/10",
      glassBg: "bg-indigo-500/10 backdrop-blur-md border border-white/10",
      badge: "text-indigo-300 bg-white/5 border border-white/10 backdrop-blur-sm"
    },
    violet: {
      text: "text-violet-400",
      bg: "bg-violet-600",
      border: "border-white/10",
      glow: "shadow-violet-500/10",
      glassBg: "bg-violet-500/10 backdrop-blur-md border border-white/10",
      badge: "text-violet-300 bg-white/5 border border-white/10 backdrop-blur-sm"
    },
    emerald: {
      text: "text-emerald-400",
      bg: "bg-emerald-600",
      border: "border-white/10",
      glow: "shadow-emerald-500/10",
      glassBg: "bg-emerald-500/10 backdrop-blur-md border border-white/10",
      badge: "text-emerald-300 bg-white/5 border border-white/10 backdrop-blur-sm"
    },
    amber: {
      text: "text-amber-400",
      bg: "bg-amber-600",
      border: "border-white/10",
      glow: "shadow-amber-500/10",
      glassBg: "bg-amber-500/10 backdrop-blur-md border border-white/10",
      badge: "text-amber-300 bg-white/5 border border-white/10 backdrop-blur-sm"
    }
  };

  const activeAccent = accentClasses[accentColor];

  // Helper lists for Library view
  const bookmarkedPackages = packages.filter((p) => bookmarkedIds.includes(p.id));
  const bookmarkedLanguages = languages.filter((l) => bookmarkedIds.includes(l.id));
  const bookmarkedCommands = commands.filter((c) => bookmarkedIds.includes(c.id));
  const bookmarkedErrors = errorGuides.filter((e) => bookmarkedIds.includes(e.id));

  // Splash Onboarding Carousel Data
  const onboardingSlides = [
    {
      title: "Welcome to Termux Master Hub",
      desc: "Turn your standard Android device into a complete, high-performance Linux developer machine. Learn syntax, package controls, and customizations cleanly.",
      icon: "⚡"
    },
    {
      title: "Comprehensive Learning Paths",
      desc: "Work through guided levels with real interactive logs, command execution simulators, and earn custom commander badges.",
      icon: "🎓"
    },
    {
      title: "100% Standalone Offline Base",
      desc: "Works entirely offline inside the browser. Keep all packages, commands, configuration blueprints, and trouble-codes on your local home screen.",
      icon: "💾"
    }
  ];

  // Daily Termux Tip Data
  const dailyTip = {
    title: "Accessing extra keys in Termux",
    desc: "Long volume buttons can simulate desktop keys! For example, Volume Up + Q shows the extra key drawer (ESC, Tab, CTRL, Alt), and Volume Down acts as the primary hardware CTRL shortcut.",
    cmd: "echo \"extra-keys = [['ESC','TAB','CTRL','ALT','UP','DOWN','LEFT','RIGHT']]\" >> ~/.termux/termux.properties"
  };

  const handleSelectSearchResult = (type: "package" | "language" | "command" | "error", item: any) => {
    setSpotlightOpen(false);
    setSelectedDetail({ type, data: item });
  };

  return (
    <div className={`min-h-screen relative flex flex-col justify-between ${oledMode ? "bg-black" : "bg-[#030712]"}`}>
      
      {/* Background aurora lights (Liquid Glass effect) */}
      {!oledMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-900/15 blur-[120px] animate-aurora-slow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[130px] animate-aurora-slow" />
          <div className="absolute top-[40%] right-[20%] w-[40%] h-[40%] rounded-full bg-violet-900/5 blur-[100px] animate-pulse-slow" />
        </div>
      )}

      {/* Main app container */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-4 pb-28 relative z-10 flex-1">
        
        {/* Floating Top Header */}
        <header className="flex items-center justify-between py-3 px-4 mb-6 rounded-2xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-xl select-none">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${activeAccent.glassBg} text-slate-100 flex items-center justify-center`}>
              <TermIcon size={20} className={activeAccent.text} />
            </div>
            <div>
              <h1 className="text-sm font-display font-bold tracking-tight text-slate-100">Termux Master</h1>
              <span className="text-[10px] font-mono text-slate-400">HUB v2.1.0</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Spotlight trigger */}
            <button
              onClick={() => setSpotlightOpen(true)}
              className="p-2.5 rounded-xl border border-slate-800/80 bg-slate-950/40 text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-all flex items-center justify-center cursor-pointer"
              title="Global search (Esc)"
            >
              <Search size={16} />
            </button>

            {/* Micro badge indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950/40 font-mono text-xs text-slate-300">
              <Flame size={14} className="text-amber-500 fill-amber-500" />
              <span>{userStreak}d</span>
            </div>
          </div>
        </header>

        {/* Global Spotlight Search Overlay */}
        <SpotlightSearch
          isOpen={spotlightOpen}
          onClose={() => setSpotlightOpen(false)}
          onSelectResult={handleSelectSearchResult}
        />

        {/* Dynamic Navigation Detail Page or Tab Display */}
        <AnimatePresence mode="wait">
          {selectedDetail ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <ItemDetails
                type={selectedDetail.type}
                item={selectedDetail.data}
                onClose={() => setSelectedDetail(null)}
                isBookmarked={bookmarkedIds.includes(selectedDetail.data.id)}
                onToggleBookmark={() => toggleBookmark(selectedDetail.data.id)}
              />
            </motion.div>
          ) : activeStage ? (
            /* Interactive Lessons Mode */
            <motion.div
              key="guided-stage"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Back out of learning path header */}
              <div className="flex items-center justify-between select-none">
                <button
                  onClick={() => {
                    setActiveStage(null);
                    setActiveLessonIdx(null);
                    setSelectedQuizOption(null);
                    setQuizSuccess(null);
                  }}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <ChevronRight size={14} className="rotate-180" /> Leave Learning Path
                </button>
                <span className="text-xs font-mono text-slate-500">Badge: {activeStage.badge}</span>
              </div>

              {/* Stage Overview Banner */}
              <div className="rounded-3xl border border-slate-800/80 bg-slate-900/25 p-6 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 opacity-5 select-none pointer-events-none">
                  <GraduationCap size={160} />
                </div>
                <div className="space-y-1.5 relative z-10">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-cyan-400">
                    Level {activeStage.level} path
                  </span>
                  <h3 className="text-xl md:text-2xl font-display font-extrabold text-slate-100 tracking-tight">
                    {activeStage.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-xl">{activeStage.description}</p>
                </div>
              </div>

              {/* Lesson Nav Selection Grid */}
              {activeLessonIdx === null ? (
                <div className="space-y-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block pl-1">Guided Lesson Plan</span>
                  <div className="space-y-3">
                    {activeStage.lessons.map((lesson, idx) => {
                      const completed = completedLessonIds.includes(lesson.id);
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLessonIdx(idx)}
                          className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${
                            completed
                              ? "bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10"
                              : "bg-slate-900/10 border-slate-800/60 hover:bg-slate-800/20"
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-slate-500 font-bold">0{idx + 1}.</span>
                              <span className="font-semibold text-sm text-slate-200 group-hover:text-cyan-300 transition-colors">
                                {lesson.title}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-1 pl-6">{lesson.objective}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {completed ? (
                              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/20 text-[10px] font-bold font-mono text-emerald-400 flex items-center gap-1">
                                <BadgeCheck size={12} /> COMPLETED
                              </span>
                            ) : (
                              <span className="text-xs text-slate-500 group-hover:text-slate-300 flex items-center gap-1 transition-colors">
                                Start <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Active Single Lesson UI */
                <div className="space-y-6">
                  {/* Lesson Navigation details */}
                  <div className="flex items-center justify-between bg-slate-900/25 border border-slate-800/60 px-4 py-3 rounded-xl select-none">
                    <button
                      onClick={() => {
                        setActiveLessonIdx(null);
                        setSelectedQuizOption(null);
                        setQuizSuccess(null);
                      }}
                      className="text-xs font-mono font-bold text-slate-400 hover:text-slate-200 cursor-pointer flex items-center gap-1"
                    >
                      <ChevronRight size={12} className="rotate-180" /> Back to level overview
                    </button>
                    <span className="text-xs font-mono text-cyan-400 font-semibold">
                      Lesson {activeLessonIdx + 1} of {activeStage.lessons.length}
                    </span>
                  </div>

                  {/* Active Lesson Content Card */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/20 p-5 md:p-6 space-y-4">
                    <h4 className="text-base md:text-lg font-bold text-slate-200 font-display">
                      {activeStage.lessons[activeLessonIdx].title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                      {activeStage.lessons[activeLessonIdx].content}
                    </p>

                    {/* Objective Box */}
                    <div className="p-3.5 rounded-xl border border-cyan-500/10 bg-cyan-500/5 text-xs text-cyan-300 leading-normal">
                      <strong className="font-semibold uppercase tracking-wider block mb-1">Objective:</strong>
                      {activeStage.lessons[activeLessonIdx].objective}
                    </div>

                    {/* Lesson Commands reference terminal */}
                    {activeStage.lessons[activeLessonIdx].commands.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block pl-1 select-none">
                          Interactive lesson terminal
                        </span>
                        <Terminal
                          initialCommand={activeStage.lessons[activeLessonIdx].commands[0]}
                          expectedOutput="Executing course command successfully...\nOutput matches course requirements."
                        />
                        {activeStage.lessons[activeLessonIdx].commands.length > 1 && (
                          <div className="space-y-1.5">
                            <span className="text-[10px] text-slate-500 uppercase font-mono pl-1 select-none">Alternate commands taught</span>
                            <div className="flex flex-col gap-1.5">
                              {activeStage.lessons[activeLessonIdx].commands.slice(1).map((cmd) => (
                                <div key={cmd} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-900 font-mono text-xs">
                                  <span className="text-slate-300">{cmd}</span>
                                  <button
                                    onClick={() => navigator.clipboard.writeText(cmd)}
                                    className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
                                    title="Copy command"
                                  >
                                    <Copy size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Practice Challenge & Knowledge Check */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 md:p-6 space-y-4">
                    <h5 className="text-sm font-semibold uppercase tracking-wider text-slate-300 select-none">
                      🏆 Hands-on Practice Challenge
                    </h5>
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed bg-slate-950 border border-slate-900 rounded-xl p-4">
                      {activeStage.lessons[activeLessonIdx].challenge}
                    </p>

                    <div className="pt-3">
                      <button
                        onClick={() => {
                          completeLesson(activeStage.lessons[activeLessonIdx!].id);
                          setQuizSuccess(true);
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-3 text-sm font-semibold tracking-tight transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-950/20"
                      >
                        <BadgeCheck size={16} /> Mark Lesson Completed & Save Progress
                      </button>
                    </div>

                    {quizSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center space-y-2 select-none"
                      >
                        <span className="text-2xl">🎓</span>
                        <h4 className="text-sm font-semibold text-emerald-400">Excellent Work, Commander!</h4>
                        <p className="text-xs text-slate-400">
                          Progress successfully saved. Move to the next syllabus section.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            /* Tab Switcher Layouts */
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {/* TAB 1: HOME DASHBOARD */}
              {activeTab === "home" && (
                <div className="space-y-6">
                  {/* Greeting banner */}
                  <div className="rounded-3xl border border-slate-800 bg-slate-900/10 p-6 md:p-8 backdrop-blur-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                      <TermIcon size={120} className={activeAccent.text} />
                    </div>
                    <div className="space-y-2 relative z-10">
                      <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                        Android Shell companion
                      </span>
                      <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-100 tracking-tight">
                        Perfect Your Termux Sandbox
                      </h2>
                      <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-xl">
                        A modern progressive companion directory helping you customize dotfiles, understand compiling, run development servers, and debug environments.
                      </p>
                    </div>

                    {/* Dynamic Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 mt-6 select-none relative z-10">
                      <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/60 text-center">
                        <span className="block text-lg font-bold font-display text-slate-100">
                          {completedLessonIds.length}
                        </span>
                        <span className="block text-[10px] text-slate-500 uppercase font-mono tracking-wider">Lessons done</span>
                      </div>
                      <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/60 text-center">
                        <span className="block text-lg font-bold font-display text-slate-100">
                          {bookmarkedIds.length}
                        </span>
                        <span className="block text-[10px] text-slate-500 uppercase font-mono tracking-wider">Bookmarks</span>
                      </div>
                      <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/60 text-center">
                        <span className="block text-lg font-bold font-display text-slate-100">
                          {completedLessonIds.length >= 3 ? "Officer" : "Initiate"}
                        </span>
                        <span className="block text-[10px] text-slate-500 uppercase font-mono tracking-wider">Badge level</span>
                      </div>
                    </div>
                  </div>

                  {/* Daily Tip (Copyable Card) */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-5 space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between select-none">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1">
                        <Sparkles size={12} /> Daily Master tip
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Android properties</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-200">{dailyTip.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{dailyTip.desc}</p>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-900 font-mono text-xs text-cyan-300 overflow-hidden relative group">
                      <span className="truncate pr-10">{dailyTip.cmd}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(dailyTip.cmd);
                          setCopiedDailyTip(true);
                          setTimeout(() => setCopiedDailyTip(false), 2000);
                        }}
                        className="absolute right-2 top-2 p-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                        title="Copy code"
                      >
                        {copiedDailyTip ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Setup Level Roadmap Grid */}
                  <div className="space-y-3 select-none">
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block pl-1">
                      Termux Setup Path & Progression
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {learningStages.map((stage) => {
                        const totalLessons = stage.lessons.length;
                        const doneCount = stage.lessons.filter((l) => completedLessonIds.includes(l.id)).length;
                        const pct = Math.round((doneCount / totalLessons) * 100);
                        return (
                          <div
                            key={stage.id}
                            onClick={() => setActiveStage(stage)}
                            className="p-5 rounded-2xl border border-slate-800/80 bg-slate-950/20 hover:border-slate-700 transition-all flex flex-col justify-between h-44 cursor-pointer group"
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono font-bold text-cyan-400">Level 0{stage.level}</span>
                                <span className="text-[10px] font-mono text-slate-500">{stage.completionTime}</span>
                              </div>
                              <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                                {stage.title}
                              </h4>
                              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                                {stage.description}
                              </p>
                            </div>

                            <div className="space-y-1.5">
                              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                                <span>Progress</span>
                                <span>{doneCount}/{totalLessons} lessons ({pct}%)</span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                                <div
                                  className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Essential Starter Commands */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block pl-1 select-none">
                      🔥 Essential Starter commands
                    </span>
                    <div className="space-y-2.5">
                      {commands.slice(0, 3).map((cmd) => (
                        <div
                          key={cmd.id}
                          className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <span
                              onClick={() => setSelectedDetail({ type: "command", data: cmd })}
                              className="font-mono text-xs text-cyan-400 cursor-pointer hover:underline block"
                            >
                              {cmd.command}
                            </span>
                            <p className="text-xs text-slate-400 leading-normal">{cmd.description}</p>
                          </div>
                          <button
                            onClick={() => setSelectedDetail({ type: "command", data: cmd })}
                            className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-0.5 shrink-0 cursor-pointer font-semibold"
                          >
                            Explore <ChevronRight size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: EXPLORE COMPANION MODULES */}
              {activeTab === "explore" && (
                <div className="space-y-6">
                  {/* Tab selection filters */}
                  <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-1 flex gap-1 select-none">
                    {[
                      { id: "all", label: "All Items" },
                      { id: "packages", label: "Core Packages" },
                      { id: "languages", label: "Languages" },
                      { id: "trouble", label: "Errors & Troubleshooting" }
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setExploreFilter(f.id as any)}
                        className={`flex-1 text-center py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                          exploreFilter === f.id
                            ? "bg-slate-950 border border-slate-800 text-slate-100 shadow"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  {/* Core Package Explorer view */}
                  {(exploreFilter === "all" || exploreFilter === "packages") && (
                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block pl-1 select-none">
                        📦 Core Termux packages ({packages.length})
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {packages.map((pkg) => (
                          <div
                            key={pkg.id}
                            onClick={() => setSelectedDetail({ type: "package", data: pkg })}
                            className="p-5 rounded-2xl border border-slate-800 bg-slate-950/20 hover:border-slate-700 transition-all flex flex-col justify-between h-40 cursor-pointer group"
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-display font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                                  {pkg.name}
                                </span>
                                <span className="text-[10px] font-mono text-slate-500 uppercase bg-slate-950 border border-slate-900 px-1.5 py-0.5 rounded">
                                  {pkg.category}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                {pkg.description}
                              </p>
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                              <span>Diff: {pkg.difficulty}</span>
                              <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-semibold">
                                View details <ChevronRight size={12} />
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages explorer view */}
                  {(exploreFilter === "all" || exploreFilter === "languages") && (
                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block pl-1 select-none">
                        🐍 Language environments ({languages.length})
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {languages.map((lang) => (
                          <div
                            key={lang.id}
                            onClick={() => setSelectedDetail({ type: "language", data: lang })}
                            className="p-5 rounded-2xl border border-slate-800 bg-slate-950/20 hover:border-slate-700 transition-all flex flex-col justify-between h-40 cursor-pointer group"
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-display font-bold text-slate-200 group-hover:text-violet-300 transition-colors">
                                  {lang.name}
                                </span>
                                <span className="text-[10px] font-mono text-slate-500">
                                  v{lang.version}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                {lang.description}
                              </p>
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                              <span>Pkg Manager: {lang.packageManager.split(" ")[0]}</span>
                              <span className="text-violet-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-semibold">
                                View compiler <ChevronRight size={12} />
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Troubleshooting Error Center view */}
                  {(exploreFilter === "all" || exploreFilter === "trouble") && (
                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block pl-1 select-none">
                        ⚠️ Troubleshooting & Error database ({errorGuides.length})
                      </span>
                      <div className="space-y-3">
                        {errorGuides.map((err) => (
                          <div
                            key={err.id}
                            onClick={() => setSelectedDetail({ type: "error", data: err })}
                            className="p-4 rounded-xl border border-slate-800 bg-slate-950/20 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
                          >
                            <div className="space-y-1">
                              <span className="font-semibold text-sm text-slate-200 group-hover:text-rose-400 transition-all block">
                                {err.title}
                              </span>
                              <p className="text-xs text-slate-500 line-clamp-1">{err.symptoms}</p>
                            </div>
                            <span className="text-xs text-slate-500 group-hover:text-slate-300 flex items-center gap-0.5 transition-colors font-semibold shrink-0">
                              View solution <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: PLAYGROUND TOOLS */}
              {activeTab === "tools" && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-5 space-y-2 select-none">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                      Master Hub toolbox
                    </span>
                    <h3 className="text-xl font-display font-extrabold text-slate-100 tracking-tight">
                      Interactive Configuration Tools
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                      Generate master update commands, build aliases, customize ANSI terminal prompts, or estimate package dependencies storage before downloading.
                    </p>
                  </div>
                  <InteractiveTools />
                </div>
              )}

              {/* TAB 4: LIBRARY & PROGRESS CENTER */}
              {activeTab === "library" && (
                <div className="space-y-6">
                  {/* Overview banner */}
                  <div className="rounded-3xl border border-slate-800 bg-slate-900/10 p-5 flex items-center justify-between select-none">
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                        Saved Database
                      </span>
                      <h3 className="text-lg font-display font-bold text-slate-100">My Master Library</h3>
                    </div>
                    <Bookmark size={20} className="text-cyan-400" />
                  </div>

                  {/* Empty state or Bookmarked Lists */}
                  {bookmarkedIds.length === 0 ? (
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/20 p-8 text-center space-y-3 select-none">
                      <span className="text-3xl">🔖</span>
                      <h4 className="text-sm font-semibold text-slate-300">Your library is currently empty</h4>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                        Tap the bookmark icon inside package details, error guides, or code reference pages to pin them directly inside this offline view.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Bookmarked Packages */}
                      {bookmarkedPackages.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-xs font-mono uppercase tracking-widest text-slate-500 pl-1 block select-none">
                            📦 Bookmarked packages ({bookmarkedPackages.length})
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {bookmarkedPackages.map((pkg) => (
                              <div
                                key={pkg.id}
                                onClick={() => setSelectedDetail({ type: "package", data: pkg })}
                                className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 hover:border-slate-700 transition-all flex items-center justify-between cursor-pointer group"
                              >
                                <div className="space-y-0.5">
                                  <span className="font-semibold text-sm text-slate-200 group-hover:text-cyan-300 transition-colors">
                                    {pkg.name}
                                  </span>
                                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                                    {pkg.category}
                                  </span>
                                </div>
                                <ChevronRight size={14} className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Bookmarked Languages */}
                      {bookmarkedLanguages.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-xs font-mono uppercase tracking-widest text-slate-500 pl-1 block select-none">
                            🐍 Saved compilers & Runtimes ({bookmarkedLanguages.length})
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {bookmarkedLanguages.map((lang) => (
                              <div
                                key={lang.id}
                                onClick={() => setSelectedDetail({ type: "language", data: lang })}
                                className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 hover:border-slate-700 transition-all flex items-center justify-between cursor-pointer group"
                              >
                                <div className="space-y-0.5">
                                  <span className="font-semibold text-sm text-slate-200 group-hover:text-violet-300 transition-colors">
                                    {lang.name}
                                  </span>
                                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                                    Version {lang.version}
                                  </span>
                                </div>
                                <ChevronRight size={14} className="text-slate-600 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Bookmarked commands */}
                      {bookmarkedCommands.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-xs font-mono uppercase tracking-widest text-slate-500 pl-1 block select-none">
                            💻 Pinboard commands ({bookmarkedCommands.length})
                          </span>
                          <div className="space-y-2.5">
                            {bookmarkedCommands.map((cmd) => (
                              <div
                                key={cmd.id}
                                className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                              >
                                <div className="space-y-1">
                                  <span
                                    onClick={() => setSelectedDetail({ type: "command", data: cmd })}
                                    className="font-mono text-xs text-cyan-400 cursor-pointer hover:underline block"
                                  >
                                    {cmd.command}
                                  </span>
                                  <p className="text-xs text-slate-400">{cmd.description}</p>
                                </div>
                                <button
                                  onClick={() => setSelectedDetail({ type: "command", data: cmd })}
                                  className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-0.5 shrink-0 cursor-pointer"
                                >
                                  Details <ChevronRight size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: SYSTEM SETTINGS */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  {/* Layout settings overview */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-5 space-y-2 select-none">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                      System Preferences
                    </span>
                    <h3 className="text-xl font-display font-extrabold text-slate-100 tracking-tight">
                      Settings Hub
                    </h3>
                  </div>

                  {/* UI customization modules */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/20 p-5 space-y-6 select-none">
                    
                    {/* Theme Accents selector */}
                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-500">Accent Hue Highlight</span>
                      <div className="flex gap-2.5 flex-wrap">
                        {(["cyan", "indigo", "violet", "emerald", "amber"] as const).map((col) => {
                          const active = accentColor === col;
                          return (
                            <button
                              key={col}
                              onClick={() => {
                                setAccentColor(col);
                                localStorage.setItem("termux_accent", col);
                              }}
                              className={`px-4 py-2.5 rounded-xl border capitalize text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
                                active
                                  ? accentClasses[col].badge + " ring-1 ring-" + col + "-500/10 font-semibold"
                                  : "border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200"
                              }`}
                            >
                              <div className={`w-2.5 h-2.5 rounded-full ${accentClasses[col].bg}`} />
                              {col}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Dark/OLED selection Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-950/40">
                      <div className="flex items-center gap-3">
                        <Moon className="text-slate-400" size={18} />
                        <div>
                          <span className="text-sm font-semibold text-slate-200">Pure AMOLED Black Mode</span>
                          <span className="text-xs text-slate-500 block mt-0.5">Turns off the glowing visual auroras to maximize battery performance.</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const next = !oledMode;
                          setOledMode(next);
                          localStorage.setItem("termux_oled", String(next));
                        }}
                        className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                          oledMode ? "bg-cyan-500" : "bg-slate-700"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 ${
                            oledMode ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* App reset buttons */}
                    <div className="pt-4 border-t border-slate-800/80 space-y-4">
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block">System Maintenance</span>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => {
                            if (confirm("Reset learning achievements and bookmarked records?")) {
                              localStorage.removeItem("termux_bookmarks");
                              localStorage.removeItem("termux_completed_lessons");
                              localStorage.removeItem("termux_onboarded");
                              setBookmarkedIds([]);
                              setCompletedLessonIds([]);
                              setHasOnboarded(false);
                              setOnboardStep(0);
                              setActiveTab("home");
                              alert("Database wiped safely.");
                            }
                          }}
                          className="px-4 py-2.5 bg-rose-600/10 hover:bg-rose-600/25 border border-rose-500/20 rounded-xl text-xs font-semibold text-rose-400 transition-all text-center cursor-pointer flex-1"
                        >
                          Reset Database / Wipe Progress
                        </button>
                        <button
                          onClick={() => {
                            localStorage.setItem("termux_streak", "1");
                            setUserStreak(1);
                            alert("Daily streak counter reset to 1d.");
                          }}
                          className="px-4 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-semibold text-slate-300 transition-all text-center cursor-pointer flex-1"
                        >
                          Reset Daily Streak Tracker
                        </button>
                      </div>
                    </div>

                    {/* Developer Credits card */}
                    <div className="p-4 rounded-xl border border-slate-800/60 bg-slate-950/40 text-center space-y-1 select-none">
                      <Award size={20} className="mx-auto text-amber-500" />
                      <span className="text-xs font-semibold text-slate-200 block">Termux Master Hub</span>
                      <span className="text-[10px] text-slate-500 block font-mono">Designed & Developed by Ritam</span>
                      <p className="text-[10px] text-slate-600 max-w-xs mx-auto leading-normal pt-1">
                        Licensed under open-source MIT guidelines. Connect via GitHub Pages to sync files.
                      </p>
                    </div>

                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Bottom iOS Dock Dock Menu */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg z-40 select-none">
        <div className="rounded-[28px] border border-white/20 bg-white/5 backdrop-blur-3xl px-3 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between gap-1">
          {[
            { id: "home", label: "Home", icon: Compass },
            { id: "explore", label: "Explore", icon: BookOpen },
            { id: "tools", label: "Playground", icon: Sparkles },
            { id: "library", label: "My Hub", icon: Bookmark },
            { id: "settings", label: "Settings", icon: SettingsIcon }
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id && !selectedDetail && !activeStage;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedDetail(null);
                  setActiveStage(null);
                  setActiveLessonIdx(null);
                  setActiveTab(tab.id as any);
                }}
                className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-xl transition-all relative cursor-pointer ${
                  isActive
                    ? activeAccent.text + " bg-white/10"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                <IconComponent size={20} className="shrink-0" />
                <span className="text-[9px] mt-1 font-semibold font-sans tracking-wide block">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute -bottom-0.5 w-4 h-1 rounded-full ${activeAccent.bg}`}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Onboarding Carousel Modal */}
      <AnimatePresence>
        {!hasOnboarded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleSkipOnboarding}
              className="absolute inset-0 bg-black/85 backdrop-blur-2xl"
            />

            {/* Slide Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-md rounded-[32px] border border-white/15 bg-white/5 backdrop-blur-3xl p-6 md:p-8 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[350px] z-10"
            >
              {/* Skip button */}
              <button
                onClick={handleSkipOnboarding}
                className="absolute top-4 right-4 text-xs font-bold text-white/40 hover:text-white/80 transition-colors cursor-pointer"
              >
                Skip
              </button>

              {/* Slider content */}
              <div className="space-y-4 pt-4 text-center select-none">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto text-3xl border border-white/15">
                  {onboardingSlides[onboardStep].icon}
                </div>
                <h3 className="text-xl font-display font-extrabold text-slate-100 tracking-tight">
                  {onboardingSlides[onboardStep].title}
                </h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
                  {onboardingSlides[onboardStep].desc}
                </p>
              </div>

              {/* Bottom buttons & indicators */}
              <div className="space-y-4 pt-6">
                {/* Dots indicators */}
                <div className="flex justify-center gap-1.5 select-none">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        onboardStep === i ? "w-6 bg-cyan-400" : "w-1.5 bg-slate-700"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextOnboard}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl py-3 text-sm font-semibold tracking-tight transition-all flex items-center justify-center gap-1 cursor-pointer shadow-lg shadow-cyan-950/20"
                >
                  {onboardStep === 2 ? "Get Started" : "Continue"} <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
