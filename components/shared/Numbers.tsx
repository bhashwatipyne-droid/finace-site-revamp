import styles from "./Numbers.module.css";

type Props = {
  stats: { value: string; label: string }[];
  variant: "home" | "about";
};

export default function Numbers({ stats, variant }: Props) {
  return (
    <section id={variant === "home" ? "numbers" : undefined} data-reveal="" className={`${styles.band} ${styles[variant]}`}>
      <div className="container">
        {variant === "home" && <p className={`eyebrow ${styles.eyebrow}`}>Our Numbers</p>}
        <div className={styles.grid} data-count={stats.length}>
          {stats.map((s) => (
            <div key={s.label} className={styles.cell}>
              <span className={styles.value}>{s.value}</span>
              <span className={styles.label}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
