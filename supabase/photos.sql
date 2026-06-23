-- Photos: projects (folders) + individual photos. Run in Supabase → SQL Editor. Safe to re-run.

create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  blurb       text,
  cover_url   text,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

create table if not exists public.photos (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid references public.projects(id) on delete cascade,
  title       text,
  src_url     text not null,
  type        text,                 -- landscape | portrait | architecture | nature
  sort_order  int default 0,
  created_at  timestamptz default now()
);

alter table public.projects enable row level security;
alter table public.photos   enable row level security;

-- Public site reads everything; dashboard writes with the secret key (bypasses RLS).
drop policy if exists "public read projects" on public.projects;
create policy "public read projects" on public.projects for select using (true);

drop policy if exists "public read photos" on public.photos;
create policy "public read photos" on public.photos for select using (true);

create index if not exists photos_project_idx on public.photos(project_id);

-- Public storage bucket for photo images (cover + gallery)
insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do nothing;
