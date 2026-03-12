import { NextRequest, NextResponse } from "next/server";
import { generateCompletion } from "@/lib/ai/openrouter";
import { PROMPTS } from "@/lib/ai/prompts";
import type { AIModel } from "@/types/ai";

export async function POST(request: NextRequest) {
  try {
    const { query, genre = "fantasy", novelContext = "", model } = await request.json();
    if (!query) return NextResponse.json({ error: "query required" }, { status: 400 });

    const result = await generateCompletion({
      model: (model ?? "openai/gpt-4o-mini") as AIModel,
      messages: [
        { role: "system", content: "You are an expert research assistant for fiction writers. Respond as valid JSON only." },
        { role: "user", content: PROMPTS.researchQuery(query, genre, novelContext) },
      ],
      temperature: 0.3,
    });

    let parsed;
    try {
      parsed = JSON.parse(result.content);
    } catch {
      parsed = { summary: result.content, key_facts: [], story_details: [], follow_up_questions: [] };
    }

    return NextResponse.json(parsed);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // Returns saved research notes
  const novelId = request.nextUrl.searchParams.get("novel_id");
  const mockNotes = [
    { id: "rn1", novel_id: novelId, title: "Medieval Siege Warfare", content: "Trebuchets could hurl 300lb stones up to 300 meters.", tags: ["warfare", "medieval"], source: "Historical Encyclopedia", created_at: new Date().toISOString() },
    { id: "rn2", novel_id: novelId, title: "Desert Ecology & Survival", content: "Humans can survive 3-4 days without water in desert conditions.", tags: ["survival", "environment"], source: "Desert Survival Manual", created_at: new Date().toISOString() },
  ];
  return NextResponse.json(mockNotes);
}
