import {
  AppDispatch,
  createAsyncThunk,
  RootState,
  StoreApp,
} from "@reduxjs/toolkit";
import {
  addPoliza,
  addPolizas,
  setLoading,
  setPoliza,
  setPolizas,
} from "./polizas_slice";
import {
  CheckedPolizaAPi,
  CreatePolizaAllAPi,
  CreatePolizaApi,
  GetPolizasApi,
  GetPolizasID,
  PostedByManualPoliza,
  RecoveryPostedByManualPoliza,
  RefreshPolizaApi,
} from "@/helpers/polizas";
import toast from "react-hot-toast";
import moment from "moment";
import { Poliza } from "@/interfaces/Poliza";
import { AppState } from "../app";

export const GetPolizas = () => {
  return async (dispatch: AppDispatch, state: () => StoreApp) => {
    const { FechaFin, FechaInicio, tipoP } = state().polizas;

    dispatch(setLoading(true));
    const polizas = await GetPolizasApi({
      FechaFinal: !!FechaFin ? moment(FechaFin).format() : null,
      FechaInicial: !!FechaInicio ? moment(FechaInicio).format() : null,
      Tipo: tipoP,
    });
    dispatch(setLoading(false));

    dispatch(setPolizas(polizas));
  };
};
export const GetPolizaID = (id: number) => {
  return async (dispatch: AppDispatch, _: () => StoreApp) => {
    dispatch(setLoading(true));
    const polizas = await GetPolizasID(id);
    dispatch(setLoading(false));
    dispatch(setPoliza(polizas));
  };
};

export const CreatePoliza = (data: object) => {
  return async (dispatch: AppDispatch, _: () => StoreApp) => {
    toast.loading("Guardando");
    dispatch(setLoading(true));

    const polizas = await CreatePolizaApi(data);
    if (polizas) {
      dispatch(addPoliza(polizas));
    }
    toast.dismiss();

    dispatch(setLoading(false));

    toast.success("Poliza creada 👍🏻");
  };
};
export const CreatePolizaAll = (data: object) => {
  return async (dispatch: AppDispatch, _: () => StoreApp) => {
    toast.loading("Creando Polizas 🔋");
    dispatch(setLoading(true));

    const polizas = await CreatePolizaAllAPi(data);
    if (polizas.length > 0) {
      dispatch(addPolizas(polizas));
    }

    toast.dismiss();

    toast.success("Polizas creadas 👍🏻");

    dispatch(setLoading(false));
  };
};

export const CheckedPoliza = createAsyncThunk(
  "CheckedPoliza",
  async (poliza: Poliza): Promise<Poliza> => {
    // const response = await CheckedPolizaAPi(poliza);
    return poliza;
  }
);

export const PostedPoliza = createAsyncThunk(
  "PostedPoliza",
  async (_, { getState }): Promise<Poliza[]> => {
    // Obtén el estado completo
    const { polizas } = getState() as StoreApp;

    var list = polizas.polizas.filter((p) => p.estatus === "T");

    const response = await PostedByManualPoliza(list);
    return response;
  }
);

export const RecoveryPostedPoliza = createAsyncThunk(
  "RecoveryPostedPoliza",
  async (_, { getState }): Promise<Poliza[]> => {
    // Obtén el estado completo
    const { polizas } = getState() as StoreApp;

    var list = polizas.polizas.filter(
      (p) => p.estatus === "M" && p.check === 1
    );

    const response = await toast.promise(RecoveryPostedByManualPoliza(list), {
      error: "Error al recuperar Folio",
      loading: "Buscando folio contable",
      success: "Busqueda Completada",
    });
    return response;
  }
);

export const RefreshPoliza = createAsyncThunk(
  "RefreshPoliza",
  async (poliza: Poliza): Promise<Poliza> => {
    const response = await toast.promise(RefreshPolizaApi(poliza), {
      error: "Error al recuperar Folio",
      loading: "Buscando folio contable",
      success: "Busqueda Completada",
    });

    return response;
  }
);
