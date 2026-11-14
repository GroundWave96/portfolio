"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/** How long the logo stays on screen before it flies to the header. */
const SPLASH_MS = 850;
const SEEN_KEY = "intro-seen";

interface IntroState {
  /** True while the splash is on screen (first visit of the session only). */
  splash: boolean;
  /** True once the page should play its entrance animations. */
  ready: boolean;
  /** Whether the splash was actually shown (drives the logo hand-off to the header). */
  hadSplash: boolean;
}

const IntroContext = createContext<IntroState>({ splash: false, ready: true, hadSplash: false });

/**
 * The inline script in <head> sets `data-splash` on <html> when this is the
 * first visit of the session, so the splash covers the page from the very
 * first paint. Here we only decide when to lift it.
 */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<IntroState>({ splash: true, ready: false, hadSplash: false });

  useEffect(() => {
    const root = document.documentElement;
    const firstVisit = root.hasAttribute("data-splash");
    const timer = window.setTimeout(
      () => {
        // <html data-splash> is removed by the splash itself once its fade-out ends.
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {}
        setState({ splash: false, ready: true, hadSplash: firstVisit });
      },
      firstVisit ? SPLASH_MS : 0,
    );
    return () => window.clearTimeout(timer);
  }, []);

  return <IntroContext.Provider value={state}>{children}</IntroContext.Provider>;
}

export const useIntro = () => useContext(IntroContext);
