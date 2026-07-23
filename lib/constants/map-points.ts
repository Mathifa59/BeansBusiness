/** Generado por scripts/generate-world-map.mjs — no editar a mano */

export const MAP_VIEWBOX = { width: 1010, height: 666 } as const;

/** Posición porcentual (sobre el viewBox del mapa) de cada país */
export const MAP_POINTS = {
  "us": {
    "x": 20.4,
    "y": 51.3
  },
  "co": {
    "x": 27.53,
    "y": 67
  },
  "es": {
    "x": 46.2,
    "y": 51.29
  },
  "it": {
    "x": 50.51,
    "y": 49.69
  },
  "nl": {
    "x": 48.5,
    "y": 43.81
  },
  "kr": {
    "x": 82.55,
    "y": 53.06
  },
  "jp": {
    "x": 86.71,
    "y": 49.22
  },
  "pe": {
    "x": 26.62,
    "y": 73.36
  }
} as const;

export type MapCountryId = Exclude<keyof typeof MAP_POINTS, "pe">;

export const MAP_DESTINATIONS = ["us","co","es","it","nl","kr","jp"] as const;
