-- Foundation schema, prepared locally; not applied to a remote database.
create type public.product_status as enum ('draft', 'active', 'archived');
create type public.order_status as enum ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');

create table public.categories (
  id uuid primary key default gen_random_uuid(), slug text not null unique,
  name text not null, sort_order integer not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.products (
  id uuid primary key default gen_random_uuid(), slug text not null unique,
  name text not null, description text not null default '', category_id uuid references public.categories,
  price_kobo integer not null check (price_kobo >= 0), compare_at_kobo integer check (compare_at_kobo >= 0),
  status public.product_status not null default 'draft', is_featured boolean not null default false,
  is_drop boolean not null default false, drop_starts_at timestamptz, badge text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.product_variants (
  id uuid primary key default gen_random_uuid(), product_id uuid not null references public.products on delete cascade,
  size text not null, color text, sku text not null unique, stock integer not null default 0 check (stock >= 0),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.product_images (
  id uuid primary key default gen_random_uuid(), product_id uuid not null references public.products on delete cascade,
  url text not null, alt text not null, position integer not null default 0 check (position >= 0),
  color_variant_id uuid references public.product_variants on delete set null,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.orders (
  id uuid primary key default gen_random_uuid(), order_number text not null unique,
  customer_email text not null, customer_name text not null, phone text not null, shipping_address jsonb not null,
  subtotal_kobo integer not null check (subtotal_kobo >= 0), delivery_kobo integer not null check (delivery_kobo >= 0),
  total_kobo integer not null check (total_kobo = subtotal_kobo + delivery_kobo),
  status public.order_status not null default 'pending', paystack_reference text unique, paid_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.order_items (
  id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders on delete cascade,
  product_id uuid references public.products, variant_id uuid references public.product_variants,
  name_snapshot text not null, size_snapshot text not null,
  unit_price_kobo integer not null check (unit_price_kobo >= 0), quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.notify_requests (
  id uuid primary key default gen_random_uuid(), product_id uuid not null references public.products,
  email text check (email is null or char_length(btrim(email)) between 3 and 254),
  phone text check (phone is null or char_length(btrim(phone)) between 7 and 32), notified_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  check (email is not null or phone is not null)
);

create function public.is_admin() returns boolean language sql stable set search_path = '' as $$
  select coalesce((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;
create function public.set_updated_at() returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;
do $$
declare table_name text;
begin
  foreach table_name in array array['categories','products','product_variants','product_images','orders','order_items','notify_requests'] loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()', table_name);
    execute format('create policy admin_all on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', table_name);
    execute format('grant all on public.%I to authenticated', table_name);
  end loop;
end $$;

create policy categories_read on public.categories for select to anon, authenticated using (true);
create policy products_read on public.products for select to anon, authenticated using (status = 'active');
create policy images_read on public.product_images for select to anon, authenticated
  using (exists (select 1 from public.products p where p.id = product_id and p.status = 'active'));
create policy notify_insert on public.notify_requests for insert to anon, authenticated
  with check (exists (select 1 from public.products p where p.id = product_id and p.status = 'active'));
grant select on public.categories, public.products, public.product_images to anon;
grant insert on public.notify_requests to anon;

-- A sanitised public view exposes availability, never private SKU or customer data.
-- The base variants table remains admin-only under RLS.
create view public.product_availability as
  select v.id, v.product_id, v.size, v.color, v.stock
  from public.product_variants v join public.products p on p.id = v.product_id
  where p.status = 'active';
grant select on public.product_availability to anon, authenticated;

create index products_category_idx on public.products (category_id, status);
create index variants_product_idx on public.product_variants (product_id);
create index images_product_idx on public.product_images (product_id, position);
create index order_items_order_idx on public.order_items (order_id);
create index orders_created_idx on public.orders (created_at desc);
create index notify_product_idx on public.notify_requests (product_id);
