import WorldMap from "./WorldMap";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <section className={styles.section}>
      <div data-chip="" data-depth="16" className={styles.circleA} aria-hidden="true" />
      <div data-chip="" data-depth="-12" className={styles.circleB} aria-hidden="true" />
      <div className={styles.grid}>
        <div className={styles.copy}>
          <span className={styles.tag}>
            <span className={styles.tagDot} aria-hidden="true" />
            Est. 2016
          </span>
          <h1 className={styles.title}>
            <span data-line="">
              <span>We make</span>
            </span>
            <span data-line="">
              <span className={styles.gradText} style={{ animationDelay: ".1s" }}>
                boring finance
              </span>
            </span>
            <span data-line="">
              <span style={{ animationDelay: ".2s" }}>interesting.</span>
            </span>
          </h1>
          <p className={styles.lede}>
            We’re a team of finance experts and creative geeks, passionate about creating simple, effective communication
            to help people make the right financial decisions.
          </p>
          <div>
            <a href="#journey" data-magnetic="" className={`btn btn-black ${styles.cta}`}>
              Read our story →
            </a>
          </div>
        </div>
        <figure className={styles.map}>
          <WorldMap />
        </figure>
      </div>
    </section>
  );
}
