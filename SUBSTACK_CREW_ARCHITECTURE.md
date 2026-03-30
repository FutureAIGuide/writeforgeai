# Substack Crew SaaS — Vercel + CrewAI Architecture Plan

> **Architecture:** Option A — Vercel (product shell) + Python/CrewAI worker (agent pipeline)
> **Generated:** 2026-03-30

---

## Overview

A multi-agent Substack content generation SaaS. Users trigger research → writing → QA pipelines via a clean Next.js dashboard. Vercel handles all product infrastructure; a dedicated Python FastAPI service runs the heavy CrewAI orchestration.

```
User Browser
    │
    ▼
Next.js App (Vercel)
    │  ┌─────────────────────────────────┐
    │  │  /app          SaaS dashboard   │
    │  │  /api/generate  Job creation    │
    │  │  /api/jobs/[id] Status polling  │
    │  │  /api/export/[id] File delivery │
    │  │  cron route    Topic discovery  │
    │  └─────────────────────────────────┘
    │
    ├──► Vercel Postgres   (users, jobs, outputs, metrics)
    ├──► Vercel Blob       (markdown / DOCX / PDF exports)
    │
    └──► Python FastAPI Worker  (separate service)
              │
              └──► CrewAI Pipeline
                       ├── Research Agent
                       ├── Writing Agent
                       ├── QA/Verification Agent
                       └── Export Packager
```

---

## TASK 1 — Project Scaffold & Infrastructure ⬜ Pending

> **Summary:** Bootstrap the Next.js project on Vercel with all required services provisioned. Set up Vercel Postgres, Vercel Blob, environment variables, and the Python worker skeleton before any feature work begins.

### Subtask 1.1 — Next.js App Initialization ⬜ Pending

- [ ] Create Next.js 14+ project with App Router (`npx create-next-app@latest`)
- [ ] Configure TypeScript strict mode
- [ ] Configure Tailwind CSS
- [ ] Set up Geist or Inter font via `next/font`
- [ ] Configure `next.config.ts` (image domains, env variable exposure)
- [ ] Create base folder structure (see §Directory Structure below)

### Subtask 1.2 — Vercel Project Setup ⬜ Pending

- [ ] Create Vercel project and link local repo
- [ ] Provision **Vercel Postgres** database (Storage → Postgres)
- [ ] Provision **Vercel Blob** store (Storage → Blob)
- [ ] Add environment variables in Vercel dashboard:
  - `DATABASE_URL`, `DATABASE_URL_UNPOOLED`
  - `BLOB_READ_WRITE_TOKEN`
  - `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CREW_WORKER_URL`, `CREW_WORKER_SECRET`
  - `OPENAI_API_KEY` / `ANTHROPIC_API_KEY`
- [ ] Enable **Fluid Compute** for long-running background tasks
- [ ] Configure preview deployments for PRs

### Subtask 1.3 — Database Schema ⬜ Pending

> Create and run initial Postgres migrations via Drizzle ORM or raw SQL.

- [ ] Install Drizzle ORM + `@vercel/postgres`
- [ ] Create `users` table (id, clerk_id, email, plan, created_at)
- [ ] Create `jobs` table (id, user_id, topic, status, created_at, completed_at)
- [ ] Create `job_steps` table (job_id, step_name, status, output, started_at, finished_at)
- [ ] Create `outputs` table (job_id, format, blob_url, word_count, created_at)
- [ ] Create `metrics` table (user_id, month, jobs_run, words_generated, exports_count)
- [ ] Create `topics` table (id, user_id, source, headline, url, discovered_at, used)
- [ ] Run migrations: `drizzle-kit push` or SQL migration files
- [ ] Create DB indexes on `jobs.user_id`, `jobs.status`, `topics.used`

### Subtask 1.4 — Python Worker Skeleton ⬜ Pending

- [ ] Create `/worker` directory in repo (or separate repo)
- [ ] Initialize FastAPI app (`main.py`)
- [ ] Install dependencies: `fastapi`, `uvicorn`, `crewai`, `openai`, `httpx`, `python-dotenv`
- [ ] Create `requirements.txt` / `pyproject.toml`
- [ ] Implement health check endpoint: `GET /health`
- [ ] Implement job receiver endpoint: `POST /run` (accepts job payload, returns 202)
- [ ] Add request authentication (shared secret header: `X-Worker-Secret`)
- [ ] Containerize with `Dockerfile`
- [ ] Deploy to Railway, Fly.io, or similar (not Vercel — Python long-running service)

---

## TASK 2 — Authentication ⬜ Pending

> **Summary:** Implement user authentication with Clerk. Protect all dashboard routes and API endpoints. Map Clerk users to the internal `users` table.

### Subtask 2.1 — Clerk Integration ⬜ Pending

- [ ] Install `@clerk/nextjs`
- [ ] Wrap app in `<ClerkProvider>` in `layout.tsx`
- [ ] Create sign-in page: `/app/(auth)/sign-in/[[...sign-in]]/page.tsx`
- [ ] Create sign-up page: `/app/(auth)/sign-up/[[...sign-up]]/page.tsx`
- [ ] Configure `middleware.ts` to protect `/dashboard` and `/api` routes
- [ ] Redirect unauthenticated users to `/sign-in`

### Subtask 2.2 — User Provisioning ⬜ Pending

- [ ] Create Clerk webhook endpoint: `POST /api/webhooks/clerk`
- [ ] On `user.created` event: insert row into `users` table
- [ ] On `user.updated` event: sync email changes
- [ ] On `user.deleted` event: soft-delete user record
- [ ] Expose `userId` from Clerk session in all API routes via `auth()`

---

## TASK 3 — Core API Routes ⬜ Pending

> **Summary:** Build the four primary API routes that form the backend of the SaaS. Each route is a Next.js Route Handler in `/app/api/`.

### Subtask 3.1 — `POST /api/generate` — Job Creation ⬜ Pending

> User submits a topic/brief. A job record is created in Postgres, then the job is dispatched to the Python CrewAI worker.

- [ ] Accept request body: `{ topic: string, tone?: string, length?: "short"|"medium"|"long" }`
- [ ] Validate input with Zod schema
- [ ] Check user plan limits (jobs per month from `metrics` table)
- [ ] Insert job record: `status = "queued"`, `user_id`, `topic`
- [ ] Insert initial `job_steps` rows (research, writing, qa, packaging) all `status = "pending"`
- [ ] `POST` job payload to Python worker URL (fire-and-forget via `waitUntil`)
- [ ] Return `{ jobId }` immediately with HTTP 202

```ts
// /app/api/generate/route.ts
export async function POST(req: Request) {
  const { userId } = auth()
  const body = GenerateSchema.parse(await req.json())
  const job = await db.insert(jobs).values({ userId, topic: body.topic, status: 'queued' }).returning()
  waitUntil(dispatchToWorker(job.id, body))
  return Response.json({ jobId: job.id }, { status: 202 })
}
```

### Subtask 3.2 — `GET /api/jobs/[id]` — Status & Progress ⬜ Pending

> Poll endpoint for the dashboard to check job progress. Returns job status + per-step breakdown.

- [ ] Validate that job belongs to authenticated user (return 403 otherwise)
- [ ] Query `jobs` + `job_steps` tables by job ID
- [ ] Return structured response:
  ```json
  {
    "jobId": "...",
    "status": "running",
    "topic": "...",
    "steps": [
      { "name": "research",  "status": "done",    "completedAt": "..." },
      { "name": "writing",   "status": "running", "startedAt": "..."  },
      { "name": "qa",        "status": "pending"                      },
      { "name": "packaging", "status": "pending"                      }
    ],
    "output": null
  }
  ```
- [ ] When `status = "complete"`, include output blob URLs

### Subtask 3.3 — `GET /api/export/[id]` — File Delivery ⬜ Pending

> Authenticated download of generated files (markdown, DOCX, PDF).

- [ ] Validate job ownership
- [ ] Accept `?format=md|docx|pdf` query param
- [ ] Look up blob URL from `outputs` table
- [ ] Stream file from Vercel Blob using `fetch(blobUrl)`
- [ ] Set correct `Content-Disposition` and `Content-Type` headers
- [ ] Increment `exports_count` in `metrics` table

### Subtask 3.4 — `POST /api/worker/callback` — Worker Webhook ⬜ Pending

> The Python worker calls this endpoint to report step completions and final output.

- [ ] Validate `X-Worker-Secret` header
- [ ] Accept payload: `{ jobId, step, status, output?, blobKey? }`
- [ ] Update `job_steps` row for the completed step
- [ ] On final step: update `jobs.status = "complete"`, store output references
- [ ] Upload output content to Vercel Blob if provided as raw text
- [ ] Trigger user notification (email or in-app)

---

## TASK 4 — Streaming UI with Vercel AI SDK ⬜ Pending

> **Summary:** Use the Vercel AI SDK to stream live generation progress to the dashboard. Users see the article being written in real time rather than waiting for a polling refresh.

### Subtask 4.1 — Server-Sent Events Stream ⬜ Pending

- [ ] Create `GET /api/jobs/[id]/stream` endpoint returning SSE
- [ ] Subscribe to Postgres LISTEN/NOTIFY on `job_steps` updates
  - OR poll DB every 2 seconds and push new events
- [ ] Emit events: `{ event: "step_update", data: { step, status, preview } }`
- [ ] Emit `{ event: "complete", data: { outputUrl } }` when done
- [ ] Close stream on job completion or error

### Subtask 4.2 — Frontend Stream Consumer ⬜ Pending

- [ ] Install `ai` package from Vercel AI SDK
- [ ] Create `useJobStream(jobId)` hook using `EventSource` or `useChat`-pattern
- [ ] Display live step progress bar (research → writing → QA → packaging)
- [ ] Render writing output incrementally as text streams in
- [ ] Show "completed" state with download buttons when stream closes

---

## TASK 5 — CrewAI Pipeline (Python Worker) ⬜ Pending

> **Summary:** Build the multi-agent pipeline inside the Python FastAPI worker. Four agents handle research, writing, QA verification, and export packaging sequentially, with step callbacks to the Next.js app after each phase.

### Subtask 5.1 — Agent Definitions ⬜ Pending

- [ ] Define **Research Agent**
  - Tools: web search (Tavily or SerpAPI), URL scraper
  - Goal: gather 5-10 sources on the topic, extract key facts, quotes, stats
  - Output: structured research brief (JSON)
- [ ] Define **Writing Agent**
  - Tools: LLM (GPT-4o or Claude Sonnet), research brief context
  - Goal: write full Substack article (intro, sections, CTA) matching tone/length
  - Output: raw markdown article
- [ ] Define **QA/Verification Agent**
  - Tools: fact-check search, grammar check
  - Goal: verify claims, flag unsupported statements, fix prose issues
  - Output: revised markdown + list of changes
- [ ] Define **Export Packager Agent**
  - Tools: markdown-to-DOCX (`python-docx`), markdown-to-PDF (`weasyprint`)
  - Goal: produce final exports in all requested formats
  - Output: file bytes or upload to callback

### Subtask 5.2 — Crew Orchestration ⬜ Pending

- [ ] Define `SubstackCrew` class using `crewai.Crew`
- [ ] Set task order: Research → Writing → QA → Packaging
- [ ] Configure `process = Process.sequential`
- [ ] Pass job metadata (topic, tone, length) to crew kickoff
- [ ] After each task, POST step completion to `/api/worker/callback`
- [ ] Handle exceptions: POST `status = "error"` with message on failure

### Subtask 5.3 — Worker API Endpoint ⬜ Pending

- [ ] `POST /run` accepts `{ jobId, topic, tone, length, callbackUrl, secret }`
- [ ] Validates secret header
- [ ] Runs `SubstackCrew.kickoff()` in background thread/async task
- [ ] Returns `{ accepted: true }` immediately (202)
- [ ] Worker deployment: Dockerfile + Railway/Fly.io `fly.toml`

---

## TASK 6 — SaaS Dashboard ⬜ Pending

> **Summary:** Build the user-facing Next.js dashboard. Covers the main generation UI, job history, export management, metrics, and settings.

### Subtask 6.1 — Dashboard Layout ⬜ Pending

- [ ] Create `AppShell` layout with sidebar + main area
- [ ] Sidebar links: Generate, My Drafts, Topics, Analytics, Settings
- [ ] Top bar: user avatar, plan badge, notification bell
- [ ] Responsive layout (mobile-friendly)

### Subtask 6.2 — Generate Page (`/dashboard/generate`) ⬜ Pending

- [ ] Topic input field (text or URL)
- [ ] Tone selector (informative, opinionated, narrative, casual)
- [ ] Length selector (short ~500w, medium ~1200w, long ~2500w)
- [ ] "Generate" button → calls `POST /api/generate`
- [ ] Redirect to `/dashboard/jobs/[id]` on success

### Subtask 6.3 — Job Status Page (`/dashboard/jobs/[id]`) ⬜ Pending

- [ ] Display step pipeline with live progress (streaming from SSE)
- [ ] Show real-time article preview as writing agent streams output
- [ ] "Download" buttons for MD / DOCX / PDF (calls `GET /api/export/[id]`)
- [ ] "Regenerate" button to start a new job on same topic
- [ ] Show error state with retry option if pipeline fails

### Subtask 6.4 — Drafts / History Page (`/dashboard/drafts`) ⬜ Pending

- [ ] List all completed jobs for user (paginated)
- [ ] Display: topic, date, word count, export formats available
- [ ] Filter by status (completed, failed, running)
- [ ] Delete job (removes DB record + blob files)

### Subtask 6.5 — Topics Page (`/dashboard/topics`) ⬜ Pending

- [ ] Display discovered topics from cron job
- [ ] Mark topics as used / bookmarked / dismissed
- [ ] "Generate from topic" one-click shortcut
- [ ] Manual topic entry for user-provided ideas

### Subtask 6.6 — Analytics Page (`/dashboard/analytics`) ⬜ Pending

- [ ] Jobs run this month (vs. plan limit)
- [ ] Total words generated (lifetime + monthly)
- [ ] Exports count by format
- [ ] Usage trend chart (Recharts, jobs/day over 30 days)

### Subtask 6.7 — Settings Page (`/dashboard/settings`) ⬜ Pending

- [ ] Profile: name, email (read-only from Clerk)
- [ ] Subscription: current plan, usage meter, upgrade CTA
- [ ] API keys: user-supplied OpenAI/Anthropic keys (optional override)
- [ ] Notification preferences
- [ ] Danger zone: delete account

---

## TASK 7 — Vercel Cron: Topic Discovery ⬜ Pending

> **Summary:** A daily cron job scans RSS feeds, trending Substack posts, and Google Trends to populate the `topics` table with fresh content ideas for each user.

### Subtask 7.1 — Cron Route ⬜ Pending

- [ ] Create `GET /api/cron/discover-topics` route
- [ ] Protect with `CRON_SECRET` header (Vercel passes this automatically)
- [ ] Configure in `vercel.json`:
  ```json
  {
    "crons": [{ "path": "/api/cron/discover-topics", "schedule": "0 8 * * *" }]
  }
  ```
- [ ] For each active user: fetch their niche/interest from profile
- [ ] Query RSS feeds / Google Trends API / Substack trending
- [ ] Insert new rows to `topics` table (deduplicated by URL)
- [ ] Mark stale topics (>30 days old) as archived

### Subtask 7.2 — Topic Sources ⬜ Pending

- [ ] Integrate Google Trends API (via `pytrends` in worker or direct HTTP)
- [ ] Parse RSS feeds for user-defined sources
- [ ] Fetch Hacker News top stories for tech niches
- [ ] Optionally: use AI to score topic relevance for user's niche

---

## TASK 8 — Billing & Subscription ⬜ Pending

> **Summary:** Implement Stripe-based subscription management with plan limits enforced at the API level.

### Subtask 8.1 — Stripe Setup ⬜ Pending

- [ ] Create Stripe products and price IDs:
  - Free: 5 jobs/month
  - Starter ($19/mo): 30 jobs/month
  - Pro ($49/mo): unlimited jobs, priority queue
- [ ] Install `stripe` SDK
- [ ] Create `POST /api/billing/checkout` → Stripe Checkout session
- [ ] Create `POST /api/billing/webhook` → handle `subscription.*` events
- [ ] Create `POST /api/billing/portal` → Stripe Customer Portal
- [ ] Store `stripe_customer_id` and `plan` on `users` table

### Subtask 8.2 — Plan Enforcement ⬜ Pending

- [ ] On `POST /api/generate`: check `metrics.jobs_run` vs. plan limit
- [ ] Return 402 with `{ error: "quota_exceeded", upgradeUrl: "/billing" }` if over limit
- [ ] Show usage meter on dashboard (`X of Y jobs used this month`)
- [ ] Show upgrade modal when limit is reached

---

## TASK 9 — Testing ⬜ Pending

> **Summary:** Establish test coverage for critical paths: API routes, CrewAI pipeline, billing, and auth.

### Subtask 9.1 — Unit Tests (Next.js) ⬜ Pending

- [ ] Set up Vitest + testing-library
- [ ] Test Zod validation schemas for all API routes
- [ ] Test `dispatchToWorker` with mocked fetch
- [ ] Test plan limit enforcement logic
- [ ] Test worker callback handler (step updates, completion)

### Subtask 9.2 — Unit Tests (Python Worker) ⬜ Pending

- [ ] Set up pytest
- [ ] Mock CrewAI agents with dummy task outputs
- [ ] Test callback POST to Next.js app
- [ ] Test export packaging (markdown → DOCX byte output)

### Subtask 9.3 — Integration Tests ⬜ Pending

- [ ] Test full job creation → dispatch → callback → status polling flow
- [ ] Test Stripe webhook handling with Stripe CLI event replay
- [ ] Test Clerk webhook user provisioning

### Subtask 9.4 — End-to-End Tests ⬜ Pending

- [ ] Set up Playwright
- [ ] E2E: sign up → generate article → download export
- [ ] E2E: hit plan limit → see upgrade modal → upgrade → generate succeeds

### Subtask 9.5 — CI/CD Pipeline ⬜ Pending

- [ ] Create `.github/workflows/ci.yml`
- [ ] Run Next.js lint + typecheck on PR
- [ ] Run Vitest on PR
- [ ] Run pytest on PR (Python worker)
- [ ] Block merge if any step fails

---

## TASK 10 — Documentation & Launch Prep ⬜ Pending

### Subtask 10.1 — Documentation ⬜ Pending

- [ ] Write `README.md` with project overview and local setup instructions
- [ ] Create `.env.example` with all required variables documented
- [ ] Document worker deployment (Railway/Fly.io steps)
- [ ] Document Vercel Cron configuration

### Subtask 10.2 — Production Hardening ⬜ Pending

- [ ] Add rate limiting on `/api/generate` (max 3 req/min per user)
- [ ] Add Sentry error tracking (Next.js + Python worker)
- [ ] Configure Vercel Analytics
- [ ] Set up uptime monitoring
- [ ] Security audit: validate all inputs, check for prompt injection risks
- [ ] Load test worker service for concurrent jobs

---

## Directory Structure

```
/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx                  # AppShell wrapper
│   │   ├── generate/page.tsx           # Topic input + job kickoff
│   │   ├── jobs/[id]/page.tsx          # Live progress + download
│   │   ├── drafts/page.tsx             # Job history
│   │   ├── topics/page.tsx             # Discovered topics
│   │   ├── analytics/page.tsx          # Usage metrics
│   │   └── settings/page.tsx           # Account + billing
│   ├── api/
│   │   ├── generate/route.ts           # POST — create job
│   │   ├── jobs/[id]/route.ts          # GET — job status
│   │   ├── jobs/[id]/stream/route.ts   # GET — SSE stream
│   │   ├── export/[id]/route.ts        # GET — file download
│   │   ├── worker/callback/route.ts    # POST — worker webhook
│   │   ├── billing/
│   │   │   ├── checkout/route.ts
│   │   │   ├── webhook/route.ts
│   │   │   └── portal/route.ts
│   │   ├── cron/
│   │   │   └── discover-topics/route.ts
│   │   └── webhooks/
│   │       └── clerk/route.ts
│   ├── layout.tsx
│   └── page.tsx                        # Landing / marketing
├── components/
│   ├── ui/                             # Base components (button, input, etc.)
│   ├── layout/                         # AppShell, Sidebar, TopBar
│   ├── generate/                       # GenerateForm, ToneSelector
│   ├── jobs/                           # StepPipeline, LivePreview, ExportButtons
│   ├── topics/                         # TopicCard, TopicList
│   ├── analytics/                      # UsageChart, MetricCard
│   └── billing/                        # PlanCard, UpgradeModal, UsageMeter
├── lib/
│   ├── db/
│   │   ├── schema.ts                   # Drizzle schema definitions
│   │   └── index.ts                    # DB client
│   ├── stripe/
│   │   ├── client.ts
│   │   └── webhooks.ts
│   └── worker.ts                       # dispatchToWorker helper
├── hooks/
│   ├── useJobStream.ts
│   └── useSubscription.ts
├── types/index.ts
├── middleware.ts                        # Clerk auth protection
├── vercel.json                          # Cron config
├── worker/                              # Python CrewAI service
│   ├── main.py                          # FastAPI app
│   ├── crew/
│   │   ├── agents.py                    # Agent definitions
│   │   ├── tasks.py                     # Task definitions
│   │   └── pipeline.py                  # SubstackCrew class
│   ├── tools/
│   │   ├── search.py                    # Web search tool
│   │   ├── scraper.py                   # URL scraper tool
│   │   └── exporter.py                  # MD → DOCX/PDF tool
│   ├── requirements.txt
│   └── Dockerfile
└── .github/
    └── workflows/
        └── ci.yml
```

---

## Task Completion Summary

| Task | Priority | Status |
|---|---|---|
| Task 1 — Scaffold & Infrastructure | 🚨 Critical | ⬜ Pending |
| Task 2 — Authentication | 🚨 Critical | ⬜ Pending |
| Task 3 — Core API Routes | 🚨 Critical | ⬜ Pending |
| Task 4 — Streaming UI | High | ⬜ Pending |
| Task 5 — CrewAI Pipeline | 🚨 Critical | ⬜ Pending |
| Task 6 — SaaS Dashboard | High | ⬜ Pending |
| Task 7 — Cron: Topic Discovery | Medium | ⬜ Pending |
| Task 8 — Billing & Subscription | High | ⬜ Pending |
| Task 9 — Testing | High | ⬜ Pending |
| Task 10 — Docs & Launch Prep | Medium | ⬜ Pending |

**Total Tasks:** 10
**Total Subtasks:** 38
**Total Action Items:** 130+
