"use client";
import { motion } from "framer-motion";

export interface TimelineItemProps {
  id: number;
  title: string;
  subtitle: string;
  period: string;
  description?: string;
  tags?: string[];
}

export function Timeline({ items }: { items: TimelineItemProps[] }) {
  const sortedItems = [...items].sort((a, b) => b.id - a.id);

  return (
    <div className="relative border-l border-zinc-800 ml-3 md:ml-4 space-y-12">
      {sortedItems.map((item, index) => (
        <motion.div 
          key={item.id} 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          viewport={{ once: false, margin: "-50px" }}
          className="relative pl-8 md:pl-12"
        >
          <div className="absolute -left-1.25 top-1.5 h-2.5 w-2.5 rounded-full bg-zinc-400 ring-4 ring-zinc-950" />
          
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
            <h3 className="text-xl font-semibold text-zinc-100">{item.title}</h3>
            <span className="text-sm font-medium text-zinc-300 mt-1 sm:mt-0">
              {item.period}
            </span>
          </div>
          
          <h4 className="text-lg font-medium text-zinc-300 mb-4">{item.subtitle}</h4>
          
          {item.description && (
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              {item.description}
            </p>
          )}
          
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="text-xs font-medium text-zinc-300 px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}