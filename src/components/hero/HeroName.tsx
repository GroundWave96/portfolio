"use client";

import { Fragment, useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const word: Variants = {
  hidden: { opacity: 0, y: "0.4em", filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
};

/** Weight range of Inter's variable axis used by the effect. */
const REST = 500;
const LIGHT = 280;
const HEAVY = 900;
const REACH = 260; // px around the cursor that thickens letters
const WAVE_MS = 4200;

/**
 * The name in the hero. Each letter's weight follows the cursor (heavier when
 * close); when the cursor is away, or on touch screens, a slow weight wave runs
 * through the name. The entrance is a word-by-word blur reveal.
 */
export function HeroName({ name, ready }: { name: string; ready: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const h1 = ref.current;
    if (!h1 || !ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const letters = Array.from(h1.querySelectorAll<HTMLSpanElement>("[data-letter]"));
    const weights = letters.map(() => REST);
    const zone = h1.closest("section") ?? h1;
    let pointer: { x: number; y: number } | null = null;
    let visible = true;
    let raf = 0;
    const started = performance.now();

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") pointer = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => (pointer = null);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      // Let the entrance finish before the letters start moving.
      const warmup = Math.min(1, Math.max(0, (now - started - 900) / 600));
      const phase = ((now - started) % WAVE_MS) / WAVE_MS;

      letters.forEach((el, i) => {
        let target = REST;
        if (pointer) {
          const r = el.getBoundingClientRect();
          const d = Math.hypot(r.left + r.width / 2 - pointer.x, (r.top + r.height / 2 - pointer.y) * 0.6);
          target = LIGHT + (HEAVY - LIGHT) * Math.max(0, 1 - d / REACH) ** 1.4;
        } else {
          // A bump that travels left to right across the name.
          const pos = phase * (letters.length + 8) - 4;
          const bump = Math.max(0, 1 - Math.abs(pos - i) / 3.5);
          target = REST - 120 + 520 * bump * bump;
        }
        target = REST + (target - REST) * warmup;
        weights[i] += (target - weights[i]) * 0.14;
        el.style.fontVariationSettings = `"wght" ${weights[i].toFixed(0)}`;
      });
    };

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(h1);
    zone.addEventListener("pointermove", onMove as EventListener);
    zone.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      zone.removeEventListener("pointermove", onMove as EventListener);
      zone.removeEventListener("pointerleave", onLeave);
    };
  }, [ready, name]);

  return (
    <h1
      ref={ref}
      aria-label={name}
      className="cursor-default text-[clamp(3.25rem,16vw,4.75rem)] leading-[0.98] tracking-[-0.04em] text-zinc-50 sm:text-[clamp(3.5rem,8.5vw,6rem)]"
      style={{ fontVariationSettings: `"wght" ${REST}` }}
    >
      <motion.span variants={container} aria-hidden className="block sm:whitespace-nowrap">
        {name.split(" ").map((w, wi) => (
          <Fragment key={`${w}-${wi}`}>
            {wi > 0 && <span className="hidden sm:inline"> </span>}
            <motion.span variants={word} className="block sm:inline-block">
              {w.split("").map((c, ci) => (
                <span key={ci} data-letter className="inline-block" style={{ fontVariationSettings: `"wght" ${REST}` }}>
                  {c}
                </span>
              ))}
            </motion.span>
          </Fragment>
        ))}
      </motion.span>
    </h1>
  );
}
