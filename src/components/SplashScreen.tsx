"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { useIntro } from "./providers/IntroProvider";

/**
 * Only visible when <html data-splash> is set (first visit of the session).
 * The logo shares a layoutId with the header logo, so it flies into place.
 */
export function SplashScreen() {
  const { splash } = useIntro();

  return (
    <AnimatePresence onExitComplete={() => document.documentElement.removeAttribute("data-splash")}>
      {splash && (
        <motion.div
          key="splash"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="splash fixed inset-0 z-100 items-center justify-center bg-zinc-950"
          aria-hidden
        >
          <motion.div layoutId="site-logo" transition={{ type: "spring", stiffness: 260, damping: 30 }}>
            <Logo className="h-16 w-auto text-zinc-100 sm:h-20" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
