export type NewsCategory = "eventos" | "empresa" | "produccion";

export const NEWS_CATEGORIES: NewsCategory[] = ["eventos", "empresa", "produccion"];

export interface NewsVideo {
  src: string;
  poster: string;
  /** los clips de feria están grabados en vertical (celular) */
  portrait?: boolean;
}

export interface NewsItem {
  id: string;
  category: NewsCategory;
  /** ISO (YYYY-MM-DD). Opcional: se muestra solo si se conoce la fecha real. */
  date?: string;
  /** ISO (YYYY-MM-DD) del último día, para eventos de varios días (con `date` como primer día). */
  dateEnd?: string;
  /** Nombre propio del evento (no se traduce). */
  event?: string;
  /** imagen/poster principal de la tarjeta */
  cover: string;
  images: string[];
  videos?: NewsVideo[];
}

const equipo = (n: number) => `/media/equipo/campo-0${n}.jpg`;
const feria = (n: number) => `/media/ferias/feria-0${n}.jpg`;

/**
 * Noticias publicadas, de la más reciente a la más antigua. Los textos
 * (título y descripción) viven en messages/{es,en}.json bajo
 * `news.items.<id>`.
 */
export const NEWS: NewsItem[] = [
  {
    id: "feria-stand",
    category: "eventos",
    date: "2026-09-23",
    dateEnd: "2026-09-26",
    event: "Feria Expo Alimentaria 2026",
    cover: feria(1),
    images: [feria(1), feria(2)],
    videos: [
      {
        src: "/media/video/feria-stand-1.mp4",
        poster: "/media/video/feria-stand-1-poster.jpg",
        portrait: true,
      },
    ],
  },
  {
    id: "campo-a-granos",
    category: "empresa",
    cover: "/media/video/campo-a-granos-poster.jpg",
    images: [equipo(6), equipo(5)],
    videos: [
      {
        src: "/media/video/campo-a-granos.mp4",
        poster: "/media/video/campo-a-granos-poster.jpg",
      },
    ],
  },
  {
    id: "seleccion-limpieza",
    category: "produccion",
    cover: "/media/video/proceso-seleccion-poster.jpg",
    images: [],
    videos: [
      {
        src: "/media/video/proceso-seleccion.mp4",
        poster: "/media/video/proceso-seleccion-poster.jpg",
      },
    ],
  },
  {
    id: "equipo-en-campo",
    category: "empresa",
    cover: equipo(1),
    images: [equipo(1), equipo(2), equipo(3), equipo(4)],
  },
];

/** Fotos del equipo para las secciones "humanas" (Conócenos / Detrás de cada producto). */
export const TEAM_PHOTOS = {
  hero: equipo(6),
  portrait: equipo(3),
  inspecting: equipo(2),
  group: equipo(5),
  field: equipo(1),
  handshake: equipo(7),
  closeup: equipo(4),
} as const;

export const PROCESS_VIDEO: NewsVideo = {
  src: "/media/video/proceso-seleccion.mp4",
  poster: "/media/video/proceso-seleccion-poster.jpg",
};

export const INSTITUTIONAL_VIDEO: NewsVideo = {
  src: "/media/video/campo-a-granos.mp4",
  poster: "/media/video/campo-a-granos-poster.jpg",
};
