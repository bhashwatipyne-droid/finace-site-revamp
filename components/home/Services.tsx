import { services } from "@/lib/content";
import styles from "./Services.module.css";

export default function Services() {
  return (
    <section id="services" data-reveal="" className={styles.section}>
      <div className={`container ${styles.head}`}>
        <p className={`eyebrow ${styles.eyebrow}`}>What We Do</p>
        <h2 className={styles.title}>Our Services</h2>
      </div>

      <div className={styles.stack}>
        {services.map((s, i) => (
          <article key={s.title} className={`${styles.card} ${styles[s.tone]}`} style={{ zIndex: i + 1 }}>
            <h3 className={styles.cardTitle}>
              <span className={styles.idx}>0{i + 1}</span>
              {s.title}
            </h3>
            <div className={styles.body}>
              <div className={styles.lead}>
                <p className={styles.headline}>{s.headline}</p>
                <p className={styles.copy}>{s.copy}</p>
              </div>
              <ol className={styles.list}>
                <li className={styles.listLabel}>What we solve</li>
                {s.items.map((item, j) => (
                  <li key={item}>
                    <span className={styles.li}>0{j + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        ))}
        <article className={`${styles.card} ${styles.lime}`} style={{ zIndex: services.length + 1 }}>
          <h3 className={styles.closer}>
            <span className={styles.nowrap}>And if your requirement doesn&apos;t fit into any of these?</span>
            <br />
            Even better. <span className={styles.closerGreen}>Let&apos;s explore new avenues together.</span>
          </h3>
        </article>
      </div>
    </section>
  );
}
