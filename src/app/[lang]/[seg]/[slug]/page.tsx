import { notFound } from "next/navigation";
import { projectBySlug, projects } from "@/data/projects";
import { projectMetadata } from "@/lib/metadata";
import { PROJECT_SEGMENT } from "@/lib/i18nPaths";
import { isLang } from "@/i18n/dictionaries";
import { ProjectPage } from "@/views/ProjectPage";

export const dynamicParams = false;

/** /en/projects/<slug>, /es/proyectos/<slug>, /it/progetti/<slug> */
export function generateStaticParams({ params }: { params: { lang: string } }) {
  if (!isLang(params.lang)) return [];
  const seg = PROJECT_SEGMENT[params.lang];
  return projects.map((p) => ({ seg, slug: p.slug }));
}

type Params = Promise<{ lang: string; seg: string; slug: string }>;

async function resolve(params: Params) {
  const { lang, seg, slug } = await params;
  const project = projectBySlug(slug);
  if (!isLang(lang) || PROJECT_SEGMENT[lang] !== seg || !project) return null;
  return { lang, project };
}

export async function generateMetadata({ params }: { params: Params }) {
  const found = await resolve(params);
  return found ? projectMetadata(found.lang, found.project) : {};
}

export default async function Page({ params }: { params: Params }) {
  const found = await resolve(params);
  if (!found) notFound();
  return <ProjectPage slug={found.project.slug} />;
}
