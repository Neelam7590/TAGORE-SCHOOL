# Tagore Global School

Premium school website for Tagore Global School (CBSE Affiliation No. 531905), featuring a React frontend and Express + PostgreSQL backend.

## Stack

- **Frontend**: React 19, Vite, Tailwind CSS 4, Framer Motion, Wouter (routing), TanStack Query
- **Backend**: Node.js 24, Express 5, Drizzle ORM, PostgreSQL
- **Monorepo**: pnpm workspaces

## Structure

```
artifacts/tagore-school/   # Frontend (React + Vite), port 22306
artifacts/api-server/      # Backend (Express), port 8080
lib/db/                    # Drizzle schema + migrations
lib/api-spec/              # OpenAPI specification
lib/api-client-react/      # Auto-generated React Query hooks
lib/api-zod/               # Auto-generated Zod schemas
```

## Running the project

Both workflows start automatically:

- **Frontend** (`artifacts/tagore-school: web`): `pnpm --filter @workspace/tagore-school run dev`
- **API Server** (`artifacts/api-server: API Server`): `pnpm --filter @workspace/api-server run dev`

The frontend proxies `/api` requests to the backend at `http://localhost:8080`.

## Environment

- `DATABASE_URL` — managed by Replit (PostgreSQL provisioned automatically)
- `SESSION_SECRET` — stored as a Replit Secret
- `BASE_PATH` — set to `/` in shared env vars

## Common tasks

```bash
# Install dependencies
pnpm install

# Push DB schema changes
pnpm --filter @workspace/db run push

# Build API server (required before changes go live in dev)
pnpm --filter @workspace/api-server run build

# Regenerate API client from OpenAPI spec
pnpm --filter @workspace/api-spec run codegen

# Full typecheck + build
pnpm run build
```

## User preferences

- Maintain monorepo structure; do not restructure or migrate
