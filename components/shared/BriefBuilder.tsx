"use client";

import { useState, type FormEvent } from "react";
import { briefDefaults, briefQuestions, contact, type BriefKey } from "@/lib/content";
import styles from "./BriefBuilder.module.css";

type Status = { state: "idle" } | { state: "sending" } | { state: "sent"; name: string } | { state: "error"; message: string };

const FIELDS = [
  { name: "name", label: "Your Name", type: "text", placeholder: "Priya Sharma", autoComplete: "name", required: true },
  { name: "company", label: "Company", type: "text", placeholder: "Finpedia AMC", autoComplete: "organization", required: false },
  { name: "email", label: "Email", type: "email", placeholder: "priya@company.in", autoComplete: "email", required: true },
  { name: "phone", label: "Contact", type: "tel", placeholder: "+91 98200 00000", autoComplete: "tel", required: false },
] as const;

type Props = {
  variant: "home" | "contact";
  source: string;
};

export default function BriefBuilder({ variant, source }: Props) {
  const [choice, setChoice] = useState<Record<BriefKey, string>>(briefDefaults);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      ...choice,
      name: String(data.get("name") || "").trim(),
      company: String(data.get("company") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      notes: String(data.get("notes") || "").trim(),
      website: String(data.get("website") || ""), // honeypot
      source,
    };

    if (!payload.name || !payload.email) {
      setStatus({ state: "error", message: "Add your name and email so we know who to reply to." });
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "We couldn't send your brief.");
      setStatus({ state: "sent", name: payload.name.split(" ")[0] });
      form.reset();
    } catch (err) {
      setStatus({
        state: "error",
        message: `${err instanceof Error ? err.message : "We couldn't send your brief."} Please try again, or email ${contact.email}.`,
      });
    }
  }

  const sending = status.state === "sending";

  return (
    <section id="brief" data-reveal="" className={`${styles.section} ${styles[variant]}`} aria-labelledby="brief-title">
      <div className="container">
        <p className={`eyebrow-cond ${styles.eyebrow}`}>Let Us Know What You Need</p>
        <h2 id="brief-title" className={styles.title}>
          Build your one-line brief.
        </h2>

        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <div className={styles.questions}>
            {briefQuestions.map((q) => (
              <fieldset key={q.key} className={styles.fieldset}>
                <legend className={styles.qLabel}>{q.label}</legend>
                <div className={styles.options}>
                  {q.options.map((o) => {
                    const on = choice[q.key] === o;
                    return (
                      <button
                        key={o}
                        type="button"
                        className={on ? styles.optOn : styles.opt}
                        aria-pressed={on}
                        onClick={() => setChoice((c) => ({ ...c, [q.key]: o }))}
                      >
                        {o}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <div className={styles.details}>
            <div className={styles.grid}>
              {FIELDS.map((f) => (
                <label key={f.name} className={styles.field}>
                  <span className={styles.fLabel}>
                    {f.label}
                    {f.required && <span className="sr-only"> (required)</span>}
                  </span>
                  <input
                    id={`brief-${variant}-${f.name}`}
                    name={f.name}
                    type={f.type}
                    placeholder={f.placeholder}
                    autoComplete={f.autoComplete}
                    required={f.required}
                    maxLength={f.name === "email" ? 254 : 120}
                    className={styles.input}
                  />
                </label>
              ))}
              <label className={`${styles.field} ${styles.full}`}>
                <span className="sr-only">What are you trying to solve?</span>
                <textarea
                  id={`brief-${variant}-notes`}
                  name="notes"
                  rows={3}
                  maxLength={4000}
                  placeholder="Give us the context, the challenge, and what you're trying to achieve."
                  className={`${styles.input} ${styles.textarea}`}
                />
              </label>
              {/* Honeypot: hidden from people, tempting to bots. */}
              <label className={styles.hp} aria-hidden="true">
                Website
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>

              <div className={`${styles.full} ${styles.actions}`}>
                <p className={styles.alt}>
                  Prefer a quick conversation? Call us at <a href={contact.phoneHref}>{contact.phoneDisplay}</a> or write
                  to <a href={`mailto:${contact.email}`}>{contact.email}</a>.
                </p>
                <button type="submit" data-magnetic="" className={`btn btn-green ${styles.submit}`} disabled={sending}>
                  {sending ? "Sending…" : "Take it from here →"}
                </button>
              </div>

              <div className={styles.full} aria-live="polite">
                {status.state === "sent" && (
                  <p className={styles.ok}>
                    Thanks, {status.name}. Your brief for {choice.need.toLowerCase()} is with us, and we’ll get back to you
                    shortly.
                  </p>
                )}
                {status.state === "error" && <p className={styles.err}>{status.message}</p>}
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
