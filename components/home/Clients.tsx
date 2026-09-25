import Image from "next/image";
import { clientRows, type Client } from "@/lib/content";
import styles from "./Clients.module.css";

function Card({ c, hidden }: { c: Client; hidden?: boolean }) {
  return (
    <article className={styles.card} title={c.name} aria-hidden={hidden || undefined}>
      <div className={styles.logo}>
        <Image src={`/clients/${c.logo}.png`} alt={hidden ? "" : `${c.name} logo`} fill sizes="240px" />
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
      <div className={`container ${styles.head}`}>
        <div>
          <p className={`eyebrow ${styles.eyebrow}`}>Clients &amp; Partners</p>
          <h2 className={styles.title}>
            Brands{" "}
            <span className={styles.tile} aria-hidden="true">
              ◆
            </span>{" "}
            we work with
          </h2>
        </div>
        <p className={styles.intro}>
          We work with brands across the <strong>financial ecosystem</strong>, understanding their products, audiences
          and the nuances that shape impactful communication.
        </p>
      </div>

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
