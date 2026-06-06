"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const startAmbientSynth = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Filter for warm sound (lowpass cut-off)
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      // Master gain node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 3.0);
      gainNodeRef.current = masterGain;

      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      // Warm drone chord: F2 (87.31Hz), C3 (130.81Hz), F3 (174.61Hz), A3 (220.00Hz), C4 (261.63Hz)
      const chord = [87.31, 130.81, 174.61, 220.00, 261.63];
      oscillatorsRef.current = chord.map((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx % 2 === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Add minor detuning for thick chorus
        osc.detune.setValueAtTime((Math.random() - 0.5) * 15, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.08, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        return osc;
      });

      // LFO for slow ambient sweep
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.08;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 120;
      
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      lfoRef.current = lfo;

      setIsPlaying(true);
    } catch (e) {
      console.error("Web Audio API not supported", e);
    }
  };

  const stopAmbientSynth = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      const gain = gainNodeRef.current;

      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);

      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try { osc.stop(); } catch (e) {}
        });
        if (lfoRef.current) {
          try { lfoRef.current.stop(); } catch (e) {}
        }
        if (ctx.state !== "closed") {
          ctx.close();
        }
        audioCtxRef.current = null;
        oscillatorsRef.current = [];
        gainNodeRef.current = null;
        lfoRef.current = null;
        setIsPlaying(false);
      }, 1300);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAmbientSynth();
    } else {
      startAmbientSynth();
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        oscillatorsRef.current.forEach((osc) => {
          try { osc.stop(); } catch (e) {}
        });
        if (lfoRef.current) {
          try { lfoRef.current.stop(); } catch (e) {}
        }
        if (audioCtxRef.current.state !== "closed") {
          audioCtxRef.current.close();
        }
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      className="flex items-center gap-3 bg-glass border border-gold-400/20 hover:border-gold-400/50 hover:bg-zinc-900/60 transition-all duration-300 px-4 py-2 rounded-full cursor-pointer group pointer-events-auto"
      aria-label="Toggle ambient atmosphere sound"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-gold-400" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
            </span>
          </>
        ) : (
          <VolumeX className="w-4 h-4 text-zinc-400 group-hover:text-gold-300 transition-colors" />
        )}
      </div>
      <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-zinc-300 group-hover:text-gold-200 transition-colors select-none">
        {isPlaying ? "Mute Ambient" : "Ambient Audio"}
      </span>
    </button>
  );
}
