# Tagore Global School

Premium school website for Tagore Global School featuring a modern React + Vite frontend with a Royal Blue (#0F4C81) and Gold (#FFD700) color scheme, glassmorphism effects, and premium animations.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- **Homepage**: `artifacts/tagore-school/src/pages/Home.tsx` — Hero, Why Choose Us, About Preview, Principal Message, Academic Programs, Testimonials, CTA
- **Academics page**: `artifacts/tagore-school/src/pages/Academics.tsx` — Academic programs timeline
- **Testimonial slider**: `artifacts/tagore-school/src/components/TestimonialSlider.tsx` — Glassmorphism carousel with auto-play
- **Footer**: `artifacts/tagore-school/src/components/layout/Footer.tsx` — 4-column premium footer with newsletter
- **Header**: `artifacts/tagore-school/src/components/layout/Header.tsx` — Sticky header with gold Apply Now button
- **Theme colors**: `artifacts/tagore-school/src/index.css` — Primary: Royal Blue (#0F4C81), Secondary: Gold (#FFD700)
- **App shell**: `artifacts/tagore-school/src/App.tsx` — Routing with wouter, header + footer layout_

## Architecture decisions

- **Color scheme**: Primary is Royal Blue (#0F4C81) for trust and professionalism, Secondary is Gold (#FFD700) for prestige and achievements. These are hardcoded throughout the design for visual consistency.
- **Diagonal clip-path transitions**: Sections use `polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)` with `-80px` negative margin overlap to create seamless professional section blending between blue and white backgrounds.
- **Glassmorphism cards**: Testimonial cards use `bg-white/60 backdrop-blur-xl border-white/50` for a premium frosted glass effect that elevates the luxury feel.
- **Gold glow effects**: All primary CTAs (Apply Now buttons) use `shadow-[0_0_30px_rgba(255,215,0,0.4)]` for a premium glow that draws attention.
- **Embla-free carousel**: The testimonial slider is a custom React hook-based carousel (no external carousel library) with auto-play (5s), pause-on-hover, and responsive card counts (3/2/1 for desktop/tablet/mobile)._

## Product

A premium school website for Tagore Global School with:
- **Hero section** with gold admissions badge, school building background, floating stats, and prominent CTA buttons
- **Why Choose Us** with 6 animated feature cards on a deep blue background
- **About Preview** with image and school history
- **Principal's Message** with signature quote block
- **Academic Programs** with 5 program cards with hover effects
- **Testimonials** with luxury glassmorphism carousel slider showing parent reviews
- **CTA Section** with dual buttons (Apply Now + Schedule a Visit)
- **Premium Footer** with 4 columns (School info, Quick Links, Contact, Newsletter subscription)
- **Academics page** with professional timeline design
- **Responsive design** with mobile menu and adaptive layouts

## User preferences

- **Color scheme**: Royal Blue (#0F4C81) and Gold (#FFD700) are the school's brand colors. Use these exclusively for all primary/secondary elements.
- **Admissions badge**: Always prominently display "ADMISSIONS OPEN FOR SESSION 2026-2027" with a pulsing dot indicator.
- **Apply Now button**: All Apply Now buttons should be gold (#FFD700) with rounded-full styling and a glow shadow effect.
- **Section transitions**: Use diagonal clip-path polygons (polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)) with -80px negative margin for seamless blue-to-white transitions.
- **Glassmorphism**: Use bg-white/60 backdrop-blur-xl border-white/50 for premium frosted glass cards.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
