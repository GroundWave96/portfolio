import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { RootShell } from "@/components/RootShell";
import { baseMetadata } from "@/lib/metadata";
import { PREFIXED_LANGS } from "@/lib/i18nPaths";
import { isLang } from "@/i18n/dictionaries";

export const metadata = baseMetadata;
export { viewport } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return PREFIXED_LANGS.map((lang) => ({ lang }));
}

/** Root layout for /en, /es and /it. */
export default async function LangLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang) || lang === "pt") notFound();
  return <RootShell lang={lang}>{children}</RootShell>;
}
