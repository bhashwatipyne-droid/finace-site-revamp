"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

export type PageKey = "home" | "about" | "contact";

const NAV: { key: PageKey; label: string; href: string }[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "about", label: "About Us", href: "/about" },
  { key: "contact", label: "Contact", href: "/contact" },
];

type Props = {
  active: PageKey;
  cta: { label: string; href: string };
};

export default function Header({ active, cta }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" aria-label="FinAce home" className={styles.logo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/finace-logo.svg" alt="FinAce" width={112} height={34} />
        </Link>

        <nav aria-label="Main navigation" className={styles.nav}>
          {NAV.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              className={n.key === active ? styles.navActive : styles.navLink}
              aria-current={n.key === active ? "page" : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href={cta.href} data-magnetic="" className={`btn btn-green ${styles.cta}`}>
            {cta.label} <span className={styles.arrow}>↘</span>
          </a>
          <button
            type="button"
            className={styles.toggle}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span className={open ? styles.barTopOpen : undefined} />
            <span className={open ? styles.barMidOpen : undefined} />
            <span className={open ? styles.barBotOpen : undefined} />
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label="Mobile navigation" className={styles.mobileNav} hidden={!open}>
        {NAV.map((n) => (
          <Link
            key={n.key}
            href={n.href}
            onClick={() => setOpen(false)}
            className={n.key === active ? styles.mobileActive : undefined}
            aria-current={n.key === active ? "page" : undefined}
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
