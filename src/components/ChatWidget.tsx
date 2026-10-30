"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Bot,
  Sparkles,
  Send,
  X,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { findInstantResponse } from "@/lib/rag/knowledge";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  needsHumanSupport?: boolean;
  whatsappMessage?: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  { label: "¿Cuánto cuesta una web?", query: "¿Cuáles son los planes y precios para crear una página web o tienda online?" },
  { label: "¿Cómo es el proceso de trabajo?", query: "¿Cómo es el proceso de trabajo paso a paso para hacer mi página web?" },
  { label: "¿Cuánto tardan en entregar?", query: "¿Cuáles son los tiempos de entrega para cada tipo de página web?" },
  { label: "¿Qué proyectos tienen en portafolio?", query: "¿Qué proyectos puedo ver en el portafolio de VisionWeb y cómo interactúo con ellos?" },
  { label: "¿Qué es dominio y hosting?", query: "¿Me puedes explicar con palabras sencillas qué es un dominio, hosting y certificado SSL?" },
  { label: "Hablar con asesor por WhatsApp", query: "Quiero hablar directamente con un asesor humano por WhatsApp para una cotización personalizada." },
];

const LOADING_STATUSES = [
  "VisionWeb IA está analizando tu consulta...",
  "Consultando datos y planes oficiales...",
  "Redactando respuesta...",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content:
        "¡Hola! 👋 Soy el **Asesor Virtual de VisionWeb**.\n\nPuedo responder cualquier duda sobre nuestros planes, precios, metodología de trabajo o explicarte términos técnicos en palabras sencillas.\n\n¿En qué te gustaría que te oriente hoy?",
      timestamp: "Ahora",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowTooltip(false);
      // Auto focus input on desktop
      if (window.innerWidth > 640) {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    }
  }, [isOpen, messages]);

  // Ciclo dinámico de estados de carga para feedback visual en tiempo real
  useEffect(() => {
    if (!isLoading) {
      setLoadingStep(0);
      return;
    }
    const t1 = setTimeout(() => {
      setLoadingStep(1);
      scrollToBottom();
    }, 600);
    const t2 = setTimeout(() => {
      setLoadingStep(2);
      scrollToBottom();
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isLoading]);

  const handleSend = async (customQuery?: string) => {
    const textToSend = customQuery || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend.trim(),
      timestamp: "Ahora",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customQuery) setInput("");
    setIsLoading(true);

    // 1. Detección instantánea en cliente (0ms de latencia de red, simulación de escritura 220ms)
    const instant = findInstantResponse(textToSend.trim());
    if (instant) {
      setTimeout(() => {
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: instant.reply,
          needsHumanSupport: Boolean(instant.needsHumanSupport),
          whatsappMessage: instant.whatsappMessage || textToSend,
          timestamp: "Ahora",
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsLoading(false);
      }, 220);
      return;
    }

    // 2. Consulta ultrarrápida al backend (Gemini 3.1 Flash Lite / Caché)
    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await res.json();

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.reply || "He procesado tu consulta. ¿Hay algo más en lo que pueda apoyarte?",
        needsHumanSupport: Boolean(data.needsHumanSupport),
        whatsappMessage: data.whatsappMessage || textToSend,
        timestamp: "Ahora",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: "assistant",
          content:
            "Disculpa, hubo una pequeña intermitencia de red. Si lo prefieres, puedes chatear directamente con nuestro asesor por WhatsApp para darte atención inmediata.",
          needsHumanSupport: true,
          whatsappMessage: `Hola VisionWeb, me gustaría consultar: ${textToSend}`,
          timestamp: "Ahora",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content:
          "Conversación reiniciada. ¿Qué otra duda tienes sobre VisionWeb, nuestros precios o tus proyectos web?",
        timestamp: "Ahora",
      },
    ]);
  };

  // Formateador de texto y markdown limpio (sin almohadillas ### ni símbolos feos)
  const renderFormattedContent = (content: string) => {
    const cleanedContent = content.replace(/^#{1,4}\s*/gm, "");
    const paragraphs = cleanedContent.split("\n\n");

    return paragraphs.map((para, i) => {
      const lines = para.split("\n");
      return (
        <div key={i} className="space-y-1 mb-2 last:mb-0">
          {lines.map((line, j) => {
            const trimmed = line.trim();
            if (!trimmed) return null;

            // Detectar viñetas
            const isBullet =
              trimmed.startsWith("•") ||
              trimmed.startsWith("-") ||
              (trimmed.startsWith("*") && !trimmed.startsWith("**"));
            const cleanLine = isBullet ? trimmed.replace(/^[•\-*]\s*/, "") : trimmed;

            // Procesar negritas con **
            const parts = cleanLine.split(/(\*\*.*?\*\*)/g);

            return (
              <p
                key={j}
                className={`text-xs sm:text-[13px] leading-relaxed ${
                  isBullet
                    ? "pl-3.5 relative before:content-['•'] before:absolute before:left-0 before:text-[#141534] font-medium"
                    : ""
                }`}
              >
                {parts.map((part, pIdx) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return (
                      <strong key={pIdx} className="font-bold text-[#141534]">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  return part;
                })}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <>
      {/* Tooltip flotante de bienvenida */}
      {!isOpen && showTooltip && (
        <div className="fixed bottom-24 right-5 sm:right-6 z-40 max-w-[260px] p-3 rounded-2xl bg-[#141534] text-white shadow-xl border border-white/10 animate-fade-in flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#D5DD54] text-[#141534] flex items-center justify-center shrink-0 font-bold">
            <Bot className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs font-bold text-[#D5DD54] flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#D5DD54]" /> VisionWeb IA
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-white/50 hover:text-white text-xs p-0.5"
                aria-label="Cerrar aviso"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-white/80 mt-0.5 leading-snug">
              ¿Dudas sobre precios o cómo trabajamos? Pregúntame en vivo.
            </p>
          </div>
        </div>
      )}

      {/* Botón Flotante Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat de soporte con IA"}
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 ${
          isOpen
            ? "bg-[#141534] text-white rotate-90"
            : "bg-[#141534] text-white hover:scale-105 hover:shadow-[#D5DD54]/20 border-2 border-[#D5DD54]/40"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-[#D5DD54]" />
            {/* Pulsing Green Online Indicator */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#141534]"></span>
            </span>
          </div>
        )}
      </button>

      {/* Ventana de Chat Modal */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-22 sm:bottom-24 sm:right-6 sm:left-auto z-50 w-auto sm:w-[410px] h-[78vh] sm:h-[590px] max-h-[85vh] flex flex-col bg-[#FBFBFA] rounded-3xl shadow-2xl border border-[#141534]/15 overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-[#141534] text-white px-4 py-3.5 flex items-center justify-between shrink-0 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-white/10 border border-[#D5DD54]/40 flex items-center justify-center text-[#D5DD54]">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#141534]"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading text-sm font-bold tracking-tight">VisionWeb IA</h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
                    Respuesta rápida
                  </span>
                </div>
                <p className="text-[11px] text-white/70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  En línea • Soporte inmediato
                </p>
              </div>
            </div>

            {/* Header controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Reiniciar chat"
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Reiniciar conversación"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Cerrar"
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Cerrar chat"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subheader banner de soporte directo */}
          <div className="bg-[#141534]/5 px-3 py-1.5 border-b border-[#141534]/10 flex items-center justify-between text-[11px] text-[#585A74]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Precios exactos sin tarifas ocultas
            </span>
            <a
              href="https://wa.me/573052311490?text=Hola%20VisionWeb,%20quisiera%20asesoria%20sobre%20una%20pagina%20web"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#141534] hover:underline flex items-center gap-0.5"
            >
              WhatsApp directo <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Mensajes Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 overscroll-contain">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-sm ${
                      isUser
                        ? "bg-[#141534] text-white rounded-br-xs"
                        : "bg-white text-[#141534] border border-[#141534]/10 rounded-bl-xs"
                    }`}
                  >
                    {isUser ? (
                      <p className="text-xs sm:text-[13px] leading-relaxed">{msg.content}</p>
                    ) : (
                      renderFormattedContent(msg.content)
                    )}
                  </div>

                  {/* Tarjeta de soporte humano por WhatsApp */}
                  {!isUser && msg.needsHumanSupport && (
                    <div className="mt-2.5 w-full max-w-[92%] p-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-emerald-800 font-medium text-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        <span>¿Prefieres atención personalizada con un asesor?</span>
                      </div>
                      <p className="text-[11px] text-[#585A74]">
                        Nuestro equipo resolverá tus dudas y te dará una cotización formal por WhatsApp en minutos.
                      </p>
                      <a
                        href={`https://wa.me/573052311490?text=${encodeURIComponent(
                          msg.whatsappMessage || "Hola VisionWeb, me gustaría recibir asesoría personalizada."
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading text-xs font-bold transition-all shadow-md active:scale-95"
                      >
                        <span>📲 Hablar por WhatsApp (+57 305 231 1490)</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  <span className="text-[10px] text-[#585A74]/60 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Dynamic Real-time Status Typing indicator */}
            {isLoading && (
              <div className="flex items-start gap-2 animate-fade-in">
                <div className="bg-white border border-[#141534]/15 rounded-2xl rounded-bl-xs px-3.5 py-2.5 shadow-sm flex items-center gap-2.5">
                  <div className="flex gap-1 items-center shrink-0">
                    <span className="w-2 h-2 rounded-full bg-[#141534] animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-[#141534]/70 animate-bounce [animation-delay:0.18s]"></span>
                    <span className="w-2 h-2 rounded-full bg-[#D5DD54] animate-bounce [animation-delay:0.36s]"></span>
                  </div>
                  <span className="text-xs font-medium text-[#141534] transition-all duration-200">
                    {LOADING_STATUSES[loadingStep]}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick chips sugerencias */}
          {!isLoading && (
            <div className="px-3 py-2 bg-white/70 border-t border-[#141534]/5">
              <p className="text-[10px] font-mono uppercase text-[#585A74] tracking-wider mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#141534]" /> Preguntas sugeridas:
              </p>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {QUICK_PROMPTS.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(qp.query)}
                    className="shrink-0 px-2.5 py-1 rounded-full bg-[#141534]/5 hover:bg-[#141534] hover:text-white border border-[#141534]/10 text-[#141534] text-[11px] font-medium transition-all active:scale-95 cursor-pointer"
                  >
                    {qp.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Input Area */}
          <div className="p-3 bg-white border-t border-[#141534]/10 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu duda o pregunta sobre tu web..."
                disabled={isLoading}
                className="flex-1 bg-[#F4F2EB] border border-[#141534]/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#141534] placeholder:text-[#585A74]/70 focus:outline-none focus:ring-2 focus:ring-[#141534]/20 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Enviar mensaje"
                className="w-10 h-10 rounded-xl bg-[#141534] hover:bg-[#1f2150] disabled:bg-[#141534]/20 text-[#D5DD54] disabled:text-[#141534]/40 flex items-center justify-center transition-all shrink-0 active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-[#585A74]/70">
              <span className="flex items-center gap-1 font-medium text-[#141534]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Respuestas inmediatas
              </span>
              <a
                href="https://wa.me/573052311490"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#141534] font-medium transition-colors"
              >
                WhatsApp: +57 305 231 1490
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
