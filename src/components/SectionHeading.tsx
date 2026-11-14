import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}

export function SectionHeading({ eyebrow, title, children }: SectionHeadingProps) {
  return (
    <Reveal className="mb-10 flex flex-col gap-3 sm:mb-12">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="text-3xl font-medium tracking-tight text-balance text-zinc-100 sm:text-4xl">{title}</h2>
      {children && <p className="max-w-xl text-pretty text-zinc-400">{children}</p>}
    </Reveal>
  );
}
