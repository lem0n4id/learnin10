# learn in 10

Learn in 10 is a project to help you learn new things in 10 minutes or less. It's a simple platform where you can input a word or phrase and get a relevant guide to learn about it in 10 minutes or less.

## Tools configured

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io/) for code formatting

## TODO

- [x] Make it deploy (vercel)
- [x] scaffold basic ui with mock data
  - [x] install and setup shadcn ui
- [x] Actually set up a database (vercel postgres)
- [ ] Attach database to UI
- [ ] Add authentication (w/ clerk)
- [ ] Error management (w/ sentry)
- [ ] Analytics (posthog)
- [ ] Ratelimiting (upstash)
- [ ] create a docs site (astro starlight)
- [ ] create docs updating skill (refer https://github.com/vercel/next.js/tree/canary/.claude/skills/update-docs)
- [ ] configure changesets (refer https://github.com/vercel/turborepo/tree/main/examples/design-system)
- [ ] optimise turborepo config (refer https://vercel.com/academy/production-monorepos)
- [x] use dotenv instead of import { env } from "~/env" (for DB tooling)

also refer https://github.com/vercel/next-forge/tree/main = production-ready Next.js boilerplate with turborepo

also refer https://github.com/dan5py/turborepo-shadcn-ui

**Steps**

1. DONE Convert repo to npm workspaces monorepo
   - Create `apps/web` and move the current Next.js app there (today it lives under page.tsx and layout.tsx).
   - Add `apps/docs` for Astro Starlight docs site.
   - Create `packages/db`, `packages/llm`, `packages/core`, `packages/auth` and decide which code migrates vs remains app-specific (Next middleware stays in web, shared helpers can be in packages).
   - Update workspace scripts so `dev`, `build`, `lint`, and Drizzle commands still work from the repo root.

2. Fix pathing + tooling after the move (monorepo “plumbing”)
   - Update TS path aliases: today they point at `./src/*` in tsconfig.json; in the new structure, `apps/web/tsconfig.json` should keep `~/*` resolving to `apps/web/src/*`.
   - Update shadcn config: components.json currently points to globals.css and tailwind.config.ts; adjust these to the new `apps/web` locations so future `shadcn-ui add` writes correctly.
   - Update Tailwind scan paths: tailwind.config.ts currently scans `./src/**/*`; expand to include `apps/web/src/**/*` and any package paths containing UI (if you share UI later).
   - Update env validation wiring: next.config.js currently imports env.js; move this to `apps/web/src/env.js` and update the import path accordingly.
   - Update Drizzle config paths: drizzle.config.ts currently points at schema.ts; move schema into `packages/db` and point Drizzle at `packages/db/src/schema.ts`.

3. Implement the DB data model for “guides + generation jobs + config”
   - In `packages/db`, define tables (using the existing `createTable()` prefixing pattern currently in schema.ts):
     - `guides`: userId (Clerk), title, topic/prompt, rendered output (or structured JSON), created/updated timestamps.
     - `generation_jobs`: 1:1 with guide via `guideId` (unique), status, provider/model, latencyMs, token counts (optional), error fields, timestamps.
     - `app_config` (DB-backed config): keys like `dailyQuota`, `model`, `timeoutMs`, and “hard limits” still enforced via env as a safety cap.
   - Add migrations + a minimal seed path for config (since you chose “no admin UI; manual DB edits”). The seed should create a default config row if missing.

4. Add Clerk authentication to the web app (email + OAuth)
   - Integrate Clerk in `apps/web` and enforce auth on any history/detail routes and API endpoints.
   - Implement a small auth helper (optionally in `packages/auth`) that provides a server-side `getUserIdOrThrow()` and consistent “deny by default” behavior for data access.
   - Keep access control checks close to DB queries (ownership checks on every read/update/delete).

5. Create the LLM abstraction package (no provider calls in route handlers)
   - In `packages/llm`, expose a single stable API like `llm.generateGuide(input, options)` (your `llm.generateGuide()` rule).
   - Add the first provider adapter for OpenAI only inside `packages/llm` (no OpenAI SDK imports anywhere in `apps/web` route handlers).
   - Define a strict output contract (sections + length constraints) and store prompt/version metadata on the job row to support future prompt/version management.

6. Implement the “generation workflow” service boundary (sync now, async-ready later)
   - In `packages/core`, implement a generation service that:
     - Validates input (Zod).
     - Loads config from DB with env fallback/upper-bounds.
     - Enforces daily quota (count today’s jobs or guides for the user).
     - Creates `guides` + `generation_jobs` rows in a transaction-ish flow.
     - Calls `packages/llm` and updates job status/latency/error fields.
   - This service becomes the only entrypoint the API route calls, making “async migration” later a swap of execution model rather than a rewrite.

7. Add API routes and UI flows in the web app (MVP UX)
   - Add a generate endpoint (non-streaming) that calls the core service and returns the created guide/job payload.
   - Update the prompt form component (currently a stub in search-form.tsx) to:
     - Be a real form with proper label semantics and keyboard behavior.
     - Show loading, error, and success states.
   - Add history list page and guide detail page (new routes in `apps/web/src/app/...`) with rename + delete actions.
   - Ensure all pages enforce auth and ownership; unauth users are redirected to sign-in.

8. Add “observability hooks” as stable interfaces (no-op initially)
   - Create `logger` and `metrics` facades in `packages/core` (or a dedicated `packages/observability` if you prefer), and call them from the generation service.
   - Do not integrate Sentry/PostHog yet; just ensure you have the seams (consistent event shapes, requestId/jobId context).

9. Build the docs site app (Astro Starlight) in `apps/docs`
   - Create minimal docs that satisfy your required sections: architecture overview, design decisions, DB schema, API contracts, auth/security model, quota strategy, failure handling, evolution roadmap.
   - Keep it “in repo” and linked from the web app footer/header if desired (no new UX pages beyond what’s required for docs discovery).

**Verification**

- Workspace health:
  - `npm install` (root)
  - `npm run lint` and `npm run build` for each workspace app
- DB:
  - `npm run db:generate` then `npm run db:migrate` and confirm new tables exist
- App flows (manual):
  - Sign up/in (email + OAuth), generate guide, verify it appears in history, open detail, rename, delete, confirm access control (try to open another user’s guide ID)
  - Quota: set low quota in config, generate until blocked, confirm messaging and reset behavior

**Decisions**

- Monorepo: do it now with npm workspaces (you chose this).
- Docs: Astro Starlight for an in-repo docs app (you chose this).
- Generation: non-streaming sync response for MVP; streaming is a later phase (you chose this).
- Config: DB-backed config (no admin UI) with env fallback/upper bounds.
- Data model: keep both `guides` and `generation_jobs` with a 1:1 constraint for MVP to preserve the async-job migration path without locking you out of 1:many later.

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
