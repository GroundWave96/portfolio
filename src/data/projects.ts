import type { Dictionary } from "@/i18n/dictionaries";

export type ProjectId = keyof Dictionary["projects"]["items"];

export interface Project {
  id: ProjectId;
  /** "own" = personal product, "client" = delivered for a client. */
  kind: "own" | "client";
  year: number;
  featured?: boolean;
  inProgress?: boolean;
  /** Accent used for the card glow, matching each project's own brand. */
  accent: string;
  /** Screenshot paths; alt texts live in the dictionaries (same order). */
  images: string[];
  stack: string[];
  links: { live?: string; repo?: string };
}

export const projects: Project[] = [
  {
    id: "f1",
    kind: "own",
    year: 2026,
    featured: true,
    accent: "#e10600",
    images: [
      "/projects/f1-inicio.webp",
      "/projects/f1-campeonato.webp",
      "/projects/f1-calendario.webp",
      "/projects/f1-resultados.webp",
      "/projects/f1-sessao.webp",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Cloudflare Workers", "D1", "PWA"],
    links: {
      live: "https://f1dash.pages.dev/",
      repo: "https://github.com/GroundWave96/f1-dashboard",
    },
  },
  {
    id: "cuboguia",
    kind: "own",
    year: 2026,
    featured: true,
    accent: "#6d7cff",
    images: [
      "/projects/cuboguia-inicio.webp",
      "/projects/cuboguia-3d.webp",
    ],
    stack: ["TypeScript", "Three.js", "Vite", "Vitest", "Cloudflare Pages"],
    links: {
      live: "https://cuboguia.pages.dev/",
      repo: "https://github.com/GroundWave96/cuboguia",
    },
  },
  {
    id: "ortiz",
    kind: "client",
    year: 2026,
    accent: "#4f8fd6",
    images: [
      "/projects/ortiz-inicio.webp",
      "/projects/ortiz-sobre.webp",
    ],
    stack: ["React", "Vite", "TypeScript", "Figma", "SEO"],
    links: { live: "https://ortizprojetoeengenharia.eng.br/" },
  },
  {
    id: "apex",
    kind: "client",
    year: 2026,
    inProgress: true,
    accent: "#f26b1d",
    images: [
      "/projects/apex-inicio.webp",
      "/projects/apex-servicos.webp",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Cloudflare Workers", "SEO"],
    links: { live: "https://www.apexdevstudio.workers.dev/pt" },
  },
];
