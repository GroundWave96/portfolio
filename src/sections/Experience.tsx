"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown, TrendingUp } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { formatMonth } from "@/i18n/dictionaries";
import { companies, type Role } from "@/data/career";
import { SectionHeading } from "@/components/SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

function RoleBlock({ role, showPromotion }: { role: Role; showPromotion: boolean }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const copy = t.experience.roles[role.id];
  const current = role.end === null;
  const period = `${formatMonth(t, role.start)} – ${role.end ? formatMonth(t, role.end) : t.experience.present}`;
  const panelId = `role-${role.id}`;

  return (
    <div className="flex flex-col gap-3">
      {showPromotion && (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-2.5 py-1 text-[11px] font-medium text-emerald-300">
          <TrendingUp className="size-3.5" aria-hidden />
          {t.experience.promotion}
        </span>
      )}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h4 className="flex flex-wrap items-center gap-2 text-lg font-medium text-zinc-100">
          {copy.title}
          {current && (
            <span className="rounded-full bg-sky-400/10 px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider text-sky-300 uppercase">
              {t.experience.current}
            </span>
          )}
        </h4>
        <span className="shrink-0 font-mono text-xs text-zinc-500 tabular-nums">{period}</span>
      </div>

      <p className="text-sm leading-relaxed text-pretty text-zinc-400">{copy.summary}</p>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="flex flex-col gap-2 overflow-hidden"
          >
            {copy.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-zinc-500" aria-hidden />
                <span className="text-pretty">{b}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center gap-1.5">
        {role.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="inline-flex w-fit items-center gap-1 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-200"
      >
        {open ? t.experience.show_less : t.experience.show_more}
        <ChevronDown className={`size-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
    </div>
  );
}

export function Experience() {
  const { t } = useLanguage();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 80%", "end 55%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experiencia" className="px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow={t.experience.eyebrow} title={t.experience.title} />

        <ol ref={listRef} className="relative flex max-w-3xl flex-col gap-14 pl-8 sm:pl-12">
          {/* Track and the part already "travelled" */}
          <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-zinc-800" />
          <motion.span
            aria-hidden
            style={{ scaleY: line }}
            className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-gradient-to-b from-sky-300 via-indigo-300 to-emerald-300"
          />

          {companies.map((company) => {
            const isCurrent = company.roles.some((r) => r.end === null);
            return (
              <motion.li
                key={company.id}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 0.6, ease }}
                className="relative"
              >
                <motion.span
                  aria-hidden
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                  transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.15 }}
                  className={`absolute top-1.5 -left-8 size-[11px] rounded-full border-2 bg-zinc-950 sm:-left-12 ${
                    isCurrent ? "border-sky-300 shadow-[0_0_12px_rgba(125,211,252,0.6)]" : "border-zinc-500"
                  }`}
                />
                <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-xl font-semibold tracking-tight text-zinc-50">{company.name}</h3>
                  <span className="text-sm text-zinc-500">{t.experience.companies[company.id].note}</span>
                </div>

                <div className={`flex flex-col gap-8 ${company.roles.length > 1 ? "border-l border-dashed border-zinc-800 pl-5" : ""}`}>
                  {company.roles.map((role, i) => (
                    <RoleBlock key={role.id} role={role} showPromotion={company.roles.length > 1 && i === 0} />
                  ))}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
