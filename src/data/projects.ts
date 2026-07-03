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
    title: "F1 PRO Dashboard",
    description: "Painel interativo para acompanhamento de F1 em tempo real com telemetria e dados em tempo real.",
    images: ["/projects/f1-1.webp", "/projects/f1-2.webp", "/projects/f1-3.webp", "/projects/f1-4.webp"],
    tags: ["Next.js", "TypeScript", "Tailwind", "API", "Dashboard"],
    links: {
      live: "https://f1dash.pages.dev/",
      repo: "https://github.com/GroundWave96/f1-dashboard",
    },
  },
];