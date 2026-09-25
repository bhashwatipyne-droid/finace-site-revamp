import { NextResponse } from "next/server";
import { briefQuestions } from "@/lib/content";

// Stores "Build your one-line brief" submissions in Supabase (table: public.briefs).
// Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on the server. The key never
// reaches the browser; the table has row-level security on and no public policies.

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 120, company: 120, email: 254, phone: 40, notes: 4000, source: 40 } as const;

// Light per-instance rate limit: 5 submissions per IP per 10 minutes.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "The form data was unreadable." }, { status: 400 });
  }

  // Bots fill the hidden "website" field; accept silently and store nothing.
  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many submissions from your connection. Wait a few minutes." }, { status: 429 });
  }

  const pick = (key: (typeof briefQuestions)[number]["key"]) => {
    const q = briefQuestions.find((x) => x.key === key)!;
    const v = str(body[key], 60);
    return (q.options as readonly string[]).includes(v) ? v : null;
  };

  const row = {
    need: pick("need"),
    audience: pick("audience"),
    timeline: pick("timeline"),
    name: str(body.name, LIMITS.name),
    company: str(body.company, LIMITS.company) || null,
    email: str(body.email, LIMITS.email),
    phone: str(body.phone, LIMITS.phone) || null,
    notes: str(body.notes, LIMITS.notes) || null,
    source_page: str(body.source, LIMITS.source) || null,
    user_agent: (req.headers.get("user-agent") || "").slice(0, 300) || null,
  };

  if (!row.name) return NextResponse.json({ error: "Add your name." }, { status: 422 });
  if (!EMAIL_RE.test(row.email)) return NextResponse.json({ error: "That email address doesn't look right." }, { status: 422 });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("[brief] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set");
    return NextResponse.json({ error: "The form isn't connected yet." }, { status: 503 });
  }

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/briefs`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[brief] Supabase insert failed", res.status, await res.text());
      return NextResponse.json({ error: "We couldn't save your brief." }, { status: 502 });
    }
  } catch (err) {
    console.error("[brief] Supabase unreachable", err);
    return NextResponse.json({ error: "We couldn't save your brief." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
