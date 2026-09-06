// src/components/ProjectCard.tsx
import { ProjectCarousel } from "./ProjectCarousel";

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

export function ProjectCard({ project }: { project: Project }) {
  const glassClasses = "flex items-center justify-center rounded-full bg-zinc-900/40 backdrop-blur-md shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.2),inset_-0.5px_-0.5px_0px_rgba(255,255,255,0.04),0_8px_16px_0_rgba(0,0,0,0.3)] transition-all hover:bg-zinc-800/50";
  const hasLive = project.links.live && project.links.live.length > 0;
  const hasRepo = project.links.repo && project.links.repo.length > 0;

  return (
    <div className="group rounded-2xl bg-zinc-900/20 p-6 border border-zinc-800 transition-all hover:border-zinc-700 flex flex-col h-full">
             <div className="mb-6">
        <ProjectCarousel images={project.images} />
        <h3 className="text-xl font-semibold text-zinc-100 mt-6">{project.title}</h3>
        <p className="mt-2 text-zinc-400 text-sm">{project.description}</p>
      </div>
             <div className="mt-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs text-zinc-300 font-medium px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
              {tag}
            </span>
          ))}
        </div>
                 {(hasLive || hasRepo) && (
          <div className="flex w-full gap-3">
            {hasLive && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={`${glassClasses} flex-1 py-2 text-sm font-medium text-zinc-100`}>
                Site
              </a>
            )}
            {hasRepo && (
              <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className={`${glassClasses} flex-1 py-2 text-sm font-medium text-zinc-300`}>
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}