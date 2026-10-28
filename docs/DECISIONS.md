# Decision Log

Agents: append new decisions at the bottom. Format: `ID — Date — Decision — Reason — Status`.

| ID | Date | Decision | Reason | Status |
|---|---|---|---|---|
| D-001 | 2026-10-27 | Build as a PWA (Next.js) rather than native apps | One codebase, installable, shareable link for Instagram | Accepted |
| D-002 | 2026-10-27 | Stack in TECH_STACK.md is proposed | Needs human confirmation in Phase 0 | **Proposed** |
| D-003 | 2026-10-27 | Brand primary colour sampled from logo: `#650A09` | Sampled from the supplied logo PNG | Proposed (confirm with brand guide if one exists) |
| D-004 | 2026-10-27 | Prices stored as integer kobo, currency NGN only | Avoid float errors | Accepted |
| D-005 | 2026-10-27 | Paystack is the MVP payment provider (test mode) | Common in Nigeria | **Proposed** |
| D-006 | 2026-10-27 | Guest checkout; accounts are optional/later | Lower friction | Accepted |
| D-008 | 2026-10-27 | Desktop/tablet layouts are in scope for design and MVP build (not just mobile) | Client will likely review on desktop; user request | Accepted |
| D-007 | 2026-10-27 | No UI build before Figma approval (unless human waives) | Avoid rework | Accepted |

## Open questions for the human
- Q1: Is there an existing brand guide (fonts, exact colours)?
- Q2: Real product list, prices and sizes, or demo seed data?
- Q3: Delivery zones and fees?
- Q4: Paystack account/test keys available?
- Q5: Domain name and WhatsApp/Instagram handles for the footer and support link?

## Intake confirmed — 2026-10-27

| ID | Date | Decision | Reason | Status |
|---|---|---|---|---|
| D-009 | 2026-10-27 | Solo operator; agent takes design role; begin Phase 1 in supplied Figma file | User explicitly said start working | Accepted |
| D-010 | 2026-10-27 | Keep proposed TECH_STACK.md stack and Paystack | User confirmation; supersedes proposed D-002/D-005 | Accepted; test keys pending |
| D-011 | 2026-10-27 | Design from scratch; maroon from supplied logo, white, ivory and charcoal | User direction; Playfair Display + Inter from brief | Accepted |
| D-012 | 2026-10-27 | Retain MVP delivery defaults Lagos 300000, Abuja 450000, other states 600000 kobo | Safe default pending explicit change | Default |
| D-013 | 2026-10-27 | Use supplied photos; remove cap hands, background and baked-in Sold out stickers, preserve cap graphics | User explicitly requested edits; originals retained | Accepted |
| D-014 | 2026-10-27 | Model/graphic usage rights confirmed by user | User replied sureeee to rights check | Accepted |
| D-015 | 2026-10-27 | Source filenames suggest BlackBoy Set ₦35,000, Velvet Aura Set ₦65,000, Eclipse Set ₦35,000; provisional only | Prices/names not separately verified; cap prices and inventory unknown | Pending confirmation |
| D-016 | 2026-10-27 | Instagram handle deolaluxury supplied by user | https://www.instagram.com/deolaluxury/ | Accepted |

Design direction: editorial streetwear luxe with maroon brand moments and CTAs, white product surfaces, ivory background and charcoal text. Borrow image prominence, thumb-friendly pills and floating mobile navigation from the reference; create distinct desktop navigation, filter sidebar and two-column product/checkout layouts. Use supplied lifestyle photos for campaign sections. No invented campaign imagery. User's instruction to start is authorization to proceed with this direction.

| D-017 | 2026-10-27 | Correct heart control from 40px token draft to 44px; 120px outer margin at 1440 enforces 1200px max content | Resolves smaller token-spec conflicts in favour of AA / responsive requirements | Accepted |
| D-018 | 2026-10-27 | No fabricated drop date/countdown; use waitlist invitation until launch date supplied | No current drop timing supplied | Accepted |
| D-019 | 2026-10-27 | Figma checkout is a visual demo; no real Paystack processing or order creation | Phase 1 design only | Accepted |
| D-020 | 2026-10-27 | First full design ready for human review; stop before foundation/build | Phase 1 approval gate | Awaiting approval |

| D-021 | 2026-10-27 | Use standalone transparent logo: maroon on light surfaces, white on dark surfaces | Explicit user revision overrides original no-recolour guardrail; preserve logo form and original asset | Accepted |
| D-022 | 2026-10-27 | Generate additional cap and graphic-tee colour concepts using supplied products | Explicit user permission overrides no-invented-product-imagery restriction for these colour studies only; no invented availability or prices | Accepted |
| D-023 | 2026-10-27 | Save every generated design asset locally and register it in manifest and Figma Assets | User recurring instruction | Accepted |

| D-024 | 2026-10-27 | Move the four generated colour concepts above original catalogue rows; add assets/NEW_COLOURWAYS.md gallery | User could not find the new products in the project or Figma | Accepted |

| D-025 | 2026-10-27 | User approval of current design accepted; begin frontend foundation using frontend-agent role | User said they like the colourways and asked to start frontend | Accepted |
| D-026 | 2026-10-27 | Phase 2 adds only framework/runtime, Tailwind tooling, Serwist, local font sources, Sharp image tooling and lint/type/browser-check tooling | Necessary scaffold, offline shell, approved typography, image budget and verification; defer motion/primitives/state libraries until used | Accepted |
| D-027 | 2026-10-27 | Use local catalogue fixtures only for foundation visual preview; generated colourways remain labelled concepts with no invented price/stock | Backend and inventory not configured | Accepted |

| D-028 | 2026-10-27 | Pin resolved stack Next 16.4.3 / React 19.3.1 / Tailwind 4.3.3 / Serwist 9.5.13; Webpack scripts for Serwist compatibility | Confirmed from current official docs and npm registry; versions locked | Accepted |
| D-029 | 2026-10-27 | Override transitive Zod to patched 4.6.6 | Serwist pins 4.6.5; npm audit identified constrained-collection memory exhaustion; patched compatible version clears audit | Accepted |
| D-030 | 2026-10-27 | Foundation is a read-only design preview, with empty bag/saved shells; full catalogue, product interactions and persistent state belong to Phase 3+ | Preserve required phase gate; no fake payment behaviour | Accepted |
| D-031 | 2026-10-27 | Prepare Supabase migration locally, including a sanitised public product_availability view | Public availability without exposing internal SKU; orders/customer records remain under admin RLS; not applied remotely | Draft schema |
| D-032 | 2026-10-27 | Keep tablet campaign faces visible with an adjusted image focal point | Responsive image review revealed centre crop cut model faces at 768px; source photo unchanged | Accepted |
| D-033 | 2026-10-27 | Public preview deployment and remote schema application wait for a connected Vercel/Supabase project | No project/account access supplied; local foundation can run without credentials | Pending setup |
| D-034 | 2026-10-27 | Proceed frame by frame through Phase 3: catalogue/filters/search, product/sold-out/size guide, favourites/empty states | User explicitly authorised staged implementation of approved multi-page design | Accepted |
| D-035 | 2026-10-27 | Add Zustand 5.0.16 for device-local favourites and draft product selections; hydrate after mount and validate persisted input | Approved stack/role calls for Zustand; needed for interactive storefront without hydration errors; no prices persisted | Accepted |
| D-036 | 2026-10-27 | Product Add to bag saves a clearly labelled local preview selection; complete cart/checkout frames follow at commerce stage | Keep product interaction reviewable without implying real inventory or purchase; existing bag shell reflects selections | Accepted |
| D-037 | 2026-10-27 | Waitlist UI shows that submission is not connected and never claims success; offer supplied Instagram contact | No connected Supabase project; cannot claim a notification request was saved or sent | Pending backend |
| D-038 | 2026-10-27 | Disable speculative route prefetching on storefront links | New product/catalogue chunks were being fetched while browsing Home; preserve first-load JavaScript budget | Accepted |
