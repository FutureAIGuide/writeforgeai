import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ id: `l-${Date.now()}`, ...body, created_at: new Date().toISOString() }, { status: 201 });
}
