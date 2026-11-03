"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { FAQS } from "@/constants/faq";
import { LavenderStar, SlateAsterisk } from "@/components/ui/BrandDeco";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="preguntas" className="relative py-10 sm:py-16 md:py-24 bg-[#F4F2EB] border-t border-[#141534]/10 overflow-hidden scroll-mt-20">
      <div id="faq" className="absolute -top-24" />

      {/* Background dot matrix texture */}
      <div className="absolute inset-0 bg-canvas-pattern pointer-events-none"></div>

      {/* Decorative Lavender Star (Top Left) */}
      <div className="absolute top-6 left-3 sm:top-10 sm:left-14 pointer-events-none opacity-80 scale-75 sm:scale-100 origin-top-left">
        <LavenderStar size={75} />
      </div>

      {/* Decorative Slate Asterisk (Bottom Right) */}
      <div className="absolute bottom-4 right-3 sm:bottom-8 sm:right-12 pointer-events-none opacity-50 scale-75 sm:scale-100 origin-bottom-right">
        <SlateAsterisk size={65} />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-[#141534]/12 text-[#141534] font-mono text-[11px] sm:text-xs tracking-wider uppercase mb-3 shadow-[0_1px_3px_rgba(20,21,52,0.03)]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Preguntas Frecuentes</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#141534] tracking-tight mb-3">
            Resolvemos tus dudas.
          </h2>

          <p className="text-sm sm:text-base text-[#585A74] max-w-xl mx-auto font-normal leading-relaxed">
            Todo claro desde el primer día sobre tiempos, cobros y propiedad del código.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="editorial-card rounded-2xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4.5 sm:p-5 text-left flex items-center justify-between gap-3.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141534] focus-visible:ring-offset-2 ring-offset-[#F4F2EB] transition-colors"
                >
                  <span className="font-heading font-black text-sm sm:text-base text-[#141534] tracking-tight">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#FAF8F2] border border-[#141534]/10 flex items-center justify-center shrink-0 text-[#141534] transition-transform duration-200">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4.5 sm:px-5 pb-5 text-xs sm:text-sm text-[#585A74] leading-relaxed border-t border-[#141534]/8 pt-3.5 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
