"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { Maximize2, X, Ruler, BedDouble, Bath, Compass } from "lucide-react";

export default function Projects() {
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const collections = [
    {
      title: "Sky Mansions",
      floors: "Floors 10 - 15",
      price: "Starting at $12,500,000",
      image: "/images/sky_mansion.png",
      area: "5,400 SQ FT",
      bedrooms: "4 Bedrooms",
      bathrooms: "4.5 Bathrooms",
      view: "Eastern Skyline & River",
      desc: "Occupying half-floors, the Sky Mansions present single-level living at its peak. Featuring custom Calacatta marble hearths, solid oak parquet, and double-height custom bronze windows framing the river valley.",
      features: ["Private elevator foyer", "1,200 sq ft wrap-around terrace", "Bespoke kitchen by Boffi", "Temperature-controlled wine gallery"]
    },
    {
      title: "Duplex Penthouses",
      floors: "Floors 16 - 22",
      price: "Starting at $24,000,000",
      image: "/images/duplex_penthouse.png",
      area: "8,200 SQ FT",
      bedrooms: "5 Bedrooms",
      bathrooms: "6 Bathrooms",
      view: "360 Panoramic Views",
      desc: "Spanning two full stories connected by a sculptural floating glass staircase. The Duplex Penthouses showcase double-height 20-foot ceilings, an indoor private plunge pool, and private landscaping by Madison Cox.",
      features: ["Double-height gallery space", "Private glass plunge pool", "Automated smart shade integration", "Dual master dressing wings"]
    },
    {
      title: "The Titan Crown",
      floors: "Floors 23 - 24",
      price: "Starting at $48,500,000",
      image: "/images/titan_crown.png",
      area: "14,500 SQ FT",
      bedrooms: "6 Bedrooms",
      bathrooms: "8 Bathrooms",
      view: "Infinite Horizon Views",
      desc: "The pinnacle of Titan. Occupying the top two levels of the tower, the Crown features a private helipad terminal interface, a massive 360-degree glass dining dome, private sky gardens, and an indoor spa oasis.",
      features: ["Exclusive rooftop helipad portal", "360-degree glass observation dome", "Private cinema and wine cave", "24-hour dedicated butler suite"]
    }
  ];

  return (
    <section
      id="residences"
      ref={ref}
      className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-16 py-20 z-10 pointer-events-none"
    >
      <div className="max-w-5xl w-full space-y-10">
        {/* Section Header */}
        <div className="space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[10px] font-bold tracking-[0.3em] text-gold-400 uppercase"
          >
            THE RESIDENTIAL COLLECTIONS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-cinzel text-3xl md:text-5xl font-bold leading-tight text-luxury-gradient"
          >
            Sanctuaries in <br />
            the Stratosphere
          </motion.h2>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gold-400/10 gap-6 md:gap-12 pointer-events-auto overflow-x-auto pb-px">
          {collections.map((col, idx) => (
            <button
              key={col.title}
              onClick={() => setActiveTab(idx)}
              className={`pb-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative cursor-pointer whitespace-nowrap ${
                activeTab === idx ? "text-gold-400" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {col.title}
              {activeTab === idx && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-600 to-gold-400"
                  layoutId="activeTabUnderline"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pointer-events-auto">
          {/* Left Side: Images & Parallax */}
          <div className="lg:col-span-7 relative h-[300px] md:h-[480px] rounded-2xl overflow-hidden border border-gold-400/15 group shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={collections[activeTab].image}
                  alt={collections[activeTab].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Gold vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-black/60 backdrop-blur-md border border-gold-400/20 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                  <span className="font-sans text-[10px] tracking-widest text-gold-200 uppercase font-bold">
                    {collections[activeTab].floors}
                  </span>
                </div>

                {/* Open Floorplan Action Overlay */}
                <button
                  onClick={() => setShowModal(true)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-gold-400/20 flex items-center justify-center text-gold-200 hover:bg-gold-400 hover:text-luxury-black hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg cursor-pointer"
                  title="View Floorplan"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Specs & Descriptions */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-glass rounded-2xl p-8 border border-gold-400/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <span className="font-sans text-xs font-semibold tracking-wider text-gold-400 block uppercase">
                    {collections[activeTab].price}
                  </span>
                  <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-zinc-100">
                    {collections[activeTab].title}
                  </h3>
                </div>

                <p className="font-sans text-xs leading-relaxed text-zinc-400">
                  {collections[activeTab].desc}
                </p>

                {/* Specs list */}
                <div className="grid grid-cols-2 gap-4 border-y border-gold-400/10 py-5">
                  <div className="flex items-center gap-3 text-zinc-300">
                    <Ruler className="w-4 h-4 text-gold-400" />
                    <span className="font-sans text-xs tracking-wider uppercase font-semibold">
                      {collections[activeTab].area}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300">
                    <BedDouble className="w-4 h-4 text-gold-400" />
                    <span className="font-sans text-xs tracking-wider uppercase font-semibold">
                      {collections[activeTab].bedrooms}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300">
                    <Bath className="w-4 h-4 text-gold-400" />
                    <span className="font-sans text-xs tracking-wider uppercase font-semibold">
                      {collections[activeTab].bathrooms}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300">
                    <Compass className="w-4 h-4 text-gold-400" />
                    <span className="font-sans text-xs tracking-wider uppercase font-semibold">
                      {collections[activeTab].view}
                    </span>
                  </div>
                </div>

                {/* Features points */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-black">
                    EXCLUSIVE FEATURES
                  </span>
                  <ul className="space-y-2">
                    {collections[activeTab].features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-zinc-400 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => setShowModal(true)}
              className="w-full h-12 rounded-full border border-gold-400/35 hover:border-gold-400/80 bg-gold-950/20 hover:bg-gold-950/50 text-gold-200 font-bold text-[10px] tracking-widest uppercase mt-8 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Examine Architectural Plans
            </button>
          </div>
        </div>
      </div>

      {/* SVG Floorplan Vector Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-luxury-black/95 backdrop-blur-md pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-zinc-950 border border-gold-400/30 rounded-2xl max-w-4xl w-full overflow-hidden shadow-[0_10px_50px_rgba(212,175,55,0.15)] flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Floorplan Drawing Area (Left side) */}
              <div className="flex-1 bg-zinc-900/60 p-6 md:p-8 flex items-center justify-center border-r border-gold-400/10 overflow-y-auto">
                <div className="w-full max-w-[420px] aspect-square relative text-gold-300">
                  {/* Decorative compass rose */}
                  <div className="absolute top-2 right-2 flex flex-col items-center opacity-40">
                    <Compass className="w-6 h-6 stroke-[1.2]" />
                    <span className="text-[9px] tracking-widest font-black mt-1">N</span>
                  </div>
                  
                  {/* Luxury Floorplan Vector Drawing */}
                  <svg
                    viewBox="0 0 400 400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    className="w-full h-full opacity-85"
                  >
                    {/* Grid lines */}
                    <g strokeWidth="0.5" strokeDasharray="3 6" className="text-zinc-800">
                      <line x1="50" y1="0" x2="50" y2="400" />
                      <line x1="150" y1="0" x2="150" y2="400" />
                      <line x1="250" y1="0" x2="250" y2="400" />
                      <line x1="350" y1="0" x2="350" y2="400" />
                      <line x1="0" y1="50" x2="400" y2="50" />
                      <line x1="0" y1="150" x2="400" y2="150" />
                      <line x1="0" y1="250" x2="400" y2="250" />
                      <line x1="0" y1="350" x2="400" y2="350" />
                    </g>

                    {/* Outer walls */}
                    <rect x="30" y="30" width="340" height="340" strokeWidth="2.5" className="text-gold-500" />

                    {/* Terraces */}
                    <line x1="30" y1="300" x2="370" y2="300" strokeWidth="1.5" />
                    <path d="M 30,300 L 30,370 L 370,370 L 370,300" strokeWidth="1" strokeDasharray="3 3" />
                    
                    {/* Interior Wall Divisions */}
                    {/* Foyer & Lift */}
                    <line x1="30" y1="130" x2="150" y2="130" />
                    <line x1="150" y1="30" x2="150" y2="210" />
                    {/* Master suite */}
                    <line x1="150" y1="210" x2="370" y2="210" />
                    <line x1="260" y1="210" x2="260" y2="300" />
                    {/* Kitchen */}
                    <line x1="30" y1="210" x2="150" y2="210" />
                    
                    {/* Doors indicators (arched curves) */}
                    {/* Main Entry */}
                    <path d="M 150,90 A 40,40 0 0,1 110,130" strokeWidth="0.8" strokeDasharray="1 1" />
                    <line x1="150" y1="90" x2="150" y2="130" />
                    {/* Master Door */}
                    <path d="M 190,210 A 30,30 0 0,0 220,180" strokeWidth="0.8" strokeDasharray="1 1" />
                    <line x1="190" y1="210" x2="220" y2="210" />

                    {/* Labels & Rooms */}
                    <text x="90" y="80" textAnchor="middle" fill="#d4af37" fontSize="10" fontWeight="bold" className="font-cinzel tracking-widest">PRIVATE LIFT</text>
                    <text x="90" y="170" textAnchor="middle" fill="#d4af37" fontSize="10" fontWeight="bold" className="font-cinzel tracking-widest">BOFFI KITCHEN</text>
                    <text x="260" y="120" textAnchor="middle" fill="#e8d79c" fontSize="13" fontWeight="bold" className="font-cinzel tracking-widest">GRAND LIVING HALL</text>
                    <text x="200" y="260" textAnchor="middle" fill="#d4af37" fontSize="10" fontWeight="bold" className="font-cinzel tracking-widest">MASTER RETREAT</text>
                    <text x="315" y="260" textAnchor="middle" fill="#d4af37" fontSize="9" fontWeight="bold" className="font-cinzel tracking-widest">SPA SUITE</text>
                    <text x="200" y="340" textAnchor="middle" fill="#937020" fontSize="10" fontWeight="bold" className="font-cinzel tracking-widest">TERRACE SOLIUM</text>

                    {/* Furniture symbols (abstract rectangles) */}
                    {/* Kitchen counter */}
                    <rect x="40" y="145" width="20" height="50" strokeWidth="0.8" />
                    <circle cx="50" cy="155" r="3" strokeWidth="0.8" />
                    <circle cx="50" cy="170" r="3" strokeWidth="0.8" />
                    {/* Master Bed */}
                    <rect x="180" y="220" width="40" height="35" strokeWidth="0.8" />
                    <rect x="185" y="220" width="12" height="8" strokeWidth="0.6" />
                    <rect x="203" y="220" width="12" height="8" strokeWidth="0.6" />
                    {/* Dining table */}
                    <circle cx="260" cy="70" r="22" strokeWidth="0.8" />
                    <circle cx="260" cy="70" r="1.5" fill="currentColor" />
                    {/* Sofa */}
                    <rect x="310" y="110" width="45" height="15" strokeWidth="0.8" />
                    <rect x="340" y="125" width="15" height="40" strokeWidth="0.8" />
                  </svg>
                </div>
              </div>

              {/* Floorplan Information Panel (Right side) */}
              <div className="md:w-80 p-6 md:p-8 flex flex-col justify-between bg-zinc-950">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[10px] tracking-widest text-zinc-500 uppercase font-black">
                      ARCHITECTURAL SCHEMATICS
                    </span>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-zinc-500 hover:text-gold-400 transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <span className="font-sans text-[10px] tracking-widest text-gold-400 uppercase font-bold">
                      {collections[activeTab].floors}
                    </span>
                    <h4 className="font-cinzel text-xl font-bold text-zinc-100">
                      {collections[activeTab].title} Layout
                    </h4>
                    <span className="font-sans text-xs font-semibold text-zinc-400 block">
                      Scale: 1 : 150 Metric
                    </span>
                  </div>

                  <div className="space-y-4 border-t border-gold-400/10 pt-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-500">Interior Area:</span>
                      <span className="text-zinc-200 font-semibold">{collections[activeTab].area}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-500">Terrace Area:</span>
                      <span className="text-zinc-200 font-semibold">1,200 SQ FT</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-500">Total Residence:</span>
                      <span className="text-zinc-200 font-semibold">
                        {parseInt(collections[activeTab].area.replace(/\D/g, "")) + 1200} SQ FT
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-500">Ceiling Height:</span>
                      <span className="text-zinc-200 font-semibold">
                        {activeTab === 0 ? "11.5 FT" : activeTab === 1 ? "22.0 FT (Double-Height)" : "16.0 FT"}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gold-950/20 border border-gold-400/20 rounded-xl p-4 text-[11px] leading-relaxed text-gold-300">
                    * Layout includes dedicated service lift, private trash chutes, backup generator grids, and individual climate control cell blocks.
                  </div>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="w-full h-11 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-luxury-black font-bold text-[10px] tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer mt-6"
                >
                  Return to Showroom
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
