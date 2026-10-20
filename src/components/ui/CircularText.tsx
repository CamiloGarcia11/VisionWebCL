"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue, useSpring, type Transition } from "framer-motion";

export type CircularTextHoverMode = "slowDown" | "speedUp" | "pause" | "goBonkers";

export interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: CircularTextHoverMode;
  size?: number;
  fontSize?: number;
  tilt?: number;
  hoverTilt?: number;
  className?: string;
  children?: React.ReactNode;
}

const getTransition = (duration: number, loop = true): Transition => ({
  rotate: {
    ease: "linear",
    duration,
    repeat: loop ? Infinity : 0,
  },
  scale: {
    type: "spring",
    damping: 20,
    stiffness: 300,
  },
});

export default function CircularText({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  size = 200,
  fontSize = 15,
  tilt = 16,
  hoverTilt = 24,
  className = "",
  children,
}: CircularTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  // 3D physics springs
  const tiltX = useSpring(0, { stiffness: 150, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 150, damping: 18 });
  const scale = useSpring(1, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: [start, start + 360],
      scale: 1,
      transition: getTransition(spinDuration),
    });
  }, [spinDuration, text, onHover, controls, rotation]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;

    let transitionConfig: Transition;
    let scaleVal = 1;

    switch (onHover) {
      case "slowDown":
        transitionConfig = getTransition(spinDuration * 2);
        break;
      case "speedUp":
        transitionConfig = getTransition(spinDuration / 4);
        break;
      case "pause":
        transitionConfig = {
          rotate: { type: "spring", damping: 20, stiffness: 300 },
          scale: { type: "spring", damping: 20, stiffness: 300 },
        };
        controls.start({
          rotate: start,
          scale: 1,
          transition: transitionConfig,
        });
        return;
      case "goBonkers":
        transitionConfig = getTransition(spinDuration / 20);
        scaleVal = 0.85;
        scale.set(0.85);
        break;
      default:
        transitionConfig = getTransition(spinDuration);
    }

    controls.start({
      rotate: [start, start + 360],
      scale: scaleVal,
      transition: transitionConfig,
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    scale.set(1);
    controls.start({
      rotate: [start, start + 360],
      scale: 1,
      transition: getTransition(spinDuration),
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!hoverTilt || e.pointerType === "touch" || !rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const nx = Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 2 - 1, -1), 1);
    const ny = Math.min(Math.max(((e.clientY - rect.top) / rect.height) * 2 - 1, -1), 1);
    tiltX.set(-ny * hoverTilt);
    tiltY.set(nx * hoverTilt);
  };

  const handlePointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    handleHoverEnd();
  };

  return (
    <div
      ref={rootRef}
      className={`relative mx-auto rounded-full text-center cursor-pointer select-none text-[#141534] ${className}`}
      style={{
        width: size,
        height: size,
        perspective: size * 2.5,
      }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handleHoverStart}
      onPointerLeave={handlePointerLeave}
    >
      {/* 3D Transform Layer */}
      <motion.div
        className="w-full h-full rounded-full relative [transform-style:preserve-3d]"
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          scale,
        }}
      >
        <div
          className="w-full h-full rounded-full relative [transform-style:preserve-3d]"
          style={{
            transform: tilt ? `rotateX(${tilt}deg)` : undefined,
          }}
        >
          {/* Animated Rotating Text Ring */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={controls}
            style={{ rotate: rotation }}
            onUpdate={(latest) => {
              if (typeof latest.rotate === "number") {
                rotation.set(latest.rotate);
              }
            }}
            className="w-full h-full rounded-full relative font-black text-center origin-center"
          >
            {letters.map((letter, i) => {
              const rotationDeg = (360 / letters.length) * i;
              const factor = Math.PI / letters.length;
              const x = factor * i;
              const y = factor * i;
              const transform = `rotateZ(${rotationDeg}deg) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;

              return (
                <span
                  key={i}
                  className="absolute inline-block inset-0 text-center origin-center transition-all duration-500 ease-[cubic-bezier(0,0,0,1)] uppercase tracking-normal"
                  style={{
                    fontSize: `${fontSize}px`,
                    transform,
                    WebkitTransform: transform,
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </motion.div>

          {/* 3D Elevated Center Element */}
          {children && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none [transform:translateZ(18px)]">
              {children}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
