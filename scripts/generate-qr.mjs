/**
 * Genera el QR de marca de Business Beans (apunta a la página /links, tipo
 * Linktree) en versión suelta y en versión "tarjeta" lista para imprimir.
 *
 *   node scripts/generate-qr.mjs
 *
 * Salida en docs/qr/: SVG (vectorial, para imprenta) + PNG (2000 px).
 * El QR apunta SIEMPRE a /links, no a cada red social: así se puede cambiar
 * qué enlaces aparecen sin reimprimir ni reemplazar ningún QR ya repartido.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import QRCode from "qrcode";
import sharp from "sharp";

const URL_TARGET = "https://www.businessbeans.com.pe/links";
const OUT = "docs/qr";

// Paleta de marca (app/globals.css)
const DARK = "#1a2e0f";
const GREEN_DEEP = "#2d5a1b";
const GREEN_MID = "#3a7a25";
const PRIMARY = "#64b548";
const ACCENT = "#f8b10a";

const S = 20; // px por módulo
const QUIET = 4; // zona silenciosa (módulos), mínimo del estándar

const isotipo = (await readFile("scripts/assets/isotipo.png")).toString("base64");
const wordmark = (
  await sharp("public/logos/sinfondO.png").resize({ width: 760 }).png().toBuffer()
).toString("base64");

// ── QR ──────────────────────────────────────────────────────────────────
// Nivel H (30 % de corrección) para poder tapar el centro con el isotipo.
const qr = QRCode.create(URL_TARGET, { errorCorrectionLevel: "H" });
const N = qr.modules.size;
const dark = (r, c) => qr.modules.get(r, c) === 1;

const inFinder = (r, c) =>
  (r < 7 && c < 7) || (r < 7 && c >= N - 7) || (r >= N - 7 && c < 7);

const LOGO = 9; // módulos libres en el centro (≈7 % del área, muy por debajo del 30 % que tolera H)
const mid = Math.floor(N / 2);
const half = Math.floor(LOGO / 2);
const inLogo = (r, c) =>
  Math.abs(r - mid) <= half && Math.abs(c - mid) <= half;

/** forma de "hoja": dos esquinas opuestas muy redondeadas (eco del isotipo) */
const leaf = (x, y, w, h, big, small) =>
  `M${x + big},${y}H${x + w - small}Q${x + w},${y} ${x + w},${y + small}V${y + h - big}` +
  `Q${x + w},${y + h} ${x + w - big},${y + h}H${x + small}Q${x},${y + h} ${x},${y + h - small}` +
  `V${y + big}Q${x},${y} ${x + big},${y}Z`;

// color de cada "grano" (determinista, para un degradado orgánico sin perder contraste)
const BEAN_COLORS = [DARK, GREEN_DEEP, GREEN_MID, DARK, GREEN_DEEP];
const beanColor = (r, c) => BEAN_COLORS[(r * 7 + c * 13 + ((r * c) % 5)) % BEAN_COLORS.length];

function qrMarkup(ox, oy) {
  const px = (c) => ox + (QUIET + c) * S;
  const py = (r) => oy + (QUIET + r) * S;
  let beans = "";
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (!dark(r, c) || inFinder(r, c) || inLogo(r, c)) continue;
      beans += `<rect x="${px(c) + S * 0.04}" y="${py(r) + S * 0.04}" width="${S * 0.92}" height="${S * 0.92}" rx="${S * 0.36}" fill="${beanColor(r, c)}"/>`;
    }
  }

  const eye = (r0, c0) => {
    const x = px(c0);
    const y = py(r0);
    return (
      // anillo exterior
      `<rect x="${x + S / 2}" y="${y + S / 2}" width="${6 * S}" height="${6 * S}" rx="${1.9 * S}" fill="none" stroke="${DARK}" stroke-width="${S}"/>` +
      // pupila en forma de hoja
      `<path d="${leaf(x + 2 * S, y + 2 * S, 3 * S, 3 * S, 1.35 * S, 0.4 * S)}" fill="url(#eyeGrad)"/>`
    );
  };

  const lx = px(mid - half);
  const ly = py(mid - half);
  const plate = LOGO * S;
  const logoPad = 0.9 * S;
  const logo =
    `<path d="${leaf(lx - 0.15 * S, ly - 0.15 * S, plate + 0.3 * S, plate + 0.3 * S, 2.4 * S, 0.6 * S)}" fill="#fff" stroke="${PRIMARY}" stroke-width="${0.22 * S}"/>` +
    `<image href="data:image/png;base64,${isotipo}" x="${lx + logoPad}" y="${ly + logoPad}" width="${plate - 2 * logoPad}" height="${plate - 2 * logoPad}"/>`;

  return beans + eye(0, 0) + eye(0, N - 7) + eye(N - 7, 0) + logo;
}

const DEFS = `<defs>
  <linearGradient id="eyeGrad" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${GREEN_MID}"/><stop offset="1" stop-color="${DARK}"/>
  </linearGradient>
</defs>`;

const QR_SIZE = (N + 2 * QUIET) * S;

// ── 1) QR suelto (fondo blanco) ─────────────────────────────────────────
const plain = `<svg xmlns="http://www.w3.org/2000/svg" width="${QR_SIZE}" height="${QR_SIZE}" viewBox="0 0 ${QR_SIZE} ${QR_SIZE}">
${DEFS}
<rect width="${QR_SIZE}" height="${QR_SIZE}" fill="#fff"/>
${qrMarkup(0, 0)}
</svg>`;

// ── 2) Tarjeta imprimible ───────────────────────────────────────────────
const CARD_W = 1200;
const CARD_H = 1700;
const PLATE = 800; // lado de la placa blanca
const qrScale = (PLATE - 80) / QR_SIZE;

// Íconos (mismos trazos que components/layout/SocialIcons.tsx)
const ICONS = {
  instagram:
    '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
  tiktok:
    '<path d="M21 7.917v4.034a9.948 9.948 0 0 1-5-1.951v4.5a6.5 6.5 0 1 1-8-6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z"/>',
  linkedin:
    '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v1.5A5.98 5.98 0 0 1 16 8z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2" fill="currentColor" stroke="none"/>',
  whatsapp: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  facebook:
    '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
};

const COPY = {
  es: { scan: "ESCANEA Y SÍGUENOS", slogan: "Llevamos lo mejor del campo para el mundo", tag: "AGROEXPORTADORA PERUANA" },
  en: { scan: "SCAN &amp; FOLLOW US", slogan: "Peruvian legumes for the world", tag: "PERUVIAN AGRO-EXPORTER" },
};

function card(lang) {
  const t = COPY[lang];
  const plateX = (CARD_W - PLATE) / 2;
  const plateY = 560;
  const qrX = plateX + 40;
  const qrY = plateY + 40;

  const icons = Object.values(ICONS)
    .map((p, i, a) => {
      const gap = 150;
      const x = CARD_W / 2 - ((a.length - 1) * gap) / 2 + i * gap - 36;
      return `<g transform="translate(${x},1478)">
        <rect width="72" height="72" rx="10" ry="10" fill="none" stroke="${ACCENT}" stroke-width="3" opacity="0.9"/>
        <g transform="translate(18,18) scale(1.5)" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" color="#fff">${p}</g>
      </g>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_W}" height="${CARD_H}" viewBox="0 0 ${CARD_W} ${CARD_H}">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${DARK}"/><stop offset="0.55" stop-color="${GREEN_DEEP}"/><stop offset="1" stop-color="#489332"/>
  </linearGradient>
  <linearGradient id="eyeGrad" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${GREEN_MID}"/><stop offset="1" stop-color="${DARK}"/>
  </linearGradient>
  <radialGradient id="glow" cx="0.5" cy="0.45" r="0.55">
    <stop offset="0" stop-color="${PRIMARY}" stop-opacity="0.35"/><stop offset="1" stop-color="${PRIMARY}" stop-opacity="0"/>
  </radialGradient>
</defs>
<rect width="${CARD_W}" height="${CARD_H}" fill="url(#bg)"/>
<rect width="${CARD_W}" height="${CARD_H}" fill="url(#glow)"/>
<!-- hojas decorativas -->
<path d="M-60 1750C-60 1350 200 1080 620 1080c0 400-260 670-680 670Z" fill="#fff" opacity="0.05"/>
<path d="M1260 -40C1260 260 1060 470 740 470c0-300 200-510 520-510Z" fill="${ACCENT}" opacity="0.10"/>
<!-- encabezado -->
<image href="data:image/png;base64,${wordmark}" x="${(CARD_W - 560) / 2}" y="110" width="560" height="${Math.round((560 * 1503) / 4988)}"/>
<text x="${CARD_W / 2}" y="372" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="26" letter-spacing="7" fill="#fff" opacity="0.7">${t.tag}</text>
<text x="${CARD_W / 2}" y="480" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="62" letter-spacing="4" fill="${ACCENT}">${t.scan}</text>
<!-- placa blanca con el QR -->
<path d="${leaf(plateX, plateY, PLATE, PLATE, 110, 26)}" fill="#fff"/>
<path d="${leaf(plateX - 14, plateY - 14, PLATE + 28, PLATE + 28, 120, 30)}" fill="none" stroke="${ACCENT}" stroke-width="5"/>
<g transform="translate(${qrX},${qrY}) scale(${qrScale})">${qrMarkup(0, 0)}</g>
<!-- pie -->
<text x="${CARD_W / 2}" y="1452" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="40" fill="#fff">${t.slogan}</text>
${icons}
<text x="${CARD_W / 2}" y="1618" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="30" letter-spacing="2" fill="#fff" opacity="0.8">businessbeans.com.pe/links</text>
</svg>`;
}

// ── Salida ──────────────────────────────────────────────────────────────
await mkdir(OUT, { recursive: true });
const jobs = [
  ["business-beans-qr", plain, 2000],
  ["business-beans-qr-card-es", card("es"), 2000],
  ["business-beans-qr-card-en", card("en"), 2000],
];
for (const [name, svg, width] of jobs) {
  await writeFile(path.join(OUT, `${name}.svg`), svg);
  await sharp(Buffer.from(svg), { density: 144 })
    .resize({ width })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, `${name}.png`));
  console.log("✓", name);
}
console.log(`QR → ${URL_TARGET}  (${N}×${N} módulos, corrección H)`);
