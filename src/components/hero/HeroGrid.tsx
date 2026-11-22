"use client";

import { useEffect, useRef } from "react";

const GAP = 28; // px between dots
const RADIUS = 170; // px of light around the cursor

/**
 * Dot grid behind the hero. Dots near the cursor brighten and grow; on touch
 * screens and with reduced motion it stays a still, faint grid.
 */
export function HeroGrid() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const zone = canvas.parentElement!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let target: { x: number; y: number } | null = null;
    const glow = { x: 0, y: 0, strength: 0 };
    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          const d = Math.hypot(x - glow.x, y - glow.y);
          const near = glow.strength * Math.max(0, 1 - d / RADIUS) ** 2;
          ctx.fillStyle = near > 0.01 ? `rgba(157, 180, 255, ${0.09 + near * 0.6})` : "rgba(255, 255, 255, 0.07)";
          ctx.beginPath();
          ctx.arc(x, y, 0.9 + near * 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = zone.clientWidth;
      h = zone.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    // Ease the light toward the cursor and fade it out after the cursor leaves.
    const tick = () => {
      const goal = target ? 1 : 0;
      if (target) {
        glow.x += (target.x - glow.x) * 0.18;
        glow.y += (target.y - glow.y) * 0.18;
      }
      glow.strength += (goal - glow.strength) * 0.12;
      draw();
      if (target || glow.strength > 0.01) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      if (!target && glow.strength < 0.01) {
        glow.x = e.clientX - r.left;
        glow.y = e.clientY - r.top;
      }
      target = { x: e.clientX - r.left, y: e.clientY - r.top };
      wake();
    };
    const onLeave = () => {
      target = null;
      wake();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(zone);
    if (!reduce) {
      zone.addEventListener("pointermove", onMove as EventListener);
      zone.addEventListener("pointerleave", onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      zone.removeEventListener("pointermove", onMove as EventListener);
      zone.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        maskImage: "radial-gradient(ellipse 75% 70% at 50% 45%, #000 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 50% 45%, #000 30%, transparent 100%)",
      }}
    />
  );
}
