import { experiences } from "@/data/experiences";
import dict from "@/locales/pt.json";

export function Experience() {
  return (
    <section id="experiencia" className="py-24 px-6">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-medium text-zinc-100 mb-12">
          {dict.experience.title}
        </h2>
        
        <div className="relative border-l border-zinc-800 ml-3 md:ml-4 space-y-12">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-8 md:pl-12">
              <div className="absolute -left-1.25 top-1.5 h-2.5 w-2.5 rounded-full bg-zinc-400 ring-4 ring-zinc-950" />
              
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-xl font-semibold text-zinc-100">{exp.role}</h3>
                <span className="text-sm font-medium text-zinc-500 mt-1 sm:mt-0">
                  {exp.period}
                </span>
              </div>
              
              <h4 className="text-lg font-medium text-zinc-300 mb-4">{exp.company}</h4>
              
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {exp.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {exp.techs.map((tech) => (
                  <span key={tech} className="text-xs font-medium text-zinc-500 px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}