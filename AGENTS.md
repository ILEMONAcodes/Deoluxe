# AGENTS.md — Deoluxe PWA

You are an AI agent helping build the **Deoluxe** e-commerce Progressive Web App. Read this file fully, then your role file in `agents/`, then the docs it points to. Do not skip ahead.

## 1. Project in one paragraph
Deoluxe is a Nigerian luxury / streetwear-luxe fashion brand (caps, tees, jackets, limited drops). We are building a mobile-first, installable PWA storefront that feels like a premium fashion app (see `assets/reference/ui-reference-vero-app.png`) and lets customers browse, favourite and buy in Naira. The first deliverable is an **MVP to demo to the client**.

## 2. Source of truth (read order)
1. `docs/PRD.md` then `docs/MVP_SCOPE.md`
2. `design/UI_UX_BRIEF.md`, `design/DESIGN_TOKENS.md`, `design/SCREENS.md`
3. `docs/TECH_STACK.md`, `docs/DATA_MODEL.md`, `docs/PWA_SPEC.md`
4. `docs/DECISIONS.md` (latest decisions win over older docs)

If two docs conflict: DECISIONS.md > MVP_SCOPE.md > PRD.md > everything else. Flag the conflict to the human.

## 3. Phase 0 — Intake (MANDATORY before any work)
Ask these in **one message, max 6 questions**, then wait:
1. Who is operating this session (solo dev, or a frontend/backend pair)? Which role (`agents/`) should you take?
2. Confirm or change the stack in `docs/TECH_STACK.md` (it is *proposed*, not final).
3. Is a Figma design done, in progress, or should you proceed with a coded design from the brief?
4. Which payment provider is the client set up with (Paystack / Flutterwave / none yet)? Is a test key available?
5. Delivery: which cities/zones and flat fees for the MVP? (Defaults are in `MVP_SCOPE.md`.)
6. Do you have the images listed in `design/ASSET_REQUEST.md`? Start the **Asset Request Process** (section 4).

Record answers in `docs/DECISIONS.md`. Don't block on answers you can safely default; state the default you used.

## 4. Asset Request Process (images)
Never invent brand imagery. Never hotlink stock photos into the product. Follow `design/ASSET_REQUEST.md`:
1. Ask for assets **in batches by screen group** (Brand → Home/Hero → Products → Lookbook → Social/OG), not all at once.
2. For each batch, state exactly what you need, the aspect ratio, and the filename pattern.
3. Tell the human where to drop files (`assets/incoming/<group>/`).
4. When files arrive: validate (size, ratio, format), log in `assets/ASSET_MANIFEST.md`, optimise (WebP/AVIF, responsive sizes).
5. If an image is missing, use a **clearly labelled placeholder** (`PLACEHOLDER — <description>`) in brand tone and mark it `pending` in the manifest. Never ship placeholders silently.
6. Ask the human to confirm the client owns usage rights for any model photos.

## 5. Phases and gates
| Phase | Output | Gate (human approves) |
|---|---|---|
| 0 Intake | Answers logged | Human says "go" |
| 1 Design | Figma frames for all MVP screens | Human approves design |
| 2 Foundation | Repo, CI, PWA shell, design tokens, DB schema | Runs locally + preview deploy |
| 3 Storefront | Home, catalog, product, favourites | Demo on a real phone |
| 4 Commerce | Cart, checkout, Paystack test payment, orders | End-to-end test purchase |
| 5 Admin + polish | Product/order admin, Lighthouse pass | Client-demo ready |

At every gate: stop, summarise what changed, list open questions, wait.

## 6. Engineering rules
- Mobile-first, **fully responsive**: design/build at 390, 768 and 1440. Desktop is a required, designed layout (top nav, sidebar filters, multi-column grids), not a stretched phone view. Breakpoints are in `design/DESIGN_TOKENS.md`.
- TypeScript strict. No `any` without a comment explaining why.
- Money is stored as **integer kobo**, displayed as `₦` with thousands separators.
- Accessibility: WCAG AA contrast, 44px touch targets, visible focus states, alt text on every image.
- The performance budget in `docs/PWA_SPEC.md` is a requirement, not a goal.
- Secrets only in env vars. Never commit keys. Provide `.env.example`.
- Small commits with conventional messages (`feat:`, `fix:`, `docs:`).
- Every feature: acceptance criteria met plus a test or a documented manual test.
- Don't add libraries casually; justify each in `docs/DECISIONS.md`.

## 7. Communication rules
- Be brief, plain and concrete. Show what you did and what you need.
- Ask before destructive actions (deleting files, resetting the DB, force pushes).
- If unsure about brand, money or legal matters, ask one specific question rather than guess.
- Update `docs/DECISIONS.md` whenever a decision is made or changed.

## 8. Brand guardrails
- Tone: confident, minimal, premium, slightly rebellious (the brand ships cheeky product names). Keep UI copy clean; product names belong to the brand, so don't alter or censor them without asking.
- Primary brand colour is the deep maroon from the logo. The logo lives in `assets/brand/`. Never recolour, stretch or crop it.
