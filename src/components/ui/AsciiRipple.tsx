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
   * String of glyphs from lightest to heaviest / disturbance.
   * Default: " ·.:~=+*#%@"
   */
  characters?: string;
  /**
   * How strongly surface height maps to glyph intensity.
   * Default: 2.2
   */
  sensitivity?: number;
  /**
   * How strongly surface slope adds to glyph intensity.
   * Default: 1.0
   */
  slopeGain?: number;
  /**
   * How far the underlying text is displaced by the slope, in cells.
   * Default: 4
   */
  refraction?: number;
  /**
   * How readily disturbed cells swap to palette glyphs (0 to 1).
   * Default: 1
   */
  scramble?: number;
  /**
   * Milliseconds between glyph reshuffles inside a ripple.
   * Default: 90
   */
  scrambleSpeed?: number;
  /**
   * Edge texture of the disturbed region (0 hard to 1 grainy).
   * Default: 0.5
   */
  dither?: number;
  /**
   * Width of the edge fade as a fraction of the shorter half-side (0 to 1).
   * Default: 0.6
   */
  vignette?: number;
  /**
   * Whether pointer disturbs the surface.
   * Default: true
   */
  interactive?: boolean;
  /**
   * Cell size in pixels (both width and height of each character cell).
   * Default: 13
   */
  cellSize?: number;
  /**
   * Font family for monospace ASCII rendering.
   * Default: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
   */
  fontFamily?: string;
  /**
   * Base color for undisturbed/resting characters.
   * Default: rgba(20, 21, 52, 0.08)
   */
  baseColor?: string;
  /**
   * Primary brand accent for ripple highlights (e.g. Acid Lime #D5DD54).
   * Default: #D5DD54
   */
  accentColor?: string;
  /**
   * Secondary brand accent for ripple crests (e.g. Electric Lavender #A29EDB).
   * Default: #A29EDB
   */
  secondaryAccent?: string;
  /**
   * Deep ink color for wave text body (e.g. #141534).
   * Default: #141534
   */
  inkColor?: string;
  /**
   * Whether gentle ambient drops occur periodically.
   * Default: true
   */
  ambientDrops?: boolean;
  /**
   * Average milliseconds between ambient drops.
   * Default: 3500
   */
  ambientInterval?: number;
  /**
   * Additional CSS classes for the root container.
   */
  className?: string;
  /**
   * Content layered above the particle field.
   */
  children?: React.ReactNode;
}

const DEFAULT_CHARS = " ·.:~=+*#%@";

export const AsciiRipple = forwardRef<AsciiRippleHandle, AsciiRippleProps>(
  (
    {
      characters = DEFAULT_CHARS,
      sensitivity = 2.2,
      slopeGain = 1.0,
      refraction = 4,
      scramble = 1.0,
      scrambleSpeed = 90,
      dither = 0.5,
      vignette = 0.6,
      interactive = true,
      cellSize = 13,
      fontFamily = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      baseColor = "rgba(20, 21, 52, 0.08)",
      accentColor = "#D5DD54",
      secondaryAccent = "#A29EDB",
      inkColor = "#141534",
      ambientDrops = true,
      ambientInterval = 3500,
      className = "",
      children
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Wave simulation state refs
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
      lastDropTime: number;
      isActive: boolean;
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
      lastDropTime: 0,
      isActive: true
    });

    // Create a drop at canvas pixel coordinates (x, y)
    const dropAt = useCallback(
      (px: number, py: number, strength: number = 3.5, radius: number = 2.5) => {
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

        sim.isActive = true;
      },
      [cellSize]
    );

    // Calm the entire surface
    const calm = useCallback(() => {
      const sim = simRef.current;
      sim.buf1.fill(0);
      sim.buf2.fill(0);
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
      const damping = 0.978;

      const resize = () => {
        const rect = container.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const w = Math.max(100, Math.floor(rect.width));
        const h = Math.max(100, Math.floor(rect.height));

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

        // Initial soft welcoming drop in the center
        setTimeout(() => {
          dropAt(w * 0.5, h * 0.35, 4.0, 3.5);
        }, 300);
      };

      const resizeObserver = new ResizeObserver(() => {
        resize();
      });
      resizeObserver.observe(container);
      resize();

      // Pointer event listeners on the container or window
      let lastMoveTime = 0;
      const handlePointerMove = (e: PointerEvent) => {
        if (!interactive) return;

        const rect = container.getBoundingClientRect();
        // Check if pointer is over or near the container
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          const now = performance.now();
          if (now - lastMoveTime > 28) {
            // Throttle to ~35fps for fluid continuous waves
            lastMoveTime = now;
            const px = e.clientX - rect.left;
            const py = e.clientY - rect.top;
            dropAt(px, py, 2.8, 2.2);
          }
        }
      };

      const handlePointerDown = (e: PointerEvent) => {
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
          dropAt(px, py, 5.0, 4.0);
        }
      };

      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerdown", handlePointerDown, { passive: true });

      // Main physics & render loop
      let lastTime = performance.now();

      const loop = (time: number) => {
        sim.animId = requestAnimationFrame(loop);

        const cols = sim.cols;
        const rows = sim.rows;
        if (cols <= 0 || rows <= 0) return;

        // Ambient drops periodically
        if (ambientDrops && time - sim.lastDropTime > ambientInterval) {
          sim.lastDropTime = time;
          const rx = (0.2 + Math.random() * 0.6) * sim.width;
          const ry = (0.15 + Math.random() * 0.55) * sim.height;
          dropAt(rx, ry, 3.2 + Math.random() * 1.5, 2.5 + Math.random());
        }

        // Reshuffle scramble seed
        if (time - sim.lastScrambleTime > scrambleSpeed) {
          sim.lastScrambleTime = time;
          sim.scrambleSeed = Math.floor(Math.random() * 1000);
        }

        // 1. Water Ripple Physics Simulation (Wave Equation)
        const current = sim.buf1;
        const previous = sim.buf2;
        let maxEnergy = 0;

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

            const absDamped = Math.abs(damped);
            if (absDamped > maxEnergy) {
              maxEnergy = absDamped;
            }
          }
        }

        // Swap buffers
        sim.buf1 = previous;
        sim.buf2 = current;

        // 2. Clear canvas
        ctx.clearRect(0, 0, sim.width, sim.height);

        // Character setup
        ctx.font = `600 ${Math.round(cellSize * 0.9)}px ${fontFamily}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const charsLen = characters.length;
        const cxHalf = cols * 0.5;
        const cyHalf = rows * 0.5;
        const minDimHalf = Math.max(1, Math.min(cxHalf, cyHalf));

        // 3. Render ASCII Grid
        const grid = sim.buf1;
        const halfCell = cellSize * 0.5;

        for (let y = 0; y < rows; y++) {
          const rowOffset = y * cols;
          const py = y * cellSize + halfCell;

          // Vertical edge vignette factor
          const dyCenter = Math.abs(y - cyHalf) / minDimHalf;

          for (let x = 0; x < cols; x++) {
            const idx = rowOffset + x;
            const h = grid[idx] || 0;

            // Surface slope calculation (horizontal & vertical gradient)
            const left = x > 0 ? grid[idx - 1] : h;
            const right = x < cols - 1 ? grid[idx + 1] : h;
            const top = y > 0 ? grid[idx - cols] : h;
            const bottom = y < rows - 1 ? grid[idx + cols] : h;

            const slopeX = (right - left) * 0.5;
            const slopeY = (bottom - top) * 0.5;
            const slope = Math.sqrt(slopeX * slopeX + slopeY * slopeY);

            // Intensity mapping (height + slope)
            let intensity = Math.abs(h) * sensitivity + slope * slopeGain;

            // Edge vignette fade
            if (vignette > 0) {
              const dxCenter = Math.abs(x - cxHalf) / minDimHalf;
              const distNorm = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
              const vigFactor = Math.max(0, 1 - distNorm * (vignette * 0.85));
              intensity *= vigFactor;
            }

            // Dither grain
            if (dither > 0 && intensity > 0.05) {
              const grain = ((x * 17 + y * 31 + sim.scrambleSeed) % 10) / 10 - 0.5;
              intensity += grain * dither * 0.15;
            }

            const px = x * cellSize + halfCell;

            // Render based on intensity tier
            if (intensity <= 0.04) {
              // Undisturbed resting state: very subtle minimal dots
              if ((x + y) % 3 === 0) {
                ctx.fillStyle = baseColor;
                ctx.fillText("·", px, py);
              }
            } else {
              // Disturbed ripple state
              let charIndex: number;

              if (scramble > 0 && Math.random() < scramble * 0.25) {
                // Scramble substitution inside ripple
                const scrambledIdx =
                  (x * 7 + y * 13 + sim.scrambleSeed) % (charsLen - 1) + 1;
                charIndex = Math.min(charsLen - 1, Math.max(1, scrambledIdx));
              } else {
                charIndex = Math.min(
                  charsLen - 1,
                  Math.max(1, Math.floor(intensity * (charsLen - 1)))
                );
              }

              const glyph = characters[charIndex] || characters[1];

              // Optical Refraction displacement (cells shift slightly with slope)
              const shiftX = Math.round(slopeX * refraction * cellSize * 0.3);
              const shiftY = Math.round(slopeY * refraction * cellSize * 0.3);

              // VisionWeb Colorimetry Integration:
              if (intensity > 0.65) {
                // Peak wave crest: High-voltage Acid Lime highlight
                ctx.fillStyle = accentColor;
                ctx.shadowColor = accentColor;
                ctx.shadowBlur = 4;
                ctx.fillText(glyph, px + shiftX, py + shiftY);
                ctx.shadowBlur = 0;
              } else if (intensity > 0.3) {
                // Mid-high wave: Electric Lavender accent
                ctx.fillStyle = secondaryAccent;
                ctx.fillText(glyph, px + shiftX, py + shiftY);
              } else if (intensity > 0.15) {
                // Moderate wave: Crisp Ink Navy
                ctx.fillStyle = inkColor;
                ctx.fillText(glyph, px + shiftX, py + shiftY);
              } else {
                // Soft ripple boundary
                ctx.fillStyle = "rgba(88, 90, 116, 0.45)"; // Slate navy
                ctx.fillText(glyph, px + shiftX, py + shiftY);
              }
            }
          }
        }
      };

      sim.animId = requestAnimationFrame(loop);

      return () => {
        if (sim.animId) cancelAnimationFrame(sim.animId);
        resizeObserver.disconnect();
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerdown", handlePointerDown);
      };
    }, [
      characters,
      sensitivity,
      slopeGain,
      refraction,
      scramble,
      scrambleSpeed,
      dither,
      vignette,
      interactive,
      cellSize,
      fontFamily,
      baseColor,
      accentColor,
      secondaryAccent,
      inkColor,
      ambientDrops,
      ambientInterval,
      dropAt
    ]);

    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden ${className}`}
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)"
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none w-full h-full block"
        />
        {children && <div className="relative z-10">{children}</div>}
      </div>
    );
  }
);

AsciiRipple.displayName = "AsciiRipple";

export default AsciiRipple;
