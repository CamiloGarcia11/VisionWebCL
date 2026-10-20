"use client";

import React from "react";
import CurvedLoop from "@/components/ui/CurvedLoop";
import { TechnicalCross } from "@/components/ui/BrandDeco";

export default function CurvedLoopBanner() {
  return (
    <div className="relative w-full py-4 sm:py-6 overflow-hidden select-none">
      {/* Background technical accents to integrate into the page canvas */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-6 sm:px-12 opacity-30">
        <div className="flex items-center gap-2 font-mono text-[11px] text-[#141534]">
          <TechnicalCross className="text-[#84818A]" />
          <span className="hidden sm:inline">[STREAM_WAVE_V2]</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-[#141534]">
          <span className="hidden sm:inline">[ACTIVE_LOOP]</span>
          <TechnicalCross className="text-[#84818A]" />
        </div>
      </div>

      {/* Cinta tipo Ola (Waving Ribbon Tape) */}
      <div className="relative w-[104%] -left-[2%] cursor-grab active:cursor-grabbing">
        <CurvedLoop
          marqueeText="PÁGINAS WEB QUE VENDEN ✦ TIENDAS ONLINE ✦ SOFTWARE A MEDIDA ✦ CARGA EN 1 SEGUNDO ✦ PAGOS ONLINE ✦ CERO MENSUALIDADES ✦ RESULTADOS REALES"
          speed={2.2}
          curveAmount={100}
          shape="wave"
          direction="left"
          interactive={true}
          pauseOnHover={false}
          fontSize={20}
          fontWeight={900}
          color="#FFFFFF"
          separator="✦"
          separatorColor="#D5DD54"
          viewHeight={120}
          ribbon={true}
          ribbonColor="#141534"
          ribbonWidth={52}
          containerClassName="py-0"
        />
      </div>
    </div>
  );
}
