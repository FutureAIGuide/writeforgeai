import { NextRequest, NextResponse } from "next/server";

// Mock data for character CRUD — wire to Supabase via getCharacters/upsertCharacter
export async function GET(request: NextRequest) {
  const novelId = request.nextUrl.searchParams.get("novel_id");
  if (!novelId) return NextResponse.json({ error: "novel_id required" }, { status: 400 });

  const mockCharacters = [
    { id: "c1", novel_id: novelId, name: "Elara Voss", role: "protagonist", description: "Seventeen-year-old mage with absorption ability", motivation: "Survive and understand her power", wound: "Accidentally killed her mentor", fear: "Becoming the monster they say she is", secret: "Her ability is getting stronger, not weaker", arc_stage: "Reluctant hero", voice_profile: "Dry wit, observant, occasionally self-deprecating", created_at: new Date().toISOString(), updated_at: new Date().toISOString(), created_by: "u1", deleted_at: null },
    { id: "c2", novel_id: novelId, name: "Kayn Ashveil", role: "supporting", description: "Council spy with a hidden agenda", motivation: "Unknown to protagonist — possibly revenge", wound: "Lost his family to Council purges", fear: "Being used again", secret: "Working against the Council from within", arc_stage: "Mysterious ally", voice_profile: "Terse, precise, guards every word", created_at: new Date().toISOString(), updated_at: new Date().toISOString(), created_by: "u1", deleted_at: null },
    { id: "c3", novel_id: novelId, name: "Mira Sunwhisper", role: "supporting", description: "Half-elf hedge-witch and Elara's closest friend", motivation: "Protect Elara and find her missing sister", wound: "Separated from her twin during the Dust Wars", fear: "Loyalty and love making her weak", secret: "She can hear the dead — and they're worried", arc_stage: "Loyal friend tested", voice_profile: "Warm, steady, hides worry behind practicality", created_at: new Date().toISOString(), updated_at: new Date().toISOString(), created_by: "u1", deleted_at: null },
  ];

  return NextResponse.json(mockCharacters);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { novel_id, ...rest } = body;
  if (!novel_id) return NextResponse.json({ error: "novel_id required" }, { status: 400 });

  return NextResponse.json(
    { id: `c-${Date.now()}`, novel_id, ...rest, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), created_by: "u1", deleted_at: null },
    { status: 201 }
  );
}
