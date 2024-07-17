import { z } from "zod";

export const polizaSchema = z.object({
  tipo: z.string().optional(),
  fecha: z.string(),
  estatus: z.string({ message: "Requerido" }).optional(),
});

export type PolizaInput = z.infer<typeof polizaSchema>;
