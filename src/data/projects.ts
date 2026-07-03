export interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  links: {
    live: string;
    repo: string;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: "F1 Dashboard",
    description: "Painel interativo para acompanhamento de F1 em atualizado com telemetria e dados das corridas e campeonatos.",
    images: ["/projects/f1-1.webp", "/projects/f1-2.webp", "/projects/f1-3.webp", "/projects/f1-4.webp"],
    tags: ["Next.js", "TypeScript", "Tailwind", "API", "Dashboard"],
    links: {
      live: "https://f1dash.pages.dev/",
      repo: "https://github.com/GroundWave96/f1-dashboard",
    },
  },
  {
    id: 2,
    title: "Teste",
    description: "Teste.",
    images: ["/projects/f1-1.webp", "/projects/f1-2.webp", "/projects/f1-3.webp", "/projects/f1-4.webp"],
    tags: ["Teste", "Teste 2"],
    links: {
      live: "https://f1dash.pages.dev/",
      repo: "https://github.com/GroundWave96/f1-dashboard",
    },
  },
];