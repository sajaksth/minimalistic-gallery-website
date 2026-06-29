-- Shop products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric not null default 0,
  category text,
  description text,
  image_url text,
  sizes text,            -- comma-separated, e.g. "S, M, L"
  featured boolean not null default false,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists products_active_idx
  on public.products (active, sort_order, created_at desc);

alter table public.products enable row level security;

-- Public can read only active products
drop policy if exists "products public read" on public.products;
create policy "products public read" on public.products
  for select using (active = true);

-- Storage bucket for product images
insert into storage.buckets (id, name, public)
values ('shop', 'shop', true)
on conflict (id) do nothing;

drop policy if exists "shop public read images" on storage.objects;
create policy "shop public read images" on storage.objects
  for select using (bucket_id = 'shop');
