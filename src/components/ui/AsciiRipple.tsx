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
   * Default: 1.2
   */
  slopeGain?: number;
  /**
   * How far the underlying text is displaced by the slope, in cells.
   * Default: 4
   */
  refraction?: number;
  /**
   * How readily disturbed cells swap to palette glyphs (0 to 1).
   * Default: 1.0
   */
  scramble?: number;
  /**
   * Milliseconds between glyph reshuffles inside a ripple.
   * Default: 80
   */
  scrambleSpeed?: number;
  /**
   * Edge texture of the disturbed region (0 hard to 1 grainy).
   * Default: 0.4
   */
  dither?: number;
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
   * Cell size in pixels (both width and height of each character cell).
   * Default: 14
   */
  cellSize?: number;
  /**
   * Font family for monospace ASCII rendering.
   * Default: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
   */
  fontFamily?: string;
  /**
   * Base color for undisturbed/resting characters.
   * Default: rgba(20, 21, 52, 0.12)
   */
  baseColor?: string;
  /**
   * Primary brand accent for ripple highlights (Acid Lime #D5DD54).
   * Default: #D5DD54
   */
  accentColor?: string;
  /**
   * Secondary brand accent for ripple crests (Electric Lavender #A29EDB).
   * Default: #A29EDB
   */
  secondaryAccent?: string;
  /**
   * Deep ink color for wave text body (#141534).
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
   * Default: 3200
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
const BASE_GLYPHS = ["·", "+", "·", "~", "·", "×", "·", "*", "."];

export const AsciiRipple = forwardRef<AsciiRippleHandle, AsciiRippleProps>(
  (
    {
      characters = DEFAULT_CHARS,
      sensitivity = 2.2,
      slopeGain = 1.2,
      refraction = 4,
      scramble = 1.0,
      scrambleSpeed = 80,
      dither = 0.4,
      vignette = 0.5,
      interactive = true,
      cellSize = 14,
      fontFamily = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      baseColor = "rgba(20, 21, 52, 0.13)",
      accentColor = "#D5DD54",
      secondaryAccent = "#A29EDB",
      inkColor = "#141534",
      ambientDrops = true,
      ambientInterval = 3200,
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
      lastDropTime: number;
      isInitialized: boolean;
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
      isInitialized: false
    });

    // Create a drop at canvas pixel coordinates (px, py)
    const dropAt = useCallback(
      (px: number, py: number, strength: number = 18.0, radius: number = 3.0) => {
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
      const damping = 0.982;

      const resize = () => {
        const rect = container.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        // Fallback to window dimensions if container has not yet calculated layout
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

        // Initial welcoming ripples on load
        if (!sim.isInitialized) {
          sim.isInitialized = true;
          setTimeout(() => {
            dropAt(w * 0.35, h * 0.4, 22.0, 3.5);
          }, 400);
          setTimeout(() => {
            dropAt(w * 0.65, h * 0.5, 18.0, 3.2);
          }, 900);
        }
      };

      const resizeObserver = new ResizeObserver(() => {
        resize();
      });
      resizeObserver.observe(container);
      window.addEventListener("resize", resize, { passive: true });
      resize();

      // Pointer event listeners on window to capture cursor anywhere over the Hero
      let lastMoveTime = 0;
      const handlePointerMove = (e: PointerEvent | MouseEvent) => {
        if (!interactive) return;

        const rect = container.getBoundingClientRect();
        // Check if pointer is within or close to the Hero container
        if (
          e.clientX >= rect.left - 40 &&
          e.clientX <= rect.right + 40 &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom + 40
        ) {
          const now = performance.now();
          if (now - lastMoveTime > 24) {
            // ~40fps rate-limit for silky fluid wave trails
            lastMoveTime = now;
            const px = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
            const py = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
            dropAt(px, py, 16.0, 2.8);
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
          const px = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
          const py = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
          dropAt(px, py, 26.0, 4.2);
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

        // Periodic gentle ambient drops
        if (ambientDrops && time - sim.lastDropTime > ambientInterval) {
          sim.lastDropTime = time;
          const rx = (0.2 + Math.random() * 0.6) * sim.width;
          const ry = (0.2 + Math.random() * 0.6) * sim.height;
          dropAt(rx, ry, 18.0 + Math.random() * 6.0, 3.2 + Math.random());
        }

        // Reshuffle scramble seed
        if (time - sim.lastScrambleTime > scrambleSpeed) {
          sim.lastScrambleTime = time;
          sim.scrambleSeed = Math.floor(Math.random() * 1000);
        }

        // 1. Water Ripple Physics Simulation (Hugo Elias Wave Equation)
        const current = sim.buf1;
        const previous = sim.buf2;

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

            previous[idx] = val * damping;
          }
        }

        // Swap buffers: previous becomes the new current height map
        sim.buf1 = previous;
        sim.buf2 = current;

        // 2. Clear canvas
        ctx.clearRect(0, 0, sim.width, sim.height);

        // Character setup
        ctx.font = `600 ${Math.round(cellSize * 0.88)}px ${fontFamily}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const charsLen = characters.length;
        const cxHalf = cols * 0.5;
        const cyHalf = rows * 0.5;
        const minDimHalf = Math.max(1, Math.min(cxHalf, cyHalf));

        // 3. Render ASCII Grid
        const grid = sim.buf1;
        const halfCell = cellSize * 0.5;
        const baseGlyphsLen = BASE_GLYPHS.length;

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

            // Normalized intensity mapping (scaled for visual clarity)
            let intensity = Math.abs(h) * 0.12 * sensitivity + slope * 0.14 * slopeGain;

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
              intensity += grain * dither * 0.12;
            }

            const px = x * cellSize + halfCell;
            const baseChar = BASE_GLYPHS[(x * 3 + y * 5) % baseGlyphsLen];

            // Render based on intensity tier
            if (intensity <= 0.05) {
              // Undisturbed resting state: crisp, clean subtle monospace ASCII pattern
              ctx.fillStyle = baseColor;
              ctx.fillText(baseChar, px, py);
            } else {
              // Disturbed ripple state: Optical refraction displacement
              const shiftX = Math.max(-10, Math.min(10, Math.round(slopeX * refraction * 1.8)));
              const shiftY = Math.max(-10, Math.min(10, Math.round(slopeY * refraction * 1.8)));

              // Scramble glyph selection inside ripple
              let glyph: string;
              if (scramble > 0 && Math.random() < scramble * 0.35) {
                const sIdx = (x * 7 + y * 13 + sim.scrambleSeed) % (charsLen - 1) + 1;
                glyph = characters[sIdx] || characters[charsLen - 1];
              } else {
                const charIdx = Math.min(
                  charsLen - 1,
                  Math.max(1, Math.floor(intensity * (charsLen - 1)))
                );
                glyph = characters[charIdx] || characters[charsLen - 1];
              }

              // VisionWeb Colorimetry Integration:
              if (intensity > 0.55) {
                // Crest peak: Acid Lime highlight with subtle glow
                ctx.fillStyle = accentColor;
                ctx.shadowColor = accentColor;
                ctx.shadowBlur = 5;
                ctx.fillText(glyph, px + shiftX, py + shiftY);
                ctx.shadowBlur = 0;
              } else if (intensity > 0.22) {
                // Mid crest: Electric Lavender accent
                ctx.fillStyle = secondaryAccent;
                ctx.fillText(glyph, px + shiftX, py + shiftY);
              } else {
                // Wave body: Deep Midnight Ink
                ctx.fillStyle = inkColor;
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
        window.removeEventListener("resize", resize);
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
