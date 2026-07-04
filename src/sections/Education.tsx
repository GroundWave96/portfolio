"use client";
import { Timeline } from "@/components/Timeline";
import { useLanguage, languages } from "@/context/LanguageContext";

export function Education() {
  const { lang, t } = useLanguage();

  const educationItems = languages[lang].education.items;

  return (
    <section id="educacao" className="py-12 px-6">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-medium text-zinc-100 mb-12">
          {t("education", "title")}
        </h2>
        <Timeline items={educationItems} />
      </div>
    </section>
  );
}