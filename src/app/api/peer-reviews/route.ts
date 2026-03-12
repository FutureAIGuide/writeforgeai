import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const novelId = request.nextUrl.searchParams.get("novel_id");
  return NextResponse.json([
    { id: "pr1", novel_id: novelId, reviewer_id: "u2", content: "The first three chapters are compelling. Elara is immediately sympathetic and the world feels rich without being overwhelming. My main concern is the pacing in chapter 4 — it loses momentum after the aqueduct scene.", rating: 4, status: "submitted", created_at: new Date().toISOString() },
  ]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ id: `pr-${Date.now()}`, ...body, status: "submitted", created_at: new Date().toISOString() }, { status: 201 });
}
