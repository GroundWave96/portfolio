"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SocialIcon } from "@/components/SocialIcon";
import { Mail, Check } from "lucide-react";
import dict from "@/locales/pt.json";

export function Hero({ showSplash }: { showSplash: boolean }) {
    const [emailCopied, setEmailCopied] = useState(false);

    const glassClasses = "flex h-12 items-center justify-center rounded-full bg-zinc-900/40 backdrop-blur-md shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.2),inset_-0.5px_-0.5px_0px_rgba(255,255,255,0.04),0_8px_16px_0_rgba(0,0,0,0.3)] transition-all hover:bg-zinc-800/50";

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("seu.email@exemplo.com");
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
    };

    const iconClasses = "h-5 w-5 brightness-0 invert";

    return (
        <motion.section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20">
            <div className="text-center">
                <h1 className="mb-6 text-5xl font-medium tracking-tight text-zinc-100 sm:text-7xl">
                    {dict.hero.name}
                </h1>
                <p className="mx-auto max-w-xl text-lg text-zinc-400 sm:text-xl">
                    {dict.hero.role}
                </p>
            </div>

            <div className="mt-10 flex w-64 flex-col items-center gap-4">

                <a
                    href="#projetos"
                    className={`${glassClasses} w-full text-sm font-semibold text-zinc-100 hover:scale-105 active:scale-95`}
                >
                    {dict.hero.btn_projects}
                </a>

                <div className="flex w-full items-center justify-between">
                    <a href="https://github.com/GroundWave96" target="_blank" rel="noopener noreferrer" className={`${glassClasses} h-12 w-12`}>
                        <SocialIcon name="github" className={iconClasses} />
                    </a>
                    <a href="https://www.linkedin.com/in/gabrielhfpimentel/" target="_blank" rel="noopener noreferrer" className={`${glassClasses} h-12 w-12`}>
                        <SocialIcon name="linkedin" className={iconClasses} />
                    </a>
                    <a href="https://wa.me/5511953725013?text=Ol%C3%A1,%20Gabriel!%20Visitei%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar." target="_blank" rel="noopener noreferrer" className={`${glassClasses} h-12 w-12`}>
                        <SocialIcon name="whatsapp" className={iconClasses} />
                    </a>
                    <button onClick={handleCopyEmail} className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/40 backdrop-blur-md shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.2),inset_-0.5px_-0.5px_0px_rgba(255,255,255,0.04),0_8px_16px_0_rgba(0,0,0,0.3)] transition-all hover:bg-zinc-800/50 text-zinc-100">
                        {emailCopied ? <Check className="h-5 w-5 text-green-400" /> : <Mail className="h-5 w-5" />}
                        <span className="absolute -bottom-10 scale-0 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-all group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                            {emailCopied ? dict.hero.tooltip_copied : dict.hero.tooltip_copy}
                        </span>
                    </button>
                </div>
            </div>
        </motion.section>
    );
}