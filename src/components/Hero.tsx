"use client";

import React from "react";
import { ArrowRight, Play, Zap, CheckCircle2, ShieldCheck, Rocket } from "lucide-react";
import TechText from "@/components/ui/TechText";
import AsciiRipple from "@/components/ui/AsciiRipple";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-8 sm:pt-28 sm:pb-12 md:pt-36 md:pb-20 overflow-hidden">
      {/* Background canvas texture */}
      <div className="absolute inset-0 bg-canvas-pattern pointer-events-none"></div>

      {/* ASCII Ripple Interactive Fluid Wave Simulation (React Bits Pro) */}
      <AsciiRipple
        className="absolute inset-0 pointer-events-none z-0"
        cellSize={13}
        characters=" ·.:~=+*#%@"
        sensitivity={2.2}
        slopeGain={1.0}
        refraction={4}
        scramble={1.0}
        scrambleSpeed={90}
        dither={0.5}
        vignette={0.65}
        baseColor="rgba(20, 21, 52, 0.08)"
        inkColor="#141534"
        accentColor="#D5DD54"
        secondaryAccent="#A29EDB"
        ambientDrops={true}
        ambientInterval={3500}
      />

      {/* Decorative Lavender Star (Matching User Reference Image Top-Left) */}
      <div className="absolute top-8 left-2 sm:top-20 sm:left-12 pointer-events-none select-none opacity-80 scale-75 sm:scale-100 origin-top-left">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" className="text-[#A29EDB]">
          <path
            d="M50 0L54 38L92 20L62 48L100 50L62 52L92 80L54 62L50 100L46 62L8 80L38 52L0 50L38 48L8 20L46 38L50 0Z"
            fill="currentColor"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* Decorative Asterisk (Matching User Reference Image Bottom-Right) */}
      <div className="absolute bottom-4 right-3 sm:bottom-10 sm:right-16 pointer-events-none select-none opacity-40 scale-75 sm:scale-100 origin-bottom-right">
        <svg width="90" height="90" viewBox="0 0 100 100" fill="currentColor" className="text-[#84818A]">
          <rect x="42" y="5" width="16" height="90" rx="8" />
          <rect x="42" y="5" width="16" height="90" rx="8" transform="rotate(60 50 50)" />
          <rect x="42" y="5" width="16" height="90" rx="8" transform="rotate(120 50 50)" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Monospace Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#141534]/5 border border-[#141534]/15 text-[#141534] font-mono text-[11px] sm:text-xs tracking-wider mb-4 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-[#D5DD54] border border-[#141534]"></span>
          <span>[ PÁGINAS WEB Y TIENDAS QUE SÍ VENDEN ]</span>
        </div>

        {/* Big Bold Headline with Tech Text (Decrypted / Scramble) animation */}
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#141534] tracking-tight leading-[1.14] mb-5 sm:mb-6 max-w-5xl mx-auto">
          <TechText text="DEJÁ DE" speed={30} animateOn="both" />{" "}
          <span className="bg-[#D5DD54] text-[#141534] px-2 sm:px-3 py-0.5 rounded-sm inline-block shadow-sm align-baseline">
            <TechText
              text="PERDER TIEMPO"
              speed={30}
              animateOn="both"
              encryptedClassName="opacity-80 font-mono text-[#141534]"
            />
          </span>{" "}
          <br className="hidden sm:inline" />
          <TechText
            text="CON UNA WEB SIN ESTRATEGIA"
            speed={25}
            animateOn="both"
            encryptedClassName="opacity-60 font-mono text-[#141534]"
          />
        </h1>

        {/* Subtitle from Reference Image tone */}
        <p className="text-sm sm:text-lg md:text-xl text-[#585A74] max-w-2xl mx-auto font-medium leading-relaxed mb-8 sm:mb-10 px-2">
          Si llegaste hasta acá, sabés que tu negocio necesita vender más: páginas que abren al instante, tiendas fáciles de usar y pedidos directo a tu WhatsApp.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-10 sm:mb-14 w-full">
          <a
            href="#planes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-extrabold bg-[#141534] hover:bg-[#222452] text-white shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <Rocket className="w-4 h-4 text-[#D5DD54]" />
            <span>Ver Opciones y Planes</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#portafolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-extrabold bg-white hover:bg-white/80 text-[#141534] border-2 border-[#141534] shadow-sm hover:-translate-y-0.5 transition-all duration-200"
          >
            <Play className="w-3.5 h-3.5 fill-[#141534]" />
            <span>Ver Páginas Reales</span>
          </a>
        </div>

        {/* 3 Quick Facts with Lime/Navy Accents */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-white border border-[#141534]/10 shadow-sm max-w-2xl mx-auto">
          <div className="flex flex-col items-center justify-center p-1 sm:p-2 text-center border-r border-[#141534]/10">
            <div className="flex items-center gap-1 text-[#141534] font-mono font-black text-sm sm:text-lg md:text-xl">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D5DD54] fill-[#D5DD54]" />
              <span>&lt; 1s</span>
            </div>
            <span className="text-[9px] sm:text-xs text-[#585A74] font-semibold mt-0.5">Abre al instante</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1 sm:p-2 text-center border-r border-[#141534]/10">
            <div className="flex items-center gap-1 text-[#141534] font-mono font-black text-sm sm:text-lg md:text-xl">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#141534]" />
              <span>100%</span>
            </div>
            <span className="text-[9px] sm:text-xs text-[#585A74] font-semibold mt-0.5">Página tuya</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1 sm:p-2 text-center">
            <div className="flex items-center gap-1 text-[#141534] font-mono font-black text-xs sm:text-base md:text-xl whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#141534]" />
              <span>Nequi & PSE</span>
            </div>
            <span className="text-[9px] sm:text-xs text-[#585A74] font-semibold mt-0.5">Pagos fácil</span>
          </div>
        </div>
      </div>
    </section>
  );
}
