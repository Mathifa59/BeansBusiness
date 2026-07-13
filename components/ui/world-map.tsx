"use client";

import { useRef, useState, type ComponentProps } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  Sphere,
  Graticule,
  createCoordinates,
  type Coordinates,
} from "@vnedyalk0v/react19-simple-maps";
import { cn } from "@/lib/utils";
import worldTopology from "@/lib/data/world-110m.json";

export type ExportRegionId =
  | "northAmerica"
  | "europe"
  | "latam"
  | "asia"
  | "middleEast";

// Lambayeque, Perú (Chiclayo) — point of origin for every export route
const ORIGIN_ID = "604"; // ISO 3166-1 numeric code for Peru
const ORIGIN: Coordinates = createCoordinates(-79.84, -6.77);

// ISO 3166-1 numeric codes (as stored in the topojson) → which region each
// destination country belongs to, plus its capital/hub coordinates for markers & routes.
const DESTINATIONS: Record<
  string,
  { region: ExportRegionId; coords: Coordinates }
> = {
  "840": { region: "northAmerica", coords: createCoordinates(-77.04, 38.91) }, // USA – Washington D.C.
  "124": { region: "northAmerica", coords: createCoordinates(-75.7, 45.42) }, // Canada – Ottawa
  "724": { region: "europe", coords: createCoordinates(-3.7, 40.42) }, // Spain – Madrid
  "276": { region: "europe", coords: createCoordinates(13.4, 52.52) }, // Germany – Berlin
  "380": { region: "europe", coords: createCoordinates(12.5, 41.9) }, // Italy – Rome
  "528": { region: "europe", coords: createCoordinates(4.9, 52.37) }, // Netherlands – Amsterdam
  "620": { region: "europe", coords: createCoordinates(-9.14, 38.72) }, // Portugal – Lisbon
  "616": { region: "europe", coords: createCoordinates(21.02, 52.23) }, // Poland – Warsaw
  "170": { region: "latam", coords: createCoordinates(-74.08, 4.71) }, // Colombia – Bogotá
  "032": { region: "latam", coords: createCoordinates(-58.38, -34.6) }, // Argentina – Buenos Aires
  "858": { region: "latam", coords: createCoordinates(-56.16, -34.9) }, // Uruguay – Montevideo
  "388": { region: "latam", coords: createCoordinates(-76.79, 17.97) }, // Jamaica – Kingston
  "780": { region: "latam", coords: createCoordinates(-61.52, 10.65) }, // Trinidad & Tobago – Port of Spain
  "392": { region: "asia", coords: createCoordinates(139.69, 35.68) }, // Japan – Tokyo
  "410": { region: "asia", coords: createCoordinates(126.98, 37.57) }, // South Korea – Seoul
  "422": { region: "middleEast", coords: createCoordinates(35.5, 33.89) }, // Lebanon – Beirut
  "376": { region: "middleEast", coords: createCoordinates(34.78, 32.08) }, // Israel – Tel Aviv
  "792": { region: "middleEast", coords: createCoordinates(32.86, 39.93) }, // Turkey – Ankara
};

export interface RegionInfo {
  name: string;
  countries: string[];
  shipments: string;
}

interface WorldMapProps {
  regions: Record<ExportRegionId, RegionInfo>;
  ariaLabel: string;
  originLabel: string;
  /** Persisted selection (drives an external detail card) — only changes on click. */
  selected: ExportRegionId | null;
  onSelect: (region: ExportRegionId) => void;
  className?: string;
}

const TOOLTIP_MARGIN = 100; // keeps the ~200px-wide tooltip from overflowing the container edges

export function WorldMap({
  regions,
  ariaLabel,
  originLabel,
  selected,
  onSelect,
  className,
}: WorldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Ephemeral — drives the floating tooltip + immediate hover feedback.
  const [hoveredLocal, setHoveredLocal] = useState<ExportRegionId | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const showTooltip = (
    regionId: ExportRegionId,
    event: { clientX: number; clientY: number }
  ) => {
    setHoveredLocal(regionId);
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.min(
      Math.max(event.clientX - rect.left, TOOLTIP_MARGIN),
      rect.width - TOOLTIP_MARGIN
    );
    const y = event.clientY - rect.top;
    setTooltipPos({ x, y });
  };

  const isActive = (region: ExportRegionId) =>
    hoveredLocal === region || selected === region;

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      onClick={() => setHoveredLocal(null)}
    >
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 165, center: createCoordinates(-10, 10) }}
        width={980}
        height={520}
        className="w-full"
        role="img"
        aria-label={ariaLabel}
      >
        <Sphere id="rsm-sphere" fill="#eef5fb" stroke="#d6e6f2" strokeWidth={0.5} />
        <Graticule stroke="#d6e6f2" strokeWidth={0.4} />

        <Geographies
          geography={
            worldTopology as unknown as ComponentProps<typeof Geographies>["geography"]
          }
        >
          {({ geographies }) =>
            geographies.map((geo) => {
              const id = String(geo.id);
              const isOrigin = id === ORIGIN_ID;
              const destination = DESTINATIONS[id];
              const active = !!destination && isActive(destination.region);

              const fill = isOrigin
                ? "#f8b10a"
                : destination
                  ? active
                    ? "#489332"
                    : "#64b548"
                  : "#dde5d5";

              return (
                <Geography
                  key={geo.id ?? geo.properties?.name}
                  geography={geo}
                  fill={fill}
                  stroke="#ffffff"
                  strokeWidth={0.5}
                  className={destination ? "cursor-pointer" : undefined}
                  style={{
                    default: { outline: "none", transition: "fill 0.2s ease" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                  onMouseEnter={(e) => {
                    if (!destination) return;
                    showTooltip(destination.region, e);
                  }}
                  onMouseLeave={() => {
                    if (destination) setHoveredLocal(null);
                  }}
                  onClick={(e) => {
                    if (!destination) return;
                    e.stopPropagation();
                    showTooltip(destination.region, e);
                    onSelect(destination.region);
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* Routes from Lambayeque to every destination */}
        {Object.entries(DESTINATIONS).map(([id, { region, coords }]) => {
          const active = isActive(region);
          return (
            <Line
              key={`route-${id}`}
              from={ORIGIN}
              to={coords}
              stroke="#64b548"
              strokeWidth={active ? 1.6 : 0.75}
              strokeDasharray="4 3"
              strokeLinecap="round"
              fill="none"
              opacity={active ? 0.85 : 0.35}
              style={{ transition: "opacity 0.25s ease, stroke-width 0.25s ease" }}
            />
          );
        })}

        {/* Destination markers (bigger invisible hit-area for touch) */}
        {Object.entries(DESTINATIONS).map(([id, { region, coords }]) => {
          const active = isActive(region);
          return (
            <Marker
              key={`marker-${id}`}
              coordinates={coords}
              className="cursor-pointer"
              onMouseEnter={(e) => showTooltip(region, e)}
              onMouseLeave={() => setHoveredLocal(null)}
              onClick={(e) => {
                e.stopPropagation();
                showTooltip(region, e);
                onSelect(region);
              }}
            >
              <circle r={9} fill="transparent" />
              <circle
                r={active ? 4 : 2.6}
                fill="#ffffff"
                stroke="#489332"
                strokeWidth={1.4}
                style={{ transition: "r 0.2s ease" }}
              />
            </Marker>
          );
        })}

        {/* Origin marker — Lambayeque, Perú */}
        <Marker coordinates={ORIGIN}>
          <circle
            r={9}
            fill="#f8b10a"
            fillOpacity={0.2}
            style={{
              transformOrigin: "center",
              animation: "originRing 2.4s ease-in-out infinite",
            }}
          />
          <circle r={4.5} fill="#f8b10a" stroke="#ffffff" strokeWidth={1.6} />
          <text
            x={9}
            y={-6}
            fontSize="9"
            fontWeight={700}
            fontFamily="system-ui, -apple-system, sans-serif"
            fill="#1a2e0f"
            letterSpacing="0.03em"
          >
            {originLabel}
          </text>
        </Marker>
      </ComposableMap>

      {/* ── Floating tooltip (hover on desktop, tap on mobile) ── */}
      {hoveredLocal && tooltipPos && regions[hoveredLocal] && (
        <div
          className="pointer-events-none absolute z-20 w-44 rounded-xl bg-dark px-4 py-3 shadow-2xl sm:w-52"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: "translate(-50%, calc(-100% - 14px))",
          }}
        >
          <p className="text-sm font-bold text-white">{regions[hoveredLocal].name}</p>
          <p className="mt-1 text-xs leading-relaxed text-white/60">
            {regions[hoveredLocal].countries.join(" · ")}
          </p>
          <p className="mt-2 text-[11px] font-bold tracking-wider text-primary-light">
            {regions[hoveredLocal].shipments}
          </p>
          <div className="absolute -bottom-[6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-dark" />
        </div>
      )}

      <style>{`
        @keyframes originRing {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          60%       { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
