"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageProvider";
import { GithubIcon } from "../BrandIcons";
import { BrowserFrame } from "./BrowserFrame";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const returnTo = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      // Keep Tab inside the dialog.
      if (e.key === "Tab" && panelRef.current) {
        const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnTo?.focus?.({ preventScroll: true });
    };
  }, [project, onClose]);

  const copy = project ? t.projects.items[project.id] : null;

  return (
    <AnimatePresence>
      {project && copy && (
        <motion.div
          key={project.id}
          className="fixed inset-0 z-70 flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-zinc-950/95 shadow-2xl backdrop-blur-xl sm:rounded-3xl"
            style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 30px 80px -20px color-mix(in srgb, ${project.accent} 25%, transparent)` }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/5 px-5 py-4 sm:px-7">
              <div className="flex min-w-0 flex-col gap-1.5">
                <span className="eyebrow">
                  {copy.context} · {project.year}
                </span>
                <h2 id="project-modal-title" className="text-2xl font-semibold tracking-tight text-zinc-50">
                  {copy.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={t.actions.close}
                className="glass flex size-9 shrink-0 items-center justify-center rounded-full text-zinc-300 transition-colors hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain px-5 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-7">
              <BrowserFrame images={project.images} alts={copy.alts} url={project.links.live} interval={0} large priority />

              <p className="mt-6 text-pretty text-zinc-300">{copy.summary}</p>

              <div className="mt-8 grid gap-8 sm:grid-cols-[1fr_1.3fr]">
                <div className="flex flex-col gap-2">
                  <h3 className="eyebrow">{t.projects.labels.challenge}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-zinc-400">{copy.challenge}</p>

                  <h3 className="eyebrow mt-6">{t.projects.labels.stack}</h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <li key={s} className="tag">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="eyebrow">{t.projects.labels.highlights}</h3>
                  <ul className="flex flex-col gap-3">
                    {copy.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                        <Check className="mt-0.5 size-4 shrink-0" style={{ color: project.accent }} aria-hidden />
                        <span className="text-pretty">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2 border-t border-white/5 pt-5">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-1.5 rounded-full bg-zinc-100 px-5 text-sm font-semibold text-zinc-950 transition-[transform,background-color] hover:bg-white active:scale-[0.97]"
                  >
                    {t.actions.open_site}
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                )}
                {project.links.repo && (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium text-zinc-200 transition-[transform,background-color] hover:bg-zinc-800/60 active:scale-[0.97]"
                  >
                    <GithubIcon className="size-4" />
                    {t.actions.open_repo}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
