"use client";

import React from "react";
import {
  Database,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  FileCheck,
  Activity,
  Cpu,
  Layers,
  Zap
} from "lucide-react";
import { TECHNICAL_SERVICES_ECOSYSTEM } from "@/constants/plans";
import { LavenderStar, SlateAsterisk, TechnicalCross } from "@/components/ui/BrandDeco";
import CircularText from "@/components/ui/CircularText";

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database className="w-5 h-5 text-[#141534]" />,
  CreditCard: <CreditCard className="w-5 h-5 text-[#141534]" />,
  MessageSquare: <MessageSquare className="w-5 h-5 text-[#141534]" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#141534]" />,
  FileCheck: <FileCheck className="w-5 h-5 text-[#141534]" />,
  Activity: <Activity className="w-5 h-5 text-[#141534]" />
};

export default function TechStackSection() {
  return (
    <section id="infraestructura" className="relative py-10 sm:py-16 md:py-24 bg-[#F4F2EB] border-t border-[#141534]/10 overflow-hidden scroll-mt-20">
      <div id="stack" className="absolute -top-24" />

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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141534]/5 border border-[#141534]/15 text-[#141534] font-mono text-[11px] sm:text-xs tracking-wider uppercase mb-2 sm:mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Todo Incluido & Sin Enredos</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-[#141534] tracking-tight mb-2 sm:mb-3">
            Tu página rápida, segura y sin dolores de cabeza.
          </h2>

          <p className="text-xs sm:text-base text-[#585A74]">
            Nos encargamos de toda la parte técnica para que tu web nunca se caiga y siempre esté lista para vender.
          </p>
        </div>

        {/* 6 Tech Grid Cards: 2 cols on mobile, 3 cols on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
          {TECHNICAL_SERVICES_ECOSYSTEM.map((service, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-[#141534]/15 hover:border-[#141534]/40 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#D5DD54]/40 border border-[#141534]/20 flex items-center justify-center">
                    {iconMap[service.icon] || <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#141534]" />}
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#585A74] font-bold bg-[#F4F2EB] px-1.5 sm:px-2 py-0.5 rounded truncate max-w-[90px] sm:max-w-none">
                    {service.category}
                  </span>
                </div>

                <h3 className="font-heading text-xs sm:text-base font-black text-[#141534] mb-1 leading-snug">
                  {service.title}
                </h3>

                <p className="text-[11px] sm:text-xs text-[#585A74] leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {service.description}
                </p>
              </div>

              <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-[#141534]/10 flex items-center gap-1.5 text-[9px] sm:text-[11px] font-mono text-[#141534] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D5DD54] border border-[#141534] shrink-0"></span>
                <span className="truncate">Siempre activa</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Guarantee Seal with 3D Circular Text */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border-2 border-[#141534] shadow-[4px_4px_0px_#141534] flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 overflow-hidden">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D5DD54]/30 border border-[#141534]/15 font-mono text-[11px] sm:text-xs font-bold text-[#141534] uppercase tracking-wider mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#D5DD54] border border-[#141534]"></span>
              <span>Garantía de Rendimiento & Seguridad</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-[#141534] mb-2 leading-tight">
              Diseño e ingeniería listos para vender desde el primer día
            </h3>
            <p className="text-xs sm:text-sm text-[#585A74] leading-relaxed">
              Cero servidores caídos, cero código lento. Tu web se entrega optimizada con pagos conectados, pedidos a tu WhatsApp y carga ultrarrápida.
            </p>
          </div>

          {/* Interactive 3D Circular Text Stamp */}
          <div className="flex-shrink-0 flex items-center justify-center py-2 scale-[0.88] sm:scale-100 origin-center">
            <CircularText
              text="✦ VISIONWEB ✦ CALIDAD 100% ✦ VUELO RÁPIDO ✦ "
              spinDuration={18}
              onHover="speedUp"
              size={200}
              fontSize={14}
              tilt={18}
              hoverTilt={26}
              className="text-[#141534]"
            >
              <div className="w-14 h-14 rounded-full bg-[#141534] text-[#D5DD54] flex items-center justify-center shadow-lg border-2 border-[#141534]">
                <Zap className="w-6 h-6 fill-[#D5DD54]" />
              </div>
            </CircularText>
          </div>
        </div>
      </div>
    </section>
  );
}
