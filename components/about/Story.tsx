"use client";

import { useEffect, useRef, useState } from "react";
import { timeline } from "@/lib/content";
import styles from "./Story.module.css";

export default function Story() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (paused.current || document.hidden) return;
      setActive((a) => (a + 1) % timeline.length);
    }, 4600);
    return () => window.clearInterval(id);
  }, []);

  const select = (i: number) => {
    paused.current = true;
    setActive(i);
  };

  return (
    <section id="journey" data-reveal="" className={styles.section}>
      <div className={styles.grid}>
        <div>
          <p className={`eyebrow-cond ${styles.eyebrow}`}>The FinAce story</p>
          <h2 className={styles.title}>From understanding finance to shaping communication.</h2>
          <p className={styles.sub}>Your BFSI marketing partner, from strategy to execution.</p>
          <div className={styles.body}>
            <p>
              Our journey began with a simple thought: to make financial communication easier to understand, more
              engaging and more effective.
            </p>
            <p>
              Over the past decade, we’ve grown into a marketing and communication partner for our clients that goes
              beyond the brief, bringing together financial expertise, strategic thinking and creativity to deliver
              communication that’s impactful.
            </p>
            <p>
              For us, clients are God, team is family, and vendors are partners. And Quality, Timelines, Clear
              communication, and Client delight guide everything we do.
            </p>
            <p>
              And as we continue to grow, our ambition remains simple: to ace financial marketing by creating
              communication that helps people make better financial decisions.
            </p>
          </div>
        </div>

        <ol className={styles.timeline} onMouseLeave={() => (paused.current = false)}>
          {timeline.map(([label, title, copy], i) => {
            const on = active === i;
            return (
              <li key={label} className={on ? styles.itemOn : styles.item}>
                <button
                  type="button"
                  className={styles.itemBtn}
                  aria-expanded={on}
                  onMouseEnter={() => select(i)}
                  onFocus={() => select(i)}
                  onClick={() => select(i)}
                >
                  <span className={styles.rail} aria-hidden="true" />
                  <span className={styles.label}>{label}</span>
                  <span className={styles.itemTitle}>{title}</span>
                  <span className={styles.copy}>
                    <span>{copy}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
