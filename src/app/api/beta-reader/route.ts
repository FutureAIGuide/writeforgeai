import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const novelId = searchParams.get("novel_id");
  return NextResponse.json([
    { id: "r1", novel_id: novelId, title: "Beta Run #1", status: "complete", created_at: new Date().toISOString() },
  ]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const run = { id: `r-${Date.now()}`, ...body, status: "pending", created_at: new Date().toISOString() };
  return NextResponse.json(run, { status: 201 });
}
