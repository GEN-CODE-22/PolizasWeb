import { CuentasContable } from "@/interfaces";
import { z } from "zod";

export const cuentasCSchema = z.object({
  id: z.number().nullable(),
  cuenta: z.string({ message: "Obligatorio" }).length(6, "6 Digitos"),
  tipo: z.string({ message: "Obligatorio" }),
  descripcion: z.string({ message: "Obligatorio" }),
});

export type CuentaCInput = z.infer<typeof cuentasCSchema>;

export function defaultValues(cuentaC?: CuentasContable) {
  let cuenta: CuentaCInput = {
    id: cuentaC?.id ?? null,
    cuenta: cuentaC?.cuenta ?? "",
    tipo: cuentaC?.tipo ?? "",
    descripcion: cuentaC?.descripcion ?? "",
  };

  return cuenta;
}
