"use client";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { useLanguage, languages } from "@/context/LanguageContext";

export function Projects() {
  const { lang, t } = useLanguage();
  const projectItems = languages[lang].projects.items;

  return (
    <section id="projetos" className="py-24 px-6">
      <div className="mx-auto max-w-2xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, margin: "-50px" }}
          className="text-3xl font-medium text-zinc-100 mb-12"
        >
          {t("projects", "title")}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectItems.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: false, margin: "-50px" }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}