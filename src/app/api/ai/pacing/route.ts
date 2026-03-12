import { NextRequest, NextResponse } from "next/server";
import { generateCompletion } from "@/lib/ai/openrouter";
import { PROMPTS } from "@/lib/ai/prompts";
import type { AIModel } from "@/types/ai";

export async function POST(request: NextRequest) {
  try {
    const { content, model } = await request.json();
    const result = await generateCompletion({
      model: (model ?? "openai/gpt-4o-mini") as AIModel,
      messages: [
        { role: "system", content: "You are a pacing specialist for fiction. Respond as valid JSON only." },
        { role: "user", content: PROMPTS.pacingAnalysis(content) },
      ],
      temperature: 0.3,
    });
    let parsed;
    try { parsed = JSON.parse(result.content); } catch { parsed = { overall_pacing: "medium", pacing_score: 70 }; }
    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
