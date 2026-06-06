"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Waves, Sunset, Sparkles, Film, Compass, Shield } from "lucide-react";

export default function Amenities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const amenities = [
    {
      id: "amenity-pool",
      icon: <Waves className="w-6 h-6 text-gold-400" />,
      title: "Oasis Infinity Pool",
      desc: "A heated, double-edge infinity pool suspended 110 meters high, offering seamless integration with the skyline."
    },
    {
      id: "amenity-lounge",
      icon: <Sunset className="w-6 h-6 text-gold-400" />,
      title: "Solarium Sky Lounge",
      desc: "An exclusive cocktail bar and lounge space reserved for residents, complete with custom leather seating and private lockers."
    },
    {
      id: "amenity-spa",
      icon: <Sparkles className="w-6 h-6 text-gold-400" />,
      title: "Aura Wellness Spa",
      desc: "Thermal steam suites, massage rooms, and state-of-the-art sensory therapy chambers designed for ultimate rejuvenation."
    },
    {
      id: "amenity-cinema",
      icon: <Film className="w-6 h-6 text-gold-400" />,
      title: "Grand Screening Room",
      desc: "A plush, 12-seat private cinema with Dolby Atmos sound and customizable gourmet dining service."
    },
    {
      id: "amenity-helipad",
      icon: <Compass className="w-6 h-6 text-gold-400" />,
      title: "Direct Heli-pad Access",
      desc: "Rooftop helipad designed to accommodate private luxury transports, with a direct private elevator link to penthouses."
    },
    {
      id: "amenity-concierge",
      icon: <Shield className="w-6 h-6 text-gold-400" />,
      title: "24/7 Elite Concierge",
      desc: "Bespoke lifestyle management, global travel planning, private security coordinates, and home curation services."
    }
  ];

  return (
    <section
      id="amenities"
      ref={ref}
      className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-16 py-20 z-10 pointer-events-none"
    >
      <div className="max-w-4xl w-full space-y-12">
        {/* Section Header */}
        <div className="space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[10px] font-bold tracking-[0.3em] text-gold-400 uppercase"
          >
            LIFESTYLE REDEFINED
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-cinzel text-3xl md:text-5xl font-bold leading-tight text-luxury-gradient"
          >
            Curated Amenities <br />
            for the Select Few
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-sm leading-relaxed text-zinc-400 max-w-lg"
          >
            Every element of Titan is tailored to orchestrate a seamless life of elegance. Enjoy full access to private sanctuaries designed to cater to your every desire.
          </motion.p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-auto">
          {amenities.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * idx + 0.3 }}
              className="bg-glass rounded-2xl p-6 border-gold-glow flex flex-col items-start gap-4 h-64 justify-between"
              whileHover={{ y: -6 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gold-950/40 border border-gold-400/20 flex items-center justify-center">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-cinzel text-base font-bold text-zinc-100 tracking-wider">
                  {item.title}
                </h3>
                <p className="font-sans text-xs leading-relaxed text-zinc-400">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
