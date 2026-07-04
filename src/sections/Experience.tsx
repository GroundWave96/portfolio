// src/sections/Experience.tsx
import { experiences } from "@/data/experiences"; // Certifique-se de renomear as chaves neste arquivo
import dict from "@/locales/pt.json";
import { Timeline } from "@/components/Timeline";

export function Experience() {
  return (
    <section id="experiencia" className="py-24 px-6">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-medium text-zinc-100 mb-12">
          {dict.experience.title}
        </h2>
        <Timeline items={experiences} />
      </div>
    </section>
  );
}