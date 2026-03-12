"use client";
import React from "react";
import { SidebarNav } from "./SidebarNav";
import { TopCommandBar } from "./TopCommandBar";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-wf-bg">
      <SidebarNav />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopCommandBar />
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}
