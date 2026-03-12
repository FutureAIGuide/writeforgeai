"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, GitBranch, Users, Globe, Search, Wand2,
  Eye, MessageSquare, BarChart2, Image, Award, Rocket, Settings,
  ChevronDown, ChevronRight, Zap, PanelLeftClose, PanelLeft, Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, BookOpen, GitBranch, Users, Globe, Search, Wand2,
  Eye, MessageSquare, BarChart2, Image, Award, Rocket, Settings, Timer,
};

const navSections = [
  {
    section: "Core",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
      { label: "Manuscript", href: "/manuscript", icon: "BookOpen" },
      { label: "Workflow", href: "/workflow", icon: "GitBranch" },
    ],
  },
  {
    section: "Story",
    items: [
      { label: "Characters", href: "/characters", icon: "Users" },
      { label: "Worldbuilding", href: "/worldbuilding", icon: "Globe" },
      { label: "Research", href: "/research", icon: "Search" },
      { label: "Prompts", href: "/prompts", icon: "Wand2" },
    ],
  },
  {
    section: "Analysis",
    items: [
      { label: "Beta Reader", href: "/beta-reader", icon: "Eye" },
      { label: "Critic", href: "/critic", icon: "MessageSquare" },
      { label: "Peer Review", href: "/peer-review", icon: "Users" },
      { label: "Analytics", href: "/analytics", icon: "BarChart2" },
    ],
  },
  {
    section: "Productivity",
    items: [
      { label: "My Flow", href: "/my-flow", icon: "Timer" },
    ],
  },
  {
    section: "Publishing",
    items: [
      { label: "Media Studio", href: "/media-studio", icon: "Image" },
      { label: "Author Suite", href: "/author-suite", icon: "Award" },
      { label: "Release Strategy", href: "/release-strategy", icon: "Rocket" },
    ],
  },
  {
    section: "Account",
    items: [
      { label: "Settings", href: "/settings", icon: "Settings" },
    ],
  },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      next.has(section) ? next.delete(section) : next.add(section);
      return next;
    });
  };

  return (
    <TooltipProvider delayDuration={200}>
      <aside
        className={cn(
          "flex h-screen flex-col border-r border-wf-border bg-wf-panel transition-all duration-300",
          collapsed ? "w-14" : "w-60"
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center justify-between border-b border-wf-border px-3">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-wf-accent">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-bold text-wf-text">Write Forge AI</span>
            </div>
          )}
          {collapsed && (
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-wf-accent mx-auto">
              <Zap className="h-4 w-4 text-white" />
            </div>
          )}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="text-wf-text-muted hover:text-wf-text"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          )}
        </div>

        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="flex justify-center py-2 text-wf-text-muted hover:text-wf-text"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 scrollbar-thin">
          {navSections.map(({ section, items }) => {
            const isSectionCollapsed = collapsedSections.has(section);
            return (
              <div key={section} className="mb-4">
                {!collapsed && (
                  <button
                    onClick={() => toggleSection(section)}
                    className="mb-1 flex w-full items-center justify-between px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-wf-text-muted hover:text-wf-text"
                  >
                    {section}
                    {isSectionCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>
                )}
                {!isSectionCollapsed && items.map((item) => {
                  const Icon = iconMap[item.icon];
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <Tooltip key={item.href}>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                            collapsed ? "justify-center" : "",
                            isActive
                              ? "bg-wf-accent/15 text-wf-accent font-medium"
                              : "text-wf-text-muted hover:bg-wf-panel-elevated hover:text-wf-text"
                          )}
                        >
                          {Icon && <Icon className="h-4 w-4 shrink-0" />}
                          {!collapsed && <span>{item.label}</span>}
                        </Link>
                      </TooltipTrigger>
                      {collapsed && (
                        <TooltipContent side="right">{item.label}</TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </aside>
    </TooltipProvider>
  );
}
