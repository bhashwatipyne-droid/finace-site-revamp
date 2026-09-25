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

The "Build your one-line brief" form (Home and Contact) posts to `app/api/brief/route.ts`. The route validates the input and calls the database function `submit_website_brief`, which stores one row in `website_briefs`.

The table is locked: row-level security is on, it has no policies, and the API roles have no table privileges. The function is insert-only and limits each email address to 5 briefs an hour. So the site only needs the **publishable** key, never the service-role key.

- Schema: `supabase/migrations/0001_website_briefs.sql` (already applied to the FinAce Supabase project)
- Settings: `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`, in `.env.local` locally and in Vercel for deployments
- Viewing submissions: Supabase → **Table editor → website_briefs**. Use the `status` column (`new`, `contacted`, `won`, `lost`, `spam`) to track follow-up.

Until both settings exist, the form shows a "not connected yet" message and saves nothing.

## Structure

- `app/` routes, global styles and the API route
- `components/` shared header/footer/effects, plus `home/`, `about/` and `shared/` sections (CSS Modules)
- `lib/content.ts` all copy and data; `lib/heroOutputs.ts` the hero output-card mockups
- `public/` logos, team photos, brand marks and the bundled world-map data (`data/world-land.json`)

Motion follows the prototype and switches off for visitors who set "reduce motion".
