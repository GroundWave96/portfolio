"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { DEFAULT_LANG, HTML_LANG, LANGS, dictionaries, isLang, type Dictionary, type Lang } from "./dictionaries";

const STORAGE_KEY = "lang";

/* A tiny external store: the language lives outside React so the first client
   render can read it synchronously (no setState-in-effect, no extra render). */
let current: Lang | null = null;
const listeners = new Set<() => void>();

function detect(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {}
  const preferred = (navigator.languages?.[0] ?? navigator.language ?? "").slice(0, 2).toLowerCase();
  return isLang(preferred) ? preferred : DEFAULT_LANG;
}

const store = {
  get: (): Lang => (current ??= detect()),
  getServer: (): Lang => DEFAULT_LANG,
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  set(lang: Lang) {
    current = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
    listeners.forEach((cb) => cb());
  },
};

interface LanguageContextValue {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
  languages: Lang[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(store.subscribe, store.get, store.getServer);
  const t = dictionaries[lang];

  useEffect(() => {
    const root = document.documentElement;
    root.lang = HTML_LANG[lang];
    root.removeAttribute("data-i18n-pending");
    document.title = t.meta.title;
  }, [lang, t]);

  const setLang = useCallback(
    (next: Lang) => {
      if (next === store.get()) return;
      const root = document.documentElement;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return store.set(next);
      // Fade the page text out, swap the language, fade back in.
      root.classList.add("i18n-swap");
      window.setTimeout(() => {
        store.set(next);
        requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("i18n-swap")));
      }, 160);
    },
    [],
  );

  const value = useMemo(() => ({ lang, t, setLang, languages: LANGS }), [lang, t, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
