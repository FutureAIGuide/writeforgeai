"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, RefreshCw, Eye, MessageSquare, Sparkles, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AIAction {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  onClick: () => void;
  loading?: boolean;
}

interface AIActionPanelProps {
  onRewriteContext?: () => void;
  onSimulateReader?: () => void;
  onSuggestContinuation?: () => void;
  onFixShowTell?: () => void;
  className?: string;
  isLoading?: boolean;
}

export function AIActionPanel({ onRewriteContext, onSimulateReader, onSuggestContinuation, onFixShowTell, className, isLoading }: AIActionPanelProps) {
  const [expanded, setExpanded] = useState(false);

  const actions: AIAction[] = [
    { id: "rewrite", label: "Rewrite Context", description: "AI rewrites the selected passage", icon: RefreshCw, onClick: onRewriteContext ?? (() => {}), loading: isLoading },
    { id: "reader", label: "Simulate Reader Reaction", description: "See how a beta reader would react", icon: Eye, onClick: onSimulateReader ?? (() => {}) },
    { id: "continue", label: "Suggest Continuation", description: "AI suggests what comes next", icon: Sparkles, onClick: onSuggestContinuation ?? (() => {}) },
    { id: "showtell", label: "Fix Show-Don't-Tell", description: "Convert telling to showing", icon: MessageSquare, onClick: onFixShowTell ?? (() => {}) },
  ];

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-14 right-0 w-60 rounded-xl border border-wf-border bg-wf-panel-elevated shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,106,0,0.1)] p-2 space-y-1"
          >
            <div className="flex items-center justify-between px-2 py-1 mb-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-wf-text-muted">AI Action</span>
              <span className="text-[10px] text-wf-text-muted">Context-aware quick actions.</span>
            </div>
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => { action.onClick(); setExpanded(false); }}
                disabled={action.loading}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-wf-text-muted transition-colors hover:bg-wf-accent/10 hover:text-wf-accent disabled:opacity-50"
              >
                {action.loading ? (
                  <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-wf-accent" />
                ) : (
                  <action.icon className="h-3.5 w-3.5 shrink-0" />
                )}
                <div>
                  <p className="font-medium text-wf-text">{action.label}</p>
                  <p className="text-[10px] leading-tight">{action.description}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-wf-accent shadow-[0_0_24px_rgba(255,106,0,0.6)] transition-all hover:shadow-[0_0_32px_rgba(255,106,0,0.8)] hover:scale-105 active:scale-95"
      >
        {expanded ? (
          <X className="h-5 w-5 text-white" />
        ) : (
          <Wand2 className="h-5 w-5 text-white" />
        )}
      </button>
    </div>
  );
}
