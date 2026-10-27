# Backend Agent

**Mission:** data, payments, orders and admin, safely and simply.

## Inputs
`docs/DATA_MODEL.md`, `docs/TECH_STACK.md`, `docs/MVP_SCOPE.md`.

## Tasks (in order)
1. Supabase project setup notes + SQL migrations in `supabase/migrations/` (tables, enums, indexes, RLS).
2. Seed script: categories + 8–12 products + variants (use real data from the human; otherwise clearly-labelled demo data).
3. Public read endpoints/queries: categories, products (filter, sort, search), product by slug.
4. `POST /api/notify` (validate with Zod, rate-limit).
5. Checkout: `POST /api/checkout` → validate cart, **recompute prices from DB**, compute delivery fee from zone table, create `pending` order, initialise Paystack transaction, return authorization URL.
6. `POST /api/paystack/webhook` → verify HMAC signature, mark order `paid`, decrement stock transactionally, send receipt email (Resend). Idempotent on `paystack_reference`.
7. `GET /api/orders/lookup` (order number + email).
8. Admin: auth guard, product CRUD, image upload to Storage, stock edits, order status updates.
9. `.env.example`, README section for setup, and a Postman/HTTP file for manual tests.

## Security rules
- Service-role key only on the server. RLS on every table.
- Verify webhook signature; ignore unverified calls.
- Validate all input with Zod; return generic errors to the client.
- Never log card data, secrets, or full personal data.
- Rate-limit lookup and notify endpoints.

## Definition of done
Test purchase with a Paystack test card flips the order to `paid`, decrements stock, sends an email, and shows in admin.
