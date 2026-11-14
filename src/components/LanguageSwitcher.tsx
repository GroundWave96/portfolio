"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";

const NAMES = { pt: "Português", en: "English", es: "Español", it: "Italiano" } as const;

export function LanguageSwitcher({ id = "lang" }: { id?: string }) {
  const { lang, setLang, languages, t } = useLanguage();

  return (
    <div role="radiogroup" aria-label={t.nav.language} className="flex items-center rounded-full border border-white/10 bg-black/20 p-0.5">
      {languages.map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={NAMES[l]}
            title={NAMES[l]}
            onClick={() => setLang(l)}
            className={`relative rounded-full px-2 py-1 font-mono text-[10.5px] font-medium uppercase transition-colors ${
              active ? "text-zinc-950" : "text-zinc-500 hover:text-zinc-200"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`${id}-pill`}
                className="absolute inset-0 rounded-full bg-zinc-100"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span className="relative">{l}</span>
          </button>
        );
      })}
    </div>
  );
}
