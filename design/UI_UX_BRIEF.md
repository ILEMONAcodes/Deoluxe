# UI/UX Brief — Deoluxe PWA (for Figma)

Hand this file, `DESIGN_TOKENS.md`, `SCREENS.md`, the logo and the images to the designer / Figma.

## 1. Brand
**Deoluxe** — Nigerian luxury fashion with a streetwear edge: trucker caps, graphic tees, jackets, limited drops. Premium, confident, a little rebellious. Logo: white serif "DL" monogram with vertical "DEOLUXE" wordmark on deep maroon (`assets/brand/deoluxe-logo-maroon.png`).

Personality words: **Bold · Refined · Editorial · Exclusive · Warm**.
Avoid: loud discount-store energy, cluttered grids, neon gradients, stock-looking photography.

## 2. What we're designing
A mobile-first e-commerce app (PWA). Reference for *layout and interaction feel* (not for copying): `assets/reference/ui-reference-vero-app.png` — rounded cards, pill category chips, floating bottom nav, large product imagery, clean black primary buttons, onboarding with stacked image cards.
Reference for *brand imagery vibe*: `assets/reference/brand-instagram-feed.png` — product-in-hand shots, bold puffy typography, "Sold out!" stickers, night-city editorial portraits.

## 3. How Deoluxe differs from the reference
- **Brand colour leads**: deep maroon replaces the reference's neutral/black. Use maroon for splash, primary CTAs, active states and key accents. Off-white/ivory surfaces for calm.
- **Drops are a feature**: a "Drop" banner with countdown, a clear **Sold out** treatment (echo the white tilted "Sold out!" sticker from Instagram), and "Notify me".
- **Naira pricing** (₦) with thousands separators; no decimals.
- **Caps and tees are hero items** → square/4:5 imagery with tight crops; allow close-up detail shots.

## 4. Design principles
1. **Image first** — photography does the selling; UI stays quiet.
2. **One thumb** — primary actions in the bottom 40% of the screen.
3. **Fast to buy** — product → cart → pay in ≤ 4 taps from the product page.
4. **Luxury through restraint** — generous spacing, few colours, consistent radii.
5. **Honest states** — design sold-out, loading, empty, error and offline for every screen.

## 5. Platform + frames
- Primary frame: **iPhone 15/16 – 390 × 844**. Also check 360 × 800 (common Android).
- **Desktop is a required deliverable, not an afterthought.** The same PWA must look premium on a laptop, because the client will likely review it on desktop first. Design the desktop version of **every public screen** (see `SCREENS.md`, "Desktop layouts") at **1440 × 900**, plus a **tablet 768 × 1024** check for Home and Product.
- Desktop is *not* a stretched phone: use a top navigation bar, multi-column grids, larger imagery and hover states (see section 5b).
- Include **safe areas** (status bar, home indicator) and the floating bottom nav.
- Provide light theme only for MVP (dark mode is Later).

## 5b. Desktop design direction
- **Header (sticky):** centred logo, left nav links (Shop, Caps, Tees, Hoodies, Jackets, Drops), right icons (search, favourites, bag with count, account). Replaces the mobile bottom nav.
- **Grid:** 12 columns, max content width 1200, 24 px gutters, 80 px side margins at 1440.
- **Home:** full-width hero (large campaign image + headline + CTA), drop banner with countdown, 4-column featured grid, "Shop the look" row, newsletter/notify strip, footer.
- **Catalogue:** left filter sidebar (category, size, price, availability) + 3–4 column product grid; sort dropdown top right. Pagination or "Load more".
- **Product:** two-column: sticky image gallery (thumbnails + large image with zoom on hover) on the left; details, size chips, Add to cart, delivery info on the right.
- **Cart:** slide-in side drawer from the right; full cart page with order summary column.
- **Checkout:** two-column (forms left, sticky order summary right).
- **Hover/focus states** for cards (image swap or subtle lift), buttons, links; keyboard focus visible.
- **Footer:** logo, shop links, about/contact, shipping & returns, WhatsApp/Instagram, payment badges, copyright.
- Keep the same tokens, radii (slightly smaller cards ok: 20), and brand colours as mobile.

## 6. Components to build (Figma library)
Buttons (primary / secondary / ghost / disabled / loading) · Category pill (default / selected) · Product card (default / favourited / sold-out) · Price tag · Size chip (default / selected / unavailable) · Quantity stepper · Search bar · Top app bar · Floating bottom nav (Home, Shop, Bag, Profile) with badge · Bottom sheet · Toast · Input (default / focus / error) · Stepper (checkout) · Order status timeline · Install-app banner · Offline banner · Skeleton loader · Empty state · **Desktop header + mega-menu/links · Footer · Filter sidebar · Cart drawer · Gallery with thumbnails · Breadcrumbs**.

## 7. Screens required (see `SCREENS.md` for details)
Splash/Onboarding · Home · Catalogue · Search · Product Details · Sold-out Product · Favourites · Cart · Checkout (contact → delivery → pay) · Payment result (success / failed) · Order lookup · Order status · Profile/Info (about, contact, policies) · Offline · 404 · Install prompt · Admin (products list, product form, orders list, order detail).

## 8. Motion
Subtle: card press (scale 0.98), bottom-sheet slide, heart-pop on favourite, cart badge bump, hero image gentle parallax. Max 250 ms, ease-out. Respect reduced-motion.

## 9. Accessibility
AA contrast (check white on maroon and maroon on ivory), 44 × 44 px touch targets, visible focus ring, text scalable to 200%, never colour-only states (sold-out uses a label too), alt text for all images.

## 10. Deliverables expected from design
1. Figma file with Pages: **Cover · Tokens · Components · Mobile Screens · Desktop Screens · Prototype**.
2. Tokens as Figma variables matching `DESIGN_TOKENS.md` (or updated version, documented).
3. Clickable prototypes of the demo flow (Home → Product → Cart → Checkout → Success) on **both mobile and desktop**.
4. Exported icon/logo assets: SVG logo (ask client), PWA icons 192/512/maskable.
5. A short handoff note: spacing rules, anything that differs from tokens.

## 11. Image inputs
The AI will request images using `ASSET_REQUEST.md` **before** design starts. Use real images; if something is missing, use grey boxes labelled with the shot name from the shot list, not random stock.

## User revision — 2026-10-27

Use a standalone transparent DL/DEOLUXE mark: maroon on light surfaces, white on dark. No background tile. This overrides the original maroon-square logo treatment. Original uploaded logo remains unchanged as the source archive. Additional generated cap/tee colour concepts are authorised and must be labelled as concepts until approved as merchandise. Every new design asset must also be stored in the project asset folders and in Figma Assets.
