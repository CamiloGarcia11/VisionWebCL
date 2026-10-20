"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

export interface TechTextProps {
  /** The final text string to reveal */
  text: string;
  /** Tailwind classes to inherit styling */
  className?: string;
  /** Optional class name specifically for scrambling glyphs */
  encryptedClassName?: string;
  /** Scramble iteration speed in milliseconds (default: 30ms) */
  speed?: number;
  /** Optional total duration in milliseconds for the animation */
  duration?: number;
  /** Maximum number of scrambles per character before locking in (default: 8) */
  maxIterations?: number;
  /** Trigger mode for decryption: 'view' on viewport entry, 'hover' on mouse over, or 'both' (default: 'both') */
  animateOn?: "view" | "hover" | "both";
  /** Characters pool to pick glitch / tech glyphs from */
  characters?: string;
}

const DEFAULT_CHARS = "!<>-_\\/[]{}—=+*^?#________0123456789";

export default function TechText({
  text,
  className = "",
  encryptedClassName = "opacity-80 font-mono",
  speed = 30,
  duration,
  maxIterations = 8,
  animateOn = "both",
  characters = DEFAULT_CHARS,
}: TechTextProps) {
  const effectiveSpeed = duration
    ? Math.max(15, Math.floor(duration / (maxIterations * 2.5)))
    : speed;

  const [output, setOutput] = useState<string>(text);
  const isAnimatingRef = useRef(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    isAnimatingRef.current = true;

    let frame = 0;
    const totalChars = text.length;
    const totalFrames = Math.max(16, totalChars * 2 + maxIterations);

    intervalRef.current = setInterval(() => {
      frame++;

      const revealedCount = Math.floor((frame / totalFrames) * totalChars);

      const nextOutput = text
        .split("")
        .map((targetChar, index) => {
          if (targetChar === " " || targetChar === "\n") return targetChar;
          if (index < revealedCount) {
            return targetChar;
          }
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join("");

      setOutput(nextOutput);

      if (frame >= totalFrames || revealedCount >= totalChars) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setOutput(text);
        isAnimatingRef.current = false;
      }
    }, effectiveSpeed);
  }, [text, characters, maxIterations, effectiveSpeed]);

  // Run automatically on mount when animateOn is 'view' or 'both'
  useEffect(() => {
    if (animateOn === "view" || animateOn === "both") {
      const timer = setTimeout(() => {
        startAnimation();
      }, 100);

      return () => {
        clearTimeout(timer);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [animateOn, startAnimation]);

  const handleMouseEnter = () => {
    if (animateOn === "hover" || animateOn === "both") {
      startAnimation();
    }
  };

  // Split text into words to prevent orphan letters breaking onto new lines
  const words = text.split(" ");
  let globalCharIndex = 0;

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`inline cursor-default select-none ${className}`}
    >
      {/* Screen reader text for perfect SEO & accessibility */}
      <span className="sr-only">{text}</span>

      {/* Visual render where words are wrapped with whitespace-nowrap */}
      <span aria-hidden="true" className="inline">
        {words.map((word, wIdx) => {
          const wordLetters = word.split("").map((origChar) => {
            const currentIndex = globalCharIndex++;
            const currentChar = output[currentIndex] ?? origChar;
            const isRevealed = currentChar === origChar;

            return { origChar, currentChar, isRevealed, key: currentIndex };
          });

          // Account for space between words in global index
          if (wIdx < words.length - 1) {
            globalCharIndex++;
          }

          return (
            <React.Fragment key={wIdx}>
              <span className="inline-block whitespace-nowrap">
                {wordLetters.map(({ origChar, currentChar, isRevealed, key }) => (
                  <span key={key} className="relative inline-block">
                    {/* Ghost character preserves the exact font width to eliminate any layout shift */}
                    <span className="invisible pointer-events-none select-none">
                      {origChar}
                    </span>
                    {/* Actual visible animated glyph */}
                    <span
                      className={`absolute inset-0 flex items-center justify-center ${
                        isRevealed ? "" : encryptedClassName
                      }`}
                    >
                      {currentChar}
                    </span>
                  </span>
                ))}
              </span>
              {wIdx < words.length - 1 && " "}
            </React.Fragment>
          );
        })}
      </span>
    </span>
  );
}
