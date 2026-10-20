"use client";

import React from "react";
import { GitBranch, Compass, Palette, Code2, Rocket } from "lucide-react";
import { LavenderStar, SlateAsterisk, TechnicalCross } from "@/components/ui/BrandDeco";

const STEPS = [
  {
    number: "01",
    title: "Charla y Plan",
    description: "Nos cuentas qué vendes, definimos lo que necesitas y te damos precio cerrado sin sorpresas.",
    icon: Compass
  },
  {
    number: "02",
    title: "Diseño a tu Gusto",
    description: "Te mostramos cómo se verá tu página: bonita, clara y con los colores y fotos de tu marca.",
    icon: Palette
  },
  {
    number: "03",
    title: "Armado y Pagos",
    description: "Montamos todo, conectamos tus cobros (Nequi, tarjetas) y el botón directo a tu WhatsApp.",
    icon: Code2
  },
  {
    number: "04",
    title: "Estreno y Entrega",
    description: "Ponemos tu página en vivo en internet para todo el mundo y te entregamos los accesos completos.",
    icon: Rocket
  }
];

export default function ProcessSection() {
  return (
    <section id="proceso" className="relative py-10 sm:py-16 md:py-24 bg-[#F4F2EB] border-t border-[#141534]/10 overflow-hidden scroll-mt-20">
      {/* Background dot matrix texture */}
      <div className="absolute inset-0 bg-canvas-pattern pointer-events-none"></div>

      {/* Decorative Lavender Star (Top Right) */}
      <div className="absolute top-6 right-3 sm:top-10 sm:right-14 pointer-events-none opacity-80 scale-75 sm:scale-100 origin-top-right">
        <LavenderStar size={75} />
      </div>

      {/* Decorative Slate Asterisk (Bottom Left) */}
      <div className="absolute bottom-4 left-3 sm:bottom-8 sm:left-12 pointer-events-none opacity-45 scale-75 sm:scale-100 origin-bottom-left">
        <SlateAsterisk size={65} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141534]/5 border border-[#141534]/15 text-[#141534] font-mono text-[11px] sm:text-xs tracking-wider uppercase mb-2 sm:mb-3">
            <GitBranch className="w-3.5 h-3.5" />
            <span>¿Cómo Trabajamos?</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-[#141534] tracking-tight mb-2 sm:mb-3">
            De tu idea a la web lista en 4 pasos sencillos.
          </h2>

          <p className="text-xs sm:text-base text-[#585A74]">
            Sin palabras raras ni complicaciones: te acompañamos en todo el camino.
          </p>
        </div>

        {/* 4 Process Steps: 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-[#141534]/15 hover:border-[#141534]/40 transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-base sm:text-xl font-black bg-[#D5DD54] text-[#141534] px-1.5 sm:px-2 py-0.5 rounded border border-[#141534]">
                      {step.number}
                    </span>
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#F4F2EB] border border-[#141534]/10 flex items-center justify-center text-[#141534]">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>

                  <h3 className="font-heading text-xs sm:text-base font-black text-[#141534] mb-1 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-[#585A74] leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {step.description}
                  </p>
                </div>

                <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-[#141534]/10 text-[9px] sm:text-[10px] font-mono text-[#585A74]">
                  <span>Paso {idx + 1} de 4</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
