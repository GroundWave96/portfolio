"use client";
import { Timeline } from "@/components/Timeline";
import { useLanguage, languages } from "@/context/LanguageContext";

export function Experience() {
  const { lang, t } = useLanguage();

  const experienceItems = languages[lang].experience.items;

  return (
    <section id="experiencia" className="py-24 px-6">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-medium text-zinc-100 mb-12">
          {t("experience", "title")}
        </h2>
        <Timeline items={experienceItems} />
      </div>
    </section>
  );
}