"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type ExportRegionId =
  | "northAmerica"
  | "europe"
  | "latam"
  | "asia"
  | "middleEast";

// ViewBox: 0 0 1000 500 (Mercator-like projection)
// x = (lon + 180) * 1000/360,  y = (90 - lat) * 500/180
const PATHS: Record<ExportRegionId | "africa" | "oceania", string> = {
  // ── Inactive continents (context only) ──────────────────────────────────
  africa:
    "M 436,198 L 490,194 L 542,200 L 572,218 L 578,252 L 566,290 " +
    "L 549,332 L 535,370 L 525,408 L 520,444 L 514,468 L 498,480 " +
    "L 482,472 L 467,450 L 454,416 L 438,374 L 422,325 " +
    "L 418,282 L 418,240 L 426,210 Z",
  oceania:
    "M 752,362 L 820,352 L 874,358 L 919,372 L 945,392 L 955,420 " +
    "L 943,448 L 920,464 L 890,470 L 855,466 L 824,455 " +
    "L 798,434 L 776,410 L 760,385 L 750,370 Z",

  // ── Active export regions ────────────────────────────────────────────────
  northAmerica:
    "M 58,70 L 195,26 L 348,28 L 387,64 L 387,100 L 374,160 " +
    "L 374,200 L 362,228 L 330,255 L 294,278 L 270,292 L 248,318 " +
    "L 224,292 L 192,268 L 159,244 L 128,215 " +
    "L 110,180 L 99,145 L 85,112 Z",
  latam:
    "M 248,318 L 278,286 L 328,280 L 366,288 L 387,318 L 387,352 " +
    "L 374,390 L 358,424 L 342,456 L 326,480 L 312,496 " +
    "L 294,494 L 276,480 L 260,458 L 248,432 L 246,402 L 248,364 Z",
  europe:
    "M 428,102 L 448,78 L 474,62 L 504,56 L 533,59 L 557,70 " +
    "L 574,88 L 580,110 L 570,132 L 552,144 L 534,149 L 517,153 " +
    "L 503,163 L 491,155 L 472,151 L 454,149 L 435,137 L 426,118 Z",
  // Asia (large landmass; middleEast rendered on top to intercept hover)
  asia:
    "M 580,54 L 698,28 L 818,22 L 938,30 L 1000,56 " +
    "L 1000,356 C 960,375 916,393 874,397 C 832,401 792,391 760,375 " +
    "C 728,359 704,334 680,309 C 656,283 632,255 610,229 " +
    "C 588,203 568,175 549,149 C 536,131 530,109 536,89 " +
    "L 552,72 L 568,60 L 580,54 Z",
  middleEast:
    "M 562,149 L 586,145 L 614,153 L 638,167 L 656,188 " +
    "L 660,211 L 653,235 L 636,255 L 612,268 L 586,270 " +
    "L 563,258 L 546,240 L 536,217 L 535,194 L 543,172 L 556,157 Z",
};

// Lambayeque, Perú (lon -79.84, lat -6.77) → x ≈ 278, y ≈ 269
const ORIGIN: [number, number] = [278, 269];

// Visual centroids for tooltip placement and connection lines
const CENTROIDS: Record<ExportRegionId, [number, number]> = {
  northAmerica: [218, 168],
  latam:        [314, 390],
  europe:       [507, 110],
  middleEast:   [596, 210],
  asia:         [840, 210],
};

export interface RegionInfo {
  name: string;
  countries: string[];
  shipments: string;
}

// Render order: asia before middleEast so middleEast sits on top (intercepts mouse)
const RENDER_ORDER: ExportRegionId[] = [
  "northAmerica",
  "latam",
  "europe",
  "asia",
  "middleEast",
];

interface WorldMapProps {
  regions: Record<ExportRegionId, RegionInfo>;
  ariaLabel: string;
  originLabel: string;
  className?: string;
}

export function WorldMap({ regions, ariaLabel, originLabel, className }: WorldMapProps) {
  const [hovered, setHovered] = useState<ExportRegionId | null>(null);

  const toggle = (regionId: ExportRegionId) => {
    setHovered((current) => (current === regionId ? null : regionId));
  };

  // Tooltip x clamped so it doesn't fall off either edge (tighter margin for narrow/mobile containers)
  const tipPct = hovered
    ? {
        x: Math.min(Math.max((CENTROIDS[hovered][0] / 1000) * 100, 20), 80),
        y: (CENTROIDS[hovered][1] / 500) * 100,
      }
    : null;

  return (
    <div
      className={cn("relative", className)}
      onClick={() => setHovered(null)}
    >
      {/* ── SVG Map ── */}
      <svg
        viewBox="0 0 1000 500"
        className="w-full"
        role="img"
        aria-label={ariaLabel}
      >
        {/* Ocean */}
        <defs>
          <linearGradient id="ocean-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cee8f5" />
            <stop offset="100%" stopColor="#ddf0fb" />
          </linearGradient>
          {/* Glow filter for hovered regions */}
          <filter id="region-glow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1000" height="500" rx="14" fill="url(#ocean-grad)" />

        {/* Subtle latitude lines */}
        {[167, 333].map((y) => (
          <line
            key={y}
            x1={0} y1={y} x2={1000} y2={y}
            stroke="white" strokeWidth="0.8" opacity="0.45"
          />
        ))}
        {/* Equator */}
        <line
          x1={0} y1={250} x2={1000} y2={250}
          stroke="white" strokeWidth="1.2"
          strokeDasharray="8 5" opacity="0.5"
        />

        {/* ── Inactive continents ── */}
        {(["africa", "oceania"] as const).map((id) => (
          <path
            key={id}
            d={PATHS[id]}
            fill="#bcd4bc"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        ))}

        {/* ── Connection lines from origin (skip latam – same continent) ── */}
        {RENDER_ORDER.filter((r) => r !== "latam").map((regionId) => {
          const [x2, y2] = CENTROIDS[regionId];
          const active = hovered === regionId;
          return (
            <line
              key={`ln-${regionId}`}
              x1={ORIGIN[0]} y1={ORIGIN[1]}
              x2={x2} y2={y2}
              stroke="#64b548"
              strokeWidth={active ? 1.6 : 0.8}
              strokeDasharray="5 4"
              opacity={active ? 0.65 : 0.25}
              style={{ transition: "opacity 0.25s ease, stroke-width 0.25s ease" }}
            />
          );
        })}

        {/* ── Active export region paths ── */}
        {RENDER_ORDER.map((regionId) => {
          const isHov = hovered === regionId;
          return (
            <path
              key={regionId}
              d={PATHS[regionId]}
              fill="#64b548"
              fillOpacity={isHov ? 0.88 : 0.52}
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
              className="cursor-pointer"
              filter={isHov ? "url(#region-glow)" : undefined}
              style={{ transition: "fill-opacity 0.2s ease" }}
              onMouseEnter={() => setHovered(regionId)}
              onMouseLeave={() => setHovered(null)}
              onClick={(e) => {
                e.stopPropagation();
                toggle(regionId);
              }}
            />
          );
        })}

        {/* ── Lambayeque, Perú origin dot ── */}
        {/* Pulse ring */}
        <circle
          cx={ORIGIN[0]} cy={ORIGIN[1]} r="10"
          fill="#64b548" fillOpacity="0.18"
          style={{
            transformOrigin: `${ORIGIN[0]}px ${ORIGIN[1]}px`,
            animation: "originRing 2.4s ease-in-out infinite",
          }}
        />
        {/* Solid dot */}
        <circle
          cx={ORIGIN[0]} cy={ORIGIN[1]} r="4.5"
          fill="#64b548" stroke="white" strokeWidth="2"
        />
        {/* Label */}
        <text
          x={ORIGIN[0] + 10} y={ORIGIN[1] - 8}
          fontSize="10" fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
          fill="#1a2e0f" letterSpacing="0.04em"
        >
          {originLabel}
        </text>
      </svg>

      {/* ── Tooltip ── */}
      {hovered && tipPct && regions[hovered] && (
        <div
          className="pointer-events-none absolute z-20 w-44 rounded-xl bg-dark px-4 py-3 shadow-2xl sm:w-52"
          style={{
            left: `${tipPct.x}%`,
            top: `${tipPct.y}%`,
            transform: "translate(-50%, calc(-100% - 14px))",
          }}
        >
          <p className="text-sm font-bold text-white">{regions[hovered].name}</p>
          <p className="mt-1 text-xs leading-relaxed text-white/60">
            {regions[hovered].countries.join(" · ")}
          </p>
          <p className="mt-2 text-[11px] font-bold tracking-wider text-primary-light">
            {regions[hovered].shipments}
          </p>
          {/* Arrow */}
          <div className="absolute -bottom-[6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-dark" />
        </div>
      )}

      <style>{`
        @keyframes originRing {
          0%, 100% { transform: scale(1); opacity: 0.18; }
          60%       { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
