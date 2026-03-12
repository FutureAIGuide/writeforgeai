import { NextRequest, NextResponse } from "next/server";
import { generateCompletion } from "@/lib/ai/openrouter";
import { PROMPTS } from "@/lib/ai/prompts";
import type { AIModel } from "@/types/ai";

export async function POST(request: NextRequest) {
  try {
    const { personaType, chapterContent, focusAreas, model } = await request.json();

    const result = await generateCompletion({
      model: (model ?? "openai/gpt-4o-mini") as AIModel,
      messages: [
        { role: "system", content: "You are an AI simulating a reader persona. Respond as valid JSON only." },
        { role: "user", content: PROMPTS.betaReader(personaType, chapterContent, focusAreas) },
      ],
      temperature: 0.8,
    });

    let parsed;
    try {
      parsed = JSON.parse(result.content);
    } catch {
      parsed = { feedback: result.content, sentiment_data: [], engagement_score: 0.7 };
    }

    return NextResponse.json(parsed);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
