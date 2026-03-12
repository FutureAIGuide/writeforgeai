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
        { role: "system", content: "You are an emotional intelligence expert. Respond as valid JSON only." },
        { role: "user", content: PROMPTS.sentimentAnalysis(content) },
      ],
      temperature: 0.3,
    });
    let parsed;
    try { parsed = JSON.parse(result.content); } catch { parsed = { overall_sentiment: "neutral", emotional_tone: result.content }; }
    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
