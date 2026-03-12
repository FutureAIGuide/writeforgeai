"use client";
import React from "react";
import { ManuscriptEditor } from "@/components/manuscript/ManuscriptEditor";
import { ManuscriptHealthBar } from "@/components/manuscript/ManuscriptHealthBar";
import { use } from "react";

export default function ManuscriptIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <div className="flex h-full flex-col">
      <ManuscriptHealthBar />
      <div className="flex-1 overflow-hidden">
        <ManuscriptEditor chapterTitle={`Chapter ${id}`} />
      </div>
    </div>
  );
}
