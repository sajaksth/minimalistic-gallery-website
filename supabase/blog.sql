-- Blog posts
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text,
  category text,
  read_time text,
  cover_url text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists blog_posts_published_idx
  on public.blog_posts (published, published_at desc);

alter table public.blog_posts enable row level security;

-- Public can read only published posts
drop policy if exists "blog public read" on public.blog_posts;
create policy "blog public read" on public.blog_posts
  for select using (published = true);

-- Storage bucket for blog cover/inline images
insert into storage.buckets (id, name, public)
values ('blog', 'blog', true)
on conflict (id) do nothing;

drop policy if exists "blog public read images" on storage.objects;
create policy "blog public read images" on storage.objects
  for select using (bucket_id = 'blog');
