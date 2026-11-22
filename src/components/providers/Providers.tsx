"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import type { Lang } from "@/i18n/dictionaries";
import { IntroProvider } from "./IntroProvider";
import { ToastProvider } from "./ToastProvider";

export function Providers({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    // "user" turns transform animations into simple fades when the OS asks for reduced motion.
    <MotionConfig reducedMotion="user">
      <LanguageProvider lang={lang}>
        <IntroProvider>
          <ToastProvider>{children}</ToastProvider>
        </IntroProvider>
      </LanguageProvider>
    </MotionConfig>
  );
}
