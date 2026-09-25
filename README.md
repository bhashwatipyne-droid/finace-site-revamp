# FinAce website

Next.js (App Router) build of the FinAce marketing site, reconstructed from the approved Claude Design prototype.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the Supabase values
npm run dev                  # http://localhost:3000
```

`npm run build && npm start` runs the production build. `npm run typecheck` checks types.

## Pages

| Route      | Contents |
| ---------- | -------- |
| `/`        | Hero conveyor, numbers, client marquee, "How we work" roadmap, services, testimonials, brief builder, "Start here" |
| `/about`   | World-reach map, numbers, story timeline, team, hiring, closing CTA |
| `/contact` | Brief builder |

## Brief form → Supabase

The "Build your one-line brief" form (Home and Contact) posts to `app/api/brief/route.ts`, which validates the input and inserts a row into the `briefs` table in Supabase with the server-only service-role key.

1. Create a Supabase project.
2. In the SQL editor, run `supabase/migrations/0001_briefs.sql`.
3. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` and in your hosting provider's environment settings.

Submissions then appear under **Table editor → briefs**. The table has row-level security on and no public policies, so the public anon key can't read or write it. Until the variables are set, the form shows a "not connected yet" message and saves nothing.

## Structure

- `app/` routes, global styles and the API route
- `components/` shared header/footer/effects, plus `home/`, `about/` and `shared/` sections (CSS Modules)
- `lib/content.ts` all copy and data; `lib/heroOutputs.ts` the hero output-card mockups
- `public/` logos, team photos, brand marks and the bundled world-map data (`data/world-land.json`)

Motion follows the prototype and switches off for visitors who set "reduce motion".
