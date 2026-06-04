import { z } from "zod";

export const contactSchema = z.object({
  nombre: z.string().min(2, "Mínimo 2 caracteres").max(100),
  empresa: z.string().min(2, "Mínimo 2 caracteres").max(150),
  email: z.string().email("Email inválido"),
  telefono: z.string().optional(),
  mensaje: z.string().min(10, "Mínimo 10 caracteres").max(2000),
});

export type ContactSchema = z.infer<typeof contactSchema>;
