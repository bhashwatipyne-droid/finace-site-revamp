import { heroRows, type Chip } from "@/lib/content";
import { heroOutputs } from "@/lib/heroOutputs";
import styles from "./Hero.module.css";

function ChipCard({ chip, large, hidden }: { chip: Chip; large?: boolean; hidden?: boolean }) {
  const cls = [styles.chip, large ? styles.chipLarge : "", chip.highlight ? styles.chipHl : ""].join(" ");
  return (
    <div className={cls} aria-hidden={hidden || undefined}>
      <span className={styles.chipIcon} aria-hidden="true">
        {chip.icon}
      </span>
      <span className={styles.chipText}>
        <span className={styles.chipTitle}>{chip.title}</span>
        <span className={styles.chipSub}>{chip.sub}</span>
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.dots} aria-hidden="true" />

      <div className={styles.head}>
        <h1 className={styles.title}>
          <span data-line="">
            <span>Finance is Complex,</span>
          </span>
          <span data-line="">
            <span className={styles.titleGreen} style={{ animationDelay: ".12s" }}>
              Marketing it Shouldn&apos;t be.
            </span>
          </span>
        </h1>
      </div>

      <div className={styles.stageWrap}>
        <div className={styles.stage}>
          <div className={styles.inPane} aria-hidden="true">
            <div className={styles.rows}>
              {heroRows.map((row, r) => (
                <div
                  key={r}
                  className={styles.row}
                  data-row={r}
                  style={{ paddingLeft: row.offset, animationDuration: `${row.duration}s` }}
                >
                  {Array.from({ length: 4 }).flatMap((_, rep) =>
                    row.chips.map((chip, i) => (
                      <ChipCard key={`${rep}-${i}`} chip={chip} large={row.large} hidden={rep > 0} />
                    )),
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.outPane}>
            <div className={styles.outTrack}>
              <div className={styles.outRow}>
                {[0, 1].flatMap((rep) =>
                  heroOutputs.map((o, i) => (
                    <div key={`${rep}-${i}`} className={styles.card} aria-hidden={rep > 0 || undefined}>
                      <div className={styles.thumb}>
                        <div dangerouslySetInnerHTML={{ __html: o.html }} />
                      </div>
                      <div className={styles.cardFoot}>
                        <span className={styles.cardTitle}>{o.title}</span>
                        <span className={styles.cardDot} />
                      </div>
                    </div>
                  )),
                )}
              </div>
            </div>
          </div>

          <div className={styles.seam} aria-hidden="true" />
          <div className={styles.pulse} aria-hidden="true" />
          <div className={styles.emblem} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/finace-icon-gradient.svg" alt="" width={52} height={52} />
          </div>
        </div>
      </div>

      <div className={styles.foot}>
        <p className={styles.lede}>
          We’re a <strong>BFSI-focused marketing agency</strong> combining domain expertise and creativity to build
          communications that drive impact.
        </p>
        <a href="#brief" data-magnetic="" className={`btn ${styles.cta}`}>
          Talk to Us About Your Brief →
        </a>
      </div>
    </section>
  );
}
