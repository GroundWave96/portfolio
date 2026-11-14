import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Background } from "@/components/Background";
import { SITE_URL, profile } from "@/data/profile";
import pt from "@/i18n/locales/pt.json";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: pt.meta.title,
  description: pt.meta.description,
  keywords: [
    "Gabriel Pimentel",
    "Analista de Projetos",
    "Power BI",
    "Python",
    "SAP",
    "Power Apps",
    "Next.js",
    "Desenvolvedor Front-end",
    "Santo André",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  alternates: { canonical: "/" },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
  openGraph: {
    title: pt.meta.title,
    description: pt.meta.description,
    url: SITE_URL,
    siteName: "Gabriel Pimentel",
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES", "it_IT"],
    type: "profile",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Gabriel Pimentel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pt.meta.title,
    description: pt.meta.description,
    images: ["/opengraph-image.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  viewportFit: "cover",
};

/* Runs before the first paint: picks the language (so <html lang> is right and
   non-Portuguese visitors don't see a flash of Portuguese) and decides whether
   the splash should cover the page (first visit of the session only). */
const bootScript = `(function(){try{var d=document.documentElement,ok={pt:1,en:1,es:1,it:1},l=null;try{l=localStorage.getItem('lang')}catch(e){}if(!ok[l]){var n=((navigator.languages&&navigator.languages[0])||navigator.language||'').slice(0,2).toLowerCase();l=ok[n]?n:'pt'}d.lang={pt:'pt-BR',en:'en',es:'es',it:'it'}[l];if(l!=='pt'){d.setAttribute('data-i18n-pending','');setTimeout(function(){d.removeAttribute('data-i18n-pending')},3000)}var seen=null;try{seen=sessionStorage.getItem('intro-seen')}catch(e){}if(!seen&&!matchMedia('(prefers-reduced-motion: reduce)').matches)d.setAttribute('data-splash','')}catch(e){}})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: profile.name,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.png`,
  email: `mailto:${profile.email}`,
  jobTitle: "Analista de Projetos",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-full bg-zinc-950 font-sans text-zinc-50 antialiased selection:bg-zinc-700 selection:text-white">
        <Background />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
