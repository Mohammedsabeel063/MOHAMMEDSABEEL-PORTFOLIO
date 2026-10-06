"use client";
import SmoothScroll from "@/lib/scroll";
import { useRevealObserver } from "@/lib/hooks";
import Navigation from "@/components/Navigation";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import Certifications from "@/components/sections/Certifications";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";

export default function Home() {
  useRevealObserver();

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[var(--paper)] text-[var(--ink)] selection:bg-[var(--ink)] selection:text-[var(--paper)]">
        <Navigation />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Work />
          <Certifications />
          <Experience />
          <Achievements />
        </main>
        <Contact />
      </div>
    </SmoothScroll>
  );
}
