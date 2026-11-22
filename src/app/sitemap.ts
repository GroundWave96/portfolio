import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/profile";
import { projects } from "@/data/projects";
import { HTML_LANG, LANGS, type Lang } from "@/i18n/dictionaries";
import { homePath, projectPath } from "@/lib/i18nPaths";

export const dynamic = "force-static";

const url = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;

/** One entry per language version, each listing its siblings (hreflang). */
function entries(pathFor: (lang: Lang) => string, priority: number): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(LANGS.map((l) => [HTML_LANG[l], url(pathFor(l))]));
  return LANGS.map((lang) => ({
    url: url(pathFor(lang)),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entries(homePath, 1),
    ...projects.flatMap((p) => entries((lang) => projectPath(lang, p.slug), 0.8)),
  ];
}
