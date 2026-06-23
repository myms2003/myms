-- WorkIn Supabase schema draft
-- Run in Supabase SQL editor after creating your project.
-- Replace policies with stricter email checks once Martin and Mateo accounts are created.

create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  handle text unique not null check (handle in ('martin', 'mateo')),
  role_title text not null,
  strengths text[] not null default '{}',
  avatar_initials text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create type task_status as enum ('due', 'in_progress', 'blocked', 'done', 'archived');
create type task_priority as enum ('low', 'medium', 'high', 'urgent');
create type task_area as enum ('research', 'builder', 'marketing', 'outreach', 'finance', 'strategy', 'operations');

create table if not exists public.tasks (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  status task_status not null default 'due',
  priority task_priority not null default 'medium',
  area task_area not null default 'operations',
  owner_id uuid references public.profiles(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  source_idea_id uuid,
  acceptance_criteria text,
  due_date date,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.task_comments (
  id uuid primary key default uuid_generate_v4(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create type idea_status as enum ('new', 'analyzing', 'analyzed', 'tasks_created', 'distributed', 'archived');
create type idea_category as enum ('product', 'marketing', 'sales', 'research', 'finance', 'operations', 'content', 'other');

create table if not exists public.ideas (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  status idea_status not null default 'new',
  category idea_category not null default 'other',
  priority task_priority not null default 'medium',
  created_by uuid references public.profiles(id) on delete set null,
  analysis_result jsonb,
  task_creator_result jsonb,
  distributor_result jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.tasks
  add constraint tasks_source_idea_fk foreign key (source_idea_id) references public.ideas(id) on delete set null;

create table if not exists public.idea_comments (
  id uuid primary key default uuid_generate_v4(),
  idea_id uuid not null references public.ideas(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create type suggested_pack as enum ('Presencia Pro', 'Turnos Pro', 'Ventas Pro', 'Local Pro', 'Combination', 'No fit yet');
create type outreach_status as enum ('not_contacted', 'contacted', 'replied', 'meeting', 'proposal_sent', 'won', 'lost');
create type outreach_channel as enum ('Instagram', 'WhatsApp', 'Google Maps', 'Email', 'Referral', 'Other');

create table if not exists public.prospects (
  id uuid primary key default uuid_generate_v4(),
  business_name text not null,
  industry text not null,
  location text,
  instagram_url text,
  google_maps_url text,
  website_url text,
  has_verified_google_profile boolean default false,
  google_reviews_count integer,
  instagram_followers integer,
  digital_presence_notes text,
  pain_detected text,
  suggested_pack suggested_pack not null default 'No fit yet',
  fit_score integer check (fit_score between 1 and 10),
  priority task_priority not null default 'medium',
  outreach_status outreach_status not null default 'not_contacted',
  outreach_channel outreach_channel,
  assigned_to uuid references public.profiles(id) on delete set null,
  next_step text,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.outreach_templates (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  industry text not null,
  suggested_pack suggested_pack,
  message text not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create type agent_name as enum ('idea_analyzer', 'task_creator', 'task_distributor');
create type agent_status as enum ('queued', 'running', 'succeeded', 'failed');

create table if not exists public.agent_runs (
  id uuid primary key default uuid_generate_v4(),
  agent_name agent_name not null,
  status agent_status not null default 'queued',
  input_type text not null,
  input_id uuid not null,
  input_payload jsonb,
  output_payload jsonb,
  error_message text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.activity_log (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references public.profiles(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- Basic RLS. Tighten with explicit email checks after both users are created.
alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.task_comments enable row level security;
alter table public.ideas enable row level security;
alter table public.idea_comments enable row level security;
alter table public.prospects enable row level security;
alter table public.outreach_templates enable row level security;
alter table public.agent_runs enable row level security;
alter table public.activity_log enable row level security;

create policy "authenticated read profiles" on public.profiles for select to authenticated using (true);
create policy "authenticated manage profiles own" on public.profiles for all to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create policy "authenticated read tasks" on public.tasks for select to authenticated using (true);
create policy "authenticated manage tasks" on public.tasks for all to authenticated using (true) with check (true);

create policy "authenticated read task comments" on public.task_comments for select to authenticated using (true);
create policy "authenticated manage task comments" on public.task_comments for all to authenticated using (true) with check (true);

create policy "authenticated read ideas" on public.ideas for select to authenticated using (true);
create policy "authenticated manage ideas" on public.ideas for all to authenticated using (true) with check (true);

create policy "authenticated read idea comments" on public.idea_comments for select to authenticated using (true);
create policy "authenticated manage idea comments" on public.idea_comments for all to authenticated using (true) with check (true);

create policy "authenticated read prospects" on public.prospects for select to authenticated using (true);
create policy "authenticated manage prospects" on public.prospects for all to authenticated using (true) with check (true);

create policy "authenticated read templates" on public.outreach_templates for select to authenticated using (true);
create policy "authenticated manage templates" on public.outreach_templates for all to authenticated using (true) with check (true);

create policy "authenticated read agent runs" on public.agent_runs for select to authenticated using (true);
create policy "authenticated manage agent runs" on public.agent_runs for all to authenticated using (true) with check (true);

create policy "authenticated read activity" on public.activity_log for select to authenticated using (true);
create policy "authenticated manage activity" on public.activity_log for all to authenticated using (true) with check (true);
