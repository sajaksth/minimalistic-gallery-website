-- Illustrations — run in Supabase → SQL Editor. Safe to re-run.

create table if not exists public.illustrations (
  id          uuid primary key default gen_random_uuid(),
  title       text,
  src_url     text not null,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

alter table public.illustrations enable row level security;

drop policy if exists "public read illustrations" on public.illustrations;
create policy "public read illustrations" on public.illustrations for select using (true);

insert into storage.buckets (id, name, public)
values ('illustrations', 'illustrations', true)
on conflict (id) do nothing;
