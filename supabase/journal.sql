-- Travel Journals — run in Supabase → SQL Editor. Safe to re-run.

create table if not exists public.journal_entries (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text unique not null,
  trip          text,
  location      text,
  entry_date    date,
  excerpt       text,
  body          text,
  cover_url     text,
  published     boolean default false,
  published_at  timestamptz,
  created_at    timestamptz default now()
);

alter table public.journal_entries enable row level security;

-- Public site can read only published entries (drafts stay private).
-- The dashboard writes with the secret key, which bypasses RLS.
drop policy if exists "public read published journals" on public.journal_entries;
create policy "public read published journals"
  on public.journal_entries for select using (published = true);

create index if not exists journals_published_idx
  on public.journal_entries(published, published_at desc);
