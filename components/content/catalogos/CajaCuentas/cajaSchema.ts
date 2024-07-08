import { CajaCuentas } from "@/interfaces";
import { z } from "zod";

export const cajaSchema = z.object({
  num_cta: z.number().optional(),
  cta_cta: z.string(),
  desc_cta: z.string().optional(),
  cont_cta: z.object({
    id: z.string().min(1, { message: "Obligatorio" }),
  }),
});

export type CajaCuentaInput = z.infer<typeof cajaSchema>;

export function defaultValues(cajaCuenta?: CajaCuentas) {
  let cont_cta = cajaCuenta?.cont_cta ?? null;
  let caja: CajaCuentaInput = {
    cta_cta: cajaCuenta?.cta_cta ?? "",
    cont_cta: {
      id: cajaCuenta?.cont_cta?.id.toString() ?? "",
    },
    desc_cta: cajaCuenta?.desc_cta ?? "",
    num_cta: cajaCuenta?.num_cta ?? 0,
  };

  return caja;
}
