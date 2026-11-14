"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

/** Page sections in display order. Ids stay in Portuguese so old shared links keep working. */
export const SECTIONS = [
  { id: "projetos", label: "projects" },
  { id: "experiencia", label: "experience" },
  { id: "sobre", label: "about" },
  { id: "formacao", label: "education" },
  { id: "contato", label: "contact" },
] as const satisfies { id: string; label: keyof Dictionary["nav"] }[];

export type SectionId = (typeof SECTIONS)[number]["id"];

/** Id of the section crossing the middle of the viewport, or null while on the hero. */
export function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        const current = SECTIONS.find((s) => visible.get(s.id));
        setActive(current ? current.id : null);
      },
      // A thin band around the middle of the screen decides the active section.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

/** Lets the header and the command palette ask the Projects section to open a project. */
export const OPEN_PROJECT_EVENT = "portfolio:open-project";
export const OPEN_PALETTE_EVENT = "portfolio:open-palette";
