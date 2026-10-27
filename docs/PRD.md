# PRD — Deoluxe PWA (v0.1)

## 1. Summary
A mobile-first, installable e-commerce PWA for **Deoluxe**, a Nigerian luxury fashion brand. It should feel like a native fashion app (reference: `assets/reference/ui-reference-vero-app.png`): big imagery, minimal chrome, pill filters, bottom navigation, quick "add to cart".

## 2. Problem
The brand currently sells through Instagram DMs. Limited drops sell out (feed shows "Sold out!" overlays) and orders, sizes, payments and delivery are handled manually. Customers have no single place to browse the catalogue, see what is available, or pay confidently.

## 3. Goals
1. Give Deoluxe an owned, branded storefront that converts Instagram traffic.
2. Let customers browse, pick size, pay in Naira, and track an order, all from a phone.
3. Make **drops** (limited releases) a first-class experience: countdowns, sold-out states, "notify me".
4. Be installable (Add to Home Screen) and fast on average Nigerian mobile networks.

## 3b. Non-goals (MVP)
Multi-vendor marketplace, native app store apps, loyalty points, multi-currency, reviews moderation, AI styling.

## 4. Users
- **Shopper** (primary): 18–35, Instagram-first, buys on phone, pays by card / bank transfer / USSD.
- **Brand owner / admin**: adds products, marks stock, fulfils orders, often from a phone.
- **Client reviewer**: sees the demo; judges look and feel first.

## 5. Key user stories
- As a shopper I can browse by category (Caps, Tees, Hoodies, Jackets, Pants, Accessories) and see price in ₦.
- As a shopper I can open a product, see photos, pick a size/colour, and add to cart.
- As a shopper I can favourite items and find them later.
- As a shopper I can see which items are **sold out** and tap "Notify me" with my email/WhatsApp number.
- As a shopper I can check out as a guest, enter delivery details, and pay via Paystack.
- As a shopper I can install the app and still browse the catalogue with a weak connection.
- As an admin I can create/edit products with images, sizes and stock, and see/update orders.

## 6. Functional requirements (summary; details in SCREENS.md)
| ID | Requirement | MVP |
|---|---|---|
| F1 | Onboarding splash (first visit only) | Yes |
| F2 | Home: hero, category pills, featured grid, drop banner | Yes |
| F3 | Catalogue with category filter, sort, search | Yes |
| F4 | Product details: gallery, size picker, description, add to cart | Yes |
| F5 | Favourites (local for guests; synced when signed in) | Yes |
| F6 | Cart (drawer/page), quantity, remove | Yes |
| F7 | Checkout: contact, address, delivery fee, Paystack | Yes |
| F8 | Order confirmation + email receipt | Yes |
| F9 | Order lookup (by order number + email) | Yes |
| F10 | Sold-out state + "Notify me" capture | Yes |
| F11 | Admin: products, stock, orders | Yes (simple) |
| F12 | Accounts (email magic link) | Optional |
| F13 | Lookbook / editorial page | Stretch |
| F14 | Push notifications for drops | Post-MVP |

## 7. Non-functional requirements
- Responsive from 360 px to 1440 px+; desktop is a designed experience, not a scaled phone layout.
- Lighthouse mobile: Performance ≥ 85, PWA pass, Accessibility ≥ 95.
- First load of Home ≤ 150 KB JS (gzip) and LCP ≤ 2.5 s on throttled 4G.
- Works offline for already-visited pages (read-only); checkout requires connection.
- Payments via Paystack hosted checkout (no card data touches our servers).
- NDPR-conscious: collect only what's needed, privacy policy link, consent for marketing.

## 8. Success metrics (client demo and beyond)
Demo: full purchase flow works end-to-end on a phone in test mode. Post-launch: conversion rate, % orders from installed PWA, drop sell-through time, "Notify me" signups.

## 9. Risks
- Image quality/quantity from the client → mitigated by the Asset Request Process.
- Payment/delivery details unknown → defaults in MVP_SCOPE.md.
- Scope creep → anything not in MVP_SCOPE.md goes to ROADMAP "Later".
