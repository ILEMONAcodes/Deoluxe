# Deoluxe PWA

The approved Figma design now has a local frontend foundation: Next.js App Router, strict TypeScript, Tailwind tokens, responsive Home composition, transparent branding and local product imagery, plus the Serwist offline shell.

## Run locally

Requires Node.js 22 or later (Node 24 used for verification).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No API keys are needed for the foundation preview. `.env.example` lists the service settings for later integration.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
npm run test:smoke
```

Browser checks use installed Google Chrome on macOS. CI installs Playwright Chromium. Run `npm run build` before smoke checks; their web server uses port 3100. Production service workers are disabled during development to avoid stale local assets.

## Current scope

Home is a read-only composition from the approved design, including the four proposed cap/tee colourways. Header, footer, mobile navigation, brand marks, cards, buttons, typography and honest empty/offline/404 states form the shared foundation. Search/category links browse sections for now; product cards and favourite hearts are previews, not implemented shopping controls. Full catalogue, product selection, favourites persistence, cart and checkout follow their phase gates.

Product names/prices are provisional source-file fixtures; generated colourways have no invented price or stock. No payment or order is created.

## Project paths

| Path | Purpose |
|---|---|
| `src/app/` | Routes, metadata, manifest and worker source |
| `src/components/` | Shared UI and responsive shell |
| `src/styles/tokens.css` | Approved design tokens |
| `src/server/catalogue-preview.ts` | Temporary server-side design fixtures |
| `public/images/` | Optimised local assets |
| `assets/` | Original/edited/concept source images and manifest |
| `scripts/prepare-assets.mjs` | Reproducible image, font and icon packaging |
| `supabase/migrations/` | Local schema draft; not applied remotely |
| `tests/` | Production-browser smoke checks |
| `docs/FOUNDATION.md` | Validation record, limits and next gate |

Regenerate public assets with `npm run assets`. Version control retains the supplied brand photography and approved derivatives. Font licences are alongside the local font files.

## Deployment

Connect this repository to Vercel: framework Next.js, install `npm ci`, build `npm run build`, Node 24. No backend credentials are needed for the read-only shell. No hosted preview has been published yet. See the Phase 2 gate in `AGENTS.md` before moving to the full storefront.

---

# Deoluxe PWA — Agent Kit

Everything needed to take Deoluxe (Nigerian luxury fashion brand) from idea to a client-ready **MVP e-commerce Progressive Web App**, using AI agents for the design brief and the build.

## What's inside

| Path | Purpose |
|---|---|
| `AGENTS.md` | **Master instructions.** Every AI agent reads this first. |
| `agents/` | Role files: orchestrator, design, frontend, backend, QA |
| `docs/PRD.md` | Product requirements (what and why) |
| `docs/MVP_SCOPE.md` | In / out of the first client demo |
| `docs/TECH_STACK.md` | Proposed stack + reasons |
| `docs/DATA_MODEL.md` | Database tables and relationships |
| `docs/PWA_SPEC.md` | Installability, offline, performance rules |
| `docs/DECISIONS.md` | Decision log (agents must keep it updated) |
| `docs/ROADMAP.md` | Milestones from kickoff to client demo |
| `design/UI_UX_BRIEF.md` | **Give this to Figma / your designer** |
| `design/DESIGN_TOKENS.md` | Colors, type, spacing, radii (starter values) |
| `design/SCREENS.md` | Screen-by-screen spec |
| `design/ASSET_REQUEST.md` | The image-request process + shot list |
| `assets/brand/` | Logo |
| `assets/reference/` | Instagram feed + UI reference screenshots |
| `assets/incoming/` | Drop requested images here, by folder |
| `prompts/` | Copy-paste starter prompts for the AI agent and Figma |

## How to use (in order)

1. **Unzip** into a new folder and run `git init`.
2. Open your AI coding agent (Claude Code, Cursor, etc.) in that folder.
3. Paste `prompts/01_START_AGENT.md`. The agent runs **Phase 0 (intake)**: confirms the stack, asks who is operating, and **asks you for images** using `design/ASSET_REQUEST.md`.
4. Drop the images into `assets/incoming/...`. The agent logs them in `assets/ASSET_MANIFEST.md`.
5. Give `design/UI_UX_BRIEF.md` (covers **mobile and desktop**), `design/DESIGN_TOKENS.md`, `design/SCREENS.md` and the images to Figma (or paste `prompts/02_FIGMA_DESIGN.md` into an AI design tool). Design the screens.
6. Share the Figma link with the agent. It moves to **Phase 2 (build)** following `docs/ROADMAP.md`.
7. Review at each milestone gate, then demo to the client.

> The agent must **not** build UI before the Figma designs (or your explicit "skip design" approval) exist.
