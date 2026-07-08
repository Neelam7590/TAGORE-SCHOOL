---
name: api-server start script requires manual build
description: Editing artifacts/api-server route files doesn't take effect on the "API Server" workflow until rebuilt
---

The "API Server" workflow runs `pnpm run start`, which executes the prebuilt `dist/index.mjs` — it does NOT rebuild from source. Only the `dev` script (`build && start`) rebuilds automatically.

**Why:** After editing a route file (e.g. adding a new endpoint), curling the live port kept returning 404 even after restarting the workflow, because the restart just re-ran the stale `dist` bundle.

**How to apply:** After changing any file under `artifacts/api-server/src`, run `pnpm --filter @workspace/api-server run build` before restarting the `API Server` workflow, or the change won't be live.
