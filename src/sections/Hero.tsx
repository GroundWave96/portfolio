"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, ArrowRight, FileText, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useIntro } from "@/components/providers/IntroProvider";
import { profile, whatsappUrl } from "@/data/profile";
import { useCopyEmail } from "@/lib/useCopyEmail";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/BrandIcons";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const word: Variants = {
  hidden: { opacity: 0, y: "0.45em", filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease } },
};
const fadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease } },
});

function Words({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span variants={container} className={className}>
      {text.split(" ").map((w, i) => (
        <motion.span key={`${w}-${i}`} variants={word} className="inline-block whitespace-pre">
          {w}
          {" "}
        </motion.span>
      ))}
    </motion.span>
  );
}

const iconButton =
  "glass flex size-12 items-center justify-center rounded-full text-zinc-200 transition-[transform,background-color,color] duration-200 hover:-translate-y-0.5 hover:bg-zinc-800/60 hover:text-white active:scale-95";

export function Hero() {
  const { t, lang } = useLanguage();
  const { ready } = useIntro();
  const copyEmail = useCopyEmail();
  const state = ready ? "show" : "hidden";

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pt-28 pb-20 text-center"
    >
      {/* key={lang} replays the entrance when the language changes */}
      <motion.div key={lang} initial="hidden" animate={state} className="flex max-w-3xl flex-col items-center">
        <motion.a
          href="#experiencia"
          variants={fadeUp(0)}
          className="glass mb-8 inline-flex max-w-full items-center gap-2.5 rounded-full py-1.5 pr-4 pl-3 text-xs text-zinc-400 transition-colors hover:text-zinc-200 sm:text-[13px]"
        >
          <span className="live-dot size-2 shrink-0 rounded-full bg-emerald-400" aria-hidden />
          <span className="truncate">
            {t.hero.status}: <span className="font-medium text-zinc-100">{t.hero.status_role}</span>
            <span className="text-zinc-500"> · </span>
            {t.hero.status_at}
          </span>
        </motion.a>

        <h1 className="text-[clamp(2.75rem,10vw,5.5rem)] leading-[1.02] font-medium tracking-[-0.035em] text-zinc-50">
          <Words text={t.hero.name} />
        </h1>

        <p className="mt-6 max-w-xl text-lg text-pretty text-zinc-400 sm:text-xl">
          <Words text={t.hero.tagline} />
        </p>

        <motion.ul
          variants={fadeUp(0.5)}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-xs text-zinc-500"
        >
          <li className="flex items-center gap-1.5">
            <MapPin className="size-3.5" aria-hidden />
            {profile.location}
          </li>
          <li aria-hidden className="text-zinc-700">/</li>
          <li>{t.hero.focus}</li>
          <li aria-hidden className="text-zinc-700">/</li>
          <li>{t.hero.languages}</li>
        </motion.ul>

        <motion.div variants={fadeUp(0.6)} className="mt-10 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <a
            href="#projetos"
            className="group flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-100 px-6 text-sm font-semibold text-zinc-950 transition-[transform,background-color] hover:bg-white active:scale-[0.97]"
          >
            {t.hero.cta_projects}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </a>
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="glass flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium text-zinc-200 transition-[transform,background-color] hover:bg-zinc-800/60 active:scale-[0.97]"
          >
            <FileText className="size-4" aria-hidden />
            {t.hero.cta_cv}
          </a>
        </motion.div>

        <motion.div variants={fadeUp(0.7)} className="mt-5 flex items-center gap-3">
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconButton}>
            <GithubIcon className="size-5" />
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconButton}>
            <LinkedinIcon className="size-5" />
          </a>
          <a
            href={whatsappUrl(t.actions.whatsapp_message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className={iconButton}
          >
            <WhatsappIcon className="size-5" />
          </a>
          <button type="button" onClick={copyEmail} aria-label={t.actions.copy_email} title={t.actions.copy_email} className={iconButton}>
            <Mail className="size-5" />
          </button>
        </motion.div>
      </motion.div>

      <motion.a
        href="#projetos"
        aria-label={t.hero.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 hidden text-zinc-600 transition-colors hover:text-zinc-300 sm:block"
      >
        <motion.span
          className="block"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
