"use client";
import React, { useState } from "react";
import { Search, Bell, ChevronDown, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { UpgradeModal } from "@/components/shared/UpgradeModal";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { useSubscription } from "@/hooks/useSubscription";

export function TopCommandBar() {
  const { isOpen, open, close } = useCommandPalette();
  const { plan } = useSubscription();
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  return (
    <>
      <header className="flex h-14 items-center justify-between border-b border-wf-border bg-wf-panel px-4">
        {/* Project selector */}
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-md border border-wf-border bg-wf-panel-elevated px-3 py-1.5 text-sm text-wf-text hover:border-wf-accent transition-colors">
                <span className="max-w-[160px] truncate">My Novel Project</span>
                <ChevronDown className="h-3 w-3 text-wf-text-muted" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Projects</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>My Novel Project</DropdownMenuItem>
              <DropdownMenuItem>Short Story Collection</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>+ New Project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Center: search */}
        <button
          onClick={open}
          className="flex items-center gap-2 rounded-md border border-wf-border bg-wf-panel-elevated px-4 py-1.5 text-sm text-wf-text-muted hover:border-wf-accent hover:text-wf-text transition-colors"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Search or run a command...</span>
          <kbd className="ml-2 hidden rounded border border-wf-border px-1.5 py-0.5 text-xs sm:inline-flex">
            ⌘K
          </kbd>
        </button>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          {plan === "free" && (
            <Button size="sm" className="gap-1.5" onClick={() => setUpgradeOpen(true)}>
              <Zap className="h-3.5 w-3.5" />
              Upgrade
            </Button>
          )}

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative rounded-md p-2 text-wf-text-muted hover:bg-wf-panel-elevated hover:text-wf-text">
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-wf-accent" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-3 text-sm">
                <div className="mb-2 flex items-start gap-3 rounded-md p-2 hover:bg-wf-panel-elevated">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-wf-accent shrink-0" />
                  <div>
                    <p className="font-medium text-wf-text">Beta read completed</p>
                    <p className="text-wf-text-muted text-xs mt-0.5">Your beta run &quot;Chapter 1-5&quot; is ready</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-md p-2 hover:bg-wf-panel-elevated">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-wf-text-muted shrink-0" />
                  <div>
                    <p className="font-medium text-wf-text">Critique report ready</p>
                    <p className="text-wf-text-muted text-xs mt-0.5">Structure pass completed</p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-md p-1 hover:bg-wf-panel-elevated">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback>WF</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-wf-danger">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {plan !== "free" && (
            <Badge variant="default" className="text-xs">
              {plan?.toUpperCase()}
            </Badge>
          )}
        </div>
      </header>

      <CommandPalette open={isOpen} onClose={close} />
      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} currentPlan={plan} />
    </>
  );
}
