import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  // In production: fetch from Supabase
  return NextResponse.json([
    { id: "m1", title: "The Ember Chronicles", status: "active", word_count: 42300, updated_at: new Date().toISOString() },
  ]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ id: `m-${Date.now()}`, ...body, created_at: new Date().toISOString() }, { status: 201 });
}
