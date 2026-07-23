/**
 * Genera public/world-map.svg y lib/constants/map-points.ts a partir de
 * @svg-maps/world (devDependency). Ejecutar tras cambiar países destino:
 *   node scripts/generate-world-map.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

// El paquete publica "export default {...}" sin type:module — se parsea a mano
const raw = readFileSync("node_modules/@svg-maps/world/index.js", "utf8");
const world = JSON.parse(raw.replace(/^export default\s*/, "").replace(/;\s*$/, ""));

const DESTINATIONS = ["us", "co", "es", "it", "nl", "kr", "jp"];
const ORIGIN_ID = "pe";

const COLORS = {
  base: "#e3e8df",
  destination: "#64b548",
  origin: "#f8b10a",
};

const [, , VB_W, VB_H] = world.viewBox.split(" ").map(Number);

/** bbox del subpath de mayor área (evita que Alaska o islas desplacen el centro) */
function mainSubpathBBox(d) {
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
  const subpaths = [];
  let pts = [];
  let cmd = "";
  let x = 0;
  let y = 0;
  let i = 0;

  const flush = () => {
    if (pts.length > 2) subpaths.push(pts);
    pts = [];
  };

  const read = () => Number(tokens[i++]);

  while (i < tokens.length) {
    const t = tokens[i];
    if (/[a-zA-Z]/.test(t)) {
      cmd = t;
      i++;
      if (cmd === "z" || cmd === "Z") continue;
      if (cmd === "m" || cmd === "M") flush();
    }
    switch (cmd) {
      case "M":
        x = read();
        y = read();
        cmd = "L";
        pts.push([x, y]);
        break;
      case "m":
        x += read();
        y += read();
        cmd = "l";
        pts.push([x, y]);
        break;
      case "L":
        x = read();
        y = read();
        pts.push([x, y]);
        break;
      case "l":
        x += read();
        y += read();
        pts.push([x, y]);
        break;
      case "H":
        x = read();
        pts.push([x, y]);
        break;
      case "h":
        x += read();
        pts.push([x, y]);
        break;
      case "V":
        y = read();
        pts.push([x, y]);
        break;
      case "v":
        y += read();
        pts.push([x, y]);
        break;
      case "C":
        read(); read(); read(); read();
        x = read();
        y = read();
        pts.push([x, y]);
        break;
      case "c": {
        read(); read(); read(); read();
        const dx = read();
        const dy = read();
        x += dx;
        y += dy;
        pts.push([x, y]);
        break;
      }
      case "S":
      case "Q":
        read(); read();
        x = read();
        y = read();
        pts.push([x, y]);
        break;
      case "s":
      case "q": {
        read(); read();
        x += read();
        y += read();
        pts.push([x, y]);
        break;
      }
      case "T":
        x = read();
        y = read();
        pts.push([x, y]);
        break;
      case "t":
        x += read();
        y += read();
        pts.push([x, y]);
        break;
      case "A":
        read(); read(); read(); read(); read();
        x = read();
        y = read();
        pts.push([x, y]);
        break;
      case "a":
        read(); read(); read(); read(); read();
        x += read();
        y += read();
        pts.push([x, y]);
        break;
      default:
        i++;
    }
  }
  flush();

  let best = null;
  for (const sp of subpaths) {
    const xs = sp.map((p) => p[0]);
    const ys = sp.map((p) => p[1]);
    const box = {
      x: Math.min(...xs),
      y: Math.min(...ys),
      w: Math.max(...xs) - Math.min(...xs),
      h: Math.max(...ys) - Math.min(...ys),
    };
    if (!best || box.w * box.h > best.w * best.h) best = box;
  }
  return best;
}

const paths = world.locations
  .map((loc) => {
    const fill = DESTINATIONS.includes(loc.id)
      ? COLORS.destination
      : loc.id === ORIGIN_ID
        ? COLORS.origin
        : COLORS.base;
    return `<path d="${loc.path}" fill="${fill}"/>`;
  })
  .join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${world.viewBox}" stroke="#ffffff" stroke-width="0.4">\n${paths}\n</svg>\n`;
writeFileSync("public/world-map.svg", svg);

// EEUU: el subpath de mayor área es Alaska; se fija el centro continental a mano
const OVERRIDES = { us: { x: 20.4, y: 51.3 } };

const points = {};
for (const id of [...DESTINATIONS, ORIGIN_ID]) {
  if (OVERRIDES[id]) {
    points[id] = OVERRIDES[id];
    continue;
  }
  const loc = world.locations.find((l) => l.id === id);
  const box = mainSubpathBBox(loc.path);
  let cx = box.x + box.w / 2;
  let cy = box.y + box.h / 2;
  if (id === ORIGIN_ID) {
    // Lambayeque: costa noroeste del Perú, no el centro del país
    cx = box.x + box.w * 0.11;
    cy = box.y + box.h * 0.36;
  }
  points[id] = {
    x: Number(((cx / VB_W) * 100).toFixed(2)),
    y: Number(((cy / VB_H) * 100).toFixed(2)),
  };
}

const ts = `/** Generado por scripts/generate-world-map.mjs — no editar a mano */

export const MAP_VIEWBOX = { width: ${VB_W}, height: ${VB_H} } as const;

/** Posición porcentual (sobre el viewBox del mapa) de cada país */
export const MAP_POINTS = ${JSON.stringify(points, null, 2)} as const;

export type MapCountryId = Exclude<keyof typeof MAP_POINTS, "pe">;

export const MAP_DESTINATIONS = ${JSON.stringify(DESTINATIONS)} as const;
`;
writeFileSync("lib/constants/map-points.ts", ts);

console.log("OK", points);
