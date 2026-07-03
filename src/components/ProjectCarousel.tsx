"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(nextImage, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div 
      className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-800 cursor-pointer"
      onClick={nextImage}
    >
      <AnimatePresence mode="popLayout">
        <motion.img
          key={images[index]}
          src={images[index]}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, zIndex: 1 }}
          exit={{ opacity: 0, zIndex: 0 }}
          transition={{ 
            opacity: { duration: 0.8, ease: "easeInOut" },
            zIndex: { delay: 0.8 } 
          }}
        />
      </AnimatePresence>
    </div>
  );
}