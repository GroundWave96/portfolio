"use client";

import { CodeXml, Database, Languages, MapPin, GraduationCap, Workflow, Wrench, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { skillGroups } from "@/data/career";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

const groups: { key: keyof typeof skillGroups; icon: LucideIcon; tint: string }[] = [
  { key: "data", icon: Database, tint: "text-sky-300 bg-sky-400/10" },
  { key: "platform", icon: Workflow, tint: "text-violet-300 bg-violet-400/10" },
  { key: "web", icon: CodeXml, tint: "text-emerald-300 bg-emerald-400/10" },
];

const card = "h-full rounded-3xl border border-white/[0.07] bg-zinc-900/30 p-6 transition-colors hover:border-white/[0.12]";

export function About() {
  const { t } = useLanguage();
  const facts = [
    { icon: MapPin, label: t.about.facts.based, value: t.about.facts.based_value },
    { icon: GraduationCap, label: t.about.facts.background, value: t.about.facts.background_value },
    { icon: Languages, label: t.about.facts.languages, value: t.about.facts.languages_value },
  ];

  return (
    <section id="sobre" className="px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />

        <div className="grid gap-4 md:grid-cols-3">
          <Reveal className="md:col-span-2">
            <div className={`${card} flex flex-col gap-5 text-pretty text-zinc-300 sm:p-8`}>
              <p className="text-lg leading-relaxed text-zinc-200">{t.about.p1}</p>
              <p className="leading-relaxed text-zinc-400">{t.about.p2}</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className={`${card} flex flex-col justify-between gap-6`}>
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-3">
                  <Icon className="mt-0.5 size-4 shrink-0 text-zinc-500" aria-hidden />
                  <div className="flex flex-col gap-1">
                    <dt className="eyebrow">{label}</dt>
                    <dd className="text-sm text-zinc-200">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          {groups.map(({ key, icon: Icon, tint }, i) => (
            <Reveal key={key} delay={0.05 + i * 0.07}>
              <div className={`${card} flex flex-col gap-4`}>
                <div className="flex items-center gap-3">
                  <span className={`flex size-9 items-center justify-center rounded-xl ${tint}`}>
                    <Icon className="size-[18px]" aria-hidden />
                  </span>
                  <h3 className="font-medium text-zinc-100">{t.about.skills[key]}</h3>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {skillGroups[key].map((s) => (
                    <li key={s} className="tag">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.1} className="md:col-span-3">
            <div className={`${card} flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-5`}>
              <div className="flex shrink-0 items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-zinc-400/10 text-zinc-300">
                  <Wrench className="size-[18px]" aria-hidden />
                </span>
                <h3 className="font-medium text-zinc-100">{t.about.skills.tools}</h3>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {skillGroups.tools.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
