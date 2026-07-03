"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { SplashScreen } from "@/components/SplashScreen";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <SplashScreen finishLoading={() => setShowSplash(false)} />
      <Header showLogo={!showSplash} />
      
      <main>
        <Hero showSplash={showSplash} />
        <About />
      </main>
    </>
  );
}