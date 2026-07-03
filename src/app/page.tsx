"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { SplashScreen } from "@/components/SplashScreen";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <SplashScreen finishLoading={() => setShowSplash(false)} />
      
      <Header showLogo={!showSplash} />
      
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showSplash ? 0 : 1, y: showSplash ? 20 : 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="min-h-[200vh] pt-40 px-4 flex flex-col items-center"
      >
        <h1 className="text-4xl sm:text-5xl font-light text-zinc-200 tracking-tight mb-4">
          Gabriel Pimentel
        </h1>
        <p className="text-zinc-500 max-w-lg text-center text-lg">
          Desenvolvedor de Software focado em criar experiências digitais fluidas e minimalistas.
        </p>
      </motion.main>
    </>
  );
}