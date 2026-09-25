import Link from "next/link";
import styles from "./CtaBand.module.css";

export default function CtaBand() {
  return (
    <section data-reveal="" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Ready to Ace your next communication?</h2>
        <div className={styles.actions}>
          <Link href="/contact" data-magnetic="" className={`btn ${styles.btn}`}>
            Get started here →
          </Link>
        </div>
      </div>
    </section>
  );
}
