"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function About() {
    const primarySkills = ["React", "TypeScript", "Next.js", "Tailwind CSS", "GSAP"];
    const secondarySkills = ["SQL", "CI/CD", "C#", "Python", "VBA"];
    const { t } = useLanguage();

    return (
        <section id="sobre" className="py-24 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mx-auto max-w-2xl"
            >
                <h2 className="mb-8 text-3xl font-medium text-zinc-100">
                    {t("about", "title")}
                </h2>
                <div className="space-y-6 text-zinc-400">
                    <p>{t("about", "p1")}</p>
                    <p>{t("about", "p2")}</p>
                </div>

                <div className="mt-10">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                        {t("about", "skills_primary")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {primarySkills.map((skill) => (
                            <span key={skill} className="text-xs font-medium text-zinc-300 px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                        {t("about", "skills_secondary")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {secondarySkills.map((skill) => (
                            <span key={skill} className="text-xs font-medium text-zinc-500 px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}