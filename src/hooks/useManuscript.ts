"use client";
import { useState, useCallback } from "react";
import type { Chapter } from "@/types";
import { countWords } from "@/lib/utils";

export function useManuscript(novelId?: string) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const wordCount = countWords(content);

  const fetchChapters = useCallback(async () => {
    if (!novelId) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/manuscripts/${novelId}`);
      if (res.ok) {
        const data = await res.json();
        setChapters(data.chapters ?? []);
      }
    } finally {
      setIsLoading(false);
    }
  }, [novelId]);

  const saveChapter = useCallback(async (chapterId: string, newContent: string) => {
    setIsSaving(true);
    try {
      await fetch(`/api/manuscripts/${chapterId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newContent, word_count: countWords(newContent) }),
      });
    } finally {
      setIsSaving(false);
    }
  }, []);

  return { chapters, activeChapterId, setActiveChapterId, content, setContent, wordCount, isLoading, isSaving, fetchChapters, saveChapter };
}
