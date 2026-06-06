"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ value, duration = 1.5, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalSteps = end;
      const stepTime = Math.max(Math.floor((duration * 1000) / totalSteps), 16); // cap at ~60fps

      const timer = setInterval(() => {
        start += 1;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const stats = [
    {
      id: "stat-stories",
      number: 24,
      suffix: "",
      label: "Stories of Grandeur",
      desc: "Ascending over the city skyline with breathtaking panoramic vistas."
    },
    {
      id: "stat-residences",
      number: 88,
      suffix: "",
      label: "Bespoke Residences",
      desc: "Limited-edition private sanctuaries with curated detailing."
    },
    {
      id: "stat-pools",
      number: 2,
      suffix: "x",
      label: "Infinite Sky Pools",
      desc: "Architectural wonders floating in the clouds on levels 12 and 24."
    },
    {
      id: "stat-height",
      number: 110,
      suffix: "m",
      label: "Architectural Height",
      desc: "A structural sculpture clad in copper-gold bronze framing."
    }
  ];

  return (
    <section
      id="overview"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-16 py-20 z-10 pointer-events-none"
    >
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-12 items-start md:items-center">
        {/* Text Header */}
        <div className="flex-1 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[10px] font-bold tracking-[0.3em] text-gold-400 uppercase"
          >
            ARCHITECTURE IN MOTION
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-cinzel text-3xl md:text-5xl font-bold leading-tight text-luxury-gradient"
          >
            A Sculpture <br />
            Constructed of <br />
            <span className="text-gold-gradient font-black">Light & Steel</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-sm leading-relaxed text-zinc-400 max-w-sm pt-2"
          >
            Sculpted by world-class artisans, the tower's geometry is designed to interact dynamically with daylight, casting gold reflections across the horizon as the sun transitions.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 pointer-events-auto">
          {stats.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * idx + 0.3 }}
              className="bg-glass rounded-2xl p-6 border-gold-glow flex flex-col justify-between h-44"
            >
              <div className="space-y-1">
                <span className="font-cinzel text-4xl md:text-5xl font-extrabold text-gold-gradient block">
                  <Counter value={item.number} suffix={item.suffix} />
                </span>
                <span className="font-sans text-xs tracking-wider font-bold text-zinc-200 block uppercase pt-2">
                  {item.label}
                </span>
              </div>
              <p className="font-sans text-[11px] leading-relaxed text-zinc-400 mt-4 border-t border-gold-400/10 pt-3">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
