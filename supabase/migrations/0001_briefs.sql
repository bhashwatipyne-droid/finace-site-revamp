-- Submissions from the "Build your one-line brief" form (Home and Contact pages).
create table if not exists public.briefs (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  need         text,
  audience     text,
  timeline     text,
  name         text not null check (char_length(name) between 1 and 120),
  company      text check (char_length(company) <= 120),
  email        text not null check (char_length(email) <= 254),
  phone        text check (char_length(phone) <= 40),
  notes        text check (char_length(notes) <= 4000),
  source_page  text,
  user_agent   text,
  status       text not null default 'new' check (status in ('new', 'contacted', 'won', 'lost', 'spam'))
);

create index if not exists briefs_created_at_idx on public.briefs (created_at desc);

-- Row-level security on, with no policies: the public anon key can neither read
-- nor write. The website's server route writes with the service-role key.
alter table public.briefs enable row level security;
