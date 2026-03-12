"use client";
import React from "react";
import { WorkflowCanvas } from "@/components/workflow/WorkflowCanvas";

export default function WorkflowPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-wf-border px-6 py-3">
        <div>
          <h1 className="text-lg font-bold text-wf-text">Workflow Builder</h1>
          <p className="text-xs text-wf-text-muted">Design your writing process as a visual pipeline</p>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <WorkflowCanvas />
      </div>
    </div>
  );
}
