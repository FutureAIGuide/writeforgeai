import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const orgId = request.nextUrl.searchParams.get("org_id");
  const novelId = request.nextUrl.searchParams.get("novel_id");

  // Mock analytics data — wire to Supabase usage_events and chapter word counts
  const last14Days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return {
      date: d.toISOString().split("T")[0],
      words: Math.floor(Math.random() * 2000) + 200,
      sessions: Math.floor(Math.random() * 3) + 1,
      tokens_used: Math.floor(Math.random() * 5000) + 500,
    };
  });

  const sentimentTrend = Array.from({ length: 10 }, (_, i) => ({
    chapter: i + 1,
    score: parseFloat((Math.random() * 0.5 + 0.4).toFixed(2)),
    label: ["engaged", "curious", "tense", "excited", "bored", "thrilled"][Math.floor(Math.random() * 6)],
  }));

  const sceneEngagement = [
    { subject: "Action", value: 82 },
    { subject: "Dialogue", value: 71 },
    { subject: "Description", value: 65 },
    { subject: "Introspection", value: 78 },
    { subject: "Conflict", value: 89 },
    { subject: "Romance", value: 74 },
  ];

  const summary = {
    total_words: 42300,
    avg_daily_words: 1247,
    writing_streak: 5,
    longest_streak: 12,
    total_sessions: 38,
    avg_session_minutes: 47,
    chapters_complete: 7,
    chapters_total: 18,
    health_score: 78,
    tokens_used: 12500,
    tokens_limit: 50000,
    readability_grade: 8,
  };

  return NextResponse.json({ summary, cadence: last14Days, sentiment: sentimentTrend, engagement: sceneEngagement });
}
