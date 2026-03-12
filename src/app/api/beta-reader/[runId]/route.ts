import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params;
  return NextResponse.json({ id: runId, status: "complete", personas: [] });
}
