import Link from "next/link";
import { social } from "@/lib/content";
import type { PageKey } from "./Header";
import styles from "./Footer.module.css";

const NAV: { key: PageKey; label: string; href: string }[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "about", label: "About Us", href: "/about" },
  { key: "contact", label: "Contact", href: "/contact" },
];

export default function Footer({ active }: { active: PageKey }) {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div>
            <Link href="/" className={styles.logo} aria-label="FinAce home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/finace-logo-white.svg" alt="FinAce" width={132} height={40} />
            </Link>
            <p className={styles.tag}>
              <strong>Tell us what you’re looking to achieve.</strong>
              Let’s create communication that makes an impact.
            </p>
            <div className={styles.social}>
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="FinAce on Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.55V4.47A20.6 20.6 0 0 0 14.3 4.3c-2.2 0-3.7 1.34-3.7 3.8v2.4H8.1v3h2.5V21z"
                  />
                </svg>
              </a>
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="FinAce on LinkedIn">
                <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.12 1.43-2.12 2.9V21H9z"
                  />
                </svg>
              </a>
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="FinAce on Instagram">
                <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 3.6c2.7 0 3 0 4.1.1 1 .05 1.5.2 1.9.35.5.2.8.4 1.2.8.35.35.6.7.8 1.2.15.35.3.9.35 1.9.05 1.05.06 1.4.06 4.05s0 3-.06 4.05c-.05 1-.2 1.55-.35 1.9-.2.5-.45.85-.8 1.2-.35.35-.7.6-1.2.8-.35.15-.9.3-1.9.35-1.05.05-1.4.06-4.1.06s-3 0-4.05-.06c-1-.05-1.55-.2-1.9-.35-.5-.2-.85-.45-1.2-.8-.35-.35-.6-.7-.8-1.2-.15-.35-.3-.9-.35-1.9C3.61 15 3.6 14.65 3.6 12s0-3 .06-4.05c.05-1 .2-1.55.35-1.9.2-.5.45-.85.8-1.2.35-.35.7-.6 1.2-.8.35-.15.9-.3 1.9-.35C9 3.61 9.35 3.6 12 3.6zM12 2c-2.7 0-3.05 0-4.1.06-1.07.05-1.8.22-2.43.46-.66.26-1.22.6-1.78 1.16-.56.56-.9 1.12-1.16 1.78-.24.64-.41 1.36-.46 2.43C2 8.95 2 9.3 2 12s0 3.05.06 4.1c.05 1.07.22 1.8.46 2.43.26.66.6 1.22 1.16 1.78.56.56 1.12.9 1.78 1.16.64.24 1.36.41 2.43.46C8.95 22 9.3 22 12 22s3.05 0 4.1-.06c1.07-.05 1.8-.22 2.43-.46a4.9 4.9 0 0 0 1.78-1.16c.56-.56.9-1.12 1.16-1.78.24-.64.41-1.36.46-2.43.05-1.05.06-1.4.06-4.1s0-3.05-.06-4.1c-.05-1.07-.22-1.8-.46-2.43a4.9 4.9 0 0 0-1.16-1.78A4.9 4.9 0 0 0 18.53 2.5c-.64-.24-1.36-.41-2.43-.46C15.05 2 14.7 2 12 2z"
                  />
                </svg>
              </a>
            </div>
          </div>
          <nav aria-label="Footer navigation" className={styles.nav}>
            {NAV.map((n) => (
              <Link key={n.key} href={n.href} className={n.key === active ? styles.navActive : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.bottom}>
          <p>Mutual Funds · Insurance · Banks · Distributors</p>
          <p>© {new Date().getFullYear()} FinAce</p>
        </div>
      </div>
    </footer>
  );
}
