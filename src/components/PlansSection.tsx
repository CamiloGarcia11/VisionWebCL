"use client";

import React from "react";
import { Check, Sparkles, Clock, ArrowRight, Layers } from "lucide-react";
import { DEVELOPMENT_PLANS, DevelopmentPlan } from "@/constants/plans";
import { LavenderStar, SlateAsterisk } from "@/components/ui/BrandDeco";

interface PlansSectionProps {
  onSelectPlan: (plan: DevelopmentPlan) => void;
}

export default function PlansSection({ onSelectPlan }: PlansSectionProps) {
  return (
    <section id="planes" className="relative py-12 sm:py-18 md:py-24 bg-[#F4F2EB] overflow-hidden scroll-mt-20">
      {/* Background dot matrix texture */}
      <div className="absolute inset-0 bg-canvas-pattern pointer-events-none"></div>

      {/* Decorative Lavender Star (Top Right) */}
      <div className="absolute top-6 right-3 sm:top-10 sm:right-14 pointer-events-none opacity-80 scale-75 sm:scale-100 origin-top-right transition-transform duration-700 hover:rotate-12">
        <LavenderStar size={80} />
      </div>

      {/* Decorative Slate Asterisk (Bottom Left) */}
      <div className="absolute bottom-4 left-3 sm:bottom-8 sm:left-12 pointer-events-none opacity-50 scale-75 sm:scale-100 origin-bottom-left transition-transform duration-700 hover:-rotate-12">
        <SlateAsterisk size={70} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-[#141534]/12 text-[#141534] font-mono text-[11px] sm:text-xs tracking-wider uppercase mb-3 shadow-[0_1px_3px_rgba(20,21,52,0.03)]">
            <Layers className="w-3.5 h-3.5" />
            <span>Planes y Servicios</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#141534] tracking-tight mb-3">
            Elige lo que tu negocio necesita hoy.
          </h2>

          <p className="text-sm sm:text-base text-[#585A74] max-w-xl mx-auto font-normal leading-relaxed">
            Precios claros según lo que quieras armar, sin mensualidades sorpresa ni letras chiquitas.
          </p>
        </div>

        {/* Pricing Cards: Mobile horizontal swipe, Desktop 4-col grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pt-6 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pt-6 sm:pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 sm:overflow-visible items-stretch custom-scrollbar">
          {DEVELOPMENT_PLANS.map((plan) => {
            const isStar = plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`w-[84vw] max-w-[320px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink relative rounded-2xl flex flex-col justify-between transition-all duration-300 bg-white ${
                  isStar
                    ? "border-2 border-[#141534] shadow-[0_14px_34px_-6px_rgba(20,21,52,0.18)] lg:-translate-y-2 ring-1 ring-[#141534]/10"
                    : "editorial-card"
                }`}
              >
                {/* Luminous Top Badge for Star Plan */}
                {isStar && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-[#D5DD54] text-[#141534] border border-[#141534] shadow-[0_2px_8px_rgba(213,221,84,0.4)] whitespace-nowrap">
                      <Sparkles className="w-3 h-3 fill-[#141534]" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  {/* Technical index + Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-[#84818A] font-bold tracking-wider">
                      {`// 0${DEVELOPMENT_PLANS.indexOf(plan) + 1}`}
                    </span>
                    {!isStar && (
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase font-bold bg-[#141534]/5 text-[#585A74] border border-[#141534]/8">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* Plan Name */}
                  <h3 className="font-heading text-lg sm:text-xl font-black text-[#141534] tracking-tight mb-1.5">
                    {plan.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs text-[#585A74] mb-4 leading-relaxed font-normal">
                    {plan.tagline}
                  </p>

                  {/* Quote Indicator */}
                  <div className="mb-4 p-3 rounded-xl bg-[#FAF8F2] border border-[#141534]/8">
                    <span className="text-[9px] font-mono uppercase text-[#585A74] font-bold tracking-wider block">
                      Inversión
                    </span>
                    <p className="text-sm font-black text-[#141534] mt-0.5 tracking-tight">
                      {plan.quoteIndicator}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#585A74] mt-1.5 font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#585A74]" />
                      <span>Entrega: {plan.estimatedDelivery}</span>
                    </div>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 mb-6 flex-1">
                    <span className="text-[10px] font-mono uppercase text-[#585A74] font-bold tracking-wider block mb-2">
                      Incluye:
                    </span>
                    {plan.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isStar
                              ? "bg-[#D5DD54] text-[#141534] shadow-[0_1px_4px_rgba(213,221,84,0.4)]"
                              : "bg-[#141534]/8 text-[#141534]"
                          }`}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                        </div>
                        <span className="text-xs text-[#141534]/85 leading-snug font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA with tactile micro-physics */}
                <div className="p-5 sm:p-6 pt-0">
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141534] focus-visible:ring-offset-2 ${
                      isStar
                        ? "bg-[#D5DD54] hover:bg-[#C5CD43] text-[#141534] border border-[#141534] shadow-[0_2px_10px_rgba(213,221,84,0.4)] hover:shadow-[0_4px_16px_rgba(213,221,84,0.5)]"
                        : "bg-[#141534] hover:bg-[#20224A] text-white shadow-sm hover:shadow-md"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 mt-3 font-mono text-[10px] text-[#585A74]">
          <span>↔ Desliza horizontalmente para ver todos los planes</span>
        </div>
      </div>
    </section>
  );
}
