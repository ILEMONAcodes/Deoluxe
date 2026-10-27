# MVP Scope — Client Demo

**Definition of done:** on a real phone, a person can install the app, browse Deoluxe products, add to cart, pay with a Paystack **test** card, and the admin sees the order. Looks like the approved Figma.

## In
- **Fully responsive UI: mobile, tablet and desktop** (desktop header/footer, filter sidebar, two-column product page, cart drawer)
- Splash/onboarding (3 slides max, skippable; mobile only)
- Home, Catalogue (filter + sort + search), Product details
- Favourites (device-local)
- Cart + guest checkout + Paystack (test mode)
- Order confirmation page + order lookup
- Sold-out state + Notify-me capture (stores email/phone)
- Simple admin (password-protected): products CRUD, stock per size, order list + status update
- PWA: manifest, service worker, install prompt, offline catalogue cache
- Seed data with 8–12 real or clearly-labelled placeholder products

## Out (Later)
Accounts/passwords, reviews, discount codes, multi-currency, push notifications, inventory reservations, shipping-carrier integrations, analytics dashboards, lookbook CMS, Apple/Google Pay.

## Defaults (use unless the human says otherwise)
| Topic | Default |
|---|---|
| Currency | NGN (₦), stored in kobo |
| Delivery | Lagos flat ₦3,000; Abuja flat ₦4,500; other states ₦6,000 (editable constants) |
| Payment | Paystack test mode, card + bank transfer |
| Sizes | S, M, L, XL (caps: One Size) |
| Product count | 8–12 |
| Languages | English |
| Contact for orders | WhatsApp number from client (env var `NEXT_PUBLIC_WHATSAPP`) |
| Admin auth | Single owner login (email + password) |

## Demo script (what the client sees)
0. Open the link on a laptop first: show the desktop storefront, then switch to the phone.
1. Open link on phone → splash → Home.
2. Tap a cap → pick colour → Add to cart.
3. Open a sold-out item → Notify me.
4. Checkout → Paystack test → confirmation.
5. Show admin: order appears, mark "Shipped".
6. Install to home screen, toggle airplane mode, browse cached pages.
