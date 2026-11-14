"use client";

import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { projects, type ProjectId } from "@/data/projects";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { OPEN_PROJECT_EVENT } from "@/lib/sections";

export function Projects() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<ProjectId | null>(null);
  const close = useCallback(() => setOpenId(null), []);

  // The command palette can open a project directly.
  useEffect(() => {
    const onOpen = (e: Event) => setOpenId((e as CustomEvent<ProjectId>).detail);
    window.addEventListener(OPEN_PROJECT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, onOpen);
  }, []);

  const own = projects.filter((p) => p.kind === "own");
  const client = projects.filter((p) => p.kind === "client");
  const openProject = projects.find((p) => p.id === openId) ?? null;

  return (
    <section id="projetos" className="px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow={t.projects.eyebrow} title={t.projects.title}>
          {t.projects.subtitle}
        </SectionHeading>

        <h3 className="eyebrow mb-4">{t.projects.own}</h3>
        <div className="flex flex-col gap-5">
          {own.map((p, i) => (
            <Reveal key={p.id} delay={0.05}>
              <ProjectCard project={p} variant={p.featured ? "featured" : "compact"} reverse={i % 2 === 1} onOpen={() => setOpenId(p.id)} />
            </Reveal>
          ))}
        </div>

        <h3 className="eyebrow mt-14 mb-4">{t.projects.client}</h3>
        <div className="grid gap-5 md:grid-cols-2">
          {client.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="h-full">
              <ProjectCard project={p} onOpen={() => setOpenId(p.id)} />
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectModal project={openProject} onClose={close} />
    </section>
  );
}
