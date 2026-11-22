"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { CSSProperties } from "react";
import { Header } from "@/components/Header";
import { SplashScreen } from "@/components/SplashScreen";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { LangSuggest } from "@/components/LangSuggest";
import { Reveal } from "@/components/Reveal";
import { BrowserFrame } from "@/components/projects/BrowserFrame";
import { projectBySlug, projects } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageProvider";
import { homePath, projectPath } from "@/lib/i18nPaths";
import { screenshotSrcSet } from "@/lib/images";

/** Standalone page for one project: every screenshot, the challenge and what was built. */
export function ProjectPage({ slug }: { slug: string }) {
  const { t, lang } = useLanguage();
  const project = projectBySlug(slug)!;
  const copy = t.projects.items[project.id];
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const nextCopy = t.projects.items[next.id];

  return (
    <>
      <SplashScreen />
      <Header onHome={false} />
      <CommandPalette />

      <main
        className="px-4 pt-32 pb-24 sm:px-6 sm:pt-36"
        style={{ "--accent": project.accent } as CSSProperties}
      >
        <article className="mx-auto flex max-w-5xl flex-col gap-14">
          <header className="flex flex-col gap-6">
            <Reveal>
              <a
                href={`${homePath(lang)}#projetos`}
                className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-200"
              >
                <ArrowLeft className="size-4" aria-hidden />
                {t.projects.page.back}
              </a>
            </Reveal>
            <Reveal delay={0.05} className="flex flex-col gap-4">
              <span className="eyebrow">
                {copy.context} · {project.year}
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-balance text-zinc-50 sm:text-6xl">{copy.title}</h1>
              <p className="max-w-2xl text-lg text-pretty text-zinc-400">{copy.summary}</p>
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-zinc-100 px-6 text-sm font-semibold text-zinc-950 transition-[transform,background-color] hover:bg-white active:scale-[0.97]"
                >
                  {t.actions.open_site}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              )}
            </Reveal>
          </header>

          <Reveal delay={0.1}>
            <div
              className="rounded-3xl p-2 sm:p-3"
              style={{ background: "radial-gradient(80% 60% at 50% 0%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 70%)" }}
            >
              <BrowserFrame
                images={project.images}
                alts={copy.alts}
                url={project.links.live}
                interval={6000}
                large
                priority
                sizes="(min-width: 1024px) 1000px, 100vw"
              />
            </div>
          </Reveal>

          <div className="grid gap-12 md:grid-cols-[1fr_1.3fr]">
            <Reveal className="flex flex-col gap-3">
              <h2 className="eyebrow">{t.projects.labels.challenge}</h2>
              <p className="leading-relaxed text-pretty text-zinc-300">{copy.challenge}</p>
              <h2 className="eyebrow mt-8">{t.projects.labels.stack}</h2>
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="flex flex-col gap-4">
              <h2 className="eyebrow">{t.projects.labels.highlights}</h2>
              <ul className="flex flex-col gap-4">
                {copy.highlights.map((h) => (
                  <li key={h} className="flex gap-3 leading-relaxed text-zinc-300">
                    <Check className="mt-1 size-4 shrink-0" style={{ color: project.accent }} aria-hidden />
                    <span className="text-pretty">{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <section aria-labelledby="screens" className="flex flex-col gap-5">
            <h2 id="screens" className="eyebrow">
              {t.projects.page.screens}
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {project.images.map((src, i) => (
                <Reveal
                  key={src}
                  delay={(i % 2) * 0.06}
                  // An odd count leaves the last screen alone in its row: let it span both columns.
                  className={project.images.length % 2 === 1 && i === project.images.length - 1 ? "md:col-span-2" : undefined}
                >
                  <figure className="flex flex-col gap-2.5">
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
                      {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized webp */}
                      <img
                        src={src}
                        srcSet={screenshotSrcSet(src)}
                        sizes={project.images.length % 2 === 1 && i === project.images.length - 1 ? "(min-width: 1024px) 1000px, 100vw" : "(min-width: 768px) 500px, 100vw"}
                        alt={copy.alts[i] ?? ""}
                        width={1440}
                        height={810}
                        loading="lazy"
                        decoding="async"
                        className="aspect-video w-full object-cover object-top"
                      />
                    </div>
                    <figcaption className="text-sm text-zinc-500">{copy.alts[i]}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>

          <Reveal>
            <a
              href={projectPath(lang, next.slug)}
              className="group grid items-center gap-5 rounded-3xl border border-white/[0.07] bg-zinc-900/30 p-4 transition-colors hover:border-white/[0.14] sm:grid-cols-[1fr_280px] sm:p-6"
            >
              <div className="flex flex-col gap-2">
                <span className="eyebrow">{t.projects.page.next}</span>
                <span className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-zinc-50">
                  {nextCopy.title}
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
                <span className="text-sm text-pretty text-zinc-400">{nextCopy.summary}</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
              <img
                src={next.images[0].replace(/\.webp$/, "-720.webp")}
                alt=""
                width={720}
                height={405}
                loading="lazy"
                className="aspect-video w-full rounded-xl border border-white/10 object-cover object-top"
              />
            </a>
          </Reveal>
        </article>
      </main>

      <Footer />
      <LangSuggest />
    </>
  );
}
