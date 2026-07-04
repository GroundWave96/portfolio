export interface Course {
  id: number;
  title: string;
  institution: string;
  year: number;
}

export const courses: Course[] = [
  { id: 1, title: "C# COMPLETO Programação Orientada a Objetos", institution: "Udemy", year: 2021 },
  { id: 2, title: "A partir do zero: HTML e CSS para projetos web", institution: "Alura", year: 2023 },
  { id: 3, title: "Aprenda a programar em C# com Orientação a Objetos", institution: "Alura", year: 2023 },
  { id: 4, title: "Git Completo: Do Básico ao Avançado", institution: "Udemy", year: 2025 },
  { id: 5, title: "Python para Automação", institution: "Master MR", year: 2025 },
  { id: 6, title: "Curso de Excel VBA + SAP Gui Scripting", institution: "Master MR", year: 2025 },
  { id: 7, title: "Introduction to JavaScript Programming", institution: "Domestika", year: 2026 },
  { id: 8, title: "Master Figma from 0 to 100", institution: "Domestika", year: 2026 },
  { id: 9, title: "Logo Design: From Concept to Presentation", institution: "Domestika", year: 2026 }
];