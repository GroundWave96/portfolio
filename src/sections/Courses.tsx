"use client";
import { useLanguage, languages } from "@/context/LanguageContext";

export function Courses() {
  const { lang, t } = useLanguage();
  
  const courseItems = languages[lang].courses.items;
  
  const sortedCourses = [...courseItems].sort((a, b) => b.id - a.id);

  return (
    <section id="cursos" className="py-12 px-6">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-medium text-zinc-100 mb-8">
          {t("courses", "title")}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sortedCourses.map((course) => (
            <div 
              key={course.id} 
              className="flex flex-col justify-between h-full p-4 rounded-lg bg-zinc-900/20 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <h3 className="font-medium text-zinc-200 text-sm">{course.title}</h3>
              <p className="text-xs text-zinc-300 mt-4">
                {course.institution} • {course.year} {course.language && `• ${course.language}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}