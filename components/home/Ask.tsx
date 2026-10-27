"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { askFallback, askItems } from "@/lib/content";
import styles from "./Ask.module.css";

// Card placement around the chat box (from the design): three down each side, two underneath.
const PLACES: { side: "l" | "r"; k: number }[] = [
  { side: "l", k: 0 },
  { side: "l", k: 1 },
  { side: "l", k: 2 },
  { side: "r", k: 0 },
  { side: "r", k: 1 },
  { side: "r", k: 2 },
];
const HUB_TOP = 228;
// Below this width the cards stack under the chat box and the connector lines are hidden.
const STACK_BELOW = 1100;

type Chat = { i: number; q: string; lead: string; answer: string; cta: string } | null;
type Geo = { w: number; h: number; paths: { i: number; d: string; x1: number; y1: number }[] };

export default function Ask() {
  const stageRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const timers = useRef<{ wait?: number; type?: number }>({});

  const [chat, setChat] = useState<Chat>(null);
  const [thinking, setThinking] = useState(false);
  const [shown, setShown] = useState(0);
  const [input, setInput] = useState("");
  const [hubH, setHubH] = useState(130);
  const [geo, setGeo] = useState<Geo | null>(null);
  const [stacked, setStacked] = useState(false);

  const stop = () => {
    window.clearTimeout(timers.current.wait);
    window.clearInterval(timers.current.type);
  };

  const play = useCallback((i: number, q: string) => {
    stop();
    const item = i >= 0 ? askItems[i] : null;
    const lead = item ? item.lead + "\n\n" : "";
    const answer = item ? item.answer : askFallback;
    setChat({ i, q, lead, answer, cta: item?.cta ?? "Build your brief →" });
    setShown(0);
    setInput("");
    const total = lead.length + answer.length;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setThinking(false);
      setShown(total);
      return;
    }
    setThinking(true);
    timers.current.wait = window.setTimeout(() => {
      setThinking(false);
      timers.current.type = window.setInterval(() => {
        setShown((n) => {
          const next = n + 2;
          if (next >= total) window.clearInterval(timers.current.type);
          return Math.min(next, total);
        });
      }, 16);
    }, 750);
  }, []);

  useEffect(() => stop, []);

  const pick = (i: number) => {
    play(i, askItems[i].question);
    // On stacked layouts the chat box sits above the cards, so bring it into view.
    if (stacked) hubRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const reset = () => {
    stop();
    setChat(null);
    setThinking(false);
    setShown(0);
  };
  const surprise = () => {
    const pool = askItems.map((_, i) => i).filter((i) => i !== chat?.i);
    pick(pool[Math.floor(Math.random() * pool.length)]);
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const t = input.trim();
    if (!t) return;
    const m = askItems.findIndex((a) => a.question === t);
    play(m, t);
  };

  // Measure the stage to draw connector lines from each card to the chat box.
  const measure = useCallback(() => {
    const st = stageRef.current;
    const hub = hubRef.current;
    if (!st || !hub) return;
    const isStacked = window.innerWidth < STACK_BELOW;
    setStacked(isStacked);
    setHubH(Math.round(hub.getBoundingClientRect().height));
    if (isStacked) {
      setGeo(null);
      return;
    }
    const r = st.getBoundingClientRect();
    const hb = hub.getBoundingClientRect();
    const hx = hb.left - r.left;
    const hy = hb.top - r.top;
    const hw = hb.width;
    const hh = hb.height;
    const paths = PLACES.map(({ side, k }, i) => {
      const el = cardRefs.current[i];
      if (!el) return null;
      const b = el.getBoundingClientRect();
      let x1: number, y1: number, x2: number, y2: number, d: string;
      if (side === "l") {
        x1 = b.right - r.left + 16;
        y1 = b.top - r.top + b.height / 2;
        x2 = hx;
        y2 = hy + hh * (0.3 + 0.2 * k);
        d = `M${x1} ${y1} C${x1 + 80} ${y1} ${x2 - 80} ${y2} ${x2} ${y2}`;
      } else {
        x1 = b.left - r.left - 16;
        y1 = b.top - r.top + b.height / 2;
        x2 = hx + hw;
        y2 = hy + hh * (0.3 + 0.2 * k);
        d = `M${x1} ${y1} C${x1 - 80} ${y1} ${x2 + 80} ${y2} ${x2} ${y2}`;
      }
      return { i, d: d.replace(/(\d+\.\d)\d+/g, "$1"), x1, y1 };
    }).filter(Boolean) as Geo["paths"];
    setGeo({ w: r.width, h: r.height, paths });
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure, chat, thinking]);

  useEffect(() => {
    const st = stageRef.current;
    const hub = hubRef.current;
    if (!st || !hub) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(st);
    ro.observe(hub);
    window.addEventListener("resize", measure);
    // Cards slide when the chat box grows; re-measure once that transition settles.
    const onEnd = () => measure();
    st.addEventListener("transitionend", onEnd);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      st.removeEventListener("transitionend", onEnd);
    };
  }, [measure]);

  // Three card rows per side (tops 0/200/400, card ~140 tall) and the chat box,
  // whichever reaches lower, plus a little breathing room.
  const stageH = Math.max(400 + 150, HUB_TOP + hubH) + 56;
  const leadShown = chat ? chat.lead.slice(0, Math.min(shown, chat.lead.length)) : "";
  const answerShown = chat ? chat.answer.slice(0, Math.max(0, shown - chat.lead.length)) : "";
  const done = !!chat && !thinking && shown >= chat.lead.length + chat.answer.length;
  const active = chat?.i ?? -1;
  const typed = !!input.trim();

  return (
    <section id="ask" data-reveal="" className={styles.section} aria-labelledby="ask-title">
      <div className={styles.wrap}>
        <div className={styles.head}>
          <p className={`eyebrow ${styles.eyebrow}`}>How FinAce Helps</p>
          <h2 id="ask-title" className={styles.title}>
            What if your marketing campaign <span className={styles.grad}>took 80% less time?</span>
          </h2>
          <p className={styles.intro}>
            The products are complex, the regulations are strict, the audiences are different, and the markets are
            dynamic. We understand all four.
          </p>
        </div>

        <div
          ref={stageRef}
          className={styles.stage}
          style={stacked ? undefined : { height: stageH }}
        >
          {geo && (
            <svg
              className={styles.lines}
              width={geo.w}
              height={geo.h}
              viewBox={`0 0 ${geo.w} ${geo.h}`}
              aria-hidden="true"
            >
              {geo.paths.map((pt) => {
                const on = active === pt.i;
                return (
                  <g key={`${pt.i}-${on}`}>
                    <path
                      d={pt.d}
                      fill="none"
                      stroke={on ? "#C8E68A" : "rgba(158,196,77,.36)"}
                      strokeWidth={on ? 2 : 1.2}
                      style={{ transition: "stroke .3s" }}
                    />
                    <circle cx={pt.x1} cy={pt.y1} r={on ? 5.5 : 4} fill="#E9F7C8" className={styles.endDot} />
                    <circle r={on ? 3.5 : 2.2} fill={on ? "#F3FAE3" : "#9EC44D"} className={styles.runner}>
                      <animateMotion
                        dur={`${on ? 1.2 : 3 + pt.i * 0.35}s`}
                        repeatCount="indefinite"
                        path={pt.d}
                        keyPoints="0;1"
                        keyTimes="0;1"
                        calcMode="linear"
                      />
                    </circle>
                  </g>
                );
              })}
            </svg>
          )}

          <div className={styles.ringOuter} aria-hidden="true" />
          <div className={styles.ringInner} aria-hidden="true" />
          <span className={styles.emblem} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/finace-icon-gradient.svg" alt="" width={34} height={34} />
          </span>

          <div ref={hubRef} className={styles.hub}>
            {chat && (
              <div className={styles.thread}>
                <div className={styles.threadHead}>
                  <span className={styles.assist}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/brand/finace-icon-gradient.svg" alt="" width={16} height={16} />
                    FinAce Assist
                  </span>
                  <button type="button" className={styles.newChat} onClick={reset}>
                    New chat ×
                  </button>
                </div>
                <span className={styles.userMsg}>{chat.q}</span>
                <div className={styles.reply}>
                  <span className={styles.replyAvatar} aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/brand/finace-icon-gradient.svg" alt="" width={15} height={15} />
                  </span>
                  <div className={styles.replyBody}>
                    <p className={thinking ? styles.thinking : styles.replyText} aria-live="polite">
                      {thinking ? (
                        "Thinking…"
                      ) : (
                        <>
                          <strong>{leadShown}</strong>
                          {answerShown}
                        </>
                      )}
                    </p>
                    {done && (
                      <a href="#brief" className={styles.replyCta}>
                        {chat.cta}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
            <form className={styles.form} onSubmit={submit}>
              <input
                id="ask-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What is your requirement?"
                aria-label="Ask FinAce"
                className={styles.input}
                maxLength={300}
                autoComplete="off"
              />
              <div className={styles.tools}>
                <div className={styles.toolsLeft}>
                  <button
                    type="button"
                    onClick={surprise}
                    title="Surprise me with a question"
                    aria-label="Surprise me with a question"
                    className={styles.iconBtn}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                  <span className={styles.iconDeco} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
                    </svg>
                  </span>
                </div>
                <div className={styles.toolsRight}>
                  <span className={styles.iconDeco} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3" />
                    </svg>
                  </span>
                  <button type="submit" aria-label="Send" className={`${styles.send} ${typed ? styles.sendOn : ""}`}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className={styles.cards}>
            {askItems.map((item, i) => {
              const { side, k } = PLACES[i];
              const on = active === i;
              return (
                <button
                  key={item.tag}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  type="button"
                  className={`${styles.card} ${on ? styles.cardOn : ""}`}
                  data-side={side}
                  data-k={k}
                  onClick={() => pick(i)}
                  aria-pressed={on}
                >
                  <span className={styles.cardIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                  </span>
                  <span className={styles.cardText}>
                    <span className={styles.cardTag}>{item.tag}</span>
                    <span className={styles.cardQ}>{item.question}</span>
                  </span>
                  <span className={styles.cardArrow} aria-hidden="true">
                    →
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
