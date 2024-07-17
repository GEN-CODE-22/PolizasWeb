import { UnidadOp } from "@/interfaces";
import { z } from "zod";

export const unidadOSchema = z.object({
  id: z.number().nullable(),
  descripcion: z.string({ message: "Obligatorio" }),
  cve_unidad: z.string({ message: "Obligatorio" }),
  principal: z.boolean({ message: "Obligatorio" }),
});

export type UnidadOInput = z.infer<typeof unidadOSchema>;

export function defaultValues(unidad?: UnidadOp) {
  let unidOp: UnidadOInput = {
    id: unidad?.id ?? null,
    descripcion: unidad?.descripcion ?? "",
    cve_unidad: unidad?.cve_unidad ?? "",
    principal: unidad?.principal === 0 ? false : true ?? 0,
  };

  return unidOp;
}
