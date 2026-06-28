-- Music tracks — run in Supabase → SQL Editor. Safe to re-run.

create table if not exists public.tracks (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  artist      text,
  audio_url   text not null,
  cover_url   text,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

alter table public.tracks enable row level security;

drop policy if exists "public read tracks" on public.tracks;
create policy "public read tracks" on public.tracks for select using (true);

-- Public bucket for audio files + cover art
insert into storage.buckets (id, name, public)
values ('music', 'music', true)
on conflict (id) do nothing;
