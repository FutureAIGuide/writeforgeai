-- Sample seed data for development

-- Insert a test user (normally created by Supabase Auth)
INSERT INTO public.users (id, email, full_name, avatar_url)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'demo@writeforgeai.com',
  'Demo Author',
  NULL
) ON CONFLICT (id) DO NOTHING;

-- Insert a test organization
INSERT INTO public.organizations (id, name, slug, plan, created_by)
VALUES (
  '00000000-0000-0000-0000-000000000010',
  'Demo Studio',
  'demo-studio',
  'pro',
  '00000000-0000-0000-0000-000000000001'
) ON CONFLICT (id) DO NOTHING;

-- Insert membership
INSERT INTO public.memberships (org_id, user_id, role)
VALUES (
  '00000000-0000-0000-0000-000000000010',
  '00000000-0000-0000-0000-000000000001',
  'owner'
) ON CONFLICT DO NOTHING;

-- Insert a project
INSERT INTO public.projects (id, org_id, title, description, genre, target_word_count, created_by)
VALUES (
  '00000000-0000-0000-0000-000000000020',
  '00000000-0000-0000-0000-000000000010',
  'The Ember Chronicles',
  'A disgraced mage must save the world she once nearly destroyed.',
  'Fantasy',
  100000,
  '00000000-0000-0000-0000-000000000001'
) ON CONFLICT (id) DO NOTHING;

-- Insert a novel
INSERT INTO public.novels (id, project_id, title, synopsis, genre, created_by)
VALUES (
  '00000000-0000-0000-0000-000000000030',
  '00000000-0000-0000-0000-000000000020',
  'The Ember Chronicles: Book 1',
  'When Elara Voss is exiled from the Mage Council, she discovers a conspiracy that threatens to unmake the world.',
  'Fantasy',
  '00000000-0000-0000-0000-000000000001'
) ON CONFLICT (id) DO NOTHING;

-- ── Extended Seed Data ────────────────────────────────────────────

-- Sample AI Persona Configs
INSERT INTO public.ai_persona_configs (id, org_id, name, base_type, description, system_prompt, demographics, preferences, is_public, created_by)
SELECT
  uuid_generate_v4(),
  (SELECT id FROM public.organizations LIMIT 1),
  'Fantasy Enthusiast',
  'genre_enthusiast',
  'An avid fantasy reader who has consumed thousands of hours of the genre',
  'You are a passionate fantasy reader aged 25-35 who has read hundreds of fantasy novels. You notice tropes immediately, have strong opinions on magic systems, worldbuilding depth, and character agency. You get excited about subverted tropes and unique takes.',
  '{"age_range": "25-35", "gender": "any", "reading_frequency": "daily", "books_per_year": 50}',
  '{"favorite_genres": ["epic fantasy", "progression fantasy", "dark fantasy"], "dislikes": ["slow starts", "info dumps", "weak protagonists"], "emotional_style": "enthusiastic"}',
  TRUE,
  (SELECT id FROM public.users LIMIT 1)
WHERE EXISTS (SELECT 1 FROM public.organizations) AND EXISTS (SELECT 1 FROM public.users);

-- Sample Writing Goal
INSERT INTO public.writing_goals (user_id, goal_type, target_value, current_value)
SELECT id, 'daily_words', 1000, 347
FROM public.users LIMIT 1;
