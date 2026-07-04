import { courses } from "@/data/courses";
import dict from "@/locales/pt.json";

export function Courses() {
  const sortedCourses = [...courses].sort((a, b) => b.id - a.id);

  return (
    <section id="cursos" className="py-12 px-6">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-medium text-zinc-100 mb-8">
          {dict.courses.title}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sortedCourses.map((course) => (
            <div 
              key={course.id} 
              className="p-4 rounded-lg bg-zinc-900/20 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <h4 className="font-medium text-zinc-200 text-sm">{course.title}</h4>
              <p className="text-xs text-zinc-500 mt-2">
                {course.institution} • {course.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}