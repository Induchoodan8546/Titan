"use client";

import { motion } from "framer-motion";
import SoundToggle from "../ui/SoundToggle";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between px-6 md:px-16 py-8 z-10 pointer-events-none">
      {/* Header Overlay */}
      <header className="w-full flex items-center justify-between pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="flex flex-col cursor-pointer"
        >
          <span className="font-cinzel text-2xl font-black tracking-[0.2em] text-luxury-gradient">
            TITAN
          </span>
          <span className="font-sans text-[8px] tracking-[0.3em] text-gold-400 uppercase font-bold">
            Residences
          </span>
        </motion.div>

        {/* Navigation Links & SoundToggle */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="flex items-center gap-6"
        >
          <nav className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
            <a href="#overview" className="hover:text-gold-300 transition-colors">Overview</a>
            <a href="#amenities" className="hover:text-gold-300 transition-colors">Amenities</a>
            <a href="#residences" className="hover:text-gold-300 transition-colors">Residences</a>
            <a href="#contact" className="hover:text-gold-300 transition-colors">Contact</a>
          </nav>
          <SoundToggle />
        </motion.div>
      </header>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col justify-center items-start max-w-2xl mt-12 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="space-y-4"
        >
          <span className="inline-block text-[10px] font-bold tracking-[0.35em] text-gold-400 uppercase">
            PREMIER REVELATION
          </span>
          
          <h1 className="font-cinzel text-5xl md:text-7xl font-bold leading-[1.1] text-luxury-gradient tracking-tight">
            A Legacy <br />
            Defined by <br />
            <span className="text-gold-gradient font-black">Altitude</span>
          </h1>
          
          <p className="font-sans text-sm md:text-base leading-relaxed text-zinc-400 max-w-lg pt-4">
            Ascending 24 stories above the metropolitan skyline, Titan stands as an architectural sculpture. A singular blend of reflective glass, bronze structure, and gold accents.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 mt-8 pointer-events-auto w-full sm:w-auto"
        >
          <a
            href="#contact"
            className="group relative flex items-center justify-center h-12 px-8 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-luxury-black font-bold text-[10px] tracking-widest uppercase overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
          >
            <span className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:animate-shine" />
            Private Viewings
          </a>
          <a
            href="#residences"
            className="flex items-center justify-center h-12 px-8 rounded-full bg-glass border border-gold-400/20 text-gold-200 font-bold text-[10px] tracking-widest uppercase hover:border-gold-400/50 hover:bg-zinc-900/60 transition-all duration-300 active:scale-95"
          >
            Explore Residences
          </a>
        </motion.div>
      </div>

      {/* Bottom Footer Info */}
      <footer className="w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.8 }}
          className="text-left font-sans text-[9px] tracking-[0.25em] text-zinc-500 uppercase flex items-center gap-2"
        >
          <span className="inline-block w-1 h-1 bg-gold-400 rounded-full animate-ping" />
          SCROLL TO ASCEND
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.8 }}
          className="flex gap-8 text-[9px] tracking-[0.2em] text-zinc-500 uppercase"
        >
          <div>01 / 05</div>
          <div>INTRO OVERVIEW</div>
        </motion.div>
      </footer>
    </section>
  );
}
