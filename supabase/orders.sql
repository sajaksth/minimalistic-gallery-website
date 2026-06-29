-- Shop orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email text not null,
  address text,
  city text,
  postal_code text,
  country text,
  note text,
  items jsonb not null default '[]'::jsonb,   -- snapshot of cart line items
  item_count int not null default 0,
  subtotal numeric not null default 0,
  status text not null default 'new',         -- new | paid | shipped | completed | cancelled
  created_at timestamptz not null default now()
);

create index if not exists orders_created_idx on public.orders (created_at desc);

-- RLS on, with no public policies: customers never read orders directly.
-- Inserts and reads happen server-side via the service-role key (supabaseAdmin),
-- which bypasses RLS. This keeps order data private to the dashboard.
alter table public.orders enable row level security;
