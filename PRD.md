# Learnin10 — Product Requirements Document (Evolution-Ready MVP)

## 1. Executive Summary

- **Problem Statement**: People want a fast, structured way to learn a new topic (e.g., “Python”) without sifting through long tutorials or search results.
- **Proposed Solution**: An authenticated web app where a user enters a topic/prompt, the system generates a concise “learn in ~10 minutes” guide using an LLM, and saves it to the user’s private history for later review, rename, or deletion.
- **Success Criteria (KPIs)**:
  - ≥ 95% of generation requests return a completed guide (non-error).
  - p95 end-to-end generation latency ≤ 12 seconds (excluding user network variance).
  - 0 cross-user data leakage incidents.
  - ≥ 99% of over-quota requests are correctly blocked with a clear message.
  - No critical accessibility violations in core flows (Generate, History, Detail) in automated checks.
  - Architecture readiness: the codebase supports migration to async workers without a major refactor (service boundary preserved; job table already present).

---

## 2. User Experience & Functionality

- **User Personas**
  - **Busy learner**: wants concise structure and actionable next steps.
  - **Developer/student**: wants conceptual clarity plus minimal code examples.
  - **Returning learner**: wants history, rename, and deletion.

- **User Stories**
  1. As a user, I want to sign up/sign in with email and OAuth so that my guides are saved securely.
  2. As a user, I want to enter a topic/prompt and generate a structured “10-minute” guide so that I can learn the basics quickly.
  3. As a user, I want to see my saved guides so that I can revisit them later.
  4. As a user, I want to open a saved guide detail view so that I can read the full content.
  5. As a user, I want to rename a saved guide so that my history is easier to scan.
  6. As a user, I want to delete a guide so that I can remove content I don’t want stored.
  7. As a user, I want a daily quota so that usage is fair and costs are controlled.

- **Acceptance Criteria**
  - **Authentication**
    - Supports email login plus at least one OAuth provider.
    - Unauthenticated users cannot access history or detail routes.
    - All guide/job reads and writes are authorized server-side by user ownership (deny by default).
  - **Generate Guide**
    - Server-side input validation (min/max length; rejects empty/whitespace-only).
    - Output is persisted as structured JSON sections (see “Output Contract”), and rendered in the UI without allowing raw HTML.
    - Output includes, in order:
      - Overview
      - Key Concepts
      - 10-Minute Plan
      - 1–2 Code Examples (when relevant)
      - Further Reading
    - UI provides loading and clear error states.
    - On success, the system automatically persists the guide and its generation metadata.
    - Generation metadata stored includes: status, timestamps, latency, provider/model (at minimum), plus an error category when failed.
  - **Saved History**
    - Newest-first ordering.
    - Each item shows title, topic, created date.
    - Only the signed-in user’s items are visible.
  - **Guide Detail View**
    - Renders the full guide content in a readable format.
    - Unauthorized or missing IDs return safe “not found/unauthorized” behavior without leaking existence details.
  - **Rename Guide**
    - Editable title persisted to DB; validated (non-empty, max length).
    - Ownership enforced.
  - **Delete Guide**
    - Deletes the guide and makes it inaccessible thereafter.
    - Ownership enforced.
  - **Daily Quota**
    - Quota counts started generation jobs.
      - A job consumes quota once it is accepted and created by the core service.
      - Validation failures rejected before job creation do not consume quota.
      - Failed jobs (timeouts, provider errors) still consume quota.
    - Reset boundary is IST midnight.
      - Quota accounting is stored per `(user_id, date_ist)` (a date value derived in IST).
      - The over-quota message includes when the quota resets (IST).
    - Quota is configuration-driven (not hardcoded): sourced from DB config at runtime, with env defaults and env hard caps.

- **Non-Goals (Out of Scope for MVP)**
  - RAG, web browsing, citations with source attribution guarantees.
  - Sharing/collaboration or public publishing.
  - Payments/subscriptions.
  - Full analytics/monitoring integrations (Sentry/PostHog/Upstash) beyond leaving clean integration seams.
  - Mobile apps, offline mode, localization.

---

## 3. AI System Requirements

- **Tool Requirements**
  - **Provider**: OpenAI first (architecture must remain provider-agnostic).
  - **Non-streaming**: MVP returns a single response (streaming planned for later).
  - **Abstraction boundary**: Direct LLM provider calls inside route handlers are not allowed. All generation must flow through a single LLM interface (e.g., `llm.generateGuide(...)`) so async migration, retries/backoff, caching, and multi-provider routing are possible later.

- **Output Contract**
  - The system persists model output as structured JSON sections (not raw Markdown), and the UI renders it to a readable format.
  - JSON shape (minimum required keys):
    ```json
    {
      "overview": "...",
      "keyConcepts": ["...", "..."],
      "tenMinutePlan": ["step1", "step2"],
      "examples": [{ "title": "...", "code": "..." }],
      "furtherReading": [{ "title": "...", "url": "..." }]
    }
    ```
  - Rendering rules:
    - Allow: fenced code blocks, links, lists.
    - Disallow: raw HTML emitted by the model (must not be rendered).

- **Evaluation Strategy**
  - Maintain a fixed evaluation set (20–50 topics across domains: programming, math, productivity, etc.).
  - Human rubric scoring for: accuracy, clarity, structure adherence, and safety.
  - MVP quality target: ≥ 4/5 average on accuracy + clarity for evaluation set; zero safety rubric failures.

---

## 4. Technical Specifications

- **Architecture Overview**
  - Monorepo (npm workspaces) with clear boundaries to support evolution:
    - apps/web: Next.js App Router app (UI + authenticated routes + API endpoints)
    - apps/docs: Astro Starlight documentation site shipped from the same repo
    - packages/llm: provider-agnostic generation interface + provider adapters (OpenAI first)
    - packages/db: Drizzle schema + DB access utilities (no coupling to Next app env imports)
    - packages/core: generation workflow service (validation → quota → job lifecycle → persistence)
    - packages/auth: Clerk integration helpers (server-side user identity + guard utilities)
  - Data flow (sync MVP):
    1. User submits prompt from web UI
    2. Web API endpoint calls core generation service
    3. Core service validates input, enforces quota, creates job + guide rows, calls packages/llm
    4. Core service updates job status + metadata and returns the saved guide payload
  - Async migration readiness:
    - Same service boundary remains; only execution model changes (queue + worker picks up queued jobs).

- **Integration Points**
  - **Auth**: Clerk (email + OAuth). All data access depends on the authenticated userId.
  - **Database**: Postgres (already present in current scaffold) via Drizzle.
  - **LLM**: OpenAI via packages/llm.
  - **Docs**: Astro Starlight in apps/docs.

- **Data Model Requirements**
  - **Guides table**: stores userId, title, prompt/topic, generated output JSON, timestamps.
  - **Retention policy**:
    - Default: store indefinitely until the user deletes.
    - Future guardrail (not enabled in MVP): optional auto-expiry after 18 months of inactivity (configurable).
  - **Generation jobs table (required in MVP)**:
    - 1:1 mapping with guides (each guide has exactly one job row).
    - Job lifecycle state machine:
      - `created → running → succeeded`
      - `created → running → failed`
    - Stored statuses: `created`, `running`, `succeeded`, `failed`.
    - Fields include: status, provider, model, latencyMs, timestamps, quota_date (IST), error category/classification fields.
    - Idempotency support:
      - Generation endpoint accepts an optional idempotency key.
      - If the same `(user_id, idempotency_key)` is received again, return the existing job/guide instead of creating a new one.
      - Idempotency must be enforced at the persistence layer (unique constraint).
    - This table is the anchor for future async execution, retries, and observability.
  - **Config table (DB-backed config)**:
    - Stores runtime-configurable values (quota, default model, timeouts, output limits).
    - MVP administration: no admin UI; managed by seeded defaults + manual DB edits.
    - Env vars provide safe fallbacks and hard caps to prevent runaway cost (even if DB config is mis-set).

- **Config Precedence**
  - Precedence rule (highest wins):
    1. Env hard caps
    2. DB config (runtime)
    3. Env defaults (seed)

- **Measurable Limits (Default Targets)**
  - These are sourced from DB config at runtime, bounded by env hard caps:
    | Setting | Default |
    | --- | --- |
    | maxInputChars | 500 |
    | maxOutputTokens | 1,200 |
    | requestTimeoutMs | 15,000 |
    | dailyQuota | 10 guides/day |

- **Security & Privacy**
  - Ownership enforcement on every guide/job operation; deny-by-default authorization.
  - Store prompt + output (approved), but minimize logging of sensitive content (prefer metadata logs).
  - Strict server-side validation (Zod) for input length, allowed characters policy (as needed), and request shape.
  - Enforce output size/token limits to reduce abuse and cost.
  - Do not expose internal error details that could leak provider/system behavior; return user-friendly errors.

- **Error Taxonomy (MVP Minimum)**
  - The system classifies failures into categories with consistent user messaging and richer logged detail:
    | Category | User message | Logged detail |
    | --- | --- | --- |
    | Validation | “Invalid input.” | Full reason |
    | Auth | “Unauthorized.” | Auth context |
    | Quota | “Daily limit reached.” | Quota numbers |
    | Provider timeout | “Generation timed out.” | Timeout ms |
    | Provider 429 | “Service busy. Try later.” | Provider code |
    | Provider 5xx | “Temporary error.” | Provider response summary |
    | Unknown | “Unexpected error.” | Stack trace |

- **Observability & Production Readiness (Forward-Compatible)**
  - Provide structured logging and metrics hook points in core generation service:
    - Event shapes should include requestId, userId, jobId, status transitions, latency, and error codes.
  - These hooks can be no-op initially but must exist to plug in Sentry/metrics later without refactoring core flows.

---

## 5. Risks & Roadmap

- **Phased Rollout**
  - **MVP (Engineering-Grade)**
    - Monorepo restructure (apps/web + apps/docs + packages/*)
    - Clerk auth (email + OAuth)
    - Sync, non-streaming generation via LLM abstraction
    - DB persistence: guides + jobs + config
    - History list + detail + rename + delete
    - Daily quota enforcement with config-driven value (env fallback/cap)
    - Docs site shipped via Astro Starlight
  - **v1.1 (Hardening)**
    - Improved error taxonomy, retries (still sync), better prompt/version discipline
    - Real metrics + dashboards; structured logging wired to a provider
    - UX polish around failures and quota reset clarity
  - **v2.0 (Async + Platform Evolution)**
    - Replace sync generation with queued jobs + workers
    - Retries/backoff + dead-letter handling
    - Job status polling and/or streaming responses
    - Multi-provider routing and prompt/version management
    - Evaluation pipelines and cost controls

- **Technical Risks**
  - Cost escalation if limits are misconfigured or output is unbounded (mitigate with env hard caps + quota).
  - Latency variability from provider; non-streaming may feel slow at times (mitigate later with streaming).
  - Output quality inconsistency across topics (mitigate with eval set + prompt iteration).
  - Access control bugs causing cross-user leakage (mitigate with consistent ownership checks in core/db layer).
  - Architectural drift that breaks async migration (mitigate by enforcing service boundaries: route handler → core service → llm abstraction + db package).
