"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Ruler, BedDouble, Bath, Compass, ChevronLeft, ChevronRight, X, Layout, Navigation, HelpCircle } from "lucide-react";
import FloorplanModel3D from "./FloorplanModel3D";

interface Room {
  name: string;
  desc: string;
  image?: string;
}

interface Residence {
  title: string;
  floors: string;
  price: string;
  image: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  view: string;
  desc: string;
  rooms: Room[];
}

export default function Projects() {
  const [activeResidence, setActiveResidence] = useState(0);
  const [activeRoomIdx, setActiveRoomIdx] = useState(0);
  const [show3DModal, setShow3DModal] = useState(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const collections: Residence[] = [
    {
      title: "Sky Mansions",
      floors: "Floors 10 - 15",
      price: "Starting at $12,500,000",
      image: "/images/sky_mansion.png",
      area: "5,400 SQ FT",
      bedrooms: "4 Bedrooms",
      bathrooms: "4.5 Bathrooms",
      view: "Eastern Skyline & River",
      desc: "Occupying half-floors, the Sky Mansions present single-level living at peak. Featuring custom Calacatta marble hearths, solid oak parquet, and double-height custom bronze windows framing the river valley.",
      rooms: [
        { name: "Private Lift Foyer", desc: "Secure keycard-activated direct elevator entryway leading into your private gallery vestibule." },
        { name: "Boffi Chef Kitchen", desc: "A culinary sanctuary equipped with Sub-Zero appliances and a massive Grigio Carnico marble island." },
        { name: "Grand Living Hall", desc: "Double-height parlor with floor-to-ceiling glass panels framing the winding river valley below.", image: "/images/sky_mansion_interior.png" },
        { name: "Sky Solarium Terrace", desc: "A teak wood balcony deck containing an outdoor stone kitchen and custom lounge chairs." }
      ]
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
      rooms: [
        { name: "Gallery Entryway", desc: "A majestic double-height greeting gallery designed specifically to house art collections." },
        { name: "Private Glass Pool", desc: "A heated indoor pool with thick structural glass walls looking out over the city skyline." },
        { name: "Double-Height Salon", desc: "Vast primary living pavilion framed by warm structural bronze frames and minimalist columns.", image: "/images/duplex_penthouse_interior.png" },
        { name: "Master Dressing Wing", desc: "Expansive twin dressing suites complete with nubuck leather panels and a freestanding marble tub." }
      ]
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
      rooms: [
        { name: "Observation Dome", desc: "Circular dining room at the building's apex, encased in customized smart glass paneling.", image: "/images/titan_crown_interior.png" },
        { name: "Butler VIP Foyer", desc: "A secondary service entryway for private staff, chefs, and secure coordinates." },
        { name: "Sky Spa Jacuzzi", desc: "A heated infinity-edge glass jacuzzi offering breathtaking views of the horizon." },
        { name: "Sky Garden Oasis", desc: "High-altitude private garden oasis with local flora and robust structural windbreaks." }
      ]
    }
  ];

  const currentResidence = collections[activeResidence];
  const currentRoom = currentResidence.rooms[activeRoomIdx];

  const handleNextRoom = () => {
    setActiveRoomIdx((activeRoomIdx + 1) % currentResidence.rooms.length);
  };

  const handlePrevRoom = () => {
    setActiveRoomIdx((activeRoomIdx - 1 + currentResidence.rooms.length) % currentResidence.rooms.length);
  };

  const selectTab = (idx: number) => {
    setActiveResidence(idx);
    setActiveRoomIdx(0);
  };

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
            className="text-[10px] font-bold tracking-[0.3em] text-gold-400 uppercase block"
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
              onClick={() => selectTab(idx)}
              className={`pb-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative cursor-pointer whitespace-nowrap ${
                activeResidence === idx ? "text-gold-400" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {col.title}
              {activeResidence === idx && (
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
          <div className="lg:col-span-7 relative h-[320px] md:h-[480px] rounded-2xl overflow-hidden border border-gold-400/15 group shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeResidence}-${activeRoomIdx}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={currentRoom.image || currentResidence.image}
                  alt={currentRoom.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                  priority
                />
                {/* Dark gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-black/60 backdrop-blur-md border border-gold-400/20 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                  <span className="font-sans text-[10px] tracking-widest text-gold-200 uppercase font-bold">
                    {currentResidence.floors}
                  </span>
                </div>

                {/* Slideshow controls */}
                <div className="absolute bottom-6 right-6 flex items-center gap-2">
                  <button
                    onClick={handlePrevRoom}
                    className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-gold-400/20 flex items-center justify-center text-gold-300 hover:bg-gold-400 hover:text-luxury-black hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextRoom}
                    className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-gold-400/20 flex items-center justify-center text-gold-300 hover:bg-gold-400 hover:text-luxury-black hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Specs & Descriptions */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-glass rounded-2xl p-8 border border-gold-400/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeResidence}-${activeRoomIdx}`}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.5 }}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <span className="font-sans text-xs font-semibold tracking-wider text-gold-400 block uppercase">
                    {currentResidence.price}
                  </span>
                  <h3 className="font-cinzel text-xl md:text-2xl font-bold text-zinc-100 leading-snug">
                    {currentResidence.title}
                  </h3>
                  <span className="font-sans text-[10px] tracking-widest text-zinc-400 uppercase font-semibold">
                    Room {activeRoomIdx + 1} of {currentResidence.rooms.length}: {currentRoom.name}
                  </span>
                </div>

                <p className="font-sans text-xs leading-relaxed text-zinc-400">
                  {currentRoom.desc}
                </p>

                {/* Specs List */}
                <div className="grid grid-cols-2 gap-4 border-y border-gold-400/10 py-4">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Ruler className="w-3.5 h-3.5 text-gold-400" />
                    <span className="font-sans text-[10px] tracking-wider uppercase font-semibold">
                      {currentResidence.area}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <BedDouble className="w-3.5 h-3.5 text-gold-400" />
                    <span className="font-sans text-[10px] tracking-wider uppercase font-semibold">
                      {currentResidence.bedrooms}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Bath className="w-3.5 h-3.5 text-gold-400" />
                    <span className="font-sans text-[10px] tracking-wider uppercase font-semibold">
                      {currentResidence.bathrooms}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Compass className="w-3.5 h-3.5 text-gold-400" />
                    <span className="font-sans text-[10px] tracking-wider uppercase font-semibold">
                      {currentResidence.view}
                    </span>
                  </div>
                </div>

                {/* Room Select Buttons */}
                <div className="space-y-2">
                  <span className="text-[9px] tracking-widest text-zinc-500 uppercase font-black block">
                    ROOM DIRECTORY
                  </span>
                  <div className="flex gap-2">
                    {currentResidence.rooms.map((room, rIdx) => (
                      <button
                        key={room.name}
                        onClick={() => setActiveRoomIdx(rIdx)}
                        className={`h-7 px-3 rounded-md border text-[9px] tracking-widest uppercase font-bold transition-all duration-300 cursor-pointer ${
                          activeRoomIdx === rIdx
                            ? "border-gold-400/60 bg-gold-400/10 text-gold-300 shadow-[0_0_10px_rgba(212,175,55,0.1)]"
                            : "border-gold-400/10 bg-zinc-950/40 text-zinc-500 hover:border-gold-400/35 hover:text-zinc-300"
                        }`}
                      >
                        0{rIdx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => {
                setShow3DModal(true);
              }}
              className="w-full h-11 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-luxury-black font-bold text-[10px] tracking-widest uppercase mt-6 transition-all duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer shadow-[0_4px_15px_rgba(212,175,55,0.2)] flex items-center justify-center gap-2"
            >
              <Layout className="w-3.5 h-3.5" />
              Examine 3D Blueprint Schema
            </button>
          </div>
        </div>
      </div>

      {/* FULLSCREEN POPUP MODAL WITH INTERACTIVE 3D PLAN CANVAS */}
      <AnimatePresence>
        {show3DModal && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-luxury-black/95 backdrop-blur-md pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-zinc-950 border border-gold-400/20 rounded-3xl max-w-5xl w-full overflow-hidden shadow-[0_15px_60px_rgba(212,175,55,0.15)] flex flex-col md:flex-row max-h-[90vh]"
            >
              
              {/* 3D WebGL Canvas Container (Left Panel) */}
              <div className="flex-1 bg-zinc-900/40 min-h-[300px] md:min-h-[460px] relative overflow-hidden">
                
                {/* 3D Canvas Rendering FloorplanModel3D */}
                <Canvas
                  shadows
                  gl={{ antialias: true }}
                  camera={{ position: [0, 4.0, 4.5], fov: 45 }}
                  className="w-full h-full cursor-grab active:cursor-grabbing"
                >
                  {/* Interactive orbit controls */}
                  <OrbitControls
                    enableZoom={true}
                    maxPolarAngle={Math.PI / 2.1} // don't go below floor level
                    minDistance={2.0}
                    maxDistance={7.0}
                    autoRotate={true}
                    autoRotateSpeed={0.8}
                  />

                  {/* 3D Floorplan Model with walls and furniture */}
                  <FloorplanModel3D
                    activeResidence={activeResidence}
                    activeRoomIdx={activeRoomIdx}
                    setActiveRoomIdx={setActiveRoomIdx}
                  />
                </Canvas>

                {/* Touch/Mouse Help Indicator Overlay */}
                <div className="absolute bottom-5 left-5 bg-black/60 backdrop-blur-md border border-gold-400/20 px-3 py-1.5 rounded-full flex items-center gap-2 pointer-events-none text-zinc-300">
                  <HelpCircle className="w-3.5 h-3.5 text-gold-400" />
                  <span className="font-sans text-[9px] tracking-widest uppercase font-bold">
                    DRAG TO ROTATE • SCROLL TO ZOOM
                  </span>
                </div>
              </div>

              {/* Informational Specs Control Center (Right Panel) */}
              <div className="md:w-80 p-6 md:p-8 flex flex-col justify-between bg-zinc-950 border-t md:border-t-0 md:border-l border-gold-400/10">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[9px] tracking-widest text-zinc-500 uppercase font-black">
                      3D INTERACTIVE BLUEPRINT
                    </span>
                    <button
                      onClick={() => setShow3DModal(false)}
                      className="text-zinc-500 hover:text-gold-400 transition-colors cursor-pointer"
                      title="Return to Showroom"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Title */}
                  <div className="space-y-1.5">
                    <span className="font-sans text-[10px] tracking-widest text-gold-400 uppercase font-bold block">
                      {currentResidence.floors}
                    </span>
                    <h4 className="font-cinzel text-xl font-bold text-zinc-100">
                      {currentResidence.title} Layout
                    </h4>
                    <span className="font-sans text-[10px] text-zinc-400 block font-semibold">
                      Interactive 3D Wall Division Model
                    </span>
                  </div>

                  {/* Interactive Room Directory inside modal */}
                  <div className="space-y-2 border-t border-gold-400/10 pt-4">
                    <span className="text-[9px] tracking-widest text-zinc-500 uppercase font-black block mb-2">
                      SELECT ROOM HOTSPOT
                    </span>
                    <div className="space-y-1.5">
                      {currentResidence.rooms.map((room, idx) => (
                        <button
                          key={room.name}
                          onClick={() => setActiveRoomIdx(idx)}
                          className={`w-full flex items-center justify-between h-9 px-3 rounded-lg border text-[10px] font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                            activeRoomIdx === idx
                              ? "border-gold-400/60 bg-gold-950/25 text-gold-300"
                              : "border-gold-400/10 bg-zinc-950/20 text-zinc-500 hover:border-gold-400/35 hover:text-zinc-300"
                          }`}
                        >
                          <span>0{idx + 1}. {room.name.toUpperCase()}</span>
                          <span className={`w-1.5 h-1.5 rounded-full ${activeRoomIdx === idx ? "bg-gold-400" : "bg-zinc-800"}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Room Description Detail Box */}
                  <div className="bg-zinc-900/60 border border-gold-400/10 rounded-xl p-4 space-y-1">
                    <span className="font-cinzel text-[9px] tracking-widest text-gold-400 uppercase font-bold block">
                      {currentRoom.name}
                    </span>
                    <p className="font-sans text-[10px] leading-relaxed text-zinc-400">
                      {currentRoom.desc}
                    </p>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => setShow3DModal(false)}
                  className="w-full h-11 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-luxury-black font-bold text-[10px] tracking-widest uppercase transition-all duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer mt-6"
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
