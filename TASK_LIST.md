# WriteForge AI — Repository Review & Task List

> **Generated:** 2026-03-12
> **Branch:** `claude/repo-review-task-list-P3paE`
> **Status Legend:** ✅ Completed · 🔄 In Progress · ⬜ Pending · 🚨 Critical

---

## Repository Review Summary

**WriteForge AI** is an early-MVP SaaS application marketed as an "AI Operating System for Writers." It provides a suite of tools covering the full fiction-writing lifecycle: manuscript editing, character development, worldbuilding, beta reader simulation, critique generation, writing analytics, and publishing/marketing tools.

### Tech Stack
| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript 5 (strict mode) |
| Database | Supabase (PostgreSQL + pgvector) |
| Auth | Supabase Auth (magic link + GitHub OAuth) |
| AI | OpenRouter API (GPT-4o, Claude 3.5 Sonnet, Mistral Large) |
| Payments | Stripe (subscriptions + webhooks) |
| Styling | Tailwind CSS 4 + Radix UI |
| Animation | Framer Motion |
| Editor | Monaco Editor |
| Workflow | @xyflow/react (node-based canvas) |
| Analytics | Recharts |
| Monitoring | Sentry |
| Deployment | Vercel (implied) |

### Architectural Overview
```
User → Next.js Client Component
     → Next.js API Route (serverless)
     → Supabase PostgreSQL (RLS-secured)
       or OpenRouter AI API
       or Stripe Payments API
```

### Current Development Stage
The project is in **early MVP/Beta** phase. The UI scaffold and database schema are well-designed and substantially complete, but the majority of API routes return hardcoded mock data. Feature wiring (connecting UI → API → database) is the primary remaining work.

### Key Strengths
- Sophisticated, normalized database schema (25+ tables) with RLS security policies
- 24+ specialized AI prompt templates covering the full writing toolchain
- Well-organized component library with feature-scoped folders
- Flexible AI model routing via OpenRouter (multi-provider support)
- Freemium business model with Stripe already scaffolded
- TypeScript strict mode enforced throughout
- Accessible base components via Radix UI

### Key Gaps & Risks
- **No tests** — zero unit, integration, or e2e test files
- **Mock data everywhere** — API routes return hardcoded responses, not DB queries
- **Missing error/loading states** — most components have no loading skeletons or error boundaries
- **Incomplete hooks** — `useProject`, `useCommandPalette`, `useSubscription` are stubs
- **No CI/CD pipeline** — no GitHub Actions, no automated deployments
- **No documentation** — README is the default Next.js boilerplate
- **Missing input validation** — Zod schemas defined but not enforced on API routes
- **Security gaps** — no CSRF protection visible, no rate limiting on AI endpoints

---

## TASK LIST

---

## TASK 1 — Database & Backend Wiring 🚨 Critical

> **Summary:** The most critical unfinished work. Every API route currently returns hardcoded/mock data. This task covers replacing all mock responses with real Supabase queries, implementing proper business logic, and ensuring data integrity across the application.

### Subtask 1.1 — Manuscript & Chapters API ⬜ Pending

> Wire the manuscript editor's backend to Supabase. The `GET/POST /api/manuscripts` and `PATCH /api/manuscripts/[id]` routes return mock data. Need to query the `novels`, `chapters`, and `scenes` tables. Chapter save/load must be authenticated and org-scoped.

- [ ] Replace mock manuscript list with `SELECT * FROM novels WHERE org_id = ?` query
- [ ] Implement chapter CRUD (create, read, update, delete) against `chapters` table
- [ ] Implement scene-level CRUD against `scenes` table
- [ ] Wire `PATCH /api/manuscripts/[id]` to `UPDATE chapters SET content = ?`
- [ ] Implement word count calculation server-side on chapter save
- [ ] Enforce org-based access control (user must be org member)
- [ ] Add `manuscript_versions` snapshot on every save (version history)
- [ ] Return chapter status (`draft`, `revised`, `final`) in response payload
- [ ] Handle `not found` (404) and `forbidden` (403) HTTP statuses

### Subtask 1.2 — Characters & Relationships API ⬜ Pending

> Connect `GET/POST /api/characters` and `GET/PATCH /api/characters/[id]` to the `characters` and `character_relationships` tables. The relationship map component (`RelationshipMap`) depends on graph data being returned from the API.

- [ ] Implement character list query scoped to active project
- [ ] Implement character create with full profile fields (wound, fear, secret, arc_stage, voice_profile)
- [ ] Implement `GET /api/characters/[id]` returning single character + relationships
- [ ] Implement `PATCH /api/characters/[id]` for partial updates
- [ ] Implement relationship CRUD: `character_relationships` table (intensity, relationship_type)
- [ ] Return relationship graph data in format expected by `RelationshipMap` component
- [ ] Add delete endpoint for characters (with cascade to relationships)
- [ ] Enforce project-scoped access control

### Subtask 1.3 — Worldbuilding & Lore API ⬜ Pending

> Wire `GET/POST /api/worldbuilding` and `GET/PATCH /api/worldbuilding/lore/[id]` to the `lore_entries` table. Lore entries support category filtering, tags, and full-text search which needs backend support.

- [ ] Implement lore entry list with `category` and `tags` filter parameters
- [ ] Implement full-text search across `name` and `content` fields
- [ ] Implement lore entry create/update with JSONB tags support
- [ ] Implement semantic search using pgvector embeddings on `research_notes`
- [ ] Wire `WorldMap` component location data to `locations` table
- [ ] Add hierarchical location support (parent/child location relationships)
- [ ] Enforce project-scoped access control

### Subtask 1.4 — Beta Reader API ⬜ Pending

> Connect `GET/POST /api/beta-reader` and `GET /api/beta-reader/[runId]` to `beta_runs`, `beta_personas`, and AI generation. The beta reader engine should submit chapter text to OpenRouter, parse persona feedback, and persist results.

- [ ] Implement `POST /api/beta-reader` to create a `beta_runs` record and trigger AI persona analysis
- [ ] Call `generateCompletion` with beta reader prompt template for each persona
- [ ] Parse and persist persona feedback to `beta_personas` table (sentiment, engagement, notes)
- [ ] Implement `GET /api/beta-reader/[runId]` to retrieve run + persona results
- [ ] Implement run status polling (running → complete → error states)
- [ ] Wire `SentimentGraph` component to real sentiment data from `beta_personas`
- [ ] Track token usage in `usage_events` table per run

### Subtask 1.5 — AI Critique API ⬜ Pending

> Wire `POST /api/ai/critique` to real manuscript text, multi-pass AI analysis, and persist results to `critique_reports`. The route currently returns a hardcoded critique object.

- [ ] Accept chapter text as request body
- [ ] Run structure critique pass (3-act analysis, pacing, tension)
- [ ] Run prose critique pass (voice, dialogue, show-don't-tell)
- [ ] Run character analysis pass
- [ ] Parse all AI responses into `issues[]` JSONB array (severity, location, suggestion)
- [ ] Persist final report to `critique_reports` table
- [ ] Implement `GET /api/ai/critique/[reportId]` to retrieve saved reports
- [ ] Track token usage and cost in `usage_events`

### Subtask 1.6 — Prompts API ⬜ Pending

> Connect `GET/POST /api/prompts` to the `prompts` and `prompt_versions` tables. Users should be able to save, version, and share prompt templates.

- [ ] Implement prompt list (user-owned + org-shared)
- [ ] Implement prompt create with initial version in `prompt_versions`
- [ ] Implement prompt update (creates new version, preserves history)
- [ ] Implement prompt delete (soft delete or cascade version removal)
- [ ] Implement prompt version history endpoint `GET /api/prompts/[id]/versions`
- [ ] Add org-level prompt sharing (visibility: private/org/public)

### Subtask 1.7 — Workflows API ⬜ Pending

> Wire `GET/POST /api/workflows` to the `workflows`, `workflow_nodes`, and `workflow_edges` tables. The workflow canvas built with @xyflow/react needs to persist and load graph topology.

- [ ] Implement workflow list for user/org
- [ ] Implement workflow create/save (serialize nodes + edges to DB)
- [ ] Implement workflow load (deserialize nodes + edges for canvas)
- [ ] Implement workflow execute endpoint (run nodes in topological order)
- [ ] Wire `POST /api/ai/workflow-magic` to actually persist generated workflow
- [ ] Implement workflow node execution handlers for each node type
- [ ] Add execution history/logging

### Subtask 1.8 — Analytics API ⬜ Pending

> Wire `GET /api/analytics` to real data from `writing_sessions`, `writing_goals`, `chapters`, and `plot_points`. The analytics dashboard currently renders with hardcoded chart data.

- [ ] Implement writing cadence query (words per day from `writing_sessions`)
- [ ] Implement sentiment trend query (sentiment scores from `plot_points`)
- [ ] Implement scene engagement metrics
- [ ] Implement goal tracking (progress vs. targets from `writing_goals`)
- [ ] Add date range filtering (last 7d / 30d / 90d / all time)
- [ ] Return data in format expected by Recharts components

### Subtask 1.9 — Research Notes API ⬜ Pending

> Wire `GET/POST /api/research` to the `research_notes` table. Research notes support semantic search via pgvector embeddings.

- [ ] Implement research note list with filtering by project
- [ ] Implement research note create/update
- [ ] Generate and store vector embeddings on note creation
- [ ] Implement semantic search endpoint using pgvector similarity queries
- [ ] Connect to `POST /api/ai/generate` for AI-assisted research expansion

### Subtask 1.10 — Peer Review API ⬜ Pending

> Wire `GET/POST /api/peer-reviews` to the `peer_reviews` table. Users should be able to submit and view peer reviews with ratings.

- [ ] Implement peer review submission with rating fields
- [ ] Implement peer review list for a project
- [ ] Implement review moderation (flag/unflag)
- [ ] Add aggregate rating computation

### Subtask 1.11 — Notifications API ⬜ Pending

> Implement the notification system backed by the `notifications` table. The `TopCommandBar` component has a notification bell icon with no live data.

- [ ] Implement `GET /api/notifications` (unread + recent)
- [ ] Implement `PATCH /api/notifications/[id]` (mark as read)
- [ ] Implement `POST /api/notifications/mark-all-read`
- [ ] Generate notifications on key events (beta run complete, critique ready, peer review received)
- [ ] Add real-time updates via Supabase Realtime subscription

### Subtask 1.12 — User & Organization Management API ⬜ Pending

> Implement user profile, organization, and membership management endpoints. The settings page currently has no backend.

- [ ] Implement `GET/PATCH /api/user/profile` for user account settings
- [ ] Implement `GET/POST /api/organizations` for org creation
- [ ] Implement `POST /api/organizations/[id]/invite` to invite members
- [ ] Implement `PATCH /api/organizations/[id]/members/[userId]` to change roles
- [ ] Implement `DELETE /api/organizations/[id]/members/[userId]` to remove members
- [ ] Sync user data to `users` table on first sign-in (via auth hook)

---

## TASK 2 — Frontend Integration & State Management ⬜ Pending

> **Summary:** Frontend components are largely built but operate on mock/hardcoded data. This task covers replacing mock data with live API calls, implementing proper loading states, error boundaries, and completing the stub hooks.

### Subtask 2.1 — Complete Stub Hooks ⬜ Pending

> Three hooks (`useProject`, `useCommandPalette`, `useSubscription`) are referenced throughout the app but are unimplemented stubs. These are blocking several features.

- [ ] Implement `useProject` hook — fetch active project, switch projects
- [ ] Implement `useCommandPalette` hook — command registry, search, keyboard shortcut binding
- [ ] Implement `useSubscription` hook — fetch current plan, token usage, upgrade triggers
- [ ] Add `useNotifications` hook — fetch and mark notifications
- [ ] Add `useOrganization` hook — fetch org, members, roles
- [ ] Add `useAnalytics` hook — fetch writing metrics with date range

### Subtask 2.2 — Manuscript Editor Live Integration ⬜ Pending

> The `ManuscriptEditor` component uses Monaco Editor but doesn't persist saves to the API or load real chapter content.

- [ ] Wire `useManuscript.fetchChapters()` to `GET /api/manuscripts`
- [ ] Wire `useManuscript.saveChapter()` to `PATCH /api/manuscripts/[id]`
- [ ] Show real-time word count updating as user types
- [ ] Implement auto-save (debounced, every 30 seconds)
- [ ] Add chapter status toggle (draft → revised → final)
- [ ] Wire `InspectorPanel` to real-time readability/health scores
- [ ] Wire `AIActionPanel` shortcuts to `POST /api/ai/generate`
- [ ] Implement revision history UI from `manuscript_versions` data

### Subtask 2.3 — Characters Page Live Integration ⬜ Pending

> The characters page renders a roster and relationship map, but `CharacterRoster` and `RelationshipMap` use mock data.

- [ ] Wire `CharacterRoster` to `GET /api/characters`
- [ ] Wire `RelationshipMap` to real graph data from characters API
- [ ] Wire character creation modal to `POST /api/characters`
- [ ] Wire character edit panel to `PATCH /api/characters/[id]`
- [ ] Wire `StoryCodex` knowledge graph to combined characters + lore data
- [ ] Implement relationship add/edit modal

### Subtask 2.4 — Beta Reader Live Integration ⬜ Pending

> The beta reader UI (`BetaRunConfig`, `BetaPersonaCard`, `SentimentGraph`) is fully scaffolded but shows no real run data.

- [ ] Wire run list to `GET /api/beta-reader`
- [ ] Wire run creation to `POST /api/beta-reader`
- [ ] Implement polling/subscription for run status updates
- [ ] Wire persona cards to real persona data from completed runs
- [ ] Wire `SentimentGraph` to real sentiment scores
- [ ] Implement "view full feedback" expanded panel

### Subtask 2.5 — Analytics Dashboard Live Integration ⬜ Pending

> All three Recharts components (`WritingCadenceChart`, `SentimentTrendChart`, `SceneEngagementChart`) render with static data.

- [ ] Wire `WritingCadenceChart` to `GET /api/analytics?metric=cadence`
- [ ] Wire `SentimentTrendChart` to `GET /api/analytics?metric=sentiment`
- [ ] Wire `SceneEngagementChart` to `GET /api/analytics?metric=engagement`
- [ ] Implement date range picker connected to analytics API
- [ ] Wire `GoalTracker` to real writing goals from API
- [ ] Wire `ActivityFeed` to real recent activity events

### Subtask 2.6 — Loading States & Skeleton UI ⬜ Pending

> Most components have no loading state. When data is fetching, the UI shows nothing or stale content.

- [ ] Add skeleton loaders to `CharacterRoster`
- [ ] Add skeleton loaders to `BetaPersonaCard` list
- [ ] Add skeleton loaders to all analytics chart components
- [ ] Add skeleton loaders to `ManuscriptEditor` chapter list
- [ ] Add skeleton loaders to `LoreEntryCard` grid
- [ ] Implement `Suspense` boundaries at page-level in App Router

### Subtask 2.7 — Error Boundaries & User Feedback ⬜ Pending

> No error boundaries exist. If an API call fails, the UI typically shows nothing with a silent console error.

- [ ] Add global error boundary component
- [ ] Add per-route error.tsx files for App Router error handling
- [ ] Implement toast notifications for success/error feedback (save, delete, generate)
- [ ] Add empty state components for zero-data scenarios (no chapters, no characters, etc.)
- [ ] Show user-friendly messages when AI generation fails
- [ ] Add retry buttons on failed data fetches

### Subtask 2.8 — Command Palette Implementation ⬜ Pending

> The `CommandPalette` component exists (uses `cmdk`) but has no registered commands or working search.

- [ ] Register navigation commands (go to characters, worldbuilding, etc.)
- [ ] Register action commands (new chapter, new character, start beta run)
- [ ] Implement search across characters, lore entries, chapters by title
- [ ] Add AI shortcut commands (critique this chapter, generate blurb)
- [ ] Wire keyboard shortcut `Cmd+K` / `Ctrl+K` to open palette

---

## TASK 3 — Authentication & Authorization ⬜ Pending

> **Summary:** Auth is scaffolded with Supabase SSR but needs end-to-end validation. Org-based access control defined in the DB schema needs to be enforced consistently in API routes.

### Subtask 3.1 — Auth Flow Validation ⬜ Pending

- [ ] Test magic link sign-in end-to-end (send email → click link → session created)
- [ ] Test GitHub OAuth sign-in end-to-end
- [ ] Verify middleware redirects unauthenticated users from `/dashboard/*` to `/login`
- [ ] Verify authenticated users are redirected from `/login` to `/dashboard`
- [ ] Implement "sign out" action in settings + nav
- [ ] Handle expired session gracefully (auto-refresh or prompt re-login)
- [ ] Test cross-tab session synchronization

### Subtask 3.2 — Org & Project Context ⬜ Pending

- [ ] Implement org selector if user belongs to multiple orgs
- [ ] Create default org for new users on first sign-in
- [ ] Implement project selector / switcher in sidebar
- [ ] Store active org/project in URL params or user preferences
- [ ] Validate org membership on every protected API route

### Subtask 3.3 — Role-Based Access Control ⬜ Pending

- [ ] Enforce viewer role cannot create/edit content (read-only UI)
- [ ] Enforce editor role cannot manage members or billing
- [ ] Enforce admin role cannot change owner
- [ ] Show/hide UI elements based on user's role in active org
- [ ] Return 403 from APIs for unauthorized operations

---

## TASK 4 — Billing & Subscription System ⬜ Pending

> **Summary:** Stripe integration is scaffolded but not fully functional. Token usage tracking is defined in the schema but not implemented. The upgrade modal exists but linking it to real usage limits is missing.

### Subtask 4.1 — Stripe Checkout & Webhooks ⬜ Pending

- [ ] Test checkout session creation (`POST /api/billing/checkout`)
- [ ] Test webhook handler for `checkout.session.completed`
- [ ] Test webhook handler for `customer.subscription.updated`
- [ ] Test webhook handler for `customer.subscription.deleted`
- [ ] Verify `subscriptions` table is updated correctly on each event
- [ ] Implement `POST /api/billing/portal` for customer portal redirect
- [ ] Add Stripe webhook secret verification in production

### Subtask 4.2 — Token Usage Tracking ⬜ Pending

- [ ] Record `usage_events` row on every AI API call (tokens used, cost, model)
- [ ] Implement token quota check before AI operations
- [ ] Return 402 (Payment Required) when quota is exceeded
- [ ] Show token usage meter in UI (`SubscriptionCard`, settings page)
- [ ] Reset monthly token counts via scheduled job or webhook

### Subtask 4.3 — Upgrade Prompts ⬜ Pending

- [ ] Wire `UpgradeModal` to fire when token limit is hit
- [ ] Wire `UpgradeModal` to fire when project limit is hit (Free tier: 1 project)
- [ ] Show current plan and usage in settings page
- [ ] Implement feature gating for Studio-tier features (custom personas, team collab)

---

## TASK 5 — AI & Workflow Features ⬜ Pending

> **Summary:** The AI prompt library is well-designed but some endpoints need refinement. The workflow builder canvas exists but workflow execution is not implemented. Additional AI features need UX polish.

### Subtask 5.1 — AI Generation Endpoint Polish ⬜ Pending

- [ ] Add model selection UI (let user choose GPT-4o vs. Claude Sonnet per task)
- [ ] Implement streaming for long generations (critique, beta read)
- [ ] Add generation cancellation support
- [ ] Validate request body with Zod schemas on all AI endpoints
- [ ] Add rate limiting on AI endpoints (per-user, per-minute)
- [ ] Implement retry logic for OpenRouter API failures

### Subtask 5.2 — Workflow Execution Engine ⬜ Pending

> The visual workflow builder renders nodes/edges on a canvas but has no execution logic.

- [ ] Define node type registry (prompt, critique, beta-read, character-analysis, etc.)
- [ ] Implement topological sort for workflow DAG execution
- [ ] Execute each node in order, passing output to connected input nodes
- [ ] Display real-time execution progress on canvas (node status: idle/running/done/error)
- [ ] Persist execution results per node
- [ ] Wire "Run Workflow" button to execution engine
- [ ] Implement `POST /api/ai/workflow-magic` to auto-generate and save a workflow

### Subtask 5.3 — Author Suite (Marketing Copy) ⬜ Pending

- [ ] Wire query letter generation to `POST /api/ai/generate`
- [ ] Wire blurb generation to `POST /api/ai/generate-blurb`
- [ ] Implement copy-to-clipboard for generated content
- [ ] Save generated blurbs/query letters to DB for retrieval
- [ ] Add regenerate with different tone/style options

### Subtask 5.4 — Pacing & Sentiment Analysis ⬜ Pending

- [ ] Wire `POST /api/ai/pacing` to real chapter text + store results in `plot_points`
- [ ] Wire `POST /api/ai/sentiment` to real chapter text + store results
- [ ] Visualize pacing results inline in manuscript editor
- [ ] Add "analyze chapter" action in `AIActionPanel`

### Subtask 5.5 — AI Persona Configs ⬜ Pending

- [ ] Implement CRUD for `ai_persona_configs` (custom reader personas)
- [ ] Allow Studio-tier users to create reusable public personas
- [ ] Surface custom personas in beta reader run configuration

---

## TASK 6 — Testing ⬜ Pending

> **Summary:** The project has zero test coverage. This is the highest-risk gap for a production application. Tests need to be established at unit, integration, and end-to-end levels.

### Subtask 6.1 — Unit Tests ⬜ Pending

- [ ] Set up Vitest (or Jest) test runner + testing-library/react
- [ ] Unit test AI prompt builder functions (`/src/lib/ai/prompts.ts`)
- [ ] Unit test Stripe webhook handlers (`/src/lib/stripe/webhooks.ts`)
- [ ] Unit test utility/helper functions (`/src/lib/utils.ts`)
- [ ] Unit test Zod schema validation for all API request types
- [ ] Unit test token quota logic

### Subtask 6.2 — Integration Tests ⬜ Pending

- [ ] Set up test Supabase instance (or use local Supabase via Docker)
- [ ] Integration test manuscript CRUD API routes
- [ ] Integration test character API routes
- [ ] Integration test billing/webhook handling
- [ ] Integration test auth middleware (protected/unprotected routes)
- [ ] Integration test RLS policies (user cannot access other org's data)

### Subtask 6.3 — End-to-End Tests ⬜ Pending

- [ ] Set up Playwright for E2E testing
- [ ] E2E test sign-up + onboarding flow
- [ ] E2E test creating a project → chapter → saving content
- [ ] E2E test beta reader run: configure → start → view results
- [ ] E2E test billing: select plan → checkout → subscription active
- [ ] E2E test character creation and relationship mapping

### Subtask 6.4 — CI Pipeline ⬜ Pending

- [ ] Create `.github/workflows/ci.yml`
- [ ] Run lint + type check on every PR
- [ ] Run unit tests on every PR
- [ ] Run E2E tests on staging deployment
- [ ] Add PR check status gates (block merge if tests fail)
- [ ] Add Sentry release tracking on deploy

---

## TASK 7 — Security & Performance Hardening ⬜ Pending

> **Summary:** Several security concerns need addressing before production launch, including CSRF protection, rate limiting, input sanitization, and proper secret management.

### Subtask 7.1 — Input Validation & Sanitization ⬜ Pending

- [ ] Enforce Zod schema validation on ALL API route request bodies
- [ ] Sanitize user-provided content before passing to AI prompts (prevent prompt injection)
- [ ] Add max length limits on text inputs (chapter content, lore entries)
- [ ] Validate file types and sizes in Media Studio uploads

### Subtask 7.2 — Rate Limiting ⬜ Pending

- [ ] Implement per-user rate limiting on AI generation endpoints
- [ ] Implement per-IP rate limiting on auth endpoints (prevent brute force)
- [ ] Use Vercel Edge Middleware or Upstash Redis for rate limit counters
- [ ] Return 429 (Too Many Requests) with Retry-After header

### Subtask 7.3 — API Security ⬜ Pending

- [ ] Verify Stripe webhook signature on all incoming webhooks
- [ ] Add CSRF protection for state-changing API routes
- [ ] Ensure all API routes validate user session before processing
- [ ] Remove any debug/test routes before production
- [ ] Audit environment variables — ensure no secrets are exposed client-side

### Subtask 7.4 — Performance Optimization ⬜ Pending

- [ ] Add pagination to all list endpoints (characters, lore entries, chapters)
- [ ] Implement database query indexes for high-traffic queries (review existing indexes)
- [ ] Add Next.js `cache()` or React cache for read-heavy server components
- [ ] Lazy load heavy components (workflow canvas, Monaco Editor — already done for Monaco)
- [ ] Add image optimization for Media Studio assets (Next.js Image component)
- [ ] Implement cursor-based pagination for `ActivityFeed` and notification list

---

## TASK 8 — Publishing & Media Tools ⬜ Pending

> **Summary:** The release strategy and media studio pages are UI-only. Backend support for ARC reader tracking, newsletter management, and campaign planning is needed.

### Subtask 8.1 — Media Studio ⬜ Pending

- [ ] Implement file upload to Supabase Storage for book covers and character art
- [ ] Store asset metadata in `media_assets` table
- [ ] Implement asset type filtering (cover, character art, social, promotional)
- [ ] Add AI image generation prompt for cover concepts (via external image API)
- [ ] Implement asset delete with storage cleanup

### Subtask 8.2 — Release Strategy & Campaign Planning ⬜ Pending

- [ ] Wire campaign creation to `release_campaigns` table
- [ ] Implement ARC reader tracking CRUD (`arc_readers` table)
- [ ] Implement ARC reader status tracking (sent → received → reviewed)
- [ ] Wire newsletter subscriber management to `newsletter_subscribers` table
- [ ] Add campaign timeline visualization

---

## TASK 9 — Documentation & Developer Experience ⬜ Pending

> **Summary:** The project has minimal documentation. A production-quality codebase needs setup guides, API docs, and architecture documentation.

### Subtask 9.1 — Project Documentation ⬜ Pending

- [ ] Rewrite `README.md` with project overview, features, and setup instructions
- [ ] Document environment variables required (create `.env.example`)
- [ ] Document local development setup (Supabase local, Stripe CLI, OpenRouter key)
- [ ] Create `CONTRIBUTING.md` with code style guide and PR process
- [ ] Create `ARCHITECTURE.md` with system design diagram

### Subtask 9.2 — API Documentation ⬜ Pending

- [ ] Add OpenAPI/Swagger spec for all API routes
- [ ] Document request/response shapes for each endpoint
- [ ] Document authentication requirements per endpoint
- [ ] Document error codes and response formats

### Subtask 9.3 — Inline Code Documentation ⬜ Pending

- [ ] Add JSDoc comments to all public hook interfaces
- [ ] Add JSDoc comments to utility functions
- [ ] Document AI prompt template inputs/outputs
- [ ] Add inline comments for complex business logic

---

## TASK 10 — Onboarding & UX Improvements ⬜ Pending

> **Summary:** New user onboarding is absent. Users land on a dashboard with no guidance. A first-run wizard, tooltips, and UX polish are needed for activation.

### Subtask 10.1 — Onboarding Flow ⬜ Pending

- [ ] Build first-run wizard: create org → create project → create first chapter
- [ ] Implement empty state pages with "Get Started" CTAs
- [ ] Add contextual tooltip hints for complex features (workflow builder, beta reader config)
- [ ] Create sample project template for new users
- [ ] Add progress indicator for onboarding checklist

### Subtask 10.2 — UX Polish ⬜ Pending

- [ ] Audit all forms for accessibility (labels, ARIA attributes, focus management)
- [ ] Implement keyboard navigation for main sidebar
- [ ] Add confirmation dialogs for destructive actions (delete chapter, delete character)
- [ ] Implement drag-and-drop chapter reordering in `ChapterNavigator`
- [ ] Add dark mode support (or ensure current dark theme is consistent)
- [ ] Implement responsive layout for tablet screen sizes

---

## TASK 11 — Deployment & Infrastructure ⬜ Pending

> **Summary:** The application is structured for Vercel deployment but has no deployment configuration, environment setup guide, or monitoring configuration.

### Subtask 11.1 — Deployment Configuration ⬜ Pending

- [ ] Create `vercel.json` with build settings and environment variables
- [ ] Configure staging and production Supabase projects
- [ ] Configure staging and production Stripe keys
- [ ] Set up Sentry DSN for production error tracking
- [ ] Configure custom domain and SSL
- [ ] Set up Vercel preview deployments for PRs

### Subtask 11.2 — Monitoring & Observability ⬜ Pending

- [ ] Configure Sentry error reporting (currently `@sentry/nextjs` installed but unconfigured)
- [ ] Add Sentry performance tracing to API routes
- [ ] Set up uptime monitoring (Vercel Analytics or external)
- [ ] Add structured logging for AI API calls (model, tokens, latency)
- [ ] Set up alerts for error rate spikes and quota exhaustion

### Subtask 11.3 — Database Operations ⬜ Pending

- [ ] Run and validate all Supabase migrations in staging
- [ ] Set up database backups schedule
- [ ] Create seed script for development data
- [ ] Validate all RLS policies with test users across roles
- [ ] Set up pgvector extension in production Supabase project

---

## Completion Summary

| Task | Status | Priority |
|---|---|---|
| Task 1 — Database & Backend Wiring | ⬜ Pending | 🚨 Critical |
| Task 2 — Frontend Integration & State | ⬜ Pending | 🚨 Critical |
| Task 3 — Authentication & Authorization | ⬜ Pending | High |
| Task 4 — Billing & Subscription | ⬜ Pending | High |
| Task 5 — AI & Workflow Features | ⬜ Pending | High |
| Task 6 — Testing | ⬜ Pending | High |
| Task 7 — Security & Performance | ⬜ Pending | High |
| Task 8 — Publishing & Media Tools | ⬜ Pending | Medium |
| Task 9 — Documentation & DX | ⬜ Pending | Medium |
| Task 10 — Onboarding & UX | ⬜ Pending | Medium |
| Task 11 — Deployment & Infrastructure | ⬜ Pending | Medium |

**Total Tasks:** 11
**Total Subtasks:** 52
**Total Action Items:** 175+
