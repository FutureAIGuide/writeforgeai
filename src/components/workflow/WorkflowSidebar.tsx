"use client";
import React from "react";
import { Lightbulb, Search, Users, List, FileText, MessageSquare, Eye, Megaphone } from "lucide-react";

const nodeTypes = [
  { type: "idea", label: "Idea", icon: Lightbulb, color: "text-yellow-400" },
  { type: "research", label: "Research", icon: Search, color: "text-blue-400" },
  { type: "character", label: "Character", icon: Users, color: "text-purple-400" },
  { type: "outline", label: "Outline", icon: List, color: "text-green-400" },
  { type: "draft", label: "Draft", icon: FileText, color: "text-wf-accent" },
  { type: "critic", label: "Critic", icon: MessageSquare, color: "text-red-400" },
  { type: "beta-reader", label: "Beta Reader", icon: Eye, color: "text-teal-400" },
  { type: "marketing", label: "Marketing", icon: Megaphone, color: "text-pink-400" },
];

export function WorkflowSidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="flex w-48 flex-col border-r border-wf-border bg-wf-panel p-3">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-wf-text-muted">
        Node Types
      </p>
      <div className="space-y-1.5">
        {nodeTypes.map(({ type, label, icon: Icon, color }) => (
          <div
            key={type}
            draggable
            onDragStart={(e) => onDragStart(e, type)}
            className="flex cursor-grab items-center gap-2.5 rounded-md border border-wf-border bg-wf-panel-elevated px-3 py-2 text-sm text-wf-text hover:border-wf-accent transition-colors active:cursor-grabbing"
          >
            <Icon className={`h-3.5 w-3.5 ${color}`} />
            {label}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-md border border-wf-border bg-wf-panel-elevated p-3">
        <p className="text-xs text-wf-text-muted">
          Drag nodes onto the canvas to build your writing workflow.
        </p>
      </div>
    </div>
  );
}
