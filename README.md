# Tagore Global School — Website

Premium school website for Tagore Global School (CBSE Affiliation No. 531905).

**Stack:** React 19 + Vite (frontend) · Express 5 + PostgreSQL (backend)

---

## Project Structure

```
/frontend    — React + Vite standalone app (deploy to Vercel)
/backend     — Express + PostgreSQL standalone API (deploy to Render)
```

The original Replit monorepo lives in `artifacts/` and `lib/` — it continues to work on Replit.  
`/frontend` and `/backend` are standalone copies ready for Render + Vercel deployment.

---

## Deploy: Backend → Render

### 1. Create a PostgreSQL database on Render
Go to **Render → New → PostgreSQL**. Copy the **Internal Database URL** (for use inside Render) or the **External Database URL** (if testing locally).

### 2. Create a new Web Service on Render
- **Repository root directory:** `backend`
- **Runtime:** Node
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run start`
- **Health Check Path:** `/api/healthz`

### 3. Set environment variables on Render
| Key | Value |
|-----|-------|
| `PORT` | `10000` (Render default) |
| `NODE_ENV` | `production` |
| `DATABASE_URL` | Your Render PostgreSQL connection string |
| `FRONTEND_URL` | Your Vercel app URL (e.g. `https://your-app.vercel.app`) |
| `GMAIL_USER` | Gmail address for contact/admission emails |
| `GMAIL_APP_PASSWORD` | 16-character Gmail App Password |
| `OPENAI_API_KEY` | OpenAI key (`sk_...`) or Groq key (`gsk_...`) for AI chat |
| `CARTESIA_API_KEY` | Cartesia TTS key (`sk_car_...`) — optional |
| `CARTESIA_VOICE_ID` | Cartesia voice ID — optional |

> A `render.yaml` is included in `/backend` for optional blueprint-based deploys.

### 4. Push DB schema (first deploy)
After the service starts, open the Render shell and run:
```bash
npx drizzle-kit push --config=drizzle.config.ts
```
Or run it locally against the External DB URL:
```bash
DATABASE_URL=<external-url> npx drizzle-kit push --config=drizzle.config.ts
```

---

## Deploy: Frontend → Vercel

### 1. Import repo on Vercel
- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### 2. Set environment variable on Vercel
| Key | Value |
|-----|-------|
| `VITE_API_URL` | Your Render backend URL (e.g. `https://tagore-school-api.onrender.com`) |

> A `vercel.json` is included in `/frontend` with SPA routing rewrites so all routes resolve to `index.html`.

### 3. Deploy
Click **Deploy**. Vercel builds the Vite app and serves it as a CDN-backed static site.

---

## Local Development (standalone)

### Backend
```bash
cd backend
cp .env.example .env          # fill in your values
npm install
npm run build
npm run dev                   # starts on http://localhost:8080
```

### Frontend
```bash
cd frontend
cp .env.example .env          # set VITE_API_URL=http://localhost:8080
npm install
npm run dev                   # starts on http://localhost:5173
```

---

## Local Development (Replit monorepo)

Both workflows start automatically on Replit:

- **Frontend** (`artifacts/tagore-school: web`): Vite dev server on port 22306
- **API Server** (`artifacts/api-server: API Server`): Express on port 8080

```bash
# Install dependencies
pnpm install

# Push DB schema
pnpm --filter @workspace/db run push

# Build API server (required after editing backend src)
pnpm --filter @workspace/api-server run build
```

Environment variables managed via Replit Secrets:
- `DATABASE_URL` — provisioned automatically by Replit PostgreSQL
- `SESSION_SECRET` — stored as a Replit Secret
- `BASE_PATH` — set to `/` in shared env vars
