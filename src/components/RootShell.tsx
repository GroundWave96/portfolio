import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/components/providers/Providers";
import { Background } from "@/components/Background";
import { SITE_URL, profile } from "@/data/profile";
import { HTML_LANG, type Lang } from "@/i18n/dictionaries";
import { REDIRECT_TO_SAVED_LANG } from "@/lib/i18nPaths";

// Inter is loaded as a variable font: the hero name animates its weight.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

/* First visit of the session: the splash covers the page from the very first paint. */
const SPLASH_SCRIPT = `(function(){try{var seen=sessionStorage.getItem('intro-seen');if(!seen&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.setAttribute('data-splash','')}catch(e){}})();`;

const JOB_TITLE: Record<Lang, string> = {
  pt: "Analista de Projetos",
  en: "Project Analyst",
  es: "Analista de Proyectos",
  it: "Project Analyst",
};

function personJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.name,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    email: `mailto:${profile.email}`,
    jobTitle: JOB_TITLE[lang],
    worksFor: { "@type": "Organization", name: profile.current.company },
    address: { "@type": "PostalAddress", addressLocality: "Santo André", addressRegion: "SP", addressCountry: "BR" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "FATEC São Caetano do Sul" },
      { "@type": "CollegeOrUniversity", name: "UNINOVE" },
    ],
    knowsAbout: ["Python", "SQL", "Power BI", "Power Apps", "SAP", "Next.js", "React", "TypeScript"],
    knowsLanguage: ["pt-BR", "en"],
    sameAs: [profile.links.linkedin, profile.links.github],
  };
}

/** <html> and <body> shared by the Portuguese root layout and the /[lang] root layout. */
export function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={HTML_LANG[lang]} className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- this is the app root layout (shared by two route groups), not the pages router */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: REDIRECT_TO_SAVED_LANG }} />
        <script dangerouslySetInnerHTML={{ __html: SPLASH_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(lang)).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-full bg-zinc-950 font-sans text-zinc-50 antialiased selection:bg-zinc-700 selection:text-white">
        <Background />
        <Providers lang={lang}>{children}</Providers>
      </body>
    </html>
  );
}
