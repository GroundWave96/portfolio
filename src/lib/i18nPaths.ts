import { LANGS, type Lang } from "@/i18n/dictionaries";

/**
 * URL scheme (static, one HTML file per language):
 *   pt  ->  /                 /projetos/<slug>
 *   en  ->  /en               /en/projects/<slug>
 *   es  ->  /es               /es/proyectos/<slug>
 *   it  ->  /it               /it/progetti/<slug>
 */
export const PROJECT_SEGMENT: Record<Lang, string> = {
  pt: "projetos",
  en: "projects",
  es: "proyectos",
  it: "progetti",
};

/** Languages served under a prefix (pt lives at the root). */
export const PREFIXED_LANGS = LANGS.filter((l) => l !== "pt") as Exclude<Lang, "pt">[];

export function homePath(lang: Lang) {
  return lang === "pt" ? "/" : `/${lang}`;
}

export function projectPath(lang: Lang, slug: string) {
  return `${lang === "pt" ? "" : `/${lang}`}/${PROJECT_SEGMENT[lang]}/${slug}`;
}

export function localizedPath(lang: Lang, slug: string | null) {
  return slug ? projectPath(lang, slug) : homePath(lang);
}

/** Reads the language and (if any) project slug from a pathname. */
export function parsePath(pathname: string): { lang: Lang; slug: string | null } {
  const parts = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  const lang = (PREFIXED_LANGS as string[]).includes(parts[0]) ? (parts.shift() as Lang) : "pt";
  const slug = parts.length === 2 && Object.values(PROJECT_SEGMENT).includes(parts[0]) ? parts[1] : null;
  return { lang, slug };
}

/** Same rules as above, inlined in <head> so a saved language choice redirects before the first paint. */
export const REDIRECT_TO_SAVED_LANG = `(function(){try{var s=localStorage.getItem('lang'),seg=${JSON.stringify(
  PROJECT_SEGMENT,
)};if(!seg[s])return;var p=location.pathname.replace(/\\/+$/,'').split('/').filter(Boolean),cur='pt';if(seg[p[0]]&&p[0]!=='pt'){cur=p.shift()}if(s===cur)return;var slug=null;for(var k in seg){if(p.length===2&&p[0]===seg[k])slug=p[1]}var base=s==='pt'?'':'/'+s;var to=slug?base+'/'+seg[s]+'/'+slug:(base||'/');document.documentElement.style.visibility='hidden';location.replace(to+location.hash)}catch(e){}})();`;
