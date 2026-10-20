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
    <section id="preguntas" className="relative py-20 md:py-28 bg-[#F4F2EB] border-t border-[#141534]/10 overflow-hidden scroll-mt-20">
      <div id="faq" className="absolute -top-24" />

      {/* Background dot matrix texture */}
      <div className="absolute inset-0 bg-canvas-pattern pointer-events-none"></div>

      {/* Decorative Lavender Star (Top Left) */}
      <div className="absolute top-10 left-6 sm:left-14 pointer-events-none opacity-80">
        <LavenderStar size={75} />
      </div>

      {/* Decorative Slate Asterisk (Bottom Right) */}
      <div className="absolute bottom-8 right-6 sm:right-12 pointer-events-none opacity-50">
        <SlateAsterisk size={65} />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141534]/5 border border-[#141534]/15 text-[#141534] font-mono text-xs tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Preguntas Frecuentes</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#141534] tracking-tight mb-2">
            Resolvemos tus dudas.
          </h2>

          <p className="text-sm sm:text-base text-[#585A74]">
            Todo claro desde el primer día sobre tiempos, cobros y propiedad del código.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#141534]/15 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer focus:outline-none"
                >
                  <span className="font-heading font-black text-sm sm:text-base text-[#141534]">
                    {faq.question}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#F4F2EB] flex items-center justify-center shrink-0 text-[#141534]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#585A74] leading-relaxed border-t border-[#141534]/10 pt-3 font-medium">
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
