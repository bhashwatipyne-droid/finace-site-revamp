import { testimonials } from "@/lib/content";
import styles from "./Testimonials.module.css";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

export default function Testimonials() {
  return (
    <section id="testimonials" data-reveal="" className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <p className={`eyebrow ${styles.eyebrow}`}>Testimonials</p>
          <h2 className={styles.title}>What our partners say.</h2>
        </div>
        <div className={styles.grid}>
          {testimonials.map((t) => (
            <figure key={t.name} className={styles.card}>
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
                <a href={t.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${t.name} on LinkedIn`} className={styles.li}>
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.12 1.43-2.12 2.9V21H9z"
                    />
                  </svg>
                  LinkedIn
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
