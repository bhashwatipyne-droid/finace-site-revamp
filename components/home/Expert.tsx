import { expertCards } from "@/lib/content";
import styles from "./Expert.module.css";

// Inline, since each badge icon is a fixed little line drawing.
const ICONS = [
  <>
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </>,
  <>
    <path d="M12 2l2.4 1.8 3-.2.9 2.9 2.5 1.7-1 2.8 1 2.8-2.5 1.7-.9 2.9-3-.2L12 22l-2.4-1.8-3 .2-.9-2.9-2.5-1.7 1-2.8-1-2.8 2.5-1.7.9-2.9 3 .2z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </>,
  <>
    <circle cx="12" cy="12" r="2.6" />
    <circle cx="4.5" cy="6" r="2" />
    <circle cx="19.5" cy="6" r="2" />
    <circle cx="4.5" cy="18" r="2" />
    <circle cx="19.5" cy="18" r="2" />
    <path d="M6.2 7.2l3.6 3M17.8 7.2l-3.6 3M6.2 16.8l3.6-3M17.8 16.8l-3.6-3" />
  </>,
];

export default function Expert() {
  return (
    <section id="expert" data-reveal="" className={styles.section} aria-labelledby="expert-title">
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />
      <div className={styles.sweep} aria-hidden="true" />

      <div className="container">
        <div className={styles.head}>
          <h2 id="expert-title" className={styles.title}>
            So you need{" "}
            <span className={styles.word}>
              <span aria-hidden="true" className={styles.ghost}>
                FINANCE
              </span>
              <span className={styles.real}>
                <span className={styles.grad}>FINA</span>
                <span aria-hidden="true" className={`${styles.grad} ${styles.n}`}>
                  N
                </span>
                <span className={styles.grad}>CE</span>
                <span aria-hidden="true" className={styles.comma}>
                  ,
                </span>
              </span>
            </span>{" "}
            domain expert for
            <br />
            communications that
          </h2>
        </div>

        <div className={styles.cards}>
          {expertCards.map((c, i) => (
            <article key={c.num} className={styles.card}>
              <span className={styles.cardGlow} aria-hidden="true" />
              <span className={styles.badge}>
                <span className={styles.ring} aria-hidden="true" />
                <span className={styles.disc}>
                  <svg
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {ICONS[i]}
                  </svg>
                </span>
              </span>
              <span className={styles.num}>{c.num}</span>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p className={styles.cardCopy}>{c.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
