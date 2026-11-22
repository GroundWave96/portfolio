import { notFound } from "next/navigation";
import { projectBySlug, projects } from "@/data/projects";
import { projectMetadata } from "@/lib/metadata";
import { ProjectPage } from "@/views/ProjectPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const project = projectBySlug((await params).slug);
  return project ? projectMetadata("pt", project) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const project = projectBySlug((await params).slug);
  if (!project) notFound();
  return <ProjectPage slug={project.slug} />;
}
