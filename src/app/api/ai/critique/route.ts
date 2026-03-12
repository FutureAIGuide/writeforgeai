import { NextRequest, NextResponse } from "next/server";
import { generateCompletion } from "@/lib/ai/openrouter";
import { PROMPTS } from "@/lib/ai/prompts";
import type { AIModel } from "@/types/ai";

export async function POST(request: NextRequest) {
  try {
    const { passType, content, model } = await request.json();

    const promptFn = passType === "prose" ? PROMPTS.critiqueProse : PROMPTS.critiqueStructure;

    const result = await generateCompletion({
      model: (model ?? "openai/gpt-4o-mini") as AIModel,
      messages: [
        { role: "system", content: "You are a professional editor. Respond as valid JSON only." },
        { role: "user", content: promptFn(content) },
      ],
      temperature: 0.3,
    });

    let parsed;
    try {
      parsed = JSON.parse(result.content);
    } catch {
      parsed = { summary: result.content, issues: [], score: 70 };
    }

    return NextResponse.json(parsed);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
