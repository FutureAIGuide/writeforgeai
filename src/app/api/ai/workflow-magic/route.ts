import { NextRequest, NextResponse } from "next/server";
import { generateCompletion } from "@/lib/ai/openrouter";
import { PROMPTS } from "@/lib/ai/prompts";
import type { AIModel } from "@/types/ai";

export async function POST(request: NextRequest) {
  try {
    const { novelDescription, currentStage, goals, model } = await request.json();
    const result = await generateCompletion({
      model: (model ?? "openai/gpt-4o") as AIModel,
      messages: [
        { role: "system", content: "You are an expert AI writing process architect. Respond as valid JSON only." },
        { role: "user", content: PROMPTS.generateWorkflow(novelDescription, currentStage, goals ?? []) },
      ],
      temperature: 0.6,
    });
    let parsed;
    try { parsed = JSON.parse(result.content); } catch { parsed = { nodes: [], edges: [], description: result.content }; }
    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
