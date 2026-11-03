"use client";

import React from "react";
import { ArrowRight, Play, Zap, CheckCircle2, ShieldCheck, Rocket } from "lucide-react";
import TechText from "@/components/ui/TechText";
import AsciiRipple from "@/components/ui/AsciiRipple";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-10 sm:pt-36 sm:pb-14 md:pt-44 md:pb-20 overflow-hidden">
      {/* Background canvas texture */}
      <div className="absolute inset-0 bg-canvas-pattern pointer-events-none"></div>

      {/* ASCII Ripple Interactive Fluid Wave Simulation (React Bits Pro - Subtle & Interactive) */}
      <AsciiRipple
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        cellSize={16}
        characters=" ·:+~*#%"
        sensitivity={1.8}
        slopeGain={1.0}
        refraction={3}
        scrambleSpeed={100}
        vignette={0.5}
        inkColor="rgba(20, 21, 52, 0.45)"
        accentColor="#D5DD54"
        secondaryAccent="#A29EDB"
      />

      {/* Decorative Lavender Star (Matching User Reference Image Top-Left) */}
      <div className="absolute top-8 left-2 sm:top-20 sm:left-12 pointer-events-none select-none opacity-80 scale-75 sm:scale-100 origin-top-left transition-transform duration-700 hover:rotate-12">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" className="text-[#A29EDB]">
          <path
            d="M50 0L54 38L92 20L62 48L100 50L62 52L92 80L54 62L50 100L46 62L8 80L38 52L0 50L38 48L8 20L46 38L50 0Z"
            fill="currentColor"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* Decorative Asterisk (Matching User Reference Image Bottom-Right) */}
      <div className="absolute bottom-4 right-3 sm:bottom-10 sm:right-16 pointer-events-none select-none opacity-40 scale-75 sm:scale-100 origin-bottom-right transition-transform duration-700 hover:-rotate-12">
        <svg width="90" height="90" viewBox="0 0 100 100" fill="currentColor" className="text-[#84818A]">
          <rect x="42" y="5" width="16" height="90" rx="8" />
          <rect x="42" y="5" width="16" height="90" rx="8" transform="rotate(60 50 50)" />
          <rect x="42" y="5" width="16" height="90" rx="8" transform="rotate(120 50 50)" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Monospace Badge with subtle glass tactile surface */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-[#141534]/12 text-[#141534] font-mono text-[11px] sm:text-xs tracking-wider shadow-[0_2px_8px_-2px_rgba(20,21,52,0.04)] mb-5 sm:mb-8 hover:border-[#141534]/25 transition-colors">
          <span className="w-2 h-2 rounded-full bg-[#D5DD54] border border-[#141534]"></span>
          <span>[ PÁGINAS WEB Y TIENDAS QUE SÍ VENDEN ]</span>
        </div>

        {/* Big Bold Headline with Tech Text (Decrypted / Scramble) animation */}
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-black text-[#141534] tracking-[-0.035em] leading-[1.08] mb-5 sm:mb-7 max-w-5xl mx-auto">
          <TechText text="DEJÁ DE" speed={30} animateOn="both" />{" "}
          <span className="bg-[#D5DD54] text-[#141534] px-2.5 sm:px-3.5 py-0.5 rounded-md inline-block shadow-[0_2px_10px_-2px_rgba(213,221,84,0.6)] align-baseline">
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
        <p className="text-base sm:text-lg md:text-xl text-[#585A74] max-w-2xl mx-auto font-medium leading-relaxed mb-8 sm:mb-11 px-2">
          Si llegaste hasta acá, sabés que tu negocio necesita vender más: páginas que abren al instante, tiendas fáciles de usar y pedidos directo a tu WhatsApp.
        </p>

        {/* Action Buttons with high-agency micro-interactions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-10 sm:mb-14 w-full">
          <a
            href="#planes"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-xs sm:text-sm font-extrabold bg-[#141534] hover:bg-[#20224A] text-white shadow-[0_4px_16px_-2px_rgba(20,21,52,0.3)] hover:shadow-[0_8px_24px_-4px_rgba(20,21,52,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141534] focus-visible:ring-offset-2 ring-offset-[#F4F2EB] transition-all duration-200 cursor-pointer"
          >
            <Rocket className="w-4 h-4 text-[#D5DD54] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200" />
            <span>Ver Opciones y Planes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>

          <a
            href="#portafolio"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-xs sm:text-sm font-extrabold bg-white hover:bg-[#FAF8F2] text-[#141534] border border-[#141534]/15 hover:border-[#141534]/30 shadow-[0_2px_8px_-2px_rgba(20,21,52,0.06)] hover:shadow-[0_6px_18px_-4px_rgba(20,21,52,0.1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141534] focus-visible:ring-offset-2 ring-offset-[#F4F2EB] transition-all duration-200 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-[#141534] group-hover:scale-110 transition-transform duration-200" />
            <span>Ver Páginas Reales</span>
          </a>
        </div>

        {/* 3 Quick Facts with Lime/Navy Accents on Editorial Card Surface */}
        <div className="editorial-card rounded-2xl p-3 sm:p-4 max-w-2xl mx-auto grid grid-cols-3 divide-x divide-[#141534]/8">
          <div className="flex flex-col items-center justify-center p-2 sm:p-2.5 text-center">
            <div className="flex items-center gap-1.5 text-[#141534] font-mono font-black text-sm sm:text-lg md:text-xl tracking-tight">
              <Zap className="w-4 h-4 text-[#D5DD54] fill-[#D5DD54]" />
              <span>&lt; 1s</span>
            </div>
            <span className="text-[10px] sm:text-xs text-[#585A74] font-medium tracking-wide mt-1">Abre al instante</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 sm:p-2.5 text-center">
            <div className="flex items-center gap-1.5 text-[#141534] font-mono font-black text-sm sm:text-lg md:text-xl tracking-tight">
              <CheckCircle2 className="w-4 h-4 text-[#141534]" />
              <span>100%</span>
            </div>
            <span className="text-[10px] sm:text-xs text-[#585A74] font-medium tracking-wide mt-1">Página tuya</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 sm:p-2.5 text-center">
            <div className="flex items-center gap-1.5 text-[#141534] font-mono font-black text-xs sm:text-base md:text-xl tracking-tight whitespace-nowrap">
              <ShieldCheck className="w-4 h-4 text-[#141534]" />
              <span>Nequi & PSE</span>
            </div>
            <span className="text-[10px] sm:text-xs text-[#585A74] font-medium tracking-wide mt-1">Pagos fácil</span>
          </div>
        </div>
      </div>
    </section>
  );
}
