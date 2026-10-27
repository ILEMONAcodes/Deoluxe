# Screens Spec

Format per screen: **Purpose · Content · Actions · States**. Frame: 390 × 844. Bottom nav on Home, Shop, Favourites, Bag, Profile.

## 1. Splash / Onboarding (first visit)
- Purpose: brand moment + set tone. Maroon background, centred logo, then 3 swipeable slides with stacked image cards (see reference middle phone).
- Content: slide headlines e.g. "Wear the statement", "Limited drops. Real luxury.", "Delivered across Nigeria". Dots indicator. **Get started** button; **Skip**.
- Images needed: 3 lifestyle shots (see ASSET_REQUEST: ONB-1..3).
- States: shown once (remember in localStorage).

## 2. Home
- Top bar: avatar/logo mark, grid/menu icon, search field, notification bell (optional).
- Headline: "Style first. Details matter most." (editable copy).
- Category pills: All · Caps · Tees · Hoodies · Jackets · Pants · Accessories.
- **Drop banner** (if active): image, name, countdown, "Shop the drop".
- Featured product cards (vertical list/2-col), "New arrivals" row, "Shop the look" row.
- States: loading skeleton, no products, offline banner.

## 3. Catalogue (Shop)
- Search + filter button (bottom sheet: category, size, price range, availability) + sort (Newest, Price ↑↓).
- 2-column grid on mobile; card has heart, name, price, sold-out sticker where needed.
- Infinite scroll or "Load more". Empty: "Nothing here yet."

## 4. Search
- Recent searches, suggestions, results list. Empty + no-result states.

## 5. Product Details
- Back button, title "Product Details", more menu, heart.
- Image gallery (swipe, dots; pinch-zoom optional). Name, price (₦), badge (New / Limited).
- Description with "Read more". Size chips (S M L XL / One Size), colour swatches if variants.
- Delivery note ("Delivered in 2–5 working days"), size guide link (bottom sheet).
- Sticky bottom bar: price + **Add to cart**.
- States: size not selected (button asks "Select size"), added toast, low stock note ("Only 2 left").

## 6. Sold-out Product
- Same layout; image dimmed + sticker; CTA **Notify me** → bottom sheet (email or WhatsApp number) → confirmation toast.

## 7. Favourites
- Grid of favourited items; empty state with CTA to Shop. Heart toggles with pop animation.

## 8. Cart (Bag)
- Line items: image, name, size, qty stepper, remove, line price.
- Summary: subtotal, delivery estimate (set at checkout), total. **Checkout** button.
- Empty state. Cart persists on device.

## 9. Checkout (3 steps, one screen each or accordion)
1. **Contact:** name, email, phone.
2. **Delivery:** address, city, state (dropdown) → delivery fee shown; note field.
3. **Review & Pay:** order summary, total in ₦, **Pay with Paystack** (opens hosted checkout).
- Inline validation, loading state, error state (payment failed → retry).

## 10. Payment Result
- **Success:** check animation, order number (e.g. DLX-000123), summary, "Track order", "Continue shopping".
- **Failed/cancelled:** reason + retry + WhatsApp support.

## 11. Order Lookup + Order Status
- Lookup form: order number + email. Status timeline: Paid → Processing → Shipped → Delivered.

## 12. Profile / Info
- About Deoluxe, Contact (WhatsApp, Instagram, email), Shipping & returns, Privacy policy, Terms, Install app, version.

## 13. System screens
- Offline fallback · 404 · Generic error · Install prompt (banner/bottom sheet, iOS instructions variant) · Update-available toast.

## 14. Admin (desktop-friendly, simple)
- Login. Products list (search, status, stock). Product form (name, price, category, description, images upload/reorder, variants + stock, drop toggle). Orders list (filter by status). Order detail (items, customer, address, status dropdown, notes).
- Design as plain, clean tables/forms using the same tokens; no custom illustrations.

## Desktop layouts (1440 × 900) — REQUIRED
Design each of these as desktop frames (plus tablet 768 for Home and Product). Same content and states as mobile; layout differs.

| Screen | Desktop layout |
|---|---|
| Home | Sticky header; full-width hero; drop banner + countdown; 4-col featured grid; "Shop the look" row; notify/newsletter strip; footer |
| Catalogue | Filter sidebar (left, 260 px) + 3–4 col grid; sort dropdown; breadcrumbs; load more |
| Search | Expanding search overlay under the header with live suggestions |
| Product Details | 2 columns: sticky gallery with thumbnails (left) · info, sizes, CTA (right); "You may also like" row below |
| Sold-out Product | Same, image dimmed + sticker; **Notify me** opens a centred modal |
| Favourites | 4-col grid, empty state |
| Cart | Right-side drawer (quick view) and full page with summary column |
| Checkout | 2 columns: stepper + forms (left), sticky order summary (right) |
| Payment result | Centred card with order summary |
| Order lookup/status | Centred form; timeline horizontal |
| Profile/Info | Simple content pages with side navigation |
| Splash/Onboarding | **Not shown on desktop**; go straight to Home (show a one-time brand intro bar instead, optional) |
| System (offline, 404, error) | Centred layouts with logo |
| Admin | Desktop-first: sidebar nav + tables/forms |

**Responsive breakpoints:** mobile < 640 · tablet 640–1023 · desktop ≥ 1024 · wide ≥ 1440.
Header switches from bottom nav (mobile) to top nav (≥ 1024).

## Navigation map
Splash → Home ↔ Shop ↔ Favourites ↔ Bag ↔ Profile. Product opens from Home/Shop/Favourites. Bag → Checkout → Result. Order lookup from Profile and from the success email.
