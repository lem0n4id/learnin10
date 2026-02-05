# Copilot Instructions — learnin10

## Project Overview

**Learn in 10** is a T3 Stack (create-t3-app) Next.js application where users input a topic and receive a concise learning guide (~10 minutes). Currently in early scaffold phase — UI has mock data, database is not yet wired to the frontend.

**Stack:** Next.js 14 (App Router) · TypeScript · Drizzle ORM · PostgreSQL · Tailwind CSS · shadcn/ui · Zod

## Architecture

```
src/
  app/           # Next.js App Router — pages and layouts (React Server Components by default)
  components/ui/ # shadcn/ui primitives (Button, Input, Textarea) — do NOT edit directly
  lib/utils.ts   # Shared utility: `cn()` for merging Tailwind classes
  server/db/     # Drizzle ORM setup — schema.ts defines tables, index.ts exports `db`
  styles/        # Global CSS with Tailwind + CSS variable theming
  env.js         # Runtime env validation via @t3-oss/env-nextjs + Zod
```

- **Path aliases:** `~/` and `@/` both resolve to `./src/`. Prefer `~/` (project convention used in server code and shadcn config).
- **Database tables** use the `learnin10_` prefix via `createTable()` helper in `src/server/db/schema.ts`. Always use this helper when defining new tables.
- **Environment variables** are validated in `src/env.js`. When adding new env vars, update both the Zod schema in `env.js` and `.env.example`.

## Key Commands

| Task | Command |
|---|---|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Generate Drizzle migrations | `npm run db:generate` |
| Apply migrations | `npm run db:migrate` |
| Push schema (no migration file) | `npm run db:push` |
| Drizzle Studio (DB GUI) | `npm run db:studio` |
| Start local Postgres (Docker) | `./start-database.sh` (requires WSL on Windows) |
| Skip env validation | `SKIP_ENV_VALIDATION=1 npm run build` |

## Conventions & Patterns

- **UI components:** Use shadcn/ui from `~/components/ui/`. Add new components via `npx shadcn-ui@latest add <component>`. Compose with `cn()` from `~/lib/utils` for conditional class merging.
- **Styling:** Tailwind CSS with CSS variables for theming (defined in `globals.css`). Prettier auto-sorts Tailwind classes via `prettier-plugin-tailwindcss`.
- **Client components:** Mark with `'use client'` directive. Only pages needing interactivity (state, effects) should be client components — keep layouts and data-fetching pages as server components.
- **Type safety:** Strict TypeScript (`noUncheckedIndexedAccess: true`). Use Zod for runtime validation of external data.
- **ESM:** Project uses `"type": "module"`. Config files that need CommonJS use `.cjs` extension (e.g., `postcss.config.cjs`).

## Database (Drizzle + PostgreSQL)

- Schema lives in `src/server/db/schema.ts`. All tables must use `createTable()` to auto-prefix with `learnin10_`.
- DB connection is cached in dev to survive HMR reloads (see `src/server/db/index.ts`).
- Use `postgres` (postgres.js) driver — not `pg`.
- `DATABASE_URL` env var is required. Example: `postgresql://postgres:password@localhost:5432/learnin10`.
- Filter in `drizzle.config.ts` targets only `learnin10_*` tables.

## Planned Features (from README TODO)

Database integration, Clerk auth, Sentry error tracking, PostHog analytics, Upstash rate limiting. When implementing these, follow the existing T3 patterns and add env vars to `src/env.js`.
