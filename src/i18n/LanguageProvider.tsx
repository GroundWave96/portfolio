"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { LANGS, dictionaries, type Dictionary, type Lang } from "./dictionaries";
import { localizedPath, parsePath } from "@/lib/i18nPaths";

/** Set only when the visitor picks a language, so search engines are never redirected. */
export const LANG_STORAGE_KEY = "lang";

interface LanguageContextValue {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
  languages: Lang[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** The language comes from the URL; each language is its own static page. */
export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const t = dictionaries[lang];

  const setLang = useCallback(
    (next: Lang) => {
      try {
        localStorage.setItem(LANG_STORAGE_KEY, next);
      } catch {}
      if (next === lang) return;
      const { slug } = parsePath(window.location.pathname);
      const target = localizedPath(next, slug) + window.location.hash;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return window.location.assign(target);
      // Fade the page out, then load the same page in the other language.
      document.documentElement.classList.add("i18n-swap");
      window.setTimeout(() => window.location.assign(target), 160);
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, t, setLang, languages: LANGS }), [lang, t, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
