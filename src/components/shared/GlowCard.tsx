"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowOnHover?: boolean;
  elevated?: boolean;
  children: React.ReactNode;
}

export function GlowCard({ className, glowOnHover = true, elevated = false, children, ...props }: GlowCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-300",
        elevated ? "bg-wf-panel-elevated" : "bg-wf-panel",
        glowOnHover
          ? "border-wf-border hover:border-wf-accent hover:shadow-[0_0_20px_rgba(255,106,0,0.25)]"
          : "border-wf-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
