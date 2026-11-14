import type { Dictionary } from "@/i18n/dictionaries";

type RoleId = keyof Dictionary["experience"]["roles"];
type CompanyId = keyof Dictionary["experience"]["companies"];
type DegreeId = keyof Dictionary["education"]["items"];
type CourseId = keyof Dictionary["courses"]["items"];

/** Year-month, e.g. "2024-11". */
export type YearMonth = `${number}-${string}`;

export interface Role {
  id: RoleId;
  start: YearMonth;
  /** null = current role */
  end: YearMonth | null;
  tags: string[];
}

export interface Company {
  id: CompanyId;
  name: string;
  /** Most recent role first. */
  roles: Role[];
}

export const companies: Company[] = [
  {
    id: "timenow",
    name: "Timenow",
    roles: [
      {
        id: "timenow-analyst",
        start: "2026-09",
        end: null,
        tags: ["Python", "SAP", "Power Apps", "SharePoint", "Power BI"],
      },
    ],
  },
  {
    id: "apex",
    name: "Apex Dev Studio",
    roles: [
      {
        id: "apex-founder",
        start: "2026-04",
        end: null,
        tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Figma", "SEO", "Cloudflare"],
      },
    ],
  },
  {
    id: "mastermr",
    name: "Master MR Tecnologia",
    roles: [
      {
        id: "mastermr-consultant",
        start: "2025-05",
        end: "2026-08",
        tags: ["Python", "SAP GUI", "Power BI", "DAX", "SQL Server", "Power Automate", "VBA"],
      },
      {
        id: "mastermr-intern",
        start: "2024-11",
        end: "2025-05",
        tags: ["Power BI", "Python", "VBA", "SQL", "ETL", "GitHub"],
      },
    ],
  },
];

export interface Degree {
  id: DegreeId;
  start: number;
  end: number;
}

/** Most recent first. */
export const degrees: Degree[] = [
  { id: "fatec", start: 2022, end: 2025 },
  { id: "uninove", start: 2018, end: 2022 },
  { id: "pentagono", start: 2013, end: 2016 },
];

export interface Course {
  id: CourseId;
  institution: string;
  year: number;
}

export const courses: Course[] = [
  { id: "powerbi", institution: "Data Science Academy", year: 2026 },
  { id: "javascript", institution: "Domestika", year: 2026 },
  { id: "figma", institution: "Domestika", year: 2026 },
  { id: "logo", institution: "Domestika", year: 2026 },
  { id: "git", institution: "Udemy", year: 2025 },
  { id: "python", institution: "Master MR", year: 2025 },
  { id: "vba-sap", institution: "Master MR", year: 2025 },
  { id: "html-css", institution: "Alura", year: 2023 },
  { id: "csharp-alura", institution: "Alura", year: 2023 },
  { id: "csharp-udemy", institution: "Udemy", year: 2021 },
];

export const skillGroups = {
  data: ["Python", "SQL Server", "Power BI", "DAX", "Power Query", "Excel / VBA", "ETL"],
  platform: ["Power Apps", "Power Automate", "SharePoint", "SAP GUI Scripting", "SAP ERP"],
  web: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js", "Vite", "Figma"],
  tools: ["Git / GitHub", "Cloudflare", "Postman", "Scrum", "Kanban"],
} as const;
