"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import RubberSegment from "@/components/ui/RubberSegment";

interface NavbarProps {
  onOpenContactModal?: () => void;
}

export default function Navbar({ onOpenContactModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("planes");
  const isClickingRef = useRef(false);

  const navItems = [
    { value: "planes", label: "Planes", href: "#planes" },
    { value: "portafolio", label: "Portafolio", href: "#portafolio" },
    { value: "infraestructura", label: "Servicios", href: "#infraestructura" },
    { value: "proceso", label: "Proceso", href: "#proceso" },
    { value: "preguntas", label: "Preguntas", href: "#preguntas" },
  ];

  // Scroll listener for background blur and scroll-spy active section detection
  useEffect(() => {
    const sectionIds = ["planes", "portafolio", "infraestructura", "proceso", "preguntas"];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Do not update active section during smooth click-scroll animation
      if (isClickingRef.current) return;

      const scrollPosition = window.scrollY + 220;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // When clicking any option in the RubberSegment
  const handleNavChange = (val: string) => {
    setActiveSection(val);
    isClickingRef.current = true;
    setTimeout(() => {
      isClickingRef.current = false;
    }, 900);

    const el = document.getElementById(val);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled
          ? "bg-[#F4F2EB]/85 backdrop-blur-md border-b border-[#141534]/8 py-3 shadow-[0_4px_20px_-4px_rgba(20,21,52,0.06)]"
          : "bg-transparent py-5 lg:py-6 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a
            href="#"
            className="flex items-center gap-2.5 group rounded-xl p-1 -m-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141534] focus-visible:ring-offset-2 ring-offset-[#F4F2EB] transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-[#141534] flex items-center justify-center shadow-[0_2px_8px_-2px_rgba(20,21,52,0.25)] border border-white/10 group-hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200">
              <span className="font-heading font-black text-sm tracking-tight text-white">
                V<span className="text-[#D5DD54]">W</span>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-lg tracking-tight text-[#141534]">
                  Vision<span className="text-[#141534]/75">Web</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#D5DD54]/30 text-[#141534] border border-[#D5DD54]/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#141534] animate-pulse"></span>
                  Disponible
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation with React Bits RubberSegment */}
          <nav className="hidden lg:flex items-center">
            <RubberSegment
              items={navItems}
              value={activeSection}
              onChange={handleNavChange}
              trackColor="rgba(255, 255, 255, 0.85)"
              thumbColor="#141534"
              textColor="#585A74"
              activeTextColor="#FFFFFF"
              size="sm"
              radius={999}
              inset={3}
              stretch={120}
              squash={4}
              equalSlots={true}
              className="border border-[#141534]/12 shadow-[0_2px_8px_-2px_rgba(20,21,52,0.05)] backdrop-blur-md"
            />
          </nav>

          {/* Right Action CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contacto"
              onClick={(e) => {
                if (onOpenContactModal) {
                  e.preventDefault();
                  onOpenContactModal();
                }
              }}
              className="group inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs font-bold tracking-tight bg-[#141534] hover:bg-[#20224A] text-white shadow-[0_2px_8px_-1px_rgba(20,21,52,0.2)] hover:shadow-[0_6px_16px_-2px_rgba(20,21,52,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141534] focus-visible:ring-offset-2 ring-offset-[#F4F2EB] transition-all duration-200 cursor-pointer"
            >
              <span>Iniciar Proyecto</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D5DD54] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          {/* Mobile & Tablet Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white text-[#141534] border border-[#141534]/12 shadow-sm hover:bg-[#FAF8F2] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141534] transition-all cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F2]/95 backdrop-blur-2xl border-b border-[#141534]/10 px-5 py-5 space-y-3 shadow-[0_20px_35px_-10px_rgba(20,21,52,0.12)] animate-fade-in">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => {
                    handleNavChange(item.value);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all duration-150 ${
                    isActive
                      ? "bg-[#141534] text-white shadow-sm font-bold"
                      : "text-[#141534]/80 hover:text-[#141534] hover:bg-[#141534]/6"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#141534]/10">
            <a
              href="#contacto"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenContactModal) onOpenContactModal();
              }}
              className="w-full py-3 rounded-xl text-xs font-bold tracking-tight bg-[#141534] hover:bg-[#20224A] text-white flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all"
            >
              <span>Cotizar Proyecto Inmediato</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D5DD54]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
