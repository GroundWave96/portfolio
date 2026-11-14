"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { IntroProvider } from "./IntroProvider";
import { ToastProvider } from "./ToastProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    // "user" turns transform animations into simple fades when the OS asks for reduced motion.
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <IntroProvider>
          <ToastProvider>{children}</ToastProvider>
        </IntroProvider>
      </LanguageProvider>
    </MotionConfig>
  );
}
