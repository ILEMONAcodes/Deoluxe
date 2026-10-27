# Tech Stack (confirmed 2026-10-27 — D-010)

Chosen for speed to a convincing MVP, low cost, and good performance on mobile networks in Nigeria.

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | SSR/SSG for fast first paint and SEO, one codebase for UI + API routes |
| Styling | **Tailwind CSS** + CSS variables from `design/DESIGN_TOKENS.md` | Fast, consistent, small output |
| UI primitives | **Radix UI** (or shadcn/ui) | Accessible sheets, dialogs, tabs |
| Motion | **Framer Motion** (sparingly) | Card transitions, bottom sheets |
| PWA | **Serwist** (service worker for Next.js) + `manifest.webmanifest` | Maintained successor to next-pwa |
| Database + Auth + Storage | **Supabase** (Postgres, Row Level Security, Storage) | Managed, free tier, admin auth, image storage |
| Images | Supabase Storage + Next `<Image>` (or Cloudinary if client prefers) | Responsive WebP/AVIF |
| Payments | **Paystack** (Inline/redirect + webhook) | Local cards, transfer, USSD; most common in NG |
| Email | **Resend** (order receipts) | Simple API |
| State | Zustand (cart, favourites) persisted to localStorage | Tiny and simple |
| Validation | Zod | Shared client/server schemas |
| Testing | Vitest + Playwright (smoke flow) | Purchase-flow regression |
| Hosting | **Vercel** (app) + Supabase (data) | Preview URLs for client demos |
| Analytics | Plausible or Vercel Analytics (later) | Privacy-friendly |

## Conventions
- Folder layout: `src/app`, `src/components`, `src/lib`, `src/server`, `src/styles`, `supabase/migrations`, `public/`.
- Env vars documented in `.env.example`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `PAYSTACK_SECRET_KEY`, `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`, `RESEND_API_KEY`, `NEXT_PUBLIC_WHATSAPP`.
- Paystack webhook (`/api/paystack/webhook`) is the source of truth for "paid"; verify the signature; never trust the client redirect alone.
- Prices are computed server-side from DB at checkout; never accept totals from the client.

## Alternatives (if the human prefers)
- Backend: Firebase, or a separate Node/Express + Postgres API (two-dev FE/BE split).
- Commerce engine: Medusa or Shopify headless (more features, more setup; not needed for demo).
