import api from "@/api/axios";
import { CajaCuentas, CuentasContable, UnidadOp } from "@/interfaces";

export const getCuentasContable = async (): Promise<CuentasContable[]> => {
  try {
    const response = await api.get<CuentasContable[]>(
      "/api/Catalogos/CuentasContable"
    );

    return response.data;
  } catch (error) {
    return [];
  }
};

export const getUnidadesOperativa = async (): Promise<UnidadOp[]> => {
  try {
    const response = await api.get<UnidadOp[]>(
      "/api/Catalogos/UnidadesOperativas"
    );

    return response.data;
  } catch (error) {
    return [];
  }
};

export const getCajaCuentas = async (): Promise<CajaCuentas[]> => {
  try {
    const response = await api.get<CajaCuentas[]>("/api/Catalogos/CajaCuentas");

    return response.data;
  } catch (error) {
    return [];
  }
};
export const getServidores = async (): Promise<string[]> => {
  try {
    const response = await api.get<string[]>("/api/Catalogos/Servidores");

    return response.data;
  } catch (error) {
    return [];
  }
};

export const SaveAndUpdateCajaCuentas = async (
  cajaCuentas: CajaCuentas
): Promise<CajaCuentas | null> => {
  try {
    const { status, data } = await api.post<CajaCuentas>(
      "/api/CajaCuentas/SaveAndUpdate",
      cajaCuentas
    );

    if (status === 200) {
      return {
        ...data,
      };
    }
    return null;
  } catch (error) {
    return null;
  }
};
export const SaveAndUpdateCuentaC = async (
  cuentac: CuentasContable
): Promise<CuentasContable | null> => {
  try {
    const { status, data } = await api.post<CuentasContable>(
      "/api/Cuentas/SaveAndUpdate",
      cuentac
    );

    if (status === 200) {
      return {
        ...data,
      };
    }
    return null;
  } catch (error) {
    return null;
  }
};
