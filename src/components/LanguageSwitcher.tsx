"use client";
import { useLanguage } from "@/context/LanguageContext";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const languages: ("pt" | "en" | "it" | "es")[] = ["pt", "en", "it", "es"];

  return (
    <div className="flex items-center gap-2 bg-zinc-900/40 rounded-full px-3 py-1.5 border border-zinc-800 backdrop-blur-md">
      {languages.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-label={`Alterar idioma para ${l.toUpperCase()}`}
          className={`min-w-9 min-h-9 flex items-center justify-center rounded-md text-[10px] font-bold uppercase transition-colors ${lang === l
              ? "text-zinc-100"
              : "text-zinc-600 hover:text-zinc-400"
            }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}