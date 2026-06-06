"use client";

import { useEffect, useState } from "react";
import CustomLoader from "@/components/ui/CustomLoader";
import Scene from "@/components/BuildingModel/Scene";
import Hero from "@/components/Hero/Hero";
import Stats from "@/components/Stats/Stats";
import Amenities from "@/components/Amenities/Amenities";
import Projects from "@/components/Projects/Projects";
import Contact from "@/components/Contact/Contact";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = scrollTop / docHeight;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize immediately
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Premium loader overlay */}
      <CustomLoader />

      {/* Cinematic 3D Sky-Scraper Scene */}
      <Scene scrollProgress={scrollProgress} />

      {/* Main scrollable section overlays */}
      <div id="scroll-container" className="relative w-full z-10">
        <Hero />
        <Stats />
        <Amenities />
        <Projects />
        <Contact />
      </div>
    </>
  );
}
