import Image from "next/image";
import Link from "next/link";
import { team } from "@/lib/content";
import styles from "./Team.module.css";

function Seat() {
  return (
    <div className={styles.seat}>
      <div className={styles.seatDots} aria-hidden="true" />
      <div className={styles.seatInner}>
        <div className={styles.seatBadge}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/finace-icon.svg" alt="" width={46} height={46} />
        </div>
        <span className={styles.seatText}>Your seat is here</span>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section data-reveal="" className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <p className={`eyebrow-cond ${styles.eyebrow}`}>Our Team</p>
          <h2 className={styles.title}>Faces behind FinAce</h2>
          <p className={styles.intro}>A hands-on team that dives into the details and gets things done the right way.</p>
        </div>

        <div className={styles.grid} data-stagger="">
          {team.map((m) => (
            <article key={m.name} className={styles.card}>
              <div className={styles.photo}>
                <Image src={m.photo} alt={`${m.name}, ${m.role}`} fill sizes="(max-width: 767px) 90vw, 560px" />
              </div>
              <div>
                <h3 className={styles.name}>{m.name}</h3>
                <span className={styles.role}>{m.role}</span>
              </div>
              <p className={styles.bio}>{m.bio}</p>
              <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>
                LinkedIn →
              </a>
            </article>
          ))}
        </div>

        <article className={styles.join}>
          <Seat />
          <div className={styles.joinBody}>
            <div>
              <h3 className={styles.joinTitle}>Join FinAce</h3>
              <span className={styles.role}>We’re Hiring</span>
            </div>
            <p className={styles.joinCopy}>
              If you&apos;re passionate about finance, content or product, there’s a seat for you on our team of domain
              experts and creative minds.
            </p>
            <Link href="/contact" className={`btn btn-black ${styles.joinBtn}`}>
              Join us →
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
