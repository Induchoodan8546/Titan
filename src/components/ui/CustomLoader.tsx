"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CustomLoader() {
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(true);
  const [loadingText, setLoadingText] = useState("Forging architectural masterpiece...");

  useEffect(() => {
    // Smooth simulated loading progress over 2.0 seconds
    const duration = 2000;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          // Smoothly dismiss loader after completion
          setTimeout(() => {
            setIsMounted(false);
          }, 500);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 25) {
      setLoadingText("Formulating structural core...");
    } else if (progress < 50) {
      setLoadingText("Configuring reflective glass facade...");
    } else if (progress < 75) {
      setLoadingText("Illuminating interior spaces...");
    } else {
      setLoadingText("Perfecting gold chrome accents...");
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-luxury-black font-sans"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Subtle gold grid background decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)]" />
          
          <div className="relative flex flex-col items-center max-w-md w-full px-6 text-center">
            {/* Logo Mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="mb-8"
            >
              <span className="font-cinzel text-5xl font-extrabold tracking-[0.25em] text-gold-gradient block">
                TITAN
              </span>
              <span className="font-sans text-xs tracking-[0.4em] text-gold-300 block uppercase mt-2">
                Luxury Residences
              </span>
            </motion.div>

            {/* Custom Spinner */}
            <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-gold-900/40 rounded-full" />
              <motion.div
                className="absolute inset-0 border-t-2 border-r-2 border-gold-400 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
              <span className="font-cinzel font-semibold text-lg text-gold-300">
                {Math.round(progress)}%
              </span>
            </div>

            {/* Loading text messages */}
            <motion.p
              key={loadingText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="font-sans text-sm tracking-widest text-zinc-400 h-5 mb-4"
            >
              {loadingText}
            </motion.p>

            {/* Progress bar container */}
            <div className="w-full h-[1px] bg-zinc-800 relative overflow-hidden rounded">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-200"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 mt-12 block">
              ESTABLISHED AD 2026
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
