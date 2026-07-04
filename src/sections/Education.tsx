// src/sections/Education.tsx
import { education } from "@/data/education";
import dict from "@/locales/pt.json";
import { Timeline } from "@/components/Timeline";

export function Education() {
  return (
    <section id="educacao" className="py-12 px-6"> {/* py menor para colar na experiência */}
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-medium text-zinc-100 mb-12">
          {dict.education.title}
        </h2>
        <Timeline items={education} />
      </div>
    </section>
  );
}