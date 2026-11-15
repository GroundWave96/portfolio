"use client";

import { useRef, type CSSProperties, type PointerEvent } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import type { Project } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageProvider";
import { BrowserFrame } from "./BrowserFrame";

interface ProjectCardProps {
  project: Project;
  onOpen: () => void;
  /** Featured cards lay the screenshot beside the text on large screens. */
  variant?: "featured" | "compact";
  reverse?: boolean;
}

export function ProjectCard({ project, onOpen, variant = "compact", reverse = false }: ProjectCardProps) {
  const { t } = useLanguage();
  const copy = t.projects.items[project.id];
  const ref = useRef<HTMLElement>(null);
  const featured = variant === "featured";

  // Spotlight follows the cursor through CSS variables (no React re-render).
  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const shownStack = project.stack.slice(0, featured ? 6 : 4);
  const hidden = project.stack.length - shownStack.length;

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      style={{ "--accent": project.accent, "--x": "50%", "--y": "0%" } as CSSProperties}
      className={`group relative isolate h-full overflow-hidden rounded-3xl border border-white/[0.07] bg-zinc-900/30 p-4 transition-[border-color,transform] duration-300 hover:border-white/[0.12] sm:p-5 ${
        featured ? "lg:grid lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-8 lg:p-6" : ""
      }`}
    >
      {/* Glow fill */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(520px circle at var(--x) var(--y), color-mix(in srgb, var(--accent) 13%, transparent), transparent 45%)",
        }}
      />
      {/* Glow border */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          padding: 1,
          background:
            "radial-gradient(360px circle at var(--x) var(--y), color-mix(in srgb, var(--accent) 70%, transparent), transparent 55%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className={`relative z-10 ${featured && reverse ? "lg:order-2" : ""}`}>
        <BrowserFrame images={project.images} alts={copy.alts} url={project.links.live} interval={featured ? 4500 : 5500} />
        {project.inProgress && (
          <span className="absolute top-1 right-2 inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-zinc-950/90 px-2 py-0.5 text-[11px] font-medium text-amber-300 backdrop-blur">
            <span className="size-1.5 animate-pulse rounded-full bg-amber-300" aria-hidden />
            {t.projects.in_progress}
          </span>
        )}
      </div>

      <div className={`mt-5 flex flex-col gap-3 ${featured ? "lg:mt-0" : ""}`}>
        <span className="eyebrow leading-relaxed">
          {copy.context} · {project.year}
        </span>

        <h3 className={`font-semibold tracking-tight text-zinc-50 ${featured ? "text-2xl" : "text-xl"}`}>
          {/* Stretched button: the whole card (outside the screenshots and links) opens the details. */}
          <button type="button" onClick={onOpen} className="text-left after:absolute after:inset-0 after:content-['']">
            {copy.title}
          </button>
        </h3>

        <p className="text-sm leading-relaxed text-pretty text-zinc-400">{copy.summary}</p>

        <ul className="mt-1 flex flex-wrap gap-1.5" aria-label={t.projects.labels.stack}>
          {shownStack.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
          {hidden > 0 && <li className="tag text-zinc-500">+{hidden}</li>}
        </ul>

        <div className="relative z-10 mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-zinc-100 px-3 text-[13px] sm:px-4 sm:text-sm font-medium text-zinc-950 transition-[transform,background-color] hover:bg-white active:scale-[0.97]"
          >
            <Plus className="size-4" aria-hidden />
            {t.actions.details}
          </button>
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[13px] sm:px-4 sm:text-sm font-medium text-zinc-200 transition-[transform,background-color] hover:bg-zinc-800/60 active:scale-[0.97]"
            >
              {t.actions.open_site}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
