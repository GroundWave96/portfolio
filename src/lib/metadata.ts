import type { Metadata, Viewport } from "next";
import { SITE_URL, profile } from "@/data/profile";
import type { Project } from "@/data/projects";
import { HTML_LANG, LANGS, dictionaries, type Lang } from "@/i18n/dictionaries";
import { homePath, projectPath } from "./i18nPaths";

const OG_LOCALE: Record<Lang, string> = { pt: "pt_BR", en: "en_US", es: "es_ES", it: "it_IT" };
const OG_IMAGE = { url: "/og-image.png", width: 1200, height: 630, alt: "Gabriel Pimentel" };

/** Shared by both root layouts. */
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: profile.name, url: SITE_URL }],
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
  robots: { index: true, follow: true },
  verification: { google: "I0KpUkbQZ1ltBc3rVDJRD59i4VDYAl2zvMG3X3-W4DE" },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  viewportFit: "cover",
};

/** hreflang map: every language version of a page, plus x-default (Portuguese). */
function languageAlternates(pathFor: (lang: Lang) => string) {
  const languages: Record<string, string> = {};
  for (const l of LANGS) languages[HTML_LANG[l]] = pathFor(l);
  languages["x-default"] = pathFor("pt");
  return languages;
}

export function homeMetadata(lang: Lang): Metadata {
  const t = dictionaries[lang];
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { canonical: homePath(lang), languages: languageAlternates(homePath) },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: homePath(lang),
      siteName: profile.name,
      locale: OG_LOCALE[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      type: "profile",
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description, images: [OG_IMAGE.url] },
  };
}

export function projectMetadata(lang: Lang, project: Project): Metadata {
  const copy = dictionaries[lang].projects.items[project.id];
  const title = `${copy.title} · ${profile.name}`;
  const image = { url: project.images[0], width: 1440, height: 810, alt: copy.alts[0] };
  return {
    title,
    description: copy.summary,
    alternates: {
      canonical: projectPath(lang, project.slug),
      languages: languageAlternates((l) => projectPath(l, project.slug)),
    },
    openGraph: {
      title,
      description: copy.summary,
      url: projectPath(lang, project.slug),
      siteName: profile.name,
      locale: OG_LOCALE[lang],
      type: "article",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description: copy.summary, images: [image.url] },
  };
}
