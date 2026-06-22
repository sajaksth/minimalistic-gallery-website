-- Travel Journals upgrade — run in Supabase → SQL Editor. Safe to re-run.

-- Date range (replaces single entry_date going forward)
alter table public.journal_entries
  add column if not exists start_date date,
  add column if not exists end_date   date;

-- Public storage bucket for journal images (cover + inline body images).
-- Public = anyone can read via the file URL; uploads happen server-side with the secret key.
insert into storage.buckets (id, name, public)
values ('journal', 'journal', true)
on conflict (id) do nothing;
