import { testimonials, type Testimonial } from "@/lib/content";
import styles from "./Testimonials.module.css";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

function Card({ t, hidden }: { t: Testimonial; hidden?: boolean }) {
  return (
    <figure className={styles.card} aria-hidden={hidden || undefined}>
      <span aria-hidden="true" className={styles.mark}>
        “
      </span>
      <blockquote className={styles.quote}>
        <p className={styles.pull}>{t.quote}</p>
        <p className={styles.detail}>{t.detail}</p>
      </blockquote>
      <figcaption className={styles.cap}>
        <span className={styles.who}>
          <span className={styles.avatar} aria-hidden="true">
            {initials(t.name)}
          </span>
          <span className={styles.whoText}>
            <span className={styles.name}>{t.name}</span>
            <span className={styles.role}>{t.role}</span>
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" data-reveal="" className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <p className={`eyebrow ${styles.eyebrow}`}>Testimonials</p>
          <h2 className={styles.title}>What our clients say.</h2>
        </div>
      </div>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {[0, 1].flatMap((rep) => testimonials.map((t) => <Card key={`${rep}-${t.name}`} t={t} hidden={rep > 0} />))}
        </div>
      </div>
    </section>
  );
}
