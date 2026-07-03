export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  techs: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Co-fundador & Desenvolvedor Web",
    company: "Apex Dev Studio",
    period: "2026 - Presente",
    description: "Idealização e desenvolvimento de agência focada em soluções web e identidade visual. Responsável por todo o ciclo de desenvolvimento, desde o levantamento de requisitos até o deploy, entregando produtos de alta performance para clientes reais.",
    techs: ["Next.js", "React", "Tailwind CSS", "Typescript", "Figma", "SEO", "Hospedagem Web", "Design Responsivo"]
  },
  {
    id: 2,
    role: "Consultor de TI",
    company: "Master MR",
    period: "2024 - Presente",
    description: "Atuação direta com análise de dados, validação de projetos e automação de processos corporativos. Desenvolvimento de soluções para otimização técnica de hardware e integração de fluxos de dados, conectando regras de negócio complexas a resultados práticos.",
    techs: ["Python", "SQL", "Análise de Dados", "VBA", "Power BI"]
  }
];