-- Stories — run in Supabase → SQL Editor. Safe to re-run.

create table if not exists public.stories (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  excerpt       text,
  body          text,
  category      text,                 -- Fiction | Poetry | Memoir | Essay
  author        text,
  read_time     text,
  cover_url     text,
  published     boolean default false,
  published_at  timestamptz,
  created_at    timestamptz default now()
);

alter table public.stories enable row level security;

-- Public site reads only published stories; dashboard writes with the secret key.
drop policy if exists "public read published stories" on public.stories;
create policy "public read published stories"
  on public.stories for select using (published = true);

create index if not exists stories_published_idx
  on public.stories(published, published_at desc);

-- Public storage bucket for story images (cover + inline)
insert into storage.buckets (id, name, public)
values ('stories', 'stories', true)
on conflict (id) do nothing;
