"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";
import { courses, degrees } from "@/data/career";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

type Tab = "degrees" | "courses";
const TABS: Tab[] = ["degrees", "courses"];
const ease = [0.22, 1, 0.36, 1] as const;

export function Education() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<Tab>("degrees");
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ degrees: null, courses: null });

  const labels: Record<Tab, string> = { degrees: t.education.tab_degrees, courses: t.education.tab_courses };
  const counts: Record<Tab, number> = { degrees: degrees.length, courses: courses.length };

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = TABS[(TABS.indexOf(tab) + (e.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length];
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  const years = [...new Set(courses.map((c) => c.year))].sort((a, b) => b - a);

  return (
    <section id="formacao" className="px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow={t.education.eyebrow} title={t.education.title} />

        <Reveal>
          <div role="tablist" aria-label={t.education.title} onKeyDown={onKeyDown} className="mb-8 inline-flex rounded-full border border-white/[0.07] bg-zinc-900/40 p-1">
            {TABS.map((id) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  ref={(el) => {
                    tabRefs.current[id] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${id}`}
                  aria-selected={active}
                  aria-controls={`panel-${id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setTab(id)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${active ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-100"}`}
                >
                  {active && (
                    <motion.span layoutId="edu-tab" className="absolute inset-0 rounded-full bg-zinc-100" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                  )}
                  <span className="relative">
                    {labels[id]} <span className={`font-mono text-xs ${active ? "text-zinc-500" : "text-zinc-600"}`}>{counts[id]}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            id={`panel-${tab}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            className="max-w-3xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease }}
          >
            {tab === "degrees" ? (
              <ol className="flex flex-col gap-4">
                {degrees.map((d, i) => {
                  const copy = t.education.items[d.id];
                  return (
                    <motion.li
                      key={d.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                      transition={{ duration: 0.55, delay: i * 0.06, ease }}
                      className="flex flex-col gap-3 rounded-3xl border border-white/[0.07] bg-zinc-900/30 p-6 transition-colors hover:border-white/[0.12]">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                          <h3 className="text-lg font-medium text-zinc-100">{copy.title}</h3>
                          <span className="shrink-0 font-mono text-xs text-zinc-500 tabular-nums">
                            {d.start} – {d.end}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-300">{copy.school}</p>
                        <p className="text-sm leading-relaxed text-pretty text-zinc-400">{copy.description}</p>
                        <ul className="flex flex-wrap gap-1.5">
                          {copy.tags.map((tag) => (
                            <li key={tag} className="tag">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </motion.li>
                  );
                })}
              </ol>
            ) : (
              <div className="flex flex-col gap-8">
                {years.map((year) => (
                  <div key={year} className="grid gap-3 sm:grid-cols-[4rem_1fr] sm:gap-6">
                    <span className="font-mono text-sm text-zinc-500 tabular-nums sm:pt-3">{year}</span>
                    <ul className="flex flex-col divide-y divide-white/[0.05] rounded-2xl border border-white/[0.07] bg-zinc-900/30">
                      {courses
                        .filter((c) => c.year === year)
                        .map((c) => (
                          <li key={c.id} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                            <span className="text-sm text-pretty text-zinc-200">{t.courses.items[c.id]}</span>
                            <span className="shrink-0 text-xs text-zinc-500">{c.institution}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
