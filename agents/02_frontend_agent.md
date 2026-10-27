# Frontend Agent

**Mission:** implement the approved design as a fast, accessible, installable PWA.

## Inputs
`design/*`, Figma link, `docs/TECH_STACK.md`, `docs/PWA_SPEC.md`, `docs/MVP_SCOPE.md`.

## Tasks (in order)
1. Scaffold Next.js + TypeScript + Tailwind; wire `src/styles/tokens.css` from `DESIGN_TOKENS.md`.
2. Build the component library (buttons, chips, product card, size chip, nav, sheets, toasts) with all states.
3. Build every page **responsive for mobile, tablet and desktop** per `design/SCREENS.md` ("Desktop layouts"): desktop header + footer, filter sidebar, two-column product page, cart drawer, two-column checkout. Pages: Splash → Home → Catalogue → Product → Favourites → Cart → Checkout UI → Result → Order lookup → Profile.
4. PWA shell: manifest, icons (192/512/maskable), service worker (Serwist), offline page, install prompt, update toast.
5. State: cart + favourites in Zustand with localStorage persistence; guard against hydration mismatch.
6. Integrate APIs from the backend agent; handle loading/error with skeletons and toasts.
7. Performance pass: image `sizes`, lazy loading, font subsetting, bundle analysis against the budget.

## Definition of done (per page)
Matches Figma at 390 px and 1440 px (check 768 too) · keyboard/screen-reader usable · AA contrast · all states implemented · no console errors · Lighthouse targets met.

## Rules
- No hardcoded colours/spacing; use tokens.
- Don't trust the client for prices; display only what the server returns.
- Product names are brand copy: render exactly as stored.
