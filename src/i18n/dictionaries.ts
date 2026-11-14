import pt from "./locales/pt.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import it from "./locales/it.json";

export type Dictionary = typeof pt;
export type Lang = "pt" | "en" | "es" | "it";

export const LANGS: Lang[] = ["pt", "en", "es", "it"];
export const DEFAULT_LANG: Lang = "pt";

/** Value for <html lang>. */
export const HTML_LANG: Record<Lang, string> = { pt: "pt-BR", en: "en", es: "es", it: "it" };

/** Typed against the Portuguese file, so a missing key in any locale fails the build. */
export const dictionaries: Record<Lang, Dictionary> = { pt, en, es, it };

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as string[]).includes(value);
}

/** "2024-11" -> "nov 2024" in the given language. */
export function formatMonth(dict: Dictionary, ym: string) {
  const [year, month] = ym.split("-").map(Number);
  return `${dict.months[month - 1]} ${year}`;
}
