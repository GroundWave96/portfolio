"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Contact() {
  const glassClasses = "px-6 py-3 rounded-full font-medium transition-all hover:scale-105 active:scale-95";
  const { t } = useLanguage();

  return (
    <section id="contato" className="scroll-mt-28 py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mx-auto max-w-xl text-center"
      >
        <h2 className="text-3xl font-medium text-zinc-100 mb-4">
          {t("contact", "title")}
        </h2>
        <p className="text-zinc-400 mb-10 max-w-sm mx-auto">
          {t("contact", "description")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/5511953725013?text=Ol%C3%A1,%20Gabriel!%20Visitei%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar."
            target="_blank"
            rel="noopener noreferrer"
            className={`${glassClasses} bg-zinc-100 text-zinc-950 hover:bg-white`}
          >
            {t("contact", "btn_contact")}
          </a>
          <a
            href="/curriculo.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`${glassClasses} bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-600`}
          >
            {t("contact", "btn_cv")}
          </a>
        </div>
      </motion.div>
    </section>
  );
}