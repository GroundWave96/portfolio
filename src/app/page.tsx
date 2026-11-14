import { Header } from "@/components/Header";
import { SplashScreen } from "@/components/SplashScreen";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { About } from "@/sections/About";
import { Education } from "@/sections/Education";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <Header />
      <CommandPalette />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <About />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
