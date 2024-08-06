import {
  SaveAndUpdateCajaCuentas,
  SaveAndUpdateCuentaC,
  getCajaCuentas,
  getCuentasContable,
  getServidores,
  getUnidadesOperativa,
} from "@/helpers/catalogos";
import { AppDispatch, StoreApp, createAsyncThunk } from "@reduxjs/toolkit";
import { CajaCuentas, CuentasContable } from "../../../interfaces/Catalogos";
import {
  addCaja,
  addCuentasC,
  setLoading,
  setServidores,
  setUpdateCaja,
  setUpdateCuentasContable,
} from "./catalogos_slice";
import toast from "react-hot-toast";

export const GetCuentas = createAsyncThunk("GetCuentas", async () => {
  const cuentasContable = await getCuentasContable();
  return cuentasContable;
});

export const GetUnidades = createAsyncThunk("GetGetUnidadesOp", async () => {
  const unidadesO = await getUnidadesOperativa();
  return unidadesO;
});
export const GetCaja = createAsyncThunk("GetCajaCuentas", async () => {
  const caja = await getCajaCuentas();
  return caja;
});

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
