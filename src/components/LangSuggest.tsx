"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Languages, X } from "lucide-react";
import { LANG_STORAGE_KEY, useLanguage } from "@/i18n/LanguageProvider";
import { dictionaries, isLang, type Lang } from "@/i18n/dictionaries";

const DISMISS_KEY = "lang-suggest-dismissed";

/**
 * Offers the page in the browser's language instead of redirecting:
 * search engines always get the URL they asked for.
 */
export function LangSuggest() {
  const { lang, setLang } = useLanguage();
  const [target, setTarget] = useState<Lang | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        if (localStorage.getItem(LANG_STORAGE_KEY) || sessionStorage.getItem(DISMISS_KEY)) return;
      } catch {}
      const preferred = (navigator.languages?.[0] ?? navigator.language ?? "").slice(0, 2).toLowerCase();
      if (isLang(preferred) && preferred !== lang) setTarget(preferred);
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [lang]);

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
    setTarget(null);
  };

  const copy = target ? dictionaries[target].suggest : null;

  return (
    <AnimatePresence>
      {target && copy && (
        <motion.div
          role="dialog"
          aria-label={copy.text}
          lang={target}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="glass fixed left-4 z-60 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-2xl py-2.5 pr-2 pl-4 text-sm sm:left-6"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
        >
          <Languages className="size-4 shrink-0 text-zinc-400" aria-hidden />
          <span className="text-zinc-300">{copy.text}</span>
          <button
            type="button"
            onClick={() => setLang(target)}
            className="shrink-0 rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-950 transition-colors hover:bg-white"
          >
            {copy.action}
          </button>
          <button
            type="button"
            onClick={dismiss}
            aria-label={copy.dismiss}
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-200"
          >
            <X className="size-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
