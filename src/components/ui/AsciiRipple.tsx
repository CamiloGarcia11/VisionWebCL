"use client";

import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback
} from "react";

export interface AsciiRippleHandle {
  drop: (x: number, y: number, strength?: number, radius?: number) => void;
  calm: () => void;
}

export interface AsciiRippleProps {
  /**
   * String of glyphs from lightest to heaviest disturbance.
   * Default: " ·:+~*#%"
   */
  characters?: string;
  /**
   * How strongly surface height maps to glyph intensity.
   * Default: 1.8
   */
  sensitivity?: number;
  /**
   * How strongly surface slope adds to glyph intensity.
   * Default: 1.0
   */
  slopeGain?: number;
  /**
   * How far the underlying characters are displaced by the slope, in pixels.
   * Default: 3
   */
  refraction?: number;
  /**
   * Milliseconds between glyph reshuffles inside a ripple.
   * Default: 100
   */
  scrambleSpeed?: number;
  /**
   * Width of the edge fade as a fraction of the shorter half-side (0 to 1).
   * Default: 0.5
   */
  vignette?: number;
  /**
   * Whether pointer disturbs the surface.
   * Default: true
   */
  interactive?: boolean;
  /**
   * Cell size in pixels (spacing between characters).
   * Default: 16
   */
  cellSize?: number;
  /**
   * Font family for monospace ASCII rendering.
   * Default: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
   */
  fontFamily?: string;
  /**
   * Primary brand accent for ripple peaks (Acid Lime #D5DD54).
   * Default: #D5DD54
   */
  accentColor?: string;
  /**
   * Secondary brand accent for ripple mid-crests (Electric Lavender #A29EDB).
   * Default: #A29EDB
   */
  secondaryAccent?: string;
  /**
   * Deep ink color for wave text body (#141534).
   * Default: #141534
   */
  inkColor?: string;
  /**
   * Additional CSS classes for the root container.
   */
  className?: string;
  /**
   * Content layered above the particle field.
   */
  children?: React.ReactNode;
}

const DEFAULT_CHARS = " ·:+~*#%";

export const AsciiRipple = forwardRef<AsciiRippleHandle, AsciiRippleProps>(
  (
    {
      characters = DEFAULT_CHARS,
      sensitivity = 1.8,
      slopeGain = 1.0,
      refraction = 3,
      scrambleSpeed = 100,
      vignette = 0.5,
      interactive = true,
      cellSize = 16,
      fontFamily = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      accentColor = "#D5DD54",
      secondaryAccent = "#A29EDB",
      inkColor = "#141534",
      className = "",
      children
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Wave simulation state
    const simRef = useRef<{
      cols: number;
      rows: number;
      buf1: Float32Array;
      buf2: Float32Array;
      animId: number | null;
      width: number;
      height: number;
      lastScrambleTime: number;
      scrambleSeed: number;
      activeEnergy: number;
    }>({
      cols: 0,
      rows: 0,
      buf1: new Float32Array(0),
      buf2: new Float32Array(0),
      animId: null,
      width: 0,
      height: 0,
      lastScrambleTime: 0,
      scrambleSeed: 0,
      activeEnergy: 0
    });

    // Create a localized drop at canvas pixel coordinates (px, py)
    const dropAt = useCallback(
      (px: number, py: number, strength: number = 6.0, radius: number = 2.0) => {
        const sim = simRef.current;
        if (sim.cols <= 0 || sim.rows <= 0) return;

        const gx = Math.floor(px / cellSize);
        const gy = Math.floor(py / cellSize);

        const r = Math.max(1, Math.round(radius));
        const rSq = r * r;

        for (let dy = -r; dy <= r; dy++) {
          const ny = gy + dy;
          if (ny < 1 || ny >= sim.rows - 1) continue;

          for (let dx = -r; dx <= r; dx++) {
            const nx = gx + dx;
            if (nx < 1 || nx >= sim.cols - 1) continue;

            const distSq = dx * dx + dy * dy;
            if (distSq <= rSq) {
              const falloff = Math.cos((Math.sqrt(distSq) / r) * (Math.PI / 2));
              sim.buf1[ny * sim.cols + nx] += strength * falloff;
            }
          }
        }

        sim.activeEnergy = 100; // Awaken simulation
      },
      [cellSize]
    );

    // Calm the entire surface
    const calm = useCallback(() => {
      const sim = simRef.current;
      sim.buf1.fill(0);
      sim.buf2.fill(0);
      sim.activeEnergy = 0;
    }, []);

    // Expose AsciiRippleHandle via ref
    useImperativeHandle(
      ref,
      () => ({
        drop: (x: number, y: number, strength?: number, radius?: number) => {
          dropAt(x, y, strength, radius);
        },
        calm: () => {
          calm();
        }
      }),
      [dropAt, calm]
    );

    useEffect(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const sim = simRef.current;
      // High damping so ripples cleanly fade out in ~0.9s without bouncing forever
      const damping = 0.935;

      const resize = () => {
        const rect = container.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const w = Math.max(200, Math.floor(rect.width || window.innerWidth));
        const h = Math.max(200, Math.floor(rect.height || window.innerHeight * 0.85));

        sim.width = w;
        sim.height = h;

        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);

        const cols = Math.ceil(w / cellSize);
        const rows = Math.ceil(h / cellSize);

        sim.cols = cols;
        sim.rows = rows;
        sim.buf1 = new Float32Array(cols * rows);
        sim.buf2 = new Float32Array(cols * rows);
      };

      const resizeObserver = new ResizeObserver(() => {
        resize();
      });
      resizeObserver.observe(container);
      window.addEventListener("resize", resize, { passive: true });
      resize();

      // Pointer event listeners: ONLY triggers when the user intentionally moves their cursor
      let lastMoveTime = 0;
      const handlePointerMove = (e: PointerEvent | MouseEvent) => {
        if (!interactive) return;

        const rect = container.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          const now = performance.now();
          if (now - lastMoveTime > 35) {
            lastMoveTime = now;
            const px = e.clientX - rect.left;
            const py = e.clientY - rect.top;
            dropAt(px, py, 6.0, 1.8);
          }
        }
      };

      const handlePointerDown = (e: PointerEvent | MouseEvent) => {
        if (!interactive) return;

        const rect = container.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          const px = e.clientX - rect.left;
          const py = e.clientY - rect.top;
          dropAt(px, py, 12.0, 2.8);
        }
      };

      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerdown", handlePointerDown, { passive: true });

      // Main physics & render loop
      const loop = (time: number) => {
        sim.animId = requestAnimationFrame(loop);

        const cols = sim.cols;
        const rows = sim.rows;
        if (cols <= 0 || rows <= 0) return;

        // If the surface has settled completely and no energy exists, stay calm & clear
        if (sim.activeEnergy <= 0) {
          return;
        }

        // Reshuffle scramble seed
        if (time - sim.lastScrambleTime > scrambleSpeed) {
          sim.lastScrambleTime = time;
          sim.scrambleSeed = Math.floor(Math.random() * 500);
        }

        // 1. Water Ripple Physics Simulation (Hugo Elias Wave Equation)
        const current = sim.buf1;
        const previous = sim.buf2;
        let totalEnergy = 0;

        for (let y = 1; y < rows - 1; y++) {
          const rowIdx = y * cols;
          for (let x = 1; x < cols - 1; x++) {
            const idx = rowIdx + x;
            const val =
              (current[idx - 1] +
                current[idx + 1] +
                current[idx - cols] +
                current[idx + cols]) *
                0.5 -
              previous[idx];

            const damped = val * damping;
            previous[idx] = damped;

            const absVal = Math.abs(damped);
            if (absVal > 0.02) {
              totalEnergy += absVal;
            }
          }
        }

        // Swap buffers
        sim.buf1 = previous;
        sim.buf2 = current;

        // If energy faded to near-zero, calm down and clear screen
        if (totalEnergy < 0.05) {
          sim.activeEnergy = 0;
          ctx.clearRect(0, 0, sim.width, sim.height);
          return;
        }

        // 2. Clear canvas to keep resting background 100% clean
        ctx.clearRect(0, 0, sim.width, sim.height);

        // Character setup
        ctx.font = `600 ${Math.round(cellSize * 0.85)}px ${fontFamily}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const charsLen = characters.length;
        const cxHalf = cols * 0.5;
        const cyHalf = rows * 0.5;
        const minDimHalf = Math.max(1, Math.min(cxHalf, cyHalf));

        // 3. Render ASCII ripples ONLY where the wave is currently passing
        const grid = sim.buf1;
        const halfCell = cellSize * 0.5;

        for (let y = 0; y < rows; y++) {
          const rowOffset = y * cols;
          const py = y * cellSize + halfCell;
          const dyCenter = Math.abs(y - cyHalf) / minDimHalf;

          for (let x = 0; x < cols; x++) {
            const idx = rowOffset + x;
            const h = grid[idx] || 0;

            // Fast skip for quiet/resting cells - keeps screen completely uncluttered!
            if (Math.abs(h) < 0.03) continue;

            const left = x > 0 ? grid[idx - 1] : h;
            const right = x < cols - 1 ? grid[idx + 1] : h;
            const top = y > 0 ? grid[idx - cols] : h;
            const bottom = y < rows - 1 ? grid[idx + cols] : h;

            const slopeX = (right - left) * 0.5;
            const slopeY = (bottom - top) * 0.5;
            const slope = Math.sqrt(slopeX * slopeX + slopeY * slopeY);

            // Normalized intensity
            let intensity = Math.abs(h) * 0.22 * sensitivity + slope * 0.25 * slopeGain;

            // Soft threshold: if barely disturbed, leave clean
            if (intensity < 0.08) continue;

            // Edge vignette fade
            if (vignette > 0) {
              const dxCenter = Math.abs(x - cxHalf) / minDimHalf;
              const distNorm = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
              const vigFactor = Math.max(0, 1 - distNorm * (vignette * 0.9));
              intensity *= vigFactor;
            }

            if (intensity < 0.08) continue;

            const px = x * cellSize + halfCell;

            // Refraction shift: characters displace with water slope
            const shiftX = Math.max(-6, Math.min(6, Math.round(slopeX * refraction * 1.2)));
            const shiftY = Math.max(-6, Math.min(6, Math.round(slopeY * refraction * 1.2)));

            // Pick ASCII glyph based on intensity
            const charIdx = Math.min(
              charsLen - 1,
              Math.max(1, Math.floor(intensity * (charsLen - 1)))
            );
            const glyph = characters[charIdx] || characters[1];

            // Subtle color tiers matching VisionWeb's palette:
            if (intensity > 0.55) {
              // Peak: Acid lime highlight
              ctx.fillStyle = accentColor;
              ctx.fillText(glyph, px + shiftX, py + shiftY);
            } else if (intensity > 0.25) {
              // Mid wave: Soft electric lavender
              ctx.fillStyle = secondaryAccent;
              ctx.fillText(glyph, px + shiftX, py + shiftY);
            } else {
              // Soft wave body: Elegant slate/ink
              ctx.fillStyle = inkColor;
              ctx.fillText(glyph, px + shiftX, py + shiftY);
            }
          }
        }
      };

      sim.animId = requestAnimationFrame(loop);

      return () => {
        if (sim.animId) cancelAnimationFrame(sim.animId);
        resizeObserver.disconnect();
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerdown", handlePointerDown);
      };
    }, [
      characters,
      sensitivity,
      slopeGain,
      refraction,
      scrambleSpeed,
      vignette,
      interactive,
      cellSize,
      fontFamily,
      accentColor,
      secondaryAccent,
      inkColor,
      dropAt
    ]);

    return (
      <div
        ref={containerRef}
        className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)"
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none"
        />
        {children && <div className="relative z-10">{children}</div>}
      </div>
    );
  }
);

AsciiRipple.displayName = "AsciiRipple";

export default AsciiRipple;
