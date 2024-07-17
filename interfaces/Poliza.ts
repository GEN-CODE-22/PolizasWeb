import { CuentasContable, UnidadOp } from "./Catalogos";

export interface Poliza {
  id: number;
  tipo: string;
  estatus: string;
  createBy: string;
  createAt: Date;
  detalles: Detalle[];
}

export interface Detalle {
  id: number;
  poliza: null;
  origen: string;
  cuenta: CuentasContable;
  unidad: UnidadOp;
  journal_id: string;
  departamento: string;
  referencia: string;
  descripcion: string;
  importe: number;
  createBy: string;
  createAt: Date;
}
