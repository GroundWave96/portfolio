"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import pt from "@/locales/pt.json";
import en from "@/locales/en.json";
import it from "@/locales/it.json";
import es from "@/locales/es.json";

type Language = "pt" | "en" | "it" | "es";

export const languages = { pt, en, it, es };

const LanguageContext = createContext({
  lang: "pt" as Language,
  setLang: (lang: Language) => {},
  t: (section: keyof typeof pt, key: string): string => "",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("pt");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Language;
    
    if (savedLang && languages[savedLang]) {
      setLang(savedLang);
    } else {
      const browserLang = navigator.language.slice(0, 2) as Language;
      if (languages[browserLang]) {
        setLang(browserLang);
      }
    }
  }, []);

  const changeLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (section: keyof typeof pt, key: string): string => {
    return (languages[lang][section] as any)?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);