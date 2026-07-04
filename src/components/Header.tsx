"use client";

import { useState } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { Logo } from "./Logo";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ showLogo = true }: { showLogo?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { name: t("header", "about"), href: "#sobre" },
    { name: t("header", "experience"), href: "#experiencia" },
    { name: t("header", "education"), href: "#educacao" },
    { name: t("header", "courses"), href: "#cursos" },
    { name: t("header", "projects"), href: "#projetos" },
    { name: t("header", "contact"), href: "#contato" },
  ];

  const iosSpring: Transition = {
    type: "spring",
    stiffness: 300,
    damping: 25,
    mass: 0.5,
  };

  return (
    <motion.header
      layout
      transition={iosSpring}
      className="fixed top-6 left-1/2 z-50 w-[90%] max-w-4xl -translate-x-1/2 overflow-hidden rounded-4xl bg-zinc-900/40 backdrop-blur-md shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.2),inset_-0.5px_-0.5px_0px_rgba(255,255,255,0.04),0_12px_32px_0_rgba(0,0,0,0.4)]"
    >
      <div className="flex h-14 items-center justify-between px-6">
        
        <div className="shrink-0 flex items-center min-w-12.5">
          {showLogo && (
            <motion.div layoutId="logo-container" className="flex items-center">
              <a href="#" className="transition-opacity hover:opacity-80" aria-label="Home">
                <Logo className="h-5 w-auto text-zinc-100" />
              </a>
            </motion.div>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-6">
            <nav>
                <ul className="flex items-center gap-5">
                    {navLinks.map((link) => (
                    <li key={link.name}>
                        <a
                        href={link.href}
                        className="text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100 whitespace-nowrap"
                        >
                        {link.name}
                        </a>
                    </li>
                    ))}
                </ul>
            </nav>
            <div className="h-4 w-px bg-white/10" aria-hidden="true" />
            <LanguageSwitcher />
        </div>

        <motion.div layout className="lg:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.5 rounded-full hover:bg-white/5 transition-colors focus:outline-none"
            aria-label="Alternar menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={iosSpring}
              className="block h-0.5 w-5 rounded-full bg-zinc-300"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={iosSpring}
              className="block h-0.5 w-5 rounded-full bg-zinc-300"
            />
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={iosSpring}
            className="lg:hidden border-t border-white/5"
          >
            <ul className="flex flex-col gap-4 px-6 pb-6 pt-4">
              {navLinks.map((link) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...iosSpring, delay: 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-[17px] font-normal tracking-tight text-zinc-300 transition-colors hover:text-white"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}