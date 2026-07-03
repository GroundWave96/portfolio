"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { SplashScreen } from "@/components/SplashScreen";
import { Hero } from "@/sections/Hero";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <SplashScreen finishLoading={() => setShowSplash(false)} />
      <Header showLogo={!showSplash} />
      
      <main>
        <Hero showSplash={showSplash} />
        {/* Futuramente: */}
        {/* <About /> */}
        {/* <Projects /> */}
      </main>
    </>
  );
}