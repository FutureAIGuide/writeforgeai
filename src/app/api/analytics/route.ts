import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    wordCountByDay: [],
    sentimentTrend: [],
    topWritingHours: [],
    streakDays: 5,
    totalWords: 42300,
  });
}
