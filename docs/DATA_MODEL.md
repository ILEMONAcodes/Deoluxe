# Data Model (Postgres / Supabase)

All money columns are `integer` kobo. All tables have `id uuid pk default gen_random_uuid()`, `created_at`, `updated_at`.

## categories
`slug text unique`, `name`, `sort_order int`

## products
`slug text unique`, `name`, `description`, `category_id → categories`, `price_kobo int`, `compare_at_kobo int null`, `status enum(draft, active, archived)`, `is_featured bool`, `is_drop bool`, `drop_starts_at timestamptz null`, `badge text null` (e.g. "New", "Limited")

## product_images
`product_id`, `url`, `alt`, `position int`, `color_variant_id null`

## product_variants
`product_id`, `size text`, `color text null`, `sku text unique`, `stock int` (0 = sold out for that size)

> A product is **sold out** when the sum of variant stock = 0.

## customers (optional for MVP; guests allowed)
`email`, `full_name`, `phone`

## orders
`order_number text unique` (e.g. `DLX-000123`), `customer_email`, `customer_name`, `phone`, `shipping_address jsonb` (line1, city, state, notes), `subtotal_kobo`, `delivery_kobo`, `total_kobo`, `status enum(pending, paid, processing, shipped, delivered, cancelled, refunded)`, `paystack_reference text unique`, `paid_at`

## order_items
`order_id`, `product_id`, `variant_id`, `name_snapshot`, `size_snapshot`, `unit_price_kobo`, `quantity`

## notify_requests
`product_id`, `email null`, `phone null`, `notified_at null`

## favourites (only if accounts are enabled)
`customer_id`, `product_id`

## admin_users
Use Supabase Auth; role stored in `app_metadata.role = 'admin'`.

## Row Level Security
- Public: read `categories`, `products` (status = active), `product_images`, `product_variants` (stock only).
- Public insert: `notify_requests`.
- Orders: created **only** via server routes using the service role; never directly by the client.
- Admin: full access via role check.

## Stock rules
Decrement variant stock **on paid webhook**, inside a transaction; reject if it would go below 0 and flag the order for manual refund. (Reservations are a Later item.)

## Foundation migration

Local draft: `supabase/migrations/202610270001_foundation.sql`. Not applied to a database. Public variants access is via a sanitised `product_availability` view (id, product_id, size, color, stock) filtered to active products; the base table and SKU remain admin-only under RLS. Remote schema validation, webhook transaction logic and authorised order lookup are still required in the commerce/backend phase.
