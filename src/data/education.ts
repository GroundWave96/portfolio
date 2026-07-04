// src/data/education.ts
import { TimelineItemProps } from "@/components/Timeline";

export const education: TimelineItemProps[] = [
  {
    id: 1,
    title: "Técnico em Mecatrônica",
    subtitle: "Colégio Pentágono - Ensino Médio Técnico",
    period: "Concluído em 2016",
    description: "Integração prática de mecânica, eletrônica e programação. Desenvolvimento de projetos integradores, como painéis solares com rastreamento, programação em Arduino e fundamentos de usinagem e construção de circuitos eletrônicos.",
    tags: ["Arduino", "Eletrônica", "Automação", "C", "Desenho Técnico"]
  },
  {
    id: 2,
    title: "Engenharia Mecânica",
    subtitle: "UNINOVE - Bacharelado",
    period: "Concluído em 2022",
    description: "Formação com forte base matemática e estatística, englobando disciplinas de cálculo estrutural, aerodinâmica e CNC. O curso desenvolveu um sólido rigor analítico e capacidade de resolução de problemas complexos.",
    tags: ["Estatística", "Matemática Aplicada", "AutoCAD", "CNC", "Aerodinâmica"]
  },
  {
    id: 3,
    title: "Análise e Desenvolvimento de Sistemas",
    subtitle: "FATEC São Caetano do Sul - Tecnólogo",
    period: "Concluído em 2025",
    description: "Formação aprofundada em engenharia de software e desenvolvimento web. Abrange desde a lógica de algoritmos em C/C++ e Java, até inteligência artificial e arquitetura de sistemas, criando uma visão completa do ecossistema de TI.",
    tags: ["Desenvolvimento Web", "Lógica de Programação", "C/C++", "Inteligência Artificial", "HTML/CSS"]
  }
];