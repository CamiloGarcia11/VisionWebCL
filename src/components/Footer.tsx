"use client";

import React from "react";
import { Phone, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#141534] text-white pt-14 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#D5DD54] flex items-center justify-center font-heading font-black text-sm text-[#141534]">
                VW
              </div>
              <span className="font-heading font-black text-xl text-white">
                Vision<span className="text-[#D5DD54]">Web</span>
              </span>
            </div>

            <p className="text-xs text-white/70 max-w-sm leading-relaxed">
              Creamos páginas web, tiendas online y sistemas sencillos para que tu negocio venda más y se vea profesional.
            </p>

            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D5DD54] animate-pulse"></span>
              <span>Páginas 100% activas y funcionando</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-black mb-3">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs text-white/70 font-medium">
              <li>
                <a href="#planes" className="hover:text-[#D5DD54] transition-colors">
                  Planes
                </a>
              </li>
              <li>
                <a href="#portafolio" className="hover:text-[#D5DD54] transition-colors">
                  Trabajos
                </a>
              </li>
              <li>
                <a href="#stack" className="hover:text-[#D5DD54] transition-colors">
                  Ventajas
                </a>
              </li>
              <li>
                <a href="#proceso" className="hover:text-[#D5DD54] transition-colors">
                  Paso a paso
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#D5DD54] transition-colors">
                  Dudas
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-black mb-3">
              Contacto Directo
            </h4>
            <div className="space-y-2.5 text-xs text-white/70 font-medium">
              <a
                href="https://wa.me/573052311490"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-[#D5DD54] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#D5DD54]" />
                <span className="font-mono font-bold">+57 305 231 1490</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
              </a>

              <p className="leading-relaxed">
                Colombia & Remoto Global.
              </p>

              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#D5DD54]">
                  Respuesta en &lt; 2 horas
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© 2026 Vision Web Studio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
