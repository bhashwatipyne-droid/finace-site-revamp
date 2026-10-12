import Image from "next/image";
import { clientRows, type Client } from "@/lib/content";
import styles from "./Clients.module.css";

function Card({ c, hidden }: { c: Client; hidden?: boolean }) {
  return (
    <article className={styles.card} title={c.name} aria-hidden={hidden || undefined}>
      <div className={styles.logo}>
        {/* Logos are pre-sized for 2x screens; skipping the optimizer avoids a second lossy pass that blurs them. */}
        <Image src={`/clients/${c.logo}.webp`} alt={hidden ? "" : `${c.name} logo`} fill sizes="240px" unoptimized />
      </div>
      <div className={styles.meta}>
        <span className={styles.name}>{c.name}</span>
        <span className={styles.cat}>{c.category}</span>
      </div>
    </article>
  );
}

export default function Clients() {
  return (
    <section id="clients" data-reveal="" className={styles.section}>
      <h2 className={`container ${styles.title}`}>Trusted by 70+ brands across the financial ecosystem.</h2>

      <div className={styles.marquee}>
        {clientRows.map((row, r) => (
          <div key={r} className={`${styles.track} ${r === 1 ? styles.reverse : ""}`}>
            {[0, 1].flatMap((rep) => row.map((c) => <Card key={`${rep}-${c.logo}`} c={c} hidden={rep > 0} />))}
          </div>
        ))}
      </div>

      <div className={`container ${styles.foot}`}>
        <a href="#brief" className={styles.link}>
          Start a conversation →
        </a>
      </div>
    </section>
  );
}
