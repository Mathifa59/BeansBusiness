import { z } from "zod";

const datosConsumidorSchema = z
  .object({
    nombreCompleto: z.string().min(3, "Mínimo 3 caracteres").max(150),
    tipoDocumento: z.enum(["DNI", "CE", "PASAPORTE"]),
    numeroDocumento: z.string().min(6, "Número inválido").max(20),
    telefono: z.string().min(6, "Teléfono inválido").max(20),
    email: z.string().email("Email inválido"),
    direccion: z.string().min(5, "Mínimo 5 caracteres").max(300),
    esMenorDeEdad: z.boolean(),
    nombreApoderado: z.string().optional(),
    dniApoderado: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.esMenorDeEdad) {
      if (!data.nombreApoderado || data.nombreApoderado.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["nombreApoderado"],
          message: "Requerido para menores de edad",
        });
      }
      if (!data.dniApoderado || data.dniApoderado.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["dniApoderado"],
          message: "Requerido para menores de edad",
        });
      }
    }
  });

const datosBienServicioSchema = z.object({
  tipo: z.enum(["PRODUCTO", "SERVICIO"]),
  descripcion: z.string().min(5, "Mínimo 5 caracteres").max(500),
  montoReclamado: z.number().positive().optional(),
});

const detalleReclamacionSchema = z.object({
  tipo: z.enum(["RECLAMO", "QUEJA"]),
  descripcion: z.string().min(10, "Mínimo 10 caracteres").max(2000),
  pedido: z.string().min(10, "Mínimo 10 caracteres").max(1000),
  declaracionVeracidad: z.literal(true, {
    error: () => ({ message: "Debes aceptar la declaración de veracidad" }),
  }),
});

export const reclamacionSchema = z.object({
  consumidor: datosConsumidorSchema,
  bienServicio: datosBienServicioSchema,
  detalle: detalleReclamacionSchema,
});

export type ReclamacionSchema = z.infer<typeof reclamacionSchema>;
