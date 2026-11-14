"use client";

import { ArrowUp } from "lucide-react";
import { Logo } from "./Logo";
import { useLanguage } from "@/i18n/LanguageProvider";
import { profile } from "@/data/profile";

// Fixed at build time so the server HTML and the client always agree.
const YEAR = new Date().getFullYear();

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/5 px-4 pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Logo className="h-5 w-auto text-zinc-500" />
          <p className="text-center text-xs text-zinc-500 sm:text-left">
            © {YEAR} {profile.name}. {t.footer.rights}
          </p>
          <p className="text-center text-xs text-zinc-600 sm:text-left">{t.footer.built}</p>
        </div>
        <a
          href="#top"
          className="glass inline-flex h-10 items-center gap-2 rounded-full px-4 text-xs font-medium text-zinc-300 transition-[transform,color] hover:-translate-y-0.5 hover:text-white"
        >
          <ArrowUp className="size-3.5" aria-hidden />
          {t.footer.back_to_top}
        </a>
      </div>
    </footer>
  );
}
