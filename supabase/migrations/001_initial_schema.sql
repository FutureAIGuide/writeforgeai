-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users (mirrors auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Organizations
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL DEFAULT 'free',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id)
);

-- Memberships
CREATE TABLE public.memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'editor',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(org_id, user_id)
);

-- Projects
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  genre TEXT,
  target_word_count INTEGER,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id),
  deleted_at TIMESTAMPTZ
);

-- Novels
CREATE TABLE public.novels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  synopsis TEXT,
  genre TEXT,
  target_audience TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id),
  deleted_at TIMESTAMPTZ
);

-- Chapters
CREATE TABLE public.chapters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  novel_id UUID NOT NULL REFERENCES public.novels(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  word_count INTEGER NOT NULL DEFAULT 0,
  content TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id),
  deleted_at TIMESTAMPTZ
);

-- Scenes
CREATE TABLE public.scenes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  content TEXT,
  pov_character_id UUID,
  word_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id)
);

-- Characters
CREATE TABLE public.characters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  novel_id UUID NOT NULL REFERENCES public.novels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'supporting',
  description TEXT,
  backstory TEXT,
  motivation TEXT,
  wound TEXT,
  fear TEXT,
  secret TEXT,
  voice_profile TEXT,
  arc_stage TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id),
  deleted_at TIMESTAMPTZ
);

-- Character Relationships
CREATE TABLE public.character_relationships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  character_a_id UUID NOT NULL REFERENCES public.characters(id) ON DELETE CASCADE,
  character_b_id UUID NOT NULL REFERENCES public.characters(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Locations
CREATE TABLE public.locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  novel_id UUID NOT NULL REFERENCES public.novels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT,
  parent_location_id UUID REFERENCES public.locations(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id)
);

-- Lore Entries
CREATE TABLE public.lore_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  novel_id UUID NOT NULL REFERENCES public.novels(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id),
  deleted_at TIMESTAMPTZ
);

-- Notes
CREATE TABLE public.notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  novel_id UUID NOT NULL REFERENCES public.novels(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'general',
  linked_entity_id UUID,
  linked_entity_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id)
);

-- Prompts
CREATE TABLE public.prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'general',
  model TEXT NOT NULL DEFAULT 'openai/gpt-4o-mini',
  temperature NUMERIC(3,2) NOT NULL DEFAULT 0.70,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id),
  deleted_at TIMESTAMPTZ
);

-- Prompt Versions
CREATE TABLE public.prompt_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt_id UUID NOT NULL REFERENCES public.prompts(id) ON DELETE CASCADE,
  version INTEGER NOT NULL DEFAULT 1,
  content TEXT NOT NULL,
  model TEXT NOT NULL,
  temperature NUMERIC(3,2) NOT NULL DEFAULT 0.70,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id)
);

-- Workflows
CREATE TABLE public.workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  novel_id UUID REFERENCES public.novels(id),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id),
  deleted_at TIMESTAMPTZ
);

-- Workflow Nodes
CREATE TABLE public.workflow_nodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workflow_id UUID NOT NULL REFERENCES public.workflows(id) ON DELETE CASCADE,
  node_type TEXT NOT NULL,
  label TEXT NOT NULL,
  config JSONB NOT NULL DEFAULT '{}',
  position_x NUMERIC NOT NULL DEFAULT 0,
  position_y NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Workflow Edges
CREATE TABLE public.workflow_edges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workflow_id UUID NOT NULL REFERENCES public.workflows(id) ON DELETE CASCADE,
  source_node_id UUID NOT NULL REFERENCES public.workflow_nodes(id) ON DELETE CASCADE,
  target_node_id UUID NOT NULL REFERENCES public.workflow_nodes(id) ON DELETE CASCADE,
  label TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Beta Runs
CREATE TABLE public.beta_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  novel_id UUID NOT NULL REFERENCES public.novels(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  config JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id)
);

-- Beta Personas
CREATE TABLE public.beta_personas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  beta_run_id UUID NOT NULL REFERENCES public.beta_runs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  demographics JSONB NOT NULL DEFAULT '{}',
  preferences JSONB NOT NULL DEFAULT '{}',
  feedback TEXT,
  sentiment_data JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Critique Reports
CREATE TABLE public.critique_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  novel_id UUID NOT NULL REFERENCES public.novels(id) ON DELETE CASCADE,
  pass_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  issues JSONB NOT NULL DEFAULT '[]',
  summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id)
);

-- Peer Reviews
CREATE TABLE public.peer_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  novel_id UUID NOT NULL REFERENCES public.novels(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES public.users(id),
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  status TEXT NOT NULL DEFAULT 'submitted',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Assets
CREATE TABLE public.assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  novel_id UUID NOT NULL REFERENCES public.novels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  url TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES public.users(id)
);

-- Subscriptions
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE UNIQUE,
  stripe_subscription_id TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Usage Events
CREATE TABLE public.usage_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id),
  event_type TEXT NOT NULL,
  tokens_used INTEGER NOT NULL DEFAULT 0,
  cost_cents INTEGER NOT NULL DEFAULT 0,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_chapters_novel_id ON public.chapters(novel_id);
CREATE INDEX idx_scenes_chapter_id ON public.scenes(chapter_id);
CREATE INDEX idx_characters_novel_id ON public.characters(novel_id);
CREATE INDEX idx_lore_entries_novel_id ON public.lore_entries(novel_id);
CREATE INDEX idx_beta_personas_run_id ON public.beta_personas(beta_run_id);
CREATE INDEX idx_usage_events_org_id_created ON public.usage_events(org_id, created_at);
CREATE INDEX idx_notifications_user_unread ON public.notifications(user_id, read) WHERE NOT read;

-- RLS Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.novels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lore_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beta_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can read/update their own record
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Notifications
CREATE POLICY "Users see own notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);

-- Org member access helper
CREATE OR REPLACE FUNCTION public.is_org_member(org UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.memberships
    WHERE org_id = org AND user_id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Projects accessible to org members
CREATE POLICY "Org members access projects" ON public.projects FOR ALL
  USING (public.is_org_member(org_id) AND deleted_at IS NULL);

-- Novels accessible to org members via project
CREATE POLICY "Org members access novels" ON public.novels FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.projects p
    JOIN public.memberships m ON m.org_id = p.org_id
    WHERE p.id = novels.project_id AND m.user_id = auth.uid()
  ) AND deleted_at IS NULL);

