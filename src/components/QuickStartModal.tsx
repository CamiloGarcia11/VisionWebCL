"use client";

import React, { useState } from "react";
import { X, ArrowUpRight, Phone } from "lucide-react";
import confetti from "canvas-confetti";
import { DEVELOPMENT_PLANS, DevelopmentPlan } from "@/constants/plans";

interface QuickStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: DevelopmentPlan | null;
  onSelectPlan: (plan: DevelopmentPlan) => void;
}

export default function QuickStartModal({
  isOpen,
  onClose,
  selectedPlan,
  onSelectPlan
}: QuickStartModalProps) {
  const plan = selectedPlan || DEVELOPMENT_PLANS[2];
  const [userName, setUserName] = useState<string>("");
  const [userNote, setUserNote] = useState<string>("");

  if (!isOpen) return null;

  const draftedMessage = `¡Hola Edwin! 👋 Me interesa cotizar este servicio para mi negocio:

📌 Opción elegida: ${plan.name}
⏱️ Tiempo de entrega: ${plan.estimatedDelivery}
👤 Mi nombre / negocio: ${userName.trim() ? userName.trim() : "Quisiera más información"}
💬 Mi idea o negocio: ${userNote.trim() ? userNote.trim() : "Quisiera que me asesoren para empezar cuanto antes."}

¿Podemos hablar por aquí? ¡Muchas gracias!`;

  const whatsappUrl = `https://wa.me/573052311490?text=${encodeURIComponent(draftedMessage)}`;

  const handleSend = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#D5DD54", "#141534", "#FFFFFF"]
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl border-2 border-[#141534] shadow-[5px_5px_0px_#141534] sm:shadow-[8px_8px_0px_#141534] p-5 sm:p-7 animate-in zoom-in-95 duration-200 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-[#F4F2EB] hover:bg-[#EBE8DF] text-[#141534] transition-colors border border-[#141534]/10"
          aria-label="Cerrar modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-[#D5DD54] border border-[#141534]"></span>
          <span className="text-xs font-mono uppercase tracking-wider text-[#585A74] font-bold">
            Cotización Rápida
          </span>
        </div>

        <h3 className="font-heading text-xl sm:text-2xl font-black text-[#141534] mb-1">
          {plan.name}
        </h3>

        <p className="text-xs text-[#585A74] leading-relaxed mb-4">
          Dinos qué necesitas y te responderemos de inmediato a tu WhatsApp con la información clara.
        </p>

        {/* Plan Switcher */}
        <div className="mb-4">
          <label className="text-[10px] font-mono uppercase tracking-wider text-[#141534] font-black block mb-1.5">
            Elige otra opción si prefieres:
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {DEVELOPMENT_PLANS.map((p) => {
              const active = p.id === plan.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPlan(p)}
                  className={`p-2 rounded-xl text-left border text-xs font-bold transition-colors ${
                    active
                      ? "bg-[#D5DD54] border-[#141534] text-[#141534]"
                      : "bg-[#F4F2EB] border-[#141534]/15 text-[#585A74] hover:bg-white"
                  }`}
                >
                  <p className="truncate">{p.name}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-3 mb-5">
          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#141534] font-black block mb-1">
              Tu Nombre o Negocio
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Ej. Roberto Gómez / Mi Marca"
              className="w-full bg-[#F4F2EB] border border-[#141534]/20 rounded-xl px-3.5 py-2 text-xs text-[#141534] placeholder-[#84818A] focus:border-[#141534] focus:bg-white outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#141534] font-black block mb-1">
              Cuéntanos brevemente tu idea
            </label>
            <textarea
              rows={2}
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder="Ej. Quiero una tienda para vender ropa y recibir pagos por Nequi."
              className="w-full bg-[#F4F2EB] border border-[#141534]/20 rounded-xl px-3.5 py-2 text-xs text-[#141534] placeholder-[#84818A] focus:border-[#141534] focus:bg-white outline-none resize-none"
            />
          </div>
        </div>

        {/* WhatsApp Send Button */}
        <div className="space-y-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              handleSend();
              onClose();
            }}
            className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider bg-[#D5DD54] hover:bg-[#C5CD43] text-[#141534] border-2 border-[#141534] shadow-sm flex items-center justify-center gap-2 text-center"
          >
            <Phone className="w-4 h-4 fill-[#141534]" />
            <span>Escribir a WhatsApp</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <p className="text-[10px] text-center font-mono text-[#585A74]">
            Sin compromiso ni costo • Atención directa
          </p>
        </div>
      </div>
    </div>
  );
}
