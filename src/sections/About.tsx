"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function About() {
    const primarySkills = ["React", "TypeScript", "Next.js", "Tailwind CSS", "GSAP"];
    const secondarySkills = ["SQL", "CI/CD", "C#", "Python", "VBA"];
    const { t } = useLanguage();

    return (
        <section id="sobre" className="py-24 px-6">
            <div className="mx-auto max-w-2xl">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: false, margin: "-50px" }}
                    className="mb-8 text-3xl font-medium text-zinc-100"
                >
                    {t("about", "title")}
                </motion.h2>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    className="space-y-6 text-zinc-400"
                >
                    <p>{t("about", "p1")}</p>
                    <p>{t("about", "p2")}</p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: false, margin: "-50px" }}
                    className="mt-10"
                >
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                        {t("about", "skills_primary")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {primarySkills.map((skill, index) => (
                            <motion.span 
                                key={skill} 
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
                                viewport={{ once: false }}
                                className="text-xs font-medium text-zinc-300 px-2 py-1 rounded bg-zinc-900 border border-zinc-800"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: false, margin: "-50px" }}
                    className="mt-8"
                >
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                        {t("about", "skills_secondary")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {secondarySkills.map((skill, index) => (
                            <motion.span 
                                key={skill} 
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.3 + (index * 0.05) }}
                                viewport={{ once: false }}
                                className="text-xs font-medium text-zinc-300 px-2 py-1 rounded bg-zinc-900 border border-zinc-800"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}