import { z } from "zod";

export const PARTICIPANT_OPTIONS = [
  "importer",
  "distributor",
  "institution",
  "other",
] as const;

export const PRODUCT_OPTIONS = [
  "frejol-adzuki",
  "frejol-bayo",
  "frejol-caballero",
  "frejol-calima",
  "frijol-canario",
  "frijol-castilla",
  "frejol-palo-seco",
  "habas-secas",
  "frejol-loctao",
  "frejol-negro",
  "frejol-panamito",
  "pallar-baby",
  "pallar-grande",
  "frejol-rojo-claro",
  "frejol-rojo-oscuro",
  "garbanzo",
  "frejol-zarandaja",
  "canihua",
  "chocho-tarwi",
  "kiwicha",
  "maca-harina",
  "maiz-gigante-cusco",
  "quinua-blanca",
  "quinua-roja",
  "quinua-negra",
  "ajonjoli",
  "other",
] as const;

export const contactSchema = z.object({
  participante: z.enum(PARTICIPANT_OPTIONS),
  nombre: z.string().min(2, "Mínimo 2 caracteres").max(100),
  empresa: z.string().min(2, "Mínimo 2 caracteres").max(150),
  pais: z.string().min(2, "Mínimo 2 caracteres").max(100),
  email: z.string().email("Email inválido"),
  telefono: z.string().optional(),
  productos: z.array(z.enum(PRODUCT_OPTIONS)).optional(),
  mensaje: z.string().min(20, "Mínimo 20 caracteres").max(2000),
});

export type ContactSchema = z.infer<typeof contactSchema>;
