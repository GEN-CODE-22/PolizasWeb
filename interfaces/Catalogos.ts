export interface CuentasContable {
  id: number;
  cuenta: string;
  tipo: string;
  descripcion: string;
}

export interface CajaCuentas {
  num_cta: number;
  cta_cta: string;
  desc_cta: string;
  cont_cta?: CuentasContable;
}

export interface UnidadOp {
  id?: number;
  descripcion: string;
  cve_unidad: string;
  principal: number;
  createAt?: Date;
}

export interface Account {
  cia_ucve: string;
  pla_ucve: string;
  usr_ucve: string;
  lada_ucve: string;
  tip_ucve: string;
  tpu_ucve: string;
  nom_ucve: string;
  pas_ucve: string;
  roles: string[];
  esContador: boolean;
  esSuperUser: boolean;
  esGerenteAdministrativo: boolean;
  esFacturista: boolean;
  esAdministrativo: boolean;
  esCuentasxCobrar: boolean;
  esGerenteGeneral: boolean;
  esAuditorG: boolean;
  esResponsableCambios: boolean;
  esSupervisorRecepcion: boolean;
}

export interface AuthSesion {
  user: Account;
  serversAuth: string[];
}

export interface Breadcrumb {
  href: string;
  name: string;
}

export interface TDocXLS {
  nameSheet: string;
  dataSheet: object[];
  nameFile: string;
}
