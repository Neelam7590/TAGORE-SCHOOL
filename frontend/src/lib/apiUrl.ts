/**
 * Base URL for all API requests.
 *
 * In development (Vite dev server), leave VITE_API_URL unset — the Vite proxy
 * forwards `/api/*` to localhost:5173 if you configure one, or set it to your
 * local backend URL (e.g. http://localhost:8080).
 *
 * In production (Vercel), set VITE_API_URL to your Render backend URL:
 *   e.g. https://tagore-school-api.onrender.com
 */
export const API_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");
