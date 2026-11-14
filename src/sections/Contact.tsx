"use client";

import type { ReactNode } from "react";
import { ArrowUpRight, Copy, FileText, Mail } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { profile, whatsappUrl } from "@/data/profile";
import { useCopyEmail } from "@/lib/useCopyEmail";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/BrandIcons";

const row =
  "group flex w-full items-center gap-4 rounded-2xl border border-white/[0.07] bg-zinc-900/30 px-5 py-4 text-left transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-zinc-900/60 active:scale-[0.99]";

function RowContent({ icon, label, value, trailing }: { icon: ReactNode; label: string; value: string; trailing: ReactNode }) {
  return (
    <>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-zinc-200">{icon}</span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm font-medium text-zinc-100">{label}</span>
        <span className="truncate text-sm text-zinc-500">{value}</span>
      </span>
      <span className="text-zinc-600 transition-colors group-hover:text-zinc-200">{trailing}</span>
    </>
  );
}

export function Contact() {
  const { t, lang } = useLanguage();
  const copyEmail = useCopyEmail();
  const arrow = <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />;

  return (
    <section id="contato" className="px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title}>
          {t.contact.description}
        </SectionHeading>

        <div className="grid max-w-3xl gap-3 sm:grid-cols-2">
          <Reveal delay={0}>
            <a href={whatsappUrl(t.actions.whatsapp_message)} target="_blank" rel="noopener noreferrer" className={row}>
              <RowContent icon={<WhatsappIcon className="size-5" />} label={t.contact.whatsapp} value={profile.phoneDisplay} trailing={arrow} />
            </a>
          </Reveal>
          <Reveal delay={0.05}>
            <button type="button" onClick={copyEmail} className={row} title={t.contact.copy_hint}>
              <RowContent
                icon={<Mail className="size-5" aria-hidden />}
                label={t.contact.email}
                value={profile.email}
                trailing={<Copy className="size-4" aria-hidden />}
              />
            </button>
          </Reveal>
          <Reveal delay={0.1}>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={row}>
              <RowContent icon={<LinkedinIcon className="size-5" />} label={t.contact.linkedin} value="in/gabrielhfpimentel" trailing={arrow} />
            </a>
          </Reveal>
          <Reveal delay={0.15}>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className={row}>
              <RowContent icon={<GithubIcon className="size-5" />} label={t.contact.github} value="GroundWave96" trailing={arrow} />
            </a>
          </Reveal>
          <Reveal delay={0.2} className="sm:col-span-2">
            <a href={profile.cv[lang]} target="_blank" rel="noopener noreferrer" className={row}>
              <RowContent icon={<FileText className="size-5" aria-hidden />} label={t.contact.cv} value={t.contact.cv_hint} trailing={arrow} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
