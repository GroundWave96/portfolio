"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, type Transition } from "framer-motion";
import { Search } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useIntro } from "./providers/IntroProvider";
import { OPEN_PALETTE_EVENT, SECTIONS, useActiveSection } from "@/lib/sections";

const spring: Transition = { type: "spring", stiffness: 320, damping: 30, mass: 0.6 };

export function Header() {
  const { t } = useLanguage();
  const { splash, hadSplash } = useIntro();
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  // Close the mobile menu on Escape or a tap outside it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const openPalette = () => {
    setOpen(false);
    window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
  };

  return (
    <motion.header
      ref={headerRef}
      layout
      transition={spring}
      className="glass fixed left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 overflow-hidden rounded-[1.75rem]"
      style={{ top: "calc(env(safe-area-inset-top, 0px) + 1rem)" }}
    >
      <div className="flex h-14 items-center justify-between gap-3 pl-5 pr-2.5 sm:pl-6">
        <div className="flex min-w-12 shrink-0 items-center">
          {!splash && (
            <motion.a
              href="#top"
              layoutId={hadSplash ? "site-logo" : undefined}
              initial={hadSplash ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              aria-label={t.nav.home}
              className="flex items-center transition-opacity hover:opacity-80"
              onClick={() => setOpen(false)}
            >
              <Logo className="h-5 w-auto text-zinc-100" />
            </motion.a>
          )}
        </div>

        <nav aria-label="Principal" className="hidden lg:block" data-i18n-fade>
          <ul className="flex items-center gap-0.5">
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative block rounded-full px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
                      isActive ? "text-zinc-50" : "text-zinc-400 hover:text-zinc-100"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.08] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                        transition={spring}
                      />
                    )}
                    <span className="relative">{t.nav[s.label]}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={openPalette}
            aria-label={t.nav.search}
            aria-keyshortcuts="Control+K Meta+K"
            className="flex h-9 items-center gap-2 rounded-full px-2.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-100"
          >
            <Search className="size-4" aria-hidden />
            <kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 xl:inline">
              Ctrl K
            </kbd>
          </button>
          <div className="hidden sm:block">
            <LanguageSwitcher id="lang-header" />
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close_menu : t.nav.open_menu}
            className="flex size-9 flex-col items-center justify-center gap-1.5 rounded-full transition-colors hover:bg-white/5 lg:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={spring}
              className="block h-0.5 w-5 rounded-full bg-zinc-300"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={spring}
              className="block h-0.5 w-5 rounded-full bg-zinc-300"
            />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={spring}
            className="border-t border-white/5 lg:hidden"
          >
            <ul className="flex flex-col px-3 pt-3 pb-2">
              {SECTIONS.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...spring, delay: 0.04 * i }}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-3 py-3 text-[17px] tracking-tight transition-colors hover:bg-white/5 ${
                      active === s.id ? "text-white" : "text-zinc-300"
                    }`}
                  >
                    {t.nav[s.label]}
                    {active === s.id && <span className="size-1.5 rounded-full bg-zinc-300" aria-hidden />}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center justify-between gap-3 px-6 pt-1 pb-5 sm:hidden">
              <span className="eyebrow">{t.nav.language}</span>
              <LanguageSwitcher id="lang-menu" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Reading progress */}
      <motion.div
        aria-hidden
        className="absolute inset-x-6 bottom-0 h-px origin-left bg-gradient-to-r from-sky-400/0 via-sky-300/70 to-indigo-400/70"
        style={{ scaleX: progress }}
      />
    </motion.header>
  );
}
