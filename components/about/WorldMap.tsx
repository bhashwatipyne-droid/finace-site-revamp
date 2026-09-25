"use client";

import { useEffect, useRef } from "react";
import { geoEquirectangular, geoPath, type GeoPermissibleObjects } from "d3-geo";
import styles from "./WorldMap.module.css";

type City = { name: string; sub: string; ll: [number, number]; below: boolean; dx?: number };

const HUB: City = { name: "India", sub: "Mumbai HQ", ll: [72.877, 19.076], below: true, dx: -26 };
const SPOKES: City[] = [
  { name: "Dubai", sub: "UAE", ll: [55.271, 25.205], below: false, dx: -34 },
  { name: "Singapore", sub: "Singapore", ll: [103.82, 1.352], below: true, dx: 48 },
  { name: "Canada", sub: "Toronto", ll: [-79.383, 43.653], below: false },
  { name: "USA", sub: "New York", ll: [-74.006, 40.713], below: true, dx: 10 },
];
// Frame of the map: the Americas to East Asia, Arctic edge to southern Africa.
const FRAME = {
  type: "Polygon",
  coordinates: [[[-130, 66], [140, 66], [140, -36], [-130, -36], [-130, 66]]],
} as GeoPermissibleObjects;

const SVG_NS = "http://www.w3.org/2000/svg";
function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>, parent: Element) {
  const n = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, String(v));
  parent.appendChild(n);
  return n;
}

// Dotted world map with arcs from Mumbai HQ, ported from the prototype's
// world-reach-map (d3). Land data ships with the site (public/data), with
// the Survey-of-India-aligned outline for India.
export default function WorldMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    if (!wrap || !svg) return;
    let land: GeoPermissibleObjects | null = null;
    let cancelled = false;
    let timer = 0;

    const draw = () => {
      if (!land) return;
      const W = wrap.clientWidth;
      const H = wrap.clientHeight;
      if (!W || !H) return;
      svg.replaceChildren();
      wrap.querySelectorAll(`.${styles.label}`).forEach((n) => n.remove());
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

      const proj = geoEquirectangular().fitExtent(
        [
          [0, 0],
          [W, H],
        ],
        FRAME,
      );

      // Rasterise land once, then sample it on a grid to place the dots.
      const cv = document.createElement("canvas");
      cv.width = W;
      cv.height = H;
      const cx = cv.getContext("2d", { willReadFrequently: true });
      if (!cx) return;
      const gp = geoPath(proj, cx);
      cx.fillStyle = "#fff";
      cx.beginPath();
      gp(land);
      cx.fill();
      const px = cx.getImageData(0, 0, W, H).data;
      const step = Math.max(5, Math.round(W / 110));

      const defs = el("defs", {}, svg);
      const lg = el("linearGradient", { id: "arcGrad", gradientUnits: "userSpaceOnUse" }, defs);
      el("stop", { offset: 0, "stop-color": "#4F8216", "stop-opacity": 0.95 }, lg);
      el("stop", { offset: 1, "stop-color": "#9EC44D", "stop-opacity": 0.8 }, lg);
      const glow = el("filter", { id: "glow", x: "-200%", y: "-200%", width: "500%", height: "500%" }, defs);
      el("feGaussianBlur", { stdDeviation: 4 }, glow);

      const dots = el("g", { fill: "#6FA82E", opacity: 0.62 }, svg);
      for (let x = step / 2; x < W; x += step) {
        for (let y = step / 2; y < H; y += step) {
          if (px[((y | 0) * W + (x | 0)) * 4 + 3] > 0) el("circle", { cx: x, cy: y, r: step * 0.2 }, dots);
        }
      }

      const hub = proj(HUB.ll)!;
      [HUB, ...SPOKES].forEach((c) => {
        const p = proj(c.ll)!;
        el("circle", { cx: p[0], cy: p[1], r: 18, fill: "#9EC44D", opacity: 0.35, filter: "url(#glow)" }, svg);
      });

      const arcs = el("g", {}, svg);
      SPOKES.forEach((s, i) => {
        const p = proj(s.ll)!;
        const mx = (hub[0] + p[0]) / 2;
        const my = (hub[1] + p[1]) / 2;
        const dist = Math.hypot(p[0] - hub[0], p[1] - hub[1]);
        const lift = Math.min(H * 0.42, dist * 0.38);
        const d = `M${hub[0]},${hub[1]} Q${mx},${my - lift} ${p[0]},${p[1]}`;
        el("path", { class: styles.arc, d }, arcs);
        const flow = el("path", { class: styles.flow, d }, arcs);
        flow.style.animationDelay = `${i * 0.8}s`;
      });

      const pins = el("g", {}, svg);
      [HUB, ...SPOKES].forEach((c, i) => {
        const p = proj(c.ll)!;
        const big = c === HUB;
        const g = el("g", { transform: `translate(${p[0]},${p[1]})` }, pins);
        const halo = el("circle", { class: styles.halo, r: big ? 9 : 7, fill: "#9EC44D" }, g);
        halo.style.animationDelay = `${i * 0.5}s`;
        el("circle", { r: big ? 6 : 4.8, fill: "#4F8216", stroke: "#ffffff", "stroke-width": 2 }, g);

        const l = document.createElement("div");
        l.className = `${styles.label} ${c.below ? styles.below : ""}`;
        l.style.left = `${p[0] + (c.dx || 0)}px`;
        l.style.top = `${p[1]}px`;
        const b = document.createElement("b");
        b.textContent = c.name;
        l.appendChild(b);
        if (!(c.below && !big)) {
          const s = document.createElement("span");
          s.textContent = c.sub;
          l.appendChild(s);
        }
        wrap.appendChild(l);
      });
    };

    fetch("/data/world-land.json")
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        land = json;
        draw();
      })
      .catch(() => {});

    const ro = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(draw, 140);
    });
    ro.observe(wrap);
    return () => {
      cancelled = true;
      ro.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={styles.wrap}
      role="img"
      aria-label="Map of FinAce's reach: Mumbai HQ in India, with clients in Dubai, Singapore, Canada and the USA"
    >
      <svg ref={svgRef} className={styles.svg} aria-hidden="true" />
    </div>
  );
}
