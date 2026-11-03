"use client";

import React from "react";
import { Phone, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#141534] text-white pt-16 pb-12 overflow-hidden border-t border-white/10">
      {/* Subtle background ambient radial for depth without neon glare */}
      <div 
        className="pointer-events-none absolute -top-40 right-1/4 w-[500px] h-[500px] rounded-full bg-[#D5DD54]/[0.03] blur-[120px]" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-14 pb-12 border-b border-white/10">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#D5DD54] flex items-center justify-center font-heading font-black text-sm text-[#141534] shadow-[0_2px_8px_rgba(213,221,84,0.3)]">
                VW
              </div>
              <span className="font-heading font-black text-xl tracking-tight text-white">
                Vision<span className="text-[#D5DD54]">Web</span>
              </span>
            </div>

            <p className="text-xs text-white/70 max-w-sm leading-relaxed font-normal">
              Creamos páginas web, tiendas online y sistemas sencillos para que tu negocio venda más y se vea profesional.
            </p>

            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D5DD54] animate-pulse"></span>
              <span>Páginas 100% activas y funcionando</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-white/90 font-bold mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70 font-medium">
              <li>
                <a href="#planes" className="hover:text-[#D5DD54] focus-visible:outline-none focus-visible:text-[#D5DD54] transition-colors duration-150">
                  Planes
                </a>
              </li>
              <li>
                <a href="#portafolio" className="hover:text-[#D5DD54] focus-visible:outline-none focus-visible:text-[#D5DD54] transition-colors duration-150">
                  Trabajos
                </a>
              </li>
              <li>
                <a href="#stack" className="hover:text-[#D5DD54] focus-visible:outline-none focus-visible:text-[#D5DD54] transition-colors duration-150">
                  Ventajas
                </a>
              </li>
              <li>
                <a href="#proceso" className="hover:text-[#D5DD54] focus-visible:outline-none focus-visible:text-[#D5DD54] transition-colors duration-150">
                  Paso a paso
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#D5DD54] focus-visible:outline-none focus-visible:text-[#D5DD54] transition-colors duration-150">
                  Dudas
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-white/90 font-bold mb-4">
              Contacto Directo
            </h4>
            <div className="space-y-3 text-xs text-white/70 font-medium">
              <a
                href="https://wa.me/573052311490"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 p-2 -mx-2 rounded-xl text-white hover:text-[#D5DD54] hover:bg-white/[0.04] transition-all duration-200"
              >
                <Phone className="w-3.5 h-3.5 text-[#D5DD54]" />
                <span className="font-mono font-bold tracking-tight">+57 305 231 1490</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[#D5DD54] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </a>

              <p className="leading-relaxed text-white/60">
                Colombia & Remoto Global.
              </p>

              <div>
                <span className="inline-flex items-center text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/10 text-[#D5DD54] font-medium">
                  Respuesta en &lt; 2 horas
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© 2026 Vision Web Studio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
