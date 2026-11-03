"use client";

import React, { useState } from "react";
import { MessageSquare, Phone, ArrowUpRight, Check, Copy } from "lucide-react";
import confetti from "canvas-confetti";
import { DEVELOPMENT_PLANS, DevelopmentPlan } from "@/constants/plans";
import { LavenderStar, SlateAsterisk } from "@/components/ui/BrandDeco";

interface ContactFunnelProps {
  selectedPlan: DevelopmentPlan | null;
  onSelectPlan: (plan: DevelopmentPlan) => void;
}

interface BusinessGoal {
  id: string;
  label: string;
  full: string;
}

const BUSINESS_GOALS: BusinessGoal[] = [
  {
    id: "tienda",
    label: "🛍️ Vender en línea",
    full: "Vender por internet con mi propia tienda"
  },
  {
    id: "clientes",
    label: "🎯 Captar clientes",
    full: "Una página directa para conseguir clientes"
  },
  {
    id: "marca",
    label: "🏢 Imagen de marca",
    full: "Darle imagen seria y profesional a mi negocio"
  },
  {
    id: "sistema",
    label: "⚙️ Sistema a medida",
    full: "Un programa o sistema especial para mi empresa"
  }
];

export default function ContactFunnel({ selectedPlan, onSelectPlan }: ContactFunnelProps) {
  const currentPlan = selectedPlan || DEVELOPMENT_PLANS[2];
  const [selectedGoal, setSelectedGoal] = useState<string>(BUSINESS_GOALS[0].full);
  const [clientName, setClientName] = useState<string>("");
  const [projectIdea, setProjectIdea] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const generatedMessage = `¡Hola Edwin! 👋 Vi sus páginas en Vision Web y me gustaría cotizar mi proyecto.

📌 Me interesa: ${currentPlan.name}
🎯 Lo que busco: ${selectedGoal}
👤 Mi nombre / negocio: ${clientName.trim() ? clientName.trim() : "Quisiera que me asesoren"}
💡 De qué trata mi negocio: ${projectIdea.trim() ? projectIdea.trim() : "Quiero saber cuánto costaría y cómo empezamos."}

Quedo atento a su respuesta. ¡Muchas gracias!`;

  const whatsappUrl = `https://wa.me/573052311490?text=${encodeURIComponent(generatedMessage)}`;

  const handleLaunchWhatsApp = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#D5DD54", "#141534", "#A29EDB", "#FFFFFF"]
      });
    } catch {
      // ignore
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contacto" className="relative py-10 sm:py-16 md:py-24 bg-[#F4F2EB] border-t border-[#141534]/10 overflow-hidden">
      {/* Background dot matrix texture */}
      <div className="absolute inset-0 bg-canvas-pattern pointer-events-none"></div>

      {/* Decorative Lavender Star (Top Right) */}
      <div className="absolute top-6 right-3 sm:top-10 sm:right-14 pointer-events-none opacity-80 scale-75 sm:scale-100 origin-top-right">
        <LavenderStar size={80} />
      </div>

      {/* Decorative Slate Asterisk (Bottom Left) */}
      <div className="absolute bottom-4 left-3 sm:bottom-8 sm:left-12 pointer-events-none opacity-50 scale-75 sm:scale-100 origin-bottom-left">
        <SlateAsterisk size={70} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-[#141534]/12 text-[#141534] font-mono text-[11px] sm:text-xs tracking-wider uppercase mb-3 shadow-[0_1px_3px_rgba(20,21,52,0.03)]">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Escríbenos Directo</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#141534] tracking-tight mb-3">
            Cotiza en 30 segundos por WhatsApp.
          </h2>

          <p className="text-sm sm:text-base text-[#585A74] max-w-xl mx-auto font-normal leading-relaxed">
            Elige lo que necesitas, dinos tu idea y te responderemos al instante sin rodeos.
          </p>
        </div>

        {/* Funnel Card */}
        <div className="bg-white rounded-3xl border border-[#141534]/15 shadow-[0_20px_50px_-10px_rgba(20,21,52,0.12)] overflow-hidden p-5 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left Column: Plan & Details (7 Cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              {/* Step 1: Plan */}
              <div>
                <label className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#141534] font-black block mb-2 sm:mb-2.5">
                  1. ¿Qué tipo de página o servicio buscas?
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {DEVELOPMENT_PLANS.map((plan) => {
                    const isSelected = plan.id === currentPlan.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => onSelectPlan(plan)}
                        className={`p-3 rounded-xl text-left border transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                          isSelected
                            ? "bg-[#D5DD54] border-[#141534] text-[#141534] shadow-[0_2px_10px_rgba(213,221,84,0.4)] font-bold"
                            : "bg-[#FAF8F2] border-[#141534]/12 text-[#585A74] hover:border-[#141534]/30 hover:text-[#141534]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-heading text-xs font-black truncate">
                            {plan.name}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#141534] stroke-[2.5] shrink-0" />}
                        </div>
                        <span className="text-[10px] font-mono text-[#141534]/80 block mt-0.5 truncate">
                          {plan.estimatedDelivery}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Goal */}
              <div>
                <label className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#141534] font-black block mb-2 sm:mb-2.5">
                  2. ¿Qué buscas lograr?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {BUSINESS_GOALS.map((goal) => {
                    const isSelected = selectedGoal === goal.full;
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => setSelectedGoal(goal.full)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border text-center truncate active:scale-95 ${
                          isSelected
                            ? "bg-[#141534] text-white border-[#141534] shadow-[0_2px_8px_-1px_rgba(20,21,52,0.25)]"
                            : "bg-[#FAF8F2] text-[#141534] border-[#141534]/12 hover:bg-white"
                        }`}
                      >
                        <span className="truncate block">{goal.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Fast Inputs */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                <div>
                  <label className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#141534] font-black block mb-1 truncate">
                    Tu Nombre / Negocio
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej. Carlos"
                    className="w-full bg-[#FAF8F2] border border-[#141534]/15 rounded-xl px-3 py-2.5 text-xs text-[#141534] placeholder-[#84818A] focus:border-[#141534] focus:ring-2 focus:ring-[#141534]/10 focus:bg-white outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#141534] font-black block mb-1 truncate">
                    ¿De qué es? (Opcional)
                  </label>
                  <input
                    type="text"
                    value={projectIdea}
                    onChange={(e) => setProjectIdea(e.target.value)}
                    placeholder="Ej. Ropa / Médico"
                    className="w-full bg-[#FAF8F2] border border-[#141534]/15 rounded-xl px-3 py-2.5 text-xs text-[#141534] placeholder-[#84818A] focus:border-[#141534] focus:ring-2 focus:ring-[#141534]/10 focus:bg-white outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Live Message Preview Box & WhatsApp Trigger (5 Cols) */}
            <div className="lg:col-span-5 bg-[#141534] rounded-2xl p-5 sm:p-7 text-white flex flex-col justify-between shadow-[0_8px_24px_-4px_rgba(20,21,52,0.25)]">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D5DD54] animate-pulse"></span>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#D5DD54] font-black">
                      Mensaje Listo para Enviar
                    </span>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="text-[10px] font-mono text-white/70 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-[#D5DD54]" />
                        <span className="text-[#D5DD54]">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-[#0B0C1E] border border-white/10 rounded-xl p-3.5 font-mono text-[11px] sm:text-xs text-white/90 whitespace-pre-wrap leading-relaxed max-h-[120px] sm:max-h-[190px] overflow-y-auto custom-scrollbar">
                  {generatedMessage}
                </div>
              </div>

              {/* Direct Action Button to WhatsApp */}
              <div className="mt-4 sm:mt-6 pt-3 border-t border-white/10 space-y-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLaunchWhatsApp}
                  className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider bg-[#D5DD54] hover:bg-[#C5CD43] text-[#141534] transition-all duration-200 flex items-center justify-center gap-2 text-center shadow-[0_4px_16px_rgba(213,221,84,0.4)] active:scale-[0.985] cursor-pointer"
                >
                  <Phone className="w-4 h-4 fill-[#141534]" />
                  <span>Escribir a WhatsApp y Empezar</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <p className="text-[10px] text-center font-mono text-white/60">
                  Te respondemos en menos de 2 horas en horario comercial
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
