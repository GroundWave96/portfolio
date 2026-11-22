"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { screenshotSrcSet } from "@/lib/images";

interface BrowserFrameProps {
  images: string[];
  alts: string[];
  url?: string;
  /** Auto-advance interval in ms; 0 disables it. */
  interval?: number;
  /** Larger arrows for the details dialog. */
  large?: boolean;
  priority?: boolean;
  /** Rendered width hint for srcset (phones pick the 720px copy). */
  sizes?: string;
}

/** Screenshots inside a minimal browser window, crossfading with dots and swipe. */
export function BrowserFrame({ images, alts, url, interval = 4500, large = false, priority = false, sizes = "(min-width: 1024px) 640px, 100vw" }: BrowserFrameProps) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const count = images.length;

  const go = (next: number) => setIndex(((next % count) + count) % count);

  useEffect(() => {
    if (!interval || count < 2 || paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, interval);
    return () => window.clearInterval(id);
  }, [interval, count, paused, inView]);

  const host = url ? url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : undefined;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="flex h-7 items-center gap-1.5 border-b border-white/5 bg-zinc-900/90 px-3">
        <span className="size-2 rounded-full bg-zinc-700" />
        <span className="size-2 rounded-full bg-zinc-700" />
        <span className="size-2 rounded-full bg-zinc-700" />
        {host && (
          <span className="ml-2 min-w-0 truncate rounded-md bg-zinc-950/80 px-2 py-0.5 font-mono text-[10px] text-zinc-500">
            {host}
          </span>
        )}
      </div>

      <div className="group/frame relative aspect-video w-full touch-pan-y overflow-hidden bg-zinc-900">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={images[index]}
            src={images[index]}
            srcSet={screenshotSrcSet(images[index])}
            sizes={sizes}
            alt={alts[index] ?? ""}
            width={1440}
            height={810}
            loading={priority && index === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            drag={count > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) go(index + 1);
              else if (info.offset.x > 50) go(index - 1);
            }}
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full cursor-grab object-cover object-top select-none active:cursor-grabbing"
          />
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(index - 1);
              }}
              aria-label={t.actions.prev_image}
              className={`glass absolute top-1/2 left-2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full text-zinc-200 opacity-0 transition-opacity group-hover/frame:opacity-100 focus-visible:opacity-100 sm:flex ${
                large ? "size-10" : "size-8"
              }`}
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(index + 1);
              }}
              aria-label={t.actions.next_image}
              className={`glass absolute top-1/2 right-2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full text-zinc-200 opacity-0 transition-opacity group-hover/frame:opacity-100 focus-visible:opacity-100 sm:flex ${
                large ? "size-10" : "size-8"
              }`}
            >
              <ChevronRight className="size-4" />
            </button>

            <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center gap-1.5 bg-gradient-to-t from-black/50 to-transparent pt-6 pb-2.5">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(i);
                  }}
                  aria-label={`${t.actions.go_to_image} ${i + 1}`}
                  aria-current={i === index}
                  className="flex h-4 items-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-5 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
