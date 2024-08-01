import {
  SaveAndUpdateCajaCuentas,
  SaveAndUpdateCuentaC,
  getCajaCuentas,
  getCuentasContable,
  getServidores,
  getUnidadesOperativa,
} from "@/helpers/catalogos";
import { AppDispatch, StoreApp } from "@reduxjs/toolkit";
import { CajaCuentas, CuentasContable } from "../../../interfaces/Catalogos";
import {
  addCaja,
  addCuentasC,
  setCajaCuentas,
  setCuentasContable,
  setLoading,
  setServidores,
  setUnidadesOp,
  setUpdateCaja,
  setUpdateCuentasContable,
} from "./catalogos_slice";
import toast from "react-hot-toast";

export const GetCuentasContable = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setCuentasContable([]));

    dispatch(setLoading(true));
    const cuentasContable = await getCuentasContable();
    dispatch(setLoading(false));

    dispatch(setCuentasContable(cuentasContable));
  };
};
export const GetUnidadesOp = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(setUnidadesOp([]));

    const unidadesO = await getUnidadesOperativa();

    dispatch(setUnidadesOp(unidadesO));
    dispatch(setLoading(false));
  };
};
export const GetCajaCuentas = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(setCajaCuentas([]));

    const caja = await getCajaCuentas();

    dispatch(setCajaCuentas(caja));
    dispatch(setLoading(false));
  };
};

export const GetServidores = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));

    const svrs = await getServidores();

    dispatch(setServidores(svrs));
    dispatch(setLoading(false));
  };
};

export const UpdateCajaCuentas = (caja: CajaCuentas) => {
  return async (dispatch: AppDispatch, app: () => StoreApp) => {
    const { cuentasContable } = app().catalogos;

    const cajaNew = await SaveAndUpdateCajaCuentas(caja);

    if (!!caja?.num_cta && !!cajaNew) {
      dispatch(
        setUpdateCaja({
          ...cajaNew,
          cont_cta: cuentasContable.find((e) => e.id === cajaNew.cont_cta?.id),
        })
      );

      toast.success(
        <span className="font-bold text-lg"> Cambios Guardados ✅ </span>
      );
    } else if (!!cajaNew) {
      dispatch(
        addCaja({
          ...cajaNew,
          cont_cta: cuentasContable.find((e) => e.id === cajaNew.cont_cta?.id),
        })
      );

      toast.success(
        <span className="font-bold text-lg"> Cambios Guardados ✅ </span>
      );
    }
  };
};

export const UpdateCuentaC = (cuentaC: CuentasContable) => {
  return async (dispatch: AppDispatch, _: () => StoreApp) => {
    toast.loading("Guardando Cambios 💾");
    const cuentaCN = await SaveAndUpdateCuentaC(cuentaC);
    toast.dismiss();

    if (!!cuentaC?.id && !!cuentaCN) {
      dispatch(setUpdateCuentasContable(cuentaCN));

      toast.success(
        <span className="font-bold text-lg"> Cambios Guardados ✅ </span>
      );
    } else if (!!cuentaCN) {
      dispatch(addCuentasC(cuentaCN));

      toast.success(
        <span className="font-bold text-lg"> Cambios Guardados ✅ </span>
      );
    }
  };
};
