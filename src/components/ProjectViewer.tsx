"use client";

import React, { useState, useRef } from "react";
import {
  Monitor,
  Smartphone,
  RotateCw,
  ExternalLink,
  Lock,
  Maximize2,
  Minimize2,
  MousePointerClick,
  Unlock,
  Eye
} from "lucide-react";
import { PORTFOLIO_PROJECTS, PROJECT_CATEGORIES, Project } from "@/constants/projects";
import { LavenderStar, SlateAsterisk, TechnicalCross } from "@/components/ui/BrandDeco";

export default function ProjectViewer() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeProject, setActiveProject] = useState<Project>(PORTFOLIO_PROJECTS[0]);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [isInteractive, setIsInteractive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const filteredProjects = PORTFOLIO_PROJECTS.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category === activeCategory;
  });

  const handleSelectProject = (project: Project) => {
    if (project.id === activeProject.id) return;
    setActiveProject(project);
    setIsLoading(true);
    setIsInteractive(false);
    setIframeKey((prev) => prev + 1);
  };

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <section id="portafolio" className="relative py-10 sm:py-16 md:py-24 bg-[#F4F2EB] border-t border-[#141534]/10 overflow-hidden scroll-mt-20">
      {/* Background dot matrix texture */}
      <div className="absolute inset-0 bg-canvas-pattern pointer-events-none"></div>

      {/* Decorative Slate Asterisk (Top Left) */}
      <div className="absolute top-6 left-3 sm:top-10 sm:left-14 pointer-events-none opacity-45 scale-75 sm:scale-100 origin-top-left">
        <SlateAsterisk size={65} />
      </div>

      {/* Decorative Lavender Star (Bottom Right) */}
      <div className="absolute bottom-4 right-3 sm:bottom-8 sm:right-12 pointer-events-none opacity-70 scale-75 sm:scale-100 origin-bottom-right">
        <LavenderStar size={75} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141534]/5 border border-[#141534]/15 text-[#141534] font-mono text-[11px] sm:text-xs tracking-wider uppercase mb-2 sm:mb-3">
            <Eye className="w-3.5 h-3.5" />
            <span>Portafolio en Vivo</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-[#141534] tracking-tight mb-2">
            Mira páginas que ya están funcionando.
          </h2>

          <p className="text-xs sm:text-base text-[#585A74]">
            Pruébalas tú mismo aquí en vivo o cambia entre vista de celular y computador.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-10">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#141534] text-white shadow-sm"
                  : "bg-white text-[#141534] hover:bg-[#EBE8DF] border border-[#141534]/15"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Project Selector Cards (4 Cols on Desktop, Horizontal Swipe on Mobile) */}
          <div className="lg:col-span-4 space-y-2 lg:space-y-2.5 order-2 lg:order-1">
            <div className="flex items-center justify-between pb-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#585A74] font-bold">
                Elige una página ({filteredProjects.length})
              </span>
              <span className="text-[11px] font-mono text-[#141534] font-bold">● Funcionando</span>
            </div>

            <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto snap-x snap-mandatory gap-3 pb-3 pt-1 -mx-4 px-4 lg:mx-0 lg:px-0 lg:max-h-[580px] lg:space-y-2.5 lg:pr-3.5 lg:pl-1 lg:py-1.5 custom-scrollbar">
              {filteredProjects.map((project) => {
                const isSelected = project.id === activeProject.id;
                return (
                  <button
                    key={project.id}
                    onClick={() => handleSelectProject(project)}
                    className={`w-[84vw] max-w-[320px] shrink-0 snap-center lg:w-full lg:max-w-none lg:shrink text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white border-2 border-[#141534] shadow-[4px_4px_0px_#141534]"
                        : "bg-white/70 hover:bg-white border-[#141534]/15 text-[#585A74]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-heading font-black text-sm text-[#141534]">
                        {project.title}
                      </h3>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#141534]/5 text-[#141534] font-bold border border-[#141534]/10 shrink-0">
                        {project.categoryLabel}
                      </span>
                    </div>

                    <p className="text-xs text-[#585A74] line-clamp-2 leading-relaxed mb-2 font-medium">
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#F4F2EB] text-[#141534] border border-[#141534]/10 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile Swipe Hint */}
            <div className="flex lg:hidden items-center justify-between text-[10px] font-mono text-[#585A74] pt-1 px-1">
              <span>↔ Desliza para ver más proyectos</span>
              <span className="font-bold text-[#141534]">
                {filteredProjects.findIndex((p) => p.id === activeProject.id) + 1} de {filteredProjects.length}
              </span>
            </div>

            {/* Direct Status (Desktop only) */}
            <div className="hidden lg:flex p-3 rounded-xl bg-white border border-[#141534]/15 text-xs items-center justify-between">
              <span className="text-[#141534] font-bold">Página al aire y lista</span>
              <span className="text-[10px] font-mono text-[#141534] bg-[#D5DD54] px-2 py-0.5 rounded font-black border border-[#141534]">
                Al aire
              </span>
            </div>
          </div>

          {/* Right: Simulated Browser Window (8 Cols) */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="bg-[#141534] rounded-2xl border-2 border-[#141534] shadow-2xl overflow-hidden flex flex-col">
              {/* Browser Bar */}
              <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0E1026] border-b border-white/10 flex items-center justify-between gap-2 shrink-0">
                {/* 3 Window Dots */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#EF4444]"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#D5DD54]"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#10B981]"></div>
                </div>

                {/* Simulated URL Bar */}
                <div className="flex-1 max-w-[170px] sm:max-w-sm mx-auto flex items-center justify-center">
                  <div className="w-full bg-[#141534] border border-white/10 rounded-xl px-2.5 sm:px-3 py-1 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-white/90 shadow-inner">
                    <Lock className="w-3 h-3 text-[#D5DD54] shrink-0" />
                    <span className="text-[#D5DD54] text-[10px] hidden sm:inline">https://</span>
                    <span className="text-white truncate font-medium">{activeProject.displayUrl}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1 shrink-0">
                  <div className="hidden sm:flex items-center bg-[#141534] p-0.5 rounded-lg border border-white/10">
                    <button
                      onClick={() => setViewMode("desktop")}
                      className={`p-1.5 rounded-md transition-colors ${
                        viewMode === "desktop" ? "bg-[#D5DD54] text-[#141534]" : "text-white/60 hover:text-white"
                      }`}
                      title="Vista Computador"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setViewMode("mobile")}
                      className={`p-1.5 rounded-md transition-colors ${
                        viewMode === "mobile" ? "bg-[#D5DD54] text-[#141534]" : "text-white/60 hover:text-white"
                      }`}
                      title="Vista Móvil"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleReload}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10"
                    title="Recargar"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#D5DD54]" : ""}`} />
                  </button>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10"
                    title="Pantalla completa"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-black bg-[#D5DD54] hover:bg-[#C5CD43] text-[#141534]"
                  >
                    <span>Visitar</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Viewport Frame */}
              <div className="relative bg-[#0E1026] min-h-[420px] sm:min-h-[500px] max-h-[600px] flex items-center justify-center overflow-hidden p-2 sm:p-4">
                <div
                  className={`transition-all duration-300 relative flex flex-col items-center justify-center ${
                    viewMode === "mobile"
                      ? "w-[340px] sm:w-[360px] h-[480px] sm:h-[550px] max-w-full rounded-[32px] sm:rounded-[36px] border-[8px] sm:border-[10px] border-[#222444] shadow-2xl overflow-hidden bg-black"
                      : "w-full h-[420px] sm:h-[550px] rounded-xl overflow-hidden bg-black"
                  }`}
                >
                  {viewMode === "mobile" && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-3.5 bg-[#222444] rounded-full z-30 pointer-events-none"></div>
                  )}

                  {isLoading && (
                    <div className="absolute inset-0 z-20 bg-[#141534] flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-10 h-10 rounded-full border-2 border-[#D5DD54]/20 border-t-[#D5DD54] animate-spin mb-3"></div>
                      <p className="text-xs font-mono text-white/80">
                        Cargando {activeProject.displayUrl}...
                      </p>
                    </div>
                  )}

                  <iframe
                    key={`${activeProject.id}-${iframeKey}`}
                    ref={iframeRef}
                    src={activeProject.url}
                    title={activeProject.title}
                    loading="lazy"
                    onLoad={handleIframeLoad}
                    className={`w-full h-full border-0 transition-opacity duration-300 ${
                      isLoading ? "opacity-0" : "opacity-100"
                    } ${isInteractive ? "pointer-events-auto" : "pointer-events-none"}`}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />

                  {/* Scroll trap prevention */}
                  {!isInteractive && !isLoading && (
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-end p-6 z-10">
                      <button
                        onClick={() => setIsInteractive(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider bg-[#D5DD54] hover:bg-[#C5CD43] text-[#141534] border-2 border-[#141534] shadow-xl hover:scale-105 transition-all cursor-pointer"
                      >
                        <MousePointerClick className="w-4 h-4 animate-bounce" />
                        <span>Toca aquí para navegar la página en vivo</span>
                      </button>
                    </div>
                  )}

                  {isInteractive && (
                    <div className="absolute top-4 right-4 z-30">
                      <button
                        onClick={() => setIsInteractive(false)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-black/90 text-[#D5DD54] border border-[#D5DD54]/40 hover:bg-black transition-colors shadow-lg cursor-pointer font-bold"
                      >
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Navegando (Toca para pausar)</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Quick-View Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-6 flex flex-col animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-4 py-3 bg-[#141534] rounded-t-2xl border border-white/10 shrink-0">
            <span className="font-heading font-black text-white">{activeProject.title}</span>
            <div className="flex items-center gap-2">
              <a
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#D5DD54] text-[#141534] text-xs font-black flex items-center gap-1"
              >
                <span>Abrir Web</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 bg-black rounded-b-2xl overflow-hidden flex items-center justify-center p-2">
            <iframe
              src={activeProject.url}
              title={activeProject.title}
              className="w-full h-full border-0 pointer-events-auto"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>
      )}
    </section>
  );
}
