import { AppDispatch, StoreApp } from "@reduxjs/toolkit";
import {
  addPoliza,
  addPolizas,
  setLoading,
  setPoliza,
  setPolizas,
} from "./polizas_slice";
import {
  CreatePolizaAllAPi,
  CreatePolizaApi,
  GetPolizasApi,
  GetPolizasID,
} from "@/helpers/polizas";
import toast from "react-hot-toast";
import moment from "moment";

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
