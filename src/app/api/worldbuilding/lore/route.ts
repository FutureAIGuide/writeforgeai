import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const novelId = request.nextUrl.searchParams.get("novel_id");
  const category = request.nextUrl.searchParams.get("category");

  const mockEntries = [
    { id: "l1", novel_id: novelId, category: "magic_system", title: "The Ember Weave", content: "The fundamental magical force of Ashenveil, drawing from emotional energy.", tags: ["magic", "core"], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), created_by: "u1", deleted_at: null },
    { id: "l2", novel_id: novelId, category: "location", title: "Ashenveil", content: "A walled desert city of 200,000 souls built over the ruins of the old Emberfort.", tags: ["city", "setting"], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), created_by: "u1", deleted_at: null },
    { id: "l3", novel_id: novelId, category: "faction", title: "The Mage Council", content: "The ruling body of twelve Elder Mages who control Ashenveil.", tags: ["government", "antagonist"], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), created_by: "u1", deleted_at: null },
  ].filter((e) => !category || e.category === category);

  return NextResponse.json(mockEntries);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ id: `l-${Date.now()}`, ...body, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), created_by: "u1", deleted_at: null }, { status: 201 });
}
