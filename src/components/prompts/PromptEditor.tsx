"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Play, Copy } from "lucide-react";
import { AI_MODELS } from "@/lib/constants";

const MonacoEditor = dynamic(() => import("@monaco-editor/react").then((m) => m.Editor), { ssr: false });

interface PromptEditorProps {
  initialContent?: string;
  initialTitle?: string;
  onSave?: (data: { title: string; content: string; model: string; temperature: number }) => void;
}

export function PromptEditor({ initialContent = "", initialTitle = "Untitled Prompt", onSave }: PromptEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [model, setModel] = useState("openai/gpt-4o-mini");
  const [temperature, setTemperature] = useState(0.7);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("Running prompt...");
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, model, temperature }),
      });
      const data = await res.json();
      setOutput(data.content ?? "No output");
    } catch {
      setOutput("Error running prompt");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-3">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} className="max-w-xs font-medium" placeholder="Prompt title" />
        <Select value={model} onValueChange={setModel}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {AI_MODELS.map((m) => (
              <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <Label className="text-xs text-wf-text-muted">Temp:</Label>
          <input
            type="range" min="0" max="1" step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-20 accent-wf-accent"
          />
          <span className="text-xs text-wf-text-muted">{temperature}</span>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(content)}>
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" onClick={handleRun} disabled={isRunning}>
            <Play className="h-3.5 w-3.5 mr-1" />
            Run
          </Button>
          <Button size="sm" variant="outline" onClick={() => onSave?.({ title, content, model, temperature })}>
            <Save className="h-3.5 w-3.5 mr-1" />
            Save
          </Button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-3 overflow-hidden">
        <div className="overflow-hidden rounded-lg border border-wf-border">
          <div className="border-b border-wf-border bg-wf-panel-elevated px-3 py-1.5">
            <span className="text-xs font-medium text-wf-text-muted">Prompt</span>
          </div>
          <MonacoEditor
            height="100%"
            language="markdown"
            value={content}
            onChange={(v) => setContent(v ?? "")}
            theme="vs-dark"
            options={{ fontSize: 13, lineNumbers: "off", wordWrap: "on", minimap: { enabled: false }, padding: { top: 12 } }}
          />
        </div>
        <div className="overflow-hidden rounded-lg border border-wf-border">
          <div className="border-b border-wf-border bg-wf-panel-elevated px-3 py-1.5">
            <span className="text-xs font-medium text-wf-text-muted">Output</span>
          </div>
          <div className="h-full overflow-y-auto p-4 scrollbar-thin">
            {output ? (
              <p className="text-sm text-wf-text leading-relaxed whitespace-pre-wrap">{output}</p>
            ) : (
              <p className="text-sm text-wf-text-muted">Output will appear here after running the prompt.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
