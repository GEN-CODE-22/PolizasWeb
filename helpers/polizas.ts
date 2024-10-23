import api from "@/api/axios";
import { Poliza } from "@/interfaces/Poliza";

export const GetPolizasApi = async (filter: object): Promise<Poliza[]> => {
  try {
    const response = await api.post<Poliza[]>("/api/Poliza/GetAll", {
      ...filter,
    });

    return response.data;
  } catch (error) {
    return [];
  }
};

export const GetPolizasID = async (id: number): Promise<Poliza | undefined> => {
  try {
    const response = await api.get<Poliza>(`/api/Poliza/PolizaID?id=${id}`);

    return response.data;
  } catch (error) {
    return undefined;
  }
};

export const CreatePolizaApi = async (
  data: object
): Promise<Poliza | undefined> => {
  try {
    const response = await api.post<Poliza>(`/api/Poliza/Create`, { ...data });
    return response.data;
  } catch (error) {
    return undefined;
  }
};

export const CreatePolizaAllAPi = async (data: object): Promise<Poliza[]> => {
  try {
    const response = await api.post<Poliza[]>(
      `/api/Poliza/CreateAll`,
      {
        ...data,
      },
      {
        timeout: 2000000,
      }
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

export const CheckedPolizaAPi = async (data: Poliza) => {
  try {
    const response = await api.post<boolean>(`/api/Poliza/Checked`, {
      PolizaId: data.id,
      check: data.check,
    });

    if (response.data) return data;

    return data;
  } catch (error) {
    return data;
  }
};

export const PostedByManualPoliza = async (
  polizas: Poliza[]
): Promise<Poliza[]> => {
  try {
    const { status, data } = await api.post<Poliza[]>(
      `/api/Poliza/PostedByManual`,
      polizas
    );
    if (status === 200) return data;
    throw new Error("Error al Mandar las polizas.");
  } catch (error) {
    throw new Error("Error al Mandar las polizas.");
  }
};
