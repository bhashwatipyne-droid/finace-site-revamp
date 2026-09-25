"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide motion, ported from the prototype's single animation loop:
 * - [data-reveal] / [data-stagger] fade up when 12% visible
 * - 3px gradient scroll-progress bar
 * - [data-magnetic] elements drift toward the pointer within 190px
 * - [data-chip][data-depth] elements parallax with the pointer
 */
export default function Effects() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);

  // Reveal on scroll. Re-scan on every route change (layout effect so a new
  // page never paints a frame with its on-screen sections hidden).
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("shown");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    const els = document.querySelectorAll("[data-reveal], [data-stagger]");
    els.forEach((el) => {
      // Anything already on screen shows at once so the first frame is complete.
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("shown");
      else io.observe(el);
    });
    root.classList.add("reveal-ready");
    return () => io.disconnect();
  }, [pathname]);

  // Pointer + scroll loop.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const magnets = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const chips = Array.from(document.querySelectorAll<HTMLElement>("[data-chip]"));

    let tx = -9999, ty = -9999, cx = -9999, cy = -9999;
    let mx = 0, my = 0, px = 0, py = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (cx === -9999) {
        cx = tx;
        cy = ty;
      }
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const loop = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;

      if (!reduce && finePointer) {
        cx += (tx - cx) * 0.16;
        cy += (ty - cy) * 0.16;
        px += (mx - px) * 0.06;
        py += (my - py) * 0.06;
        magnets.forEach((el) => {
          const r = el.getBoundingClientRect();
          const ex = r.left + r.width / 2;
          const ey = r.top + r.height / 2;
          const d = Math.hypot(cx - ex, cy - ey);
          const k = d < 190 ? 1 - d / 190 : 0;
          el.style.transform = `translate(${((cx - ex) * 0.16 * k).toFixed(1)}px,${((cy - ey) * 0.16 * k).toFixed(1)}px)`;
        });
        chips.forEach((el) => {
          const d = parseFloat(el.dataset.depth || "10");
          el.style.transform = `translate3d(${(px * d).toFixed(2)}px,${(py * d).toFixed(2)}px,0)`;
        });
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      magnets.forEach((el) => (el.style.transform = ""));
      chips.forEach((el) => (el.style.transform = ""));
    };
  }, [pathname]);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: 3,
        background: "var(--grad-num)",
        transform: "scaleX(0)",
        transformOrigin: "0 50%",
        zIndex: 120,
        pointerEvents: "none",
      }}
    />
  );
}
