"use client";
import React, { useState, useEffect, useRef } from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Timer, Target, Flame, Play, Pause, RotateCcw, 
  CheckCircle2, BookOpen, Music, Headphones, Zap,
  TrendingUp, Coffee, Wind
} from "lucide-react";

type TimerMode = "pomodoro" | "sprint" | "free";

const writingPrompts = [
  "Your character just discovered something they weren't meant to find.",
  "Write the scene where two characters finally say what they've been holding back.",
  "Something goes wrong at the worst possible moment.",
  "A small detail from chapter 1 becomes significant now.",
  "Your protagonist makes a decision they can't take back.",
];

const ambientSounds = [
  { name: "Rain on Glass", emoji: "🌧️", active: false },
  { name: "Coffee Shop", emoji: "☕", active: true },
  { name: "Deep Forest", emoji: "🌲", active: false },
  { name: "Ocean Waves", emoji: "🌊", active: false },
  { name: "Dark Fantasy", emoji: "🌑", active: false },
  { name: "Space Ambient", emoji: "🚀", active: false },
];

const achievements = [
  { label: "First 100 Words", earned: true, emoji: "📝" },
  { label: "500 Word Sprint", earned: true, emoji: "⚡" },
  { label: "7-Day Streak", earned: false, emoji: "🔥" },
  { label: "Chapter Complete", earned: true, emoji: "🏆" },
  { label: "10K Words", earned: false, emoji: "📚" },
  { label: "Night Owl (11pm+)", earned: true, emoji: "🦉" },
];

export default function MyFlowPage() {
  const [mode, setMode] = useState<TimerMode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionWords, setSessionWords] = useState(0);
  const [sprintTarget, setSprintTarget] = useState(500);
  const [promptIndex, setPromptIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalTime = mode === "pomodoro" ? 25 * 60 : mode === "sprint" ? 15 * 60 : 60 * 60;

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) { setIsRunning(false); return 0; }
          return t - 1;
        });
        setSessionWords((w) => w + Math.floor(Math.random() * 3));
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning]);

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
    setSessionWords(0);
  };

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-wf-text">My Flow</h1>
          <p className="text-sm text-wf-text-muted">Focus tools, writing sprints, and productivity tracking.</p>
        </div>
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-wf-accent" />
          <span className="text-sm font-bold text-wf-accent">5-day streak</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Timer */}
        <div className="lg:col-span-1 space-y-4">
          <GlowCard className="p-5 text-center">
            <div className="mb-4 flex justify-center gap-2">
              {(["pomodoro", "sprint", "free"] as TimerMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setTimeLeft(m === "pomodoro" ? 25*60 : m === "sprint" ? 15*60 : 60*60); setIsRunning(false); }}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${mode === m ? "bg-wf-accent text-white" : "text-wf-text-muted hover:text-wf-text"}`}
                >
                  {m === "pomodoro" ? "Pomodoro" : m === "sprint" ? "Sprint" : "Free Write"}
                </button>
              ))}
            </div>

            <div className="relative mx-auto mb-4 flex h-36 w-36 items-center justify-center">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="#242424" strokeWidth="4" />
                <circle cx="50" cy="50" r="44" fill="none" stroke="#FF6A00" strokeWidth="4" strokeDasharray={`${2 * Math.PI * 44}`} strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s linear", filter: "drop-shadow(0 0 8px rgba(255,106,0,0.5))" }} />
              </svg>
              <div>
                <p className="text-3xl font-bold font-mono text-wf-text">{formatTime(timeLeft)}</p>
                <p className="text-[11px] text-wf-text-muted capitalize">{mode}</p>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <Button onClick={() => setIsRunning(!isRunning)} className={`h-9 px-6 text-xs ${isRunning ? "bg-wf-warning hover:bg-wf-warning/80" : "bg-wf-accent hover:bg-wf-accent-soft"} text-white`}>
                {isRunning ? <><Pause className="h-3.5 w-3.5 mr-1.5" />Pause</> : <><Play className="h-3.5 w-3.5 mr-1.5" />Start</>}
              </Button>
              <Button variant="outline" size="sm" className="h-9 border-wf-border text-wf-text-muted" onClick={reset}>
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
            </div>
          </GlowCard>

          {/* Sprint Target */}
          {mode === "sprint" && (
            <GlowCard className="p-4">
              <h3 className="mb-3 text-xs font-semibold text-wf-text flex items-center gap-2"><Target className="h-3.5 w-3.5 text-wf-accent" />Sprint Target</h3>
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-wf-text-muted">Words written</span>
                <span className="font-bold text-wf-accent">{sessionWords} / {sprintTarget}</span>
              </div>
              <Progress value={Math.min((sessionWords / sprintTarget) * 100, 100)} className="h-2 mb-3" />
              <div className="flex items-center gap-2">
                <Input type="number" value={sprintTarget} onChange={(e) => setSprintTarget(parseInt(e.target.value) || 500)} className="h-7 text-xs w-24" />
                <span className="text-xs text-wf-text-muted">word goal</span>
              </div>
            </GlowCard>
          )}

          {/* Ambient Sound */}
          <GlowCard className="p-4">
            <h3 className="mb-3 text-xs font-semibold text-wf-text flex items-center gap-2"><Music className="h-3.5 w-3.5 text-wf-accent" />Ambient Sound</h3>
            <div className="grid grid-cols-2 gap-2">
              {ambientSounds.map(({ name, emoji, active }) => (
                <button key={name} className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] transition-all ${active ? "bg-wf-accent/15 text-wf-accent border border-wf-accent/30" : "text-wf-text-muted hover:bg-wf-panel-elevated"}`}>
                  <span>{emoji}</span>{name}
                </button>
              ))}
            </div>
          </GlowCard>
        </div>

        {/* Stats and Prompts */}
        <div className="lg:col-span-2 space-y-4">
          {/* Today's Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Words Today", value: "847", icon: BookOpen, color: "text-wf-accent" },
              { label: "Sessions", value: "2", icon: Timer, color: "text-blue-400" },
              { label: "Focus Time", value: "63 min", icon: Headphones, color: "text-wf-success" },
            ].map(({ label, value, icon: Icon, color }) => (
              <GlowCard key={label} className="p-3 text-center">
                <Icon className={`h-5 w-5 mx-auto mb-1 ${color}`} />
                <p className={`text-lg font-bold ${color}`}>{value}</p>
                <p className="text-[10px] text-wf-text-muted">{label}</p>
              </GlowCard>
            ))}
          </div>

          {/* Weekly Progress */}
          <GlowCard className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-semibold text-wf-text flex items-center gap-2"><TrendingUp className="h-3.5 w-3.5 text-wf-accent" />Weekly Goal</h3>
              <span className="text-xs text-wf-text-muted">5,230 / 7,000 words</span>
            </div>
            <Progress value={75} className="h-2 mb-2" />
            <div className="flex gap-1 mt-3">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                const words = [1200, 900, 800, 0, 1100, 1230, 0][i];
                const height = words > 0 ? Math.max((words / 1500) * 100, 10) : 0;
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full relative h-16 flex items-end justify-center">
                      {words > 0 && <div className="w-full rounded-t-sm bg-wf-accent/70 transition-all" style={{ height: `${height}%` }} />}
                      {words === 0 && <div className="w-full h-0.5 bg-wf-border" />}
                    </div>
                    <span className="text-[9px] text-wf-text-muted">{day}</span>
                  </div>
                );
              })}
            </div>
          </GlowCard>

          {/* Writing Prompt */}
          <GlowCard className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xs font-semibold text-wf-text flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-wf-accent" />Writing Prompt</h3>
              <Button variant="ghost" size="sm" className="h-7 text-[10px] text-wf-text-muted hover:text-wf-accent" onClick={() => setPromptIndex((p) => (p + 1) % writingPrompts.length)}>
                Next Prompt →
              </Button>
            </div>
            <div className="rounded-lg bg-wf-panel-elevated p-3 border border-wf-border">
              <p className="text-sm text-wf-text italic leading-relaxed">&ldquo;{writingPrompts[promptIndex]}&rdquo;</p>
            </div>
          </GlowCard>

          {/* Achievements */}
          <GlowCard className="p-4">
            <h3 className="mb-3 text-xs font-semibold text-wf-text">Achievements</h3>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {achievements.map(({ label, earned, emoji }) => (
                <div key={label} className={`flex flex-col items-center gap-1 rounded-lg border p-2.5 text-center transition-all ${earned ? "border-wf-accent/30 bg-wf-accent/5" : "border-wf-border opacity-40"}`}>
                  <span className="text-xl">{emoji}</span>
                  <p className="text-[9px] text-wf-text-muted leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </GlowCard>

          {/* Mental Health & Motivation */}
          <GlowCard className="p-4">
            <h3 className="mb-3 text-xs font-semibold text-wf-text flex items-center gap-2"><Coffee className="h-3.5 w-3.5 text-wf-accent" />Well-being Check</h3>
            <div className="flex gap-3">
              {[
                { label: "Take a Break", desc: "5 min stretch", icon: Wind, color: "text-blue-400" },
                { label: "Breathe", desc: "2 min mindfulness", icon: Wind, color: "text-wf-success" },
                { label: "You're doing great!", desc: "847 words today 🔥", icon: Flame, color: "text-wf-accent" },
              ].map(({ label, desc, icon: Icon, color }) => (
                <div key={label} className="flex-1 rounded-lg border border-wf-border p-2.5 text-center">
                  <Icon className={`h-4 w-4 mx-auto mb-1 ${color}`} />
                  <p className="text-[10px] font-medium text-wf-text">{label}</p>
                  <p className="text-[9px] text-wf-text-muted">{desc}</p>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
