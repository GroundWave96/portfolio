"use client";
import { ProjectCard } from "@/components/ProjectCard";
import { useLanguage, languages } from "@/context/LanguageContext";

export function Projects() {
  const { lang, t } = useLanguage();

  const projectItems = languages[lang].projects.items;

  return (
    <section id="projetos" className="scroll-mt-28 py-24 px-6">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-medium text-zinc-100 mb-12">
          {t("projects", "title")}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectItems.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}