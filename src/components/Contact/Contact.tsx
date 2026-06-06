"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Send, CheckCircle2, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [residence, setResidence] = useState("Sky Mansions ($12.5M+)");
  const [helicopter, setHelicopter] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-16 py-20 z-10 pointer-events-none"
    >
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center pointer-events-auto">
        
        {/* Left Side: Contact Information */}
        <div className="md:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="text-[10px] font-bold tracking-[0.3em] text-gold-400 uppercase block">
              PRIVATE RESERVATIONS
            </span>
            <h2 className="font-cinzel text-3xl md:text-5xl font-bold leading-tight text-luxury-gradient">
              Acquire <br />
              Your Space in <br />
              <span className="text-gold-gradient font-black">The Sky</span>
            </h2>
            <p className="font-sans text-xs md:text-sm leading-relaxed text-zinc-400 pt-2">
              Viewing tours are reserved exclusively for vetted clients. Complete the registration form to coordinate a private viewing with our lifestyle concierge directors.
            </p>
          </div>

          <div className="space-y-4 border-t border-gold-400/15 pt-6">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-gold-950/20 border border-gold-400/20 flex items-center justify-center text-gold-400 flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="font-sans text-xs">
                <span className="text-zinc-500 block uppercase tracking-wider font-bold">Residences Location</span>
                <span className="text-zinc-200">777 Altitude Way, Penthouse District</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-gold-950/20 border border-gold-400/20 flex items-center justify-center text-gold-400 flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="font-sans text-xs">
                <span className="text-zinc-500 block uppercase tracking-wider font-bold">Direct Line</span>
                <span className="text-zinc-200">+1 (800) TITAN-LUXE</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-gold-950/20 border border-gold-400/20 flex items-center justify-center text-gold-400 flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="font-sans text-xs">
                <span className="text-zinc-500 block uppercase tracking-wider font-bold">Electronic Mail</span>
                <span className="text-zinc-200">concierge@titanresidences.com</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-[10px] text-zinc-500 tracking-wider">
            <ShieldCheck className="w-4 h-4 text-gold-500" />
            <span>End-to-End Encryption & Privacy Guaranteed</span>
          </div>
        </div>

        {/* Right Side: Contact Form Card */}
        <div className="md:col-span-7 bg-glass rounded-3xl p-8 border border-gold-400/10 shadow-2xl relative min-h-[460px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="w-full space-y-5"
              >
                <h3 className="font-cinzel text-lg font-bold text-zinc-100 tracking-wider mb-2">
                  Request Private Briefing
                </h3>

                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    Vetted Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sterling H. Dupont"
                    className="w-full h-11 px-4 rounded-xl bg-zinc-950/60 border border-gold-400/15 focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/30 text-zinc-200 placeholder-zinc-600 text-xs font-medium outline-none transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      Secure Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. dupont@luxury.com"
                      className="w-full h-11 px-4 rounded-xl bg-zinc-950/60 border border-gold-400/15 focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/30 text-zinc-200 placeholder-zinc-600 text-xs font-medium outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      Mobile Coordinates
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full h-11 px-4 rounded-xl bg-zinc-950/60 border border-gold-400/15 focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/30 text-zinc-200 placeholder-zinc-600 text-xs font-medium outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Residence Category Select */}
                <div className="space-y-1.5">
                  <label htmlFor="residence" className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    Preferred Collection
                  </label>
                  <select
                    id="residence"
                    value={residence}
                    onChange={(e) => setResidence(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl bg-zinc-950/80 border border-gold-400/15 focus:border-gold-400/60 text-zinc-200 text-xs font-medium outline-none transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="Sky Mansions ($12.5M+)">Sky Mansions (Floors 10-15) — $12.5M+</option>
                    <option value="Duplex Penthouses ($24M+)">Duplex Penthouses (Floors 16-22) — $24.0M+</option>
                    <option value="The Titan Crown ($48.5M+)">The Titan Crown (Floors 23-24) — $48.5M+</option>
                  </select>
                </div>

                {/* Custom Checkbox (Helicopter coordinate request) */}
                <label className="flex items-center gap-3 cursor-pointer select-none py-1 group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={helicopter}
                      onChange={(e) => setHelicopter(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-md border transition-all duration-300 flex items-center justify-center ${
                      helicopter ? "border-gold-400 bg-gold-950/40" : "border-gold-400/20 bg-zinc-950/60 group-hover:border-gold-400/50"
                    }`}>
                      {helicopter && <div className="w-2.5 h-2.5 rounded bg-gold-400" />}
                    </div>
                  </div>
                  <span className="font-sans text-[11px] text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    Request direct heli-pad landing vector for viewing
                  </span>
                </label>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-luxury-black font-bold text-[10px] tracking-widest uppercase hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(212,175,55,0.2)] mt-6"
                >
                  <Send className="w-3.5 h-3.5" />
                  Request Registry Invitation
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full text-center space-y-6 py-6"
              >
                {/* Custom Particle Ring and Check */}
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-gold-400/35 animate-ping opacity-75" />
                  <div className="w-16 h-16 rounded-full bg-gold-950/30 border border-gold-400/30 flex items-center justify-center text-gold-400 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-gold-400 uppercase block">
                    INQUIRY FILED SECURELY
                  </span>
                  <h3 className="font-cinzel text-2xl font-bold text-zinc-100">
                    Welcome to the Circle
                  </h3>
                  <p className="font-sans text-xs leading-relaxed text-zinc-400 max-w-sm mx-auto">
                    A Titan private residency director will contact you at <strong className="text-zinc-200">{email}</strong> within two hours to verify credentials and arrange transportation coordinates.
                  </p>
                </div>

                <div className="border-t border-gold-400/10 pt-5 max-w-xs mx-auto text-[10px] text-zinc-500 tracking-wider">
                  Reference Code: TT-{Math.floor(1000 + Math.random() * 9000)}-{new Date().getFullYear()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
