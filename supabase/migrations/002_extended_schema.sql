-- ────────────────────────────────────────────────────────────────
-- Write Forge AI — Extended Schema Migration 002
-- Adds: character_relationships, research_notes, writing_sessions,
--       plot_points, manuscript_versions, ai_persona_configs,
--       media_assets, newsletter_subscribers, chapter_annotations
-- ────────────────────────────────────────────────────────────────

-- ── pgvector for semantic search ─────────────────────────────────
CREATE EXTENSION IF NOT EXISTS vector;

-- ── Character Relationships ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.character_relationships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  character_a_id UUID NOT NULL REFERENCES public.characters(id) ON DELETE CASCADE,
  character_b_id UUID NOT NULL REFERENCES public.characters(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL DEFAULT 'associate',  -- ally, antagonist, romantic, family, rival, mentor
  description TEXT,
  intensity INTEGER CHECK (intensity >= 1 AND intensity <= 10) DEFAULT 5,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(character_a_id, character_b_id)
);

-- ── Research Notes ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.research_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  novel_id UUID NOT NULL REFERENCES public.novels(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  ai_generated BOOLEAN NOT NULL DEFAULT FALSE,
  embedding vector(1536),              -- for semantic search via pgvector
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id)
);

CREATE INDEX IF NOT EXISTS idx_research_notes_novel_id ON public.research_notes(novel_id);
CREATE INDEX IF NOT EXISTS idx_research_notes_embedding ON public.research_notes USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- ── Writing Sessions (for cadence analytics) ─────────────────────
CREATE TABLE IF NOT EXISTS public.writing_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  novel_id UUID NOT NULL REFERENCES public.novels(id) ON DELETE CASCADE,
  chapter_id UUID REFERENCES public.chapters(id),
  user_id UUID NOT NULL REFERENCES public.users(id),
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  words_written INTEGER NOT NULL DEFAULT 0,
  duration_minutes INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_writing_sessions_user_date ON public.writing_sessions(user_id, started_at);
CREATE INDEX IF NOT EXISTS idx_writing_sessions_novel ON public.writing_sessions(novel_id);

-- ── Plot Points ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.plot_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  novel_id UUID NOT NULL REFERENCES public.novels(id) ON DELETE CASCADE,
  chapter_id UUID REFERENCES public.chapters(id),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'event',  -- inciting_incident, midpoint, climax, resolution, subplot, character_beat
  act INTEGER CHECK (act >= 1 AND act <= 3),
  order_index INTEGER NOT NULL DEFAULT 0,
  sentiment_score NUMERIC(4,3),        -- -1.0 to 1.0 reader sentiment at this point
  importance INTEGER CHECK (importance >= 1 AND importance <= 5) DEFAULT 3,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id)
);

-- ── Manuscript Versions ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.manuscript_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL DEFAULT 1,
  content TEXT NOT NULL,
  word_count INTEGER NOT NULL DEFAULT 0,
  change_summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id)
);

CREATE INDEX IF NOT EXISTS idx_manuscript_versions_chapter ON public.manuscript_versions(chapter_id, version_number DESC);

-- ── Chapter Annotations (inline comments) ─────────────────────────
CREATE TABLE IF NOT EXISTS public.chapter_annotations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id),
  text_start INTEGER NOT NULL,
  text_end INTEGER NOT NULL,
  annotation_text TEXT NOT NULL,
  annotation_type TEXT NOT NULL DEFAULT 'comment',  -- comment, pacing, show_dont_tell, repetition, plot_hole
  resolved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── AI Persona Configs (custom reader personas) ────────────────────
CREATE TABLE IF NOT EXISTS public.ai_persona_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  base_type TEXT NOT NULL DEFAULT 'custom',
  description TEXT,
  system_prompt TEXT NOT NULL,
  demographics JSONB NOT NULL DEFAULT '{}',
  preferences JSONB NOT NULL DEFAULT '{}',
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id)
);

-- ── Media Assets (covers, trailers, social) ────────────────────────
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  novel_id UUID NOT NULL REFERENCES public.novels(id) ON DELETE CASCADE,
  asset_type TEXT NOT NULL,            -- book_cover, character_art, social_post, trailer, music
  name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT,
  metadata JSONB NOT NULL DEFAULT '{}', -- dimensions, format, style, platform
  ai_prompt TEXT,                        -- the prompt used to generate it
  status TEXT NOT NULL DEFAULT 'ready', -- generating, ready, failed
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id)
);

-- ── Newsletter Subscribers ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'subscribed',  -- subscribed, unsubscribed, bounced
  source TEXT,                                 -- landing_page, arc_signup, manual
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(org_id, email)
);

-- ── Writing Goals (daily/weekly) ───────────────────────────────────
CREATE TABLE IF NOT EXISTS public.writing_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  novel_id UUID REFERENCES public.novels(id),
  goal_type TEXT NOT NULL DEFAULT 'daily_words',  -- daily_words, weekly_words, chapter_complete, draft_complete
  target_value INTEGER NOT NULL,
  current_value INTEGER NOT NULL DEFAULT 0,
  period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  period_end TIMESTAMPTZ,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Release Campaigns ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.release_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  novel_id UUID NOT NULL REFERENCES public.novels(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  launch_date TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'planning',  -- planning, active, launched, complete
  platform TEXT,                             -- amazon_kdp, draft2digital, wattpad
  arc_target INTEGER NOT NULL DEFAULT 0,
  arc_recruited INTEGER NOT NULL DEFAULT 0,
  newsletter_count INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  config JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id)
);

-- ── ARC Readers ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.arc_readers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID NOT NULL REFERENCES public.release_campaigns(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  platform TEXT,                     -- bookstagram, booktok, blog, goodreads
  followers INTEGER,
  arc_sent BOOLEAN NOT NULL DEFAULT FALSE,
  arc_sent_at TIMESTAMPTZ,
  review_posted BOOLEAN NOT NULL DEFAULT FALSE,
  review_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Embed table for lore / character semantic search ──────────────
ALTER TABLE public.characters ADD COLUMN IF NOT EXISTS embedding vector(1536);
ALTER TABLE public.lore_entries ADD COLUMN IF NOT EXISTS embedding vector(1536);

CREATE INDEX IF NOT EXISTS idx_characters_embedding ON public.characters USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX IF NOT EXISTS idx_lore_entries_embedding ON public.lore_entries USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- ── RLS for new tables ────────────────────────────────────────────
ALTER TABLE public.character_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.writing_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plot_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manuscript_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_annotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_persona_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.writing_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.release_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arc_readers ENABLE ROW LEVEL SECURITY;

-- Writing sessions: users see their own
CREATE POLICY "Users see own writing sessions" ON public.writing_sessions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users see own writing goals" ON public.writing_goals
  FOR ALL USING (auth.uid() = user_id);

-- Novel-scoped tables accessible by org members
CREATE POLICY "Org members access character relationships" ON public.character_relationships
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.characters c
    JOIN public.novels n ON n.id = c.novel_id
    JOIN public.projects p ON p.id = n.project_id
    JOIN public.memberships m ON m.org_id = p.org_id
    WHERE c.id = character_relationships.character_a_id AND m.user_id = auth.uid()
  ));

CREATE POLICY "Org members access research notes" ON public.research_notes
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.novels n
    JOIN public.projects p ON p.id = n.project_id
    JOIN public.memberships m ON m.org_id = p.org_id
    WHERE n.id = research_notes.novel_id AND m.user_id = auth.uid()
  ));

CREATE POLICY "Org members access plot points" ON public.plot_points
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.novels n
    JOIN public.projects p ON p.id = n.project_id
    JOIN public.memberships m ON m.org_id = p.org_id
    WHERE n.id = plot_points.novel_id AND m.user_id = auth.uid()
  ));

CREATE POLICY "Org members access media assets" ON public.media_assets
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.novels n
    JOIN public.projects p ON p.id = n.project_id
    JOIN public.memberships m ON m.org_id = p.org_id
    WHERE n.id = media_assets.novel_id AND m.user_id = auth.uid()
  ));

CREATE POLICY "Org members access release campaigns" ON public.release_campaigns
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.novels n
    JOIN public.projects p ON p.id = n.project_id
    JOIN public.memberships m ON m.org_id = p.org_id
    WHERE n.id = release_campaigns.novel_id AND m.user_id = auth.uid()
  ));

CREATE POLICY "Org members access newsletter subscribers" ON public.newsletter_subscribers
  FOR ALL USING (public.is_org_member(org_id));

CREATE POLICY "Org members access persona configs" ON public.ai_persona_configs
  FOR ALL USING (public.is_org_member(org_id) OR is_public = TRUE);

-- Manuscript versions and annotations: accessible by chapter's novel org members
CREATE POLICY "Org members access manuscript versions" ON public.manuscript_versions
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.chapters ch
    JOIN public.novels n ON n.id = ch.novel_id
    JOIN public.projects p ON p.id = n.project_id
    JOIN public.memberships m ON m.org_id = p.org_id
    WHERE ch.id = manuscript_versions.chapter_id AND m.user_id = auth.uid()
  ));

-- ── Helper function: semantic search ─────────────────────────────
CREATE OR REPLACE FUNCTION public.search_lore_entries(
  novel_id_param UUID,
  query_embedding vector(1536),
  match_count INT DEFAULT 5
)
RETURNS TABLE (id UUID, title TEXT, content TEXT, category TEXT, similarity FLOAT)
LANGUAGE sql SECURITY DEFINER
AS $$
  SELECT
    id,
    title,
    content,
    category,
    1 - (embedding <=> query_embedding) AS similarity
  FROM public.lore_entries
  WHERE novel_id = novel_id_param
    AND embedding IS NOT NULL
    AND deleted_at IS NULL
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

-- ── Trigger: auto-update updated_at ───────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_research_notes_updated_at BEFORE UPDATE ON public.research_notes FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_plot_points_updated_at BEFORE UPDATE ON public.plot_points FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_release_campaigns_updated_at BEFORE UPDATE ON public.release_campaigns FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_ai_persona_configs_updated_at BEFORE UPDATE ON public.ai_persona_configs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
