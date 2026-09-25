"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { workSteps } from "@/lib/content";
import styles from "./Work.module.css";

const STEP_MS = 4600;
// Below this width the roadmap runs top-to-bottom so labels never collide.
const VERTICAL_BELOW = 900;

type Pt = { x: number; y: number };

// Five stops rising left→right, gently wavy like a roadmap (from the prototype).
const STOPS = [0.09, 0.29, 0.475, 0.665, 0.87];
const LEVELS = [0.74, 0.66, 0.56, 0.46, 0.33];

function curve(k: number, stops: number[], levels: number[], wave: [number, number]) {
  if (k <= stops[0]) return levels[0];
  if (k >= stops[4]) return levels[4];
  let i = 0;
  while (i < 4 && k > stops[i + 1]) i++;
  const t = (k - stops[i]) / (stops[i + 1] - stops[i]);
  const e = t * t * (3 - 2 * t);
  const mid = Math.sin(t * Math.PI) * (i % 2 ? wave[0] : wave[1]);
  return levels[i] + (levels[i + 1] - levels[i]) * e + mid;
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const userPaused = useRef(false);
  const stepRef = useRef(0);
  const hoverRef = useRef(-1);
  stepRef.current = step;

  // Auto walkthrough.
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setStep((s) => (s + 1) % workSteps.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [playing]);

  const select = useCallback((i: number) => {
    setStep(i);
    setPlaying(false);
  }, []);
  const resume = useCallback(() => {
    if (!userPaused.current) setPlaying(true);
  }, []);
  const toggle = () => {
    userPaused.current = playing;
    setPlaying((p) => !p);
  };

  // Canvas renderer.
  useEffect(() => {
    const section = sectionRef.current;
    const cv = canvasRef.current;
    if (!section || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const stars = Array.from({ length: 46 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.7 + Math.random() * 1.4,
      p: Math.random() * 6.28,
    }));

    let W = 0;
    let H = 0;
    let vertical = false;
    let stageTop = 0;
    let stageH = 0;
    let visible = true;
    let raf = 0;
    let labelKey = "";
    const nodes: Pt[] = [];
    // The grid and the glowing curve never move, and their blurred glow is by far
    // the most expensive thing to paint, so they're rendered once per resize into
    // this layer and copied onto the canvas each frame.
    const layer = document.createElement("canvas");
    const lctx = layer.getContext("2d");

    const pathPt = (k: number): Pt => {
      if (!vertical) return { x: k * W, y: curve(k, STOPS, LEVELS, [-0.022, 0.026]) * H };
      // Vertical roadmap: runs down the stage, drifting gently left/right.
      const xs = [0.14, 0.22, 0.12, 0.2, 0.13];
      const y = stageTop + k * stageH;
      return { x: curve(k, STOPS, xs, [0.02, -0.02]) * W, y };
    };

    const paintLayer = () => {
      if (!lctx) return;
      layer.width = cv.width;
      layer.height = cv.height;
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lctx.clearRect(0, 0, W, H);

      // perspective grid floor
      const hz = H * 0.3;
      lctx.lineWidth = 1;
      for (let i = -14; i <= 14; i++) {
        const gx = W / 2 + i * (W / 12);
        lctx.beginPath();
        lctx.moveTo(W / 2 + i * (W / 90), hz);
        lctx.lineTo(gx, H + 40);
        const a = 0.16 * (1 - Math.abs(i) / 16);
        lctx.strokeStyle = `rgba(158,196,77,${Math.max(0.03, a).toFixed(3)})`;
        lctx.stroke();
      }
      for (let i = 1; i <= 16; i++) {
        const k = i / 16;
        const y = hz + Math.pow(k, 2.3) * (H + 40 - hz);
        lctx.beginPath();
        lctx.moveTo(0, y);
        lctx.lineTo(W, y);
        lctx.strokeStyle = `rgba(158,196,77,${(0.03 + 0.12 * k).toFixed(3)})`;
        lctx.stroke();
      }

      // roadmap curve with its glow
      const stroke = (width: number, color: string | CanvasGradient, blur: number) => {
        lctx.beginPath();
        for (let i = 0; i <= 220; i++) {
          const p = pathPt(i / 220);
          if (i) lctx.lineTo(p.x, p.y);
          else lctx.moveTo(p.x, p.y);
        }
        lctx.lineWidth = width;
        lctx.lineCap = "round";
        lctx.shadowColor = blur ? "rgba(158,196,77,.75)" : "transparent";
        lctx.shadowBlur = blur;
        lctx.strokeStyle = color;
        lctx.stroke();
        lctx.shadowBlur = 0;
      };
      const grad = vertical
        ? lctx.createLinearGradient(0, stageTop, 0, stageTop + stageH)
        : lctx.createLinearGradient(0, H * 0.8, W, H * 0.3);
      grad.addColorStop(0, "#4F8216");
      grad.addColorStop(0.5, "#9EC44D");
      grad.addColorStop(1, "#E4F5BC");
      stroke(9, "rgba(158,196,77,.18)", 26);
      stroke(2.6, grad, 10);
    };

    const fit = () => {
      const r = section.getBoundingClientRect();
      W = Math.max(320, r.width);
      H = Math.max(420, r.height);
      vertical = W < VERTICAL_BELOW;
      const st = stageRef.current?.getBoundingClientRect();
      stageTop = st ? st.top - r.top : 0;
      stageH = st ? st.height : H;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      nodes.length = 0;
      STOPS.forEach((k) => nodes.push(pathPt(k)));
      paintLayer();
      labelKey = "";
    };

    // Labels ride their node. Positions only change on resize or when the
    // active/hovered step changes, so this skips work on every other frame.
    const placeLabels = (active: number, hover: number) => {
      const key = `${active}|${hover}|${W}|${H}`;
      if (key === labelKey) return;
      labelKey = key;
      nodes.forEach((p, i) => {
        const el = labelRefs.current[i];
        if (!el) return;
        const on = i === active || i === hover;
        if (vertical) {
          const left = Math.round(p.x + 34);
          el.style.left = `${left}px`;
          el.style.width = `${Math.max(160, Math.min(246, W - left - 16))}px`;
          el.style.top = `${Math.round(p.y - 26)}px`;
        } else {
          el.style.width = "246px";
          el.style.left = `${Math.round(Math.max(12, Math.min(W - 258, p.x - 18)))}px`;
          const below = p.y + 20 + el.offsetHeight < H - 4;
          el.style.top = `${Math.round(below ? p.y + 14 : Math.max(4, H - el.offsetHeight - 4))}px`;
        }
        el.style.opacity = on ? "1" : ".62";
        el.style.zIndex = on ? "4" : "2";
        el.dataset.on = on ? "true" : "false";
      });
    };

    const draw = (ts: number) => {
      const t = ts / 1000;
      const active = stepRef.current;
      const hover = hoverRef.current;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.drawImage(layer, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // stars
      stars.forEach((s) => {
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.8 + s.p));
        ctx.fillStyle = `rgba(255,255,255,${(tw * 0.5).toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H * 0.72, s.r, 0, 6.2832);
        ctx.fill();
      });

      // travelling pulse
      const pp = pathPt((t * 0.1) % 1);
      const pg = ctx.createRadialGradient(pp.x, pp.y, 0, pp.x, pp.y, 26);
      pg.addColorStop(0, "rgba(255,255,255,.85)");
      pg.addColorStop(1, "rgba(217,239,164,0)");
      ctx.fillStyle = pg;
      ctx.beginPath();
      ctx.arc(pp.x, pp.y, 26, 0, 6.2832);
      ctx.fill();

      // nodes
      nodes.forEach((p, i) => {
        const on = i === active || i === hover;
        const pulse = on ? 1 + 0.1 * Math.sin(t * 2.6) : 1;
        const R = (on ? 30 : 22) * pulse;
        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, R * 1.9);
        halo.addColorStop(0, `rgba(217,239,164,${on ? 0.5 : 0.24})`);
        halo.addColorStop(1, "rgba(158,196,77,0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(p.x, p.y, R * 1.9, 0, 6.2832);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, R, 0, 6.2832);
        ctx.strokeStyle = `rgba(226,244,190,${on ? 0.85 : 0.4})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
        // four-point sparkle core
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = "#ffffff";
        const sp = on ? 12 : 8;
        ctx.beginPath();
        ctx.moveTo(0, -sp);
        ctx.quadraticCurveTo(1.6, -1.6, sp, 0);
        ctx.quadraticCurveTo(1.6, 1.6, 0, sp);
        ctx.quadraticCurveTo(-1.6, 1.6, -sp, 0);
        ctx.quadraticCurveTo(-1.6, -1.6, 0, -sp);
        ctx.fill();
        ctx.restore();
      });

      placeLabels(active, hover);
    };

    const loop = (ts: number) => {
      // Reduced motion: time stays frozen, so only step changes redraw anything.
      if (visible && !document.hidden) draw(reduce ? 0 : ts);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      let best = -1;
      let bd = 90;
      nodes.forEach((p, i) => {
        const d = Math.hypot(p.x - mx, p.y - my);
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      hoverRef.current = best;
      cv.style.cursor = best >= 0 ? "pointer" : "default";
    };
    const onLeave = () => {
      hoverRef.current = -1;
    };
    const onClick = () => {
      if (hoverRef.current >= 0) select(hoverRef.current);
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(section);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "100px" });
    io.observe(section);
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    section.addEventListener("click", onClick);
    if (document.fonts?.ready) document.fonts.ready.then(fit);

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      section.removeEventListener("click", onClick);
    };
  }, [select]);

  return (
    <section ref={sectionRef} id="work" data-reveal="" className={styles.section} aria-labelledby="work-title">
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <div className={styles.copy}>
        <p className={`eyebrow ${styles.eyebrow}`}>How We Work</p>
        <h2 id="work-title" className={styles.title}>
          From one-line briefs to creatives that get remembered.
        </h2>
        <p className={styles.lede}>
          We dive deep into research, uncover strategic insights and build ideas that connect, engage and drive impact.
        </p>
      </div>

      <div ref={stageRef} className={styles.stage} aria-hidden="true" />

      <ol className={styles.labels}>
        {workSteps.map((s, i) => (
          <li key={s.name}>
            <div
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className={styles.label}
              data-on={i === step ? "true" : "false"}
              onMouseEnter={() => select(i)}
              onMouseLeave={resume}
              onFocus={() => select(i)}
              onBlur={resume}
              onClick={() => select(i)}
              tabIndex={0}
              role="button"
              aria-pressed={i === step}
            >
              <p className={styles.num}>0{i + 1}</p>
              <p className={styles.name}>{s.name}</p>
              <div className={styles.copyBox}>
                <span>{s.phase}</span>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <button type="button" className={styles.toggle} onClick={toggle} aria-label="Pause or play the walkthrough">
        <span aria-hidden="true">{playing ? "❙❙" : "▶"}</span> Auto walkthrough
      </button>
    </section>
  );
}
