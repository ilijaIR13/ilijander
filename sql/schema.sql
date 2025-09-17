
-- Run this in Supabase SQL editor

create table if not exists app_users (
  user_id uuid primary key,
  role text check (role in ('admin','reader')) not null
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  tags text[] default '{}',
  difficulty text check (difficulty in ('easy','medium','hard')) default 'easy',
  statement_md text not null,
  solution_md text not null,
  code_language text default 'cpp',
  code_source text not null,
  tests jsonb default '[]'::jsonb,
  created_by uuid generated always as (auth.uid()) stored,
  created_at timestamptz default now()
);

alter table app_users enable row level security;
alter table tasks enable row level security;

create policy "readers_and_admins_can_select" on tasks
for select using (
  exists (select 1 from app_users au where au.user_id = auth.uid() and au.role in ('admin','reader'))
);

create policy "only_admin_insert" on tasks
for insert with check (
  exists (select 1 from app_users au where au.user_id = auth.uid() and au.role = 'admin')
);

create policy "only_admin_update" on tasks
for update using (
  exists (select 1 from app_users au where au.user_id = auth.uid() and au.role = 'admin')
);

create policy "only_admin_delete" on tasks
for delete using (
  exists (select 1 from app_users au where au.user_id = auth.uid() and au.role = 'admin')
);
