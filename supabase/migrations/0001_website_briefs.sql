-- FinAce website: submissions from the "Build your one-line brief" form (Home and Contact).
-- Applied to the Supabase project as migrations "website_briefs" and
-- "website_briefs_restrict_authenticated".

create table if not exists public.website_briefs (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  need         text check (char_length(need) <= 60),
  audience     text check (char_length(audience) <= 60),
  timeline     text check (char_length(timeline) <= 60),
  name         text not null check (char_length(name) between 1 and 120),
  company      text check (char_length(company) <= 120),
  email        text not null check (char_length(email) <= 254),
  phone        text check (char_length(phone) <= 40),
  notes        text check (char_length(notes) <= 4000),
  source_page  text check (char_length(source_page) <= 40),
  user_agent   text check (char_length(user_agent) <= 300),
  status       text not null default 'new' check (status in ('new', 'contacted', 'won', 'lost', 'spam'))
);

create index if not exists website_briefs_created_at_idx on public.website_briefs (created_at desc);
create index if not exists website_briefs_email_created_idx on public.website_briefs (email, created_at desc);

-- Locked down: RLS on, no policies, and no direct table privileges for API roles.
alter table public.website_briefs enable row level security;
revoke all on table public.website_briefs from anon, authenticated;

-- The only way in: validates, throttles per email, and inserts one row. Cannot read or modify anything.
create or replace function public.submit_website_brief(
  p_name text,
  p_email text,
  p_need text default null,
  p_audience text default null,
  p_timeline text default null,
  p_company text default null,
  p_phone text default null,
  p_notes text default null,
  p_source_page text default null,
  p_user_agent text default null
) returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_name  text := left(btrim(coalesce(p_name, '')), 120);
  v_email text := lower(left(btrim(coalesce(p_email, '')), 254));
begin
  if v_name = '' then
    raise exception 'name_required' using errcode = '22023';
  end if;
  if v_email !~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$' then
    raise exception 'invalid_email' using errcode = '22023';
  end if;
  if (select count(*) from public.website_briefs b
        where b.email = v_email and b.created_at > now() - interval '1 hour') >= 5 then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;

  insert into public.website_briefs
    (need, audience, timeline, name, company, email, phone, notes, source_page, user_agent)
  values (
    nullif(left(btrim(p_need), 60), ''),
    nullif(left(btrim(p_audience), 60), ''),
    nullif(left(btrim(p_timeline), 60), ''),
    v_name,
    nullif(left(btrim(p_company), 120), ''),
    v_email,
    nullif(left(btrim(p_phone), 40), ''),
    nullif(left(btrim(p_notes), 4000), ''),
    nullif(left(btrim(p_source_page), 40), ''),
    nullif(left(btrim(p_user_agent), 300), '')
  );
end;
$$;

revoke all on function public.submit_website_brief(text, text, text, text, text, text, text, text, text, text) from public;
-- Only the website (anon/publishable key) needs to submit briefs; signed-in app users do not.
grant execute on function public.submit_website_brief(text, text, text, text, text, text, text, text, text, text) to anon, service_role;
comment on function public.submit_website_brief(text, text, text, text, text, text, text, text, text, text) is
  'FinAce website brief form. Intentionally callable by anon: validates, throttles 5/hour per email, insert-only into website_briefs.';
