import { createServerClient } from "./server";
import type { Database } from "@/types/database";

// --- Projects ---
export async function getProjects(orgId: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("org_id", orgId)
    .is("deleted_at", null)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createProject(orgId: string, userId: string, input: { title: string; description?: string; genre?: string; target_word_count?: number }) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("projects")
    .insert({ org_id: orgId, created_by: userId, ...input })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// --- Novels ---
export async function getNovels(projectId: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("novels")
    .select("*")
    .eq("project_id", projectId)
    .is("deleted_at", null)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getNovelById(novelId: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("novels")
    .select("*, projects(org_id, title)")
    .eq("id", novelId)
    .single();
  if (error) throw error;
  return data;
}

// --- Chapters ---
export async function getChapters(novelId: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("chapters")
    .select("id, title, order_index, status, word_count, created_at, updated_at")
    .eq("novel_id", novelId)
    .is("deleted_at", null)
    .order("order_index", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getChapterWithContent(chapterId: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("chapters")
    .select("*, scenes(*)")
    .eq("id", chapterId)
    .single();
  if (error) throw error;
  return data;
}

export async function upsertChapter(
  novelId: string,
  userId: string,
  chapterId: string | null,
  input: { title: string; content?: string; order_index?: number; status?: string; word_count?: number }
) {
  const supabase = await createServerClient();
  if (chapterId) {
    const { data, error } = await supabase
      .from("chapters")
      .update({ ...input, updated_at: new Date().toISOString() })
      .eq("id", chapterId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
  const { data, error } = await supabase
    .from("chapters")
    .insert({ novel_id: novelId, created_by: userId, ...input })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// --- Characters ---
export async function getCharacters(novelId: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .eq("novel_id", novelId)
    .is("deleted_at", null)
    .order("name", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getCharacterRelationships(novelId: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("character_relationships")
    .select("*, character_a:characters!character_a_id(id, name, role), character_b:characters!character_b_id(id, name, role)")
    .in("character_a_id", (await getCharacters(novelId)).map((c) => c.id));
  if (error) throw error;
  return data;
}

export async function upsertCharacter(
  novelId: string,
  userId: string,
  charId: string | null,
  input: {
    name: string;
    role?: string;
    description?: string;
    backstory?: string;
    motivation?: string;
    wound?: string;
    fear?: string;
    secret?: string;
    voice_profile?: string;
    arc_stage?: string;
  }
) {
  const supabase = await createServerClient();
  if (charId) {
    const { data, error } = await supabase.from("characters").update({ ...input, updated_at: new Date().toISOString() }).eq("id", charId).select().single();
    if (error) throw error;
    return data;
  }
  const { data, error } = await supabase.from("characters").insert({ novel_id: novelId, created_by: userId, ...input }).select().single();
  if (error) throw error;
  return data;
}

// --- Lore Entries ---
export async function getLoreEntries(novelId: string, category?: string) {
  const supabase = await createServerClient();
  let q = supabase.from("lore_entries").select("*").eq("novel_id", novelId).is("deleted_at", null);
  if (category) q = q.eq("category", category);
  const { data, error } = await q.order("title", { ascending: true });
  if (error) throw error;
  return data;
}

export async function upsertLoreEntry(
  novelId: string,
  userId: string,
  entryId: string | null,
  input: { category: string; title: string; content: string; tags?: string[] }
) {
  const supabase = await createServerClient();
  if (entryId) {
    const { data, error } = await supabase.from("lore_entries").update({ ...input, updated_at: new Date().toISOString() }).eq("id", entryId).select().single();
    if (error) throw error;
    return data;
  }
  const { data, error } = await supabase.from("lore_entries").insert({ novel_id: novelId, created_by: userId, ...input }).select().single();
  if (error) throw error;
  return data;
}

// --- Beta Runs ---
export async function getBetaRuns(novelId: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("beta_runs")
    .select("*, beta_personas(id, name, type)")
    .eq("novel_id", novelId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createBetaRun(
  novelId: string,
  userId: string,
  input: { title: string; config: Record<string, unknown> }
) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("beta_runs")
    .insert({ novel_id: novelId, created_by: userId, ...input })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getBetaPersonas(runId: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("beta_personas")
    .select("*")
    .eq("beta_run_id", runId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}

export async function saveBetaPersonaFeedback(
  runId: string,
  input: { name: string; type: string; demographics: Record<string, unknown>; preferences: Record<string, unknown>; feedback: string; sentiment_data: unknown[] }
) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("beta_personas")
    .insert({ beta_run_id: runId, ...input })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// --- Critique Reports ---
export async function getCritiqueReports(novelId: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("critique_reports")
    .select("*")
    .eq("novel_id", novelId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createCritiqueReport(
  novelId: string,
  userId: string,
  input: { pass_type: string; issues: unknown[]; summary?: string }
) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("critique_reports")
    .insert({ novel_id: novelId, created_by: userId, status: "complete", ...input })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// --- Prompts ---
export async function getPrompts(orgId: string, category?: string) {
  const supabase = await createServerClient();
  let q = supabase.from("prompts").select("*, prompt_versions(*)").eq("org_id", orgId).is("deleted_at", null);
  if (category) q = q.eq("category", category);
  const { data, error } = await q.order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

// --- Workflows ---
export async function getWorkflows(orgId: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("workflows")
    .select("*, workflow_nodes(*), workflow_edges(*)")
    .eq("org_id", orgId)
    .is("deleted_at", null)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

// --- Analytics / Usage ---
export async function getUsageStats(orgId: string, days = 30) {
  const supabase = await createServerClient();
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabase
    .from("usage_events")
    .select("event_type, tokens_used, cost_cents, created_at")
    .eq("org_id", orgId)
    .gte("created_at", since)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getNotifications(userId: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(30);
  if (error) throw error;
  return data;
}

// --- Assets ---
export async function getAssets(novelId: string, type?: string) {
  const supabase = await createServerClient();
  let q = supabase.from("assets").select("*").eq("novel_id", novelId);
  if (type) q = q.eq("type", type);
  const { data, error } = await q.order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

// --- Peer Reviews ---
export async function getPeerReviews(novelId: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("peer_reviews")
    .select("*, reviewer:users!reviewer_id(full_name, avatar_url)")
    .eq("novel_id", novelId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

// --- Subscription ---
export async function getSubscription(orgId: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("org_id", orgId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

// Helper: soft delete
export async function softDelete(table: keyof Database["public"]["Tables"], id: string) {
  const supabase = await createServerClient();
  const { error } = await supabase
    .from(table as string)
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}
