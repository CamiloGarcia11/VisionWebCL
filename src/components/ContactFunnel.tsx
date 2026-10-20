"use client";

import React, { useState } from "react";
import { MessageSquare, Phone, ArrowUpRight, Check, Copy } from "lucide-react";
import confetti from "canvas-confetti";
import { DEVELOPMENT_PLANS, DevelopmentPlan } from "@/constants/plans";
import { LavenderStar, SlateAsterisk, TechnicalCross } from "@/components/ui/BrandDeco";

interface ContactFunnelProps {
  selectedPlan: DevelopmentPlan | null;
  onSelectPlan: (plan: DevelopmentPlan) => void;
}

const BUSINESS_GOALS = [
  "Vender por internet con mi propia tienda",
  "Una página directa para conseguir clientes",
  "Darle imagen seria y profesional a mi negocio",
  "Un programa o sistema especial para mi empresa"
];

export default function ContactFunnel({ selectedPlan, onSelectPlan }: ContactFunnelProps) {
  const currentPlan = selectedPlan || DEVELOPMENT_PLANS[2];
  const [selectedGoal, setSelectedGoal] = useState<string>(BUSINESS_GOALS[0]);
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
    <section id="contacto" className="relative py-20 md:py-28 bg-[#F4F2EB] border-t border-[#141534]/10 overflow-hidden">
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

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141534]/5 border border-[#141534]/15 text-[#141534] font-mono text-xs tracking-wider uppercase mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Escríbenos Directo</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#141534] tracking-tight mb-2">
            Cotiza en 30 segundos por WhatsApp.
          </h2>

          <p className="text-sm sm:text-base text-[#585A74]">
            Elige lo que necesitas, dinos tu idea y te responderemos al instante sin rodeos.
          </p>
        </div>

        {/* Funnel Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-[#141534] shadow-[5px_5px_0px_#141534] sm:shadow-[8px_8px_0px_#141534] overflow-hidden p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left Column: Plan & Details (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Step 1: Plan */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#141534] font-black block mb-2.5">
                  1. ¿Qué tipo de página o servicio buscas?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DEVELOPMENT_PLANS.map((plan) => {
                    const isSelected = plan.id === currentPlan.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => onSelectPlan(plan)}
                        className={`p-3 rounded-xl text-left border-2 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#D5DD54] border-[#141534] text-[#141534] shadow-sm font-bold"
                            : "bg-[#F4F2EB] border-[#141534]/15 text-[#585A74] hover:border-[#141534]/40 hover:text-[#141534]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-heading text-xs font-black truncate">
                            {plan.name}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#141534] shrink-0 ml-1" />}
                        </div>
                        <span className="text-[10px] font-mono text-[#141534]/80 block mt-0.5">
                          {plan.estimatedDelivery}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Goal */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#141534] font-black block mb-2.5">
                  2. ¿Qué buscas lograr?
                </label>
                <div className="flex flex-wrap gap-2">
                  {BUSINESS_GOALS.map((goal) => {
                    const isSelected = selectedGoal === goal;
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => setSelectedGoal(goal)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          isSelected
                            ? "bg-[#141534] text-white border-[#141534]"
                            : "bg-[#F4F2EB] text-[#141534] border-[#141534]/15 hover:bg-white"
                        }`}
                      >
                        {goal}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Fast Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#141534] font-black block mb-1">
                    Tu Nombre o Negocio
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej. Carlos / Mi Tienda"
                    className="w-full bg-[#F4F2EB] border border-[#141534]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#141534] placeholder-[#84818A] focus:border-[#141534] focus:bg-white outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#141534] font-black block mb-1">
                    ¿De qué es tu negocio? (Opcional)
                  </label>
                  <input
                    type="text"
                    value={projectIdea}
                    onChange={(e) => setProjectIdea(e.target.value)}
                    placeholder="Ej. Vendo ropa / Consultorio médico"
                    className="w-full bg-[#F4F2EB] border border-[#141534]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#141534] placeholder-[#84818A] focus:border-[#141534] focus:bg-white outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Live Message Preview Box & WhatsApp Trigger (5 Cols) */}
            <div className="lg:col-span-5 bg-[#141534] rounded-2xl p-5 sm:p-6 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D5DD54] animate-pulse"></span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#D5DD54] font-black">
                      Mensaje Listo para Enviar
                    </span>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="text-[10px] font-mono text-white/70 hover:text-white flex items-center gap-1 transition-colors"
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

                <div className="bg-[#0E1026] border border-white/10 rounded-xl p-3.5 font-mono text-xs text-white/90 whitespace-pre-wrap leading-relaxed max-h-[190px] overflow-y-auto">
                  {generatedMessage}
                </div>
              </div>

              {/* Direct Action Button to WhatsApp */}
              <div className="mt-5 pt-3 border-t border-white/10 space-y-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLaunchWhatsApp}
                  className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider bg-[#D5DD54] hover:bg-[#C5CD43] text-[#141534] transition-all flex items-center justify-center gap-2 text-center shadow-md hover:translate-y-[-1px]"
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
