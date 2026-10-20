"use client";

import React from "react";
import { Check, Sparkles, Clock, ArrowRight, Layers } from "lucide-react";
import { DEVELOPMENT_PLANS, DevelopmentPlan } from "@/constants/plans";
import { LavenderStar, SlateAsterisk, TechnicalCross } from "@/components/ui/BrandDeco";

interface PlansSectionProps {
  onSelectPlan: (plan: DevelopmentPlan) => void;
}

export default function PlansSection({ onSelectPlan }: PlansSectionProps) {
  return (
    <section id="planes" className="relative py-20 md:py-28 bg-[#F4F2EB] overflow-hidden scroll-mt-20">
      {/* Background dot matrix texture */}
      <div className="absolute inset-0 bg-canvas-pattern pointer-events-none"></div>

      {/* Decorative Lavender Star (Top Right) */}
      <div className="absolute top-10 right-6 sm:right-14 pointer-events-none opacity-80">
        <LavenderStar size={80} />
      </div>

      {/* Decorative Slate Asterisk (Bottom Left) */}
      <div className="absolute bottom-8 left-6 sm:left-12 pointer-events-none opacity-50">
        <SlateAsterisk size={70} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141534]/5 border border-[#141534]/15 text-[#141534] font-mono text-xs tracking-wider uppercase mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Planes y Servicios</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#141534] tracking-tight mb-3">
            Elige lo que tu negocio necesita hoy.
          </h2>

          <p className="text-sm sm:text-base text-[#585A74]">
            Precios claros según lo que quieras armar, sin mensualidades sorpresa ni letras chiquitas.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {DEVELOPMENT_PLANS.map((plan) => {
            const isStar = plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-200 bg-white ${
                  isStar
                    ? "border-2 border-[#141534] shadow-[6px_6px_0px_#141534] lg:-translate-y-1.5"
                    : "border border-[#141534]/15 hover:border-[#141534]/40 hover:shadow-md"
                }`}
              >
                {/* Luminous Top Badge for Star Plan */}
                {isStar && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-[#D5DD54] text-[#141534] border border-[#141534] shadow-sm">
                      <Sparkles className="w-3 h-3 fill-[#141534]" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  {/* Technical index + Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#84818A] font-bold">
                      // 0{DEVELOPMENT_PLANS.indexOf(plan) + 1}
                    </span>
                    {!isStar && (
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-[#141534]/5 text-[#585A74]">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* Plan Name */}
                  <h3 className="font-heading text-lg font-black text-[#141534] tracking-tight mb-1">
                    {plan.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs text-[#585A74] mb-4 leading-normal">
                    {plan.tagline}
                  </p>

                  {/* Quote Indicator */}
                  <div className="mb-4 p-3 rounded-xl bg-[#F4F2EB] border border-[#141534]/10">
                    <span className="text-[9px] font-mono uppercase text-[#585A74] font-bold block">
                      Inversión
                    </span>
                    <p className="text-xs font-black text-[#141534] mt-0.5">
                      {plan.quoteIndicator}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-[#585A74] mt-1 font-mono">
                      <Clock className="w-3 h-3 text-[#585A74]" />
                      <span>Entrega: {plan.estimatedDelivery}</span>
                    </div>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 mb-6 flex-1">
                    <span className="text-[10px] font-mono uppercase text-[#585A74] font-bold block mb-1">
                      Incluye:
                    </span>
                    {plan.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isStar
                              ? "bg-[#D5DD54] text-[#141534]"
                              : "bg-[#141534]/10 text-[#141534]"
                          }`}
                        >
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="text-xs text-[#141534]/85 leading-tight font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="p-5 sm:p-6 pt-0">
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-3 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isStar
                        ? "bg-[#D5DD54] hover:bg-[#C5CD43] text-[#141534] border-2 border-[#141534] shadow-sm hover:translate-y-[-1px]"
                        : "bg-[#141534] hover:bg-[#222452] text-white"
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
      </div>
    </section>
  );
}
