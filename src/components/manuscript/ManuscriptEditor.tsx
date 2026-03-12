"use client";
import React, { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Save, Wand2, Eye } from "lucide-react";
import { formatNumber } from "@/lib/utils";

const MonacoEditor = dynamic(() => import("@monaco-editor/react").then((m) => m.Editor), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-wf-text-muted">
      Loading editor...
    </div>
  ),
});

interface ManuscriptEditorProps {
  initialContent?: string;
  chapterTitle?: string;
  onSave?: (content: string) => Promise<void>;
  isSaving?: boolean;
}

export function ManuscriptEditor({
  initialContent = "# Chapter 1\n\nStart writing your masterpiece here...\n",
  chapterTitle = "Chapter 1",
  onSave,
  isSaving = false,
}: ManuscriptEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [showPreview, setShowPreview] = useState(false);
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  const handleSave = useCallback(async () => {
    if (onSave) await onSave(content);
  }, [content, onSave]);

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-wf-border bg-wf-panel px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-wf-text">{chapterTitle}</span>
          <span className="text-xs text-wf-text-muted">{formatNumber(wordCount)} words</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="h-3.5 w-3.5 mr-1" />
            {showPreview ? "Edit" : "Preview"}
          </Button>
          <Button variant="ghost" size="sm">
            <Wand2 className="h-3.5 w-3.5 mr-1 text-wf-accent" />
            AI Assist
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isSaving}>
            <Save className="h-3.5 w-3.5 mr-1" />
            {isSaving ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        {showPreview ? (
          <div className="h-full overflow-y-auto p-8 scrollbar-thin">
            <div className="mx-auto max-w-2xl prose prose-invert prose-sm">
              {content.split("\n").map((line, i) => (
                <p key={i} className="mb-2 text-wf-text leading-relaxed">{line || "\u00A0"}</p>
              ))}
            </div>
          </div>
        ) : (
          <MonacoEditor
            height="100%"
            language="markdown"
            value={content}
            onChange={(v) => setContent(v ?? "")}
            theme="vs-dark"
            options={{
              fontSize: 15,
              fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
              lineHeight: 1.8,
              wordWrap: "on",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              padding: { top: 24, bottom: 24 },
              lineNumbers: "off",
              renderLineHighlight: "none",
              overviewRulerBorder: false,
              hideCursorInOverviewRuler: true,
              scrollbar: { vertical: "hidden", horizontal: "hidden" },
            }}
          />
        )}
      </div>
    </div>
  );
}
