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
