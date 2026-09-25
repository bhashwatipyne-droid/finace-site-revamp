"use client";

import { useState } from "react";
import { problems } from "@/lib/content";
import styles from "./StartHere.module.css";

export default function StartHere() {
  const [open, setOpen] = useState(-1);

  return (
    <section id="start" data-reveal="" className={styles.section}>
      <div className="container">
        <p className={`eyebrow-cond ${styles.eyebrow}`}>Start Here</p>
        <h2 className={styles.title}>What are you actually trying to solve?</h2>
        <div className={styles.list}>
          {problems.map(([q, a], i) => {
            const on = open === i;
            return (
              <div key={q} className={`${styles.item} ${on ? styles.itemOn : ""}`}>
                <h3 className={styles.h3}>
                  <button
                    type="button"
                    id={`start-q-${i}`}
                    aria-expanded={on}
                    aria-controls={`start-a-${i}`}
                    className={styles.q}
                    onClick={() => setOpen(on ? -1 : i)}
                  >
                    {q}
                    <span className={styles.plus} aria-hidden="true">
                      +
                    </span>
                  </button>
                </h3>
                <div id={`start-a-${i}`} role="region" aria-labelledby={`start-q-${i}`} className={styles.a}>
                  <p>{a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
