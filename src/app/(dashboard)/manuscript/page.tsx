"use client";
import React, { useState } from "react";
import { ManuscriptEditor } from "@/components/manuscript/ManuscriptEditor";
import { ChapterNavigator } from "@/components/manuscript/ChapterNavigator";
import { ManuscriptHealthBar } from "@/components/manuscript/ManuscriptHealthBar";

export default function ManuscriptPage() {
  const [activeChapterId, setActiveChapterId] = useState<string | null>("ch-1");

  return (
    <div className="flex h-full flex-col">
      <ManuscriptHealthBar />
      <div className="flex flex-1 overflow-hidden">
        <ChapterNavigator
          chapters={[]}
          activeChapterId={activeChapterId}
          onSelectChapter={setActiveChapterId}
        />
        <div className="flex-1 overflow-hidden">
          <ManuscriptEditor
            chapterTitle="Chapter 1: The Beginning"
            initialContent={`# Chapter 1: The Beginning\n\nThe city of Ashenveil had not seen rain in forty days, and Elara Voss counted every one of them.\n\nShe stood at the edge of the crumbling aqueduct, the desert wind pulling strands of copper hair across her face, and watched the last of the water merchants pack their carts. Below, in the bowl of the lower city, the mage-fires still burned—orange and stubborn, like embers that refused to die.\n\nLike her.\n\nShe pressed her palm to the stone railing. The old magic stirred in her blood, restless and hungry after months of careful suppression. She pushed it back down.\n\n*Not here. Not now.*\n\nBehind her, boots scraped on sandstone.\n\n"The Council's been asking for you," said a voice she knew better than her own heartbeat.\n\nShe didn't turn around. "The Council can wait."\n\n"Elara." Mira Sunwhisper stepped up beside her, close enough that their shoulders nearly touched. The half-elf smelled of lavender and road dust, a combination that meant she'd been traveling. "They found another body."\n\nElara closed her eyes.\n\nOf course they had.\n`}
          />
        </div>
      </div>
    </div>
  );
}
