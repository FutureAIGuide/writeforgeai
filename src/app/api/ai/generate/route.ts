import { NextRequest, NextResponse } from "next/server";
import { generateCompletion } from "@/lib/ai/openrouter";
import type { AIModel } from "@/types/ai";

export async function POST(request: NextRequest) {
  try {
    const { content, model, temperature } = await request.json();

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const result = await generateCompletion({
      model: (model ?? "openai/gpt-4o-mini") as AIModel,
      messages: [{ role: "user", content }],
      temperature: temperature ?? 0.7,
    });

    return NextResponse.json({ content: result.content, usage: result.usage });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
