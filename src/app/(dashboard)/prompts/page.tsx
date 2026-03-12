"use client";
import React, { useState } from "react";
import { PromptEditor } from "@/components/prompts/PromptEditor";
import { PromptLibrary } from "@/components/prompts/PromptLibrary";

export default function PromptsPage() {
  const [activePrompt, setActivePrompt] = useState({
    title: "Scene Generator",
    content: `You are a skilled fiction writer helping craft a scene.

Context: {{context}}
POV Character: {{pov_character}}
Setting: {{setting}}
Conflict: {{conflict}}
Tone: {{tone}}

Write a complete scene (400-600 words) that:
1. Opens with immediate sensory detail
2. Advances both plot and character
3. Ends with a hook or revelation

Scene:`,
  });

  return (
    <div className="flex h-full gap-4 p-6 overflow-hidden">
      <div className="w-56 shrink-0 overflow-hidden">
        <h2 className="mb-3 text-sm font-semibold text-wf-text">Template Library</h2>
        <PromptLibrary onSelect={(id) => console.log("selected", id)} />
      </div>
      <div className="flex-1 overflow-hidden">
        <h1 className="mb-4 text-2xl font-bold text-wf-text">Prompt Studio</h1>
        <div className="h-[calc(100%-3.5rem)] overflow-hidden">
          <PromptEditor
            initialTitle={activePrompt.title}
            initialContent={activePrompt.content}
          />
        </div>
      </div>
    </div>
  );
}
