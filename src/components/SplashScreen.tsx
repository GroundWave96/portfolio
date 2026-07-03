"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";

interface SplashScreenProps {
  finishLoading: () => void;
}

export function SplashScreen({ finishLoading }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      finishLoading();
    }, 1500);

    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-zinc-950"
        >
          <motion.div layoutId="logo-container">
            <Logo className="h-20 w-auto text-zinc-100" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}