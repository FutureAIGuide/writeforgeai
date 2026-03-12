"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, LayoutDashboard, BookOpen, GitBranch, Users, Globe, Eye, BarChart2, Settings, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

const commands = [
  { id: "dashboard", label: "Go to Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { id: "manuscript", label: "Open Manuscript", href: "/manuscript", icon: BookOpen },
  { id: "workflow", label: "Open Workflow Builder", href: "/workflow", icon: GitBranch },
  { id: "characters", label: "Manage Characters", href: "/characters", icon: Users },
  { id: "worldbuilding", label: "Worldbuilding", href: "/worldbuilding", icon: Globe },
  { id: "beta-reader", label: "Run Beta Reader", href: "/beta-reader", icon: Eye },
  { id: "analytics", label: "View Analytics", href: "/analytics", icon: BarChart2 },
  { id: "prompts", label: "Prompt Studio", href: "/prompts", icon: Wand2 },
  { id: "settings", label: "Settings", href: "/settings", icon: Settings },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        const cmd = filtered[activeIndex];
        if (cmd) {
          router.push(cmd.href);
          onClose();
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, activeIndex, router, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-wf-border bg-wf-panel shadow-2xl shadow-black/50">
        <div className="flex items-center border-b border-wf-border px-4">
          <Search className="h-4 w-4 shrink-0 text-wf-text-muted" />
          <input
            autoFocus
            className="flex-1 bg-transparent px-3 py-4 text-sm text-wf-text placeholder:text-wf-text-muted focus:outline-none"
            placeholder="Search commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="hidden rounded border border-wf-border px-1.5 py-0.5 text-xs text-wf-text-muted sm:inline-block">
            ESC
          </kbd>
        </div>
        <div className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-wf-text-muted">No results found.</p>
          ) : (
            filtered.map((cmd, i) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-wf-text transition-colors",
                    i === activeIndex ? "bg-wf-accent/20 text-wf-accent" : "hover:bg-wf-panel-elevated"
                  )}
                  onClick={() => { router.push(cmd.href); onClose(); }}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {cmd.label}
                </button>
              );
            })
          )}
        </div>
        <div className="border-t border-wf-border px-4 py-2 text-xs text-wf-text-muted">
          <kbd className="rounded border border-wf-border px-1 py-0.5">↑↓</kbd> navigate · <kbd className="rounded border border-wf-border px-1 py-0.5">↵</kbd> open
        </div>
      </div>
    </div>
  );
}
