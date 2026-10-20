"use client";

import React from "react";

export function LavenderStar({
  size = 70,
  className = "",
  opacity = 0.85,
}: {
  size?: number;
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      className={`pointer-events-none select-none inline-block ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        className="w-full h-full text-[#A29EDB]"
      >
        <path
          d="M50 0L54 38L92 20L62 48L100 50L62 52L92 80L54 62L50 100L46 62L8 80L38 52L0 50L38 48L8 20L46 38L50 0Z"
          fill="currentColor"
          opacity={opacity}
        />
      </svg>
    </div>
  );
}

export function SlateAsterisk({
  size = 60,
  className = "",
  opacity = 0.5,
}: {
  size?: number;
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      className={`pointer-events-none select-none inline-block ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="currentColor"
        className="w-full h-full text-[#84818A]"
        style={{ opacity }}
      >
        <rect x="42" y="5" width="16" height="90" rx="8" />
        <rect x="42" y="5" width="16" height="90" rx="8" transform="rotate(60 50 50)" />
        <rect x="42" y="5" width="16" height="90" rx="8" transform="rotate(120 50 50)" />
      </svg>
    </div>
  );
}

export function TechnicalCross({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block font-mono text-xs font-black text-[#141534]/30 select-none ${className}`}
      aria-hidden="true"
    >
      +
    </span>
  );
}
