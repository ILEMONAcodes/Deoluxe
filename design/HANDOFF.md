# Deoluxe — Phase 1 design handoff

Design: https://www.figma.com/design/x1mF2EuOrxrdDRclX8OQV8/Deoluxe
Mobile flow: https://www.figma.com/proto/x1mF2EuOrxrdDRclX8OQV8/Deoluxe?node-id=6-78
Desktop flow: https://www.figma.com/proto/x1mF2EuOrxrdDRclX8OQV8/Deoluxe?node-id=6-104

Status: first design ready for review; **human approval required before Phase 2**. No application build, deployment or live payment integration has been performed.

## File organisation
Cover · Tokens · Components · Mobile Screens · Desktop Screens · Prototype · Assets.
34 mobile frames; 40 frames on Desktop Screens (37 desktop and 3 responsive checks: Home/Product at 768px and Home at 360px). Native editable text, vector icons, component instances and auto-layout; only content photography and the supplied logo are raster.

## Screen → proposed route
| Design | Route |
|---|---|
| Home / mobile onboarding | `/` (first-visit overlay on mobile) |
| Catalogue / filters | `/shop` |
| Search / no results | `/search` |
| Product / sold-out / size guide | `/products/[slug]` |
| Favourites / empty favourites | `/favourites` |
| Bag / empty bag / desktop drawer | `/cart` |
| Contact / delivery / review checkout | `/checkout` |
| Payment success / failure | `/checkout/result` |
| Order lookup | `/orders` |
| Order status | `/orders/[orderNumber]` |
| Profile / About | `/info` |
| Delivery & returns | `/shipping-returns` |
| Contact | `/contact` |
| Privacy / Terms | `/privacy`, `/terms` |
| Offline / 404 / generic error | `/offline`, framework fallbacks |
| Install / update / notify | overlays and toasts |
| Admin login | `/admin/login` |
| Admin products / product form | `/admin/products`, `/admin/products/[id]` |
| Admin orders / order detail | `/admin/orders`, `/admin/orders/[id]` |

## Components → proposed implementation
| Figma | Proposed code |
|---|---|
| Button (8 states) | `src/components/ui/button.tsx` |
| Chip (default/selected/unavailable) | `src/components/ui/chip.tsx` |
| Input (4 states) | `src/components/ui/input.tsx` |
| Product card (3 states) | `src/components/product/product-card.tsx` |
| Notice (offline/error/success) | `src/components/ui/notice.tsx` |
| Mobile navigation | `src/components/layout/mobile-nav.tsx` |
| Desktop header / footer | `src/components/layout/header.tsx`, `footer.tsx` |
| Filter sidebar / gallery / cart drawer | `src/components/shop/filters.tsx`, `product/gallery.tsx`, `cart/cart-drawer.tsx` |

Proposed paths only; code files do not exist yet.

## Tokens and responsive rules
Figma colour variables map directly to `var(--brand-maroon-600)`, `var(--ivory-50)`, `var(--ink-900)` etc. in planned `src/styles/tokens.css`. Full values in DESIGN_TOKENS.md. Size variables use `var(--size-N)`; map to Tailwind spacing/radius tokens. Playfair Display Regular/Bold for headings; Inter Regular/Medium/Semi Bold for UI.

Mobile 390×844, narrow 360×800, tablet 768×1024, desktop 1440×900. Mobile margins 20px; desktop content capped at 1200px and centred. Catalogue uses 2 columns mobile, 3 tablet, 3 with desktop sidebar or 4 without. Product and checkout split into two columns on desktop. Mobile content scrolls within viewport while purchase/navigation controls remain outside the scrolling body. Respect safe-area padding during implementation.

## Assets
All 13 supplied local photo originals were copied without recompression to `assets/incoming/{products,hero,editorial}/` (includes an identical Eclipse duplicate). Logo retained unaltered at `assets/brand/deoluxe-logo-maroon.png`. Original filenames and dimensions: `assets/source-index.json`.

Edited caps: `assets/processed/products/products-statement-cap-{black,green}-cutout-v1.png`. Both have true RGBA transparency. Hand, indoor background and baked-in Sold out sticker removed using built-in ImageGen. Original cap shots retained. These AI retouches need a visual comparison/approval of lettering, trim and reconstructed edges before production. Prompt record: IMAGE_EDIT_LOG.md.

Source-image Figma hashes/layer IDs in figma-assets.json and figma-cap-assets.json; screen IDs in figma-state.json. Original widths 1440px fall below requested production image targets; keep for design preview and request higher-resolution originals if available. Responsive WebP/AVIF export belongs to build phase.

## Validation
- Screenshot review: mobile Home and Product, mobile Checkout Contact, desktop Home, Checkout Review, Product and Admin Products, desktop Catalogue, plus button variant sheet. Targeted spacing fixes were reviewed.
- Final structural audit: 34 mobile + 40 desktop/responsive frames; 413 + 882 editable text nodes; no horizontal overflow in audited horizontal auto-layout containers; no captions below 11px; no unfinished shimmer placeholders. After a final shared-component correction, all 7 catalogue cards at 390px and all 34 desktop/responsive product-card instances use fill-width images with locked 4:5 proportions.
- Audited prototype connections: 206 mobile + 507 desktop reactions; core route chain Home → Product → Bag → Contact → Delivery → Review → Confirmation exists in both layouts. This is a connection audit, not a live app end-to-end payment test.
- Contrast: white/maroon 13.12:1, maroon/ivory 12.29:1, ink/ivory 17.60:1, secondary/ivory 6.54:1.
- Primary actions 52px; chips, icon/favourite controls and mobile nav destinations at least 44px. Implement desktop link hit-area padding and visible keyboard focus in code.
- Manual reviewer test: open each prototype, choose BlackBoy Set, Add to bag, Checkout, Continue to delivery, Review order, Pay demo, Track order. Separately inspect a sold-out cap → Notify me → waitlist confirmation.

## Open content / assumptions
Source filenames suggest BlackBoy Set ₦35,000, Velvet Aura Set ₦65,000, Eclipse Set ₦35,000. Verify product naming, whether the pictured tee represents the whole set, prices, sizes and inventory. Cap prices are explicitly pending. Sold-out cap state is a demo based on supplied source stickers; current stock needs confirmation. Default delivery fees retained. No invented release countdown.

Pending: payment test keys; drop name/date; official size chart; support WhatsApp/email; delivery timelines/returns; approved privacy/terms copy. Policy/contact placeholders are explicitly labelled. Client has confirmed photo/model/graphic usage rights.

## Revision 02 — user feedback applied

Standalone transparent logo replaces the square-backed mark in 58 screen locations: 42 maroon-on-light and 16 white-on-dark. Use `assets/brand/deoluxe-logo-transparent-maroon-v3.png` and `assets/brand/deoluxe-logo-transparent-white-v3.png`; both are 400×349 RGBA PNGs with the same alpha silhouette. Original source is retained; rejected intermediate exports are documented in the asset manifest. Direct Figma PNG export preserves alpha; screenshot-based export had flattened it and is not used. Larger editable masked masters remain in Figma Assets.

Four proposed colourways saved in `assets/concepts/products/`: wine-maroon and midnight-navy statement caps; warm-ivory and forest-green graphic tees. They are labelled Colour concept, have no invented selling price or stock, and appear alongside confirmed-photo pieces on Home/Catalogue at all four designed widths. Dedicated review: https://www.figma.com/design/x1mF2EuOrxrdDRclX8OQV8/Deoluxe?node-id=28-2

New Figma page: Colour Studio. Assets page contains an organised Revision 02 board with both logo colours and all four concepts. Future generated assets must always be saved locally, logged and added to Figma Assets, per the user's standing instruction.
