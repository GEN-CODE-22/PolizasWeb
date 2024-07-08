import { CajaCuentas, CuentasContable, UnidadOp } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CatalogosState {
  cuentasContable: CuentasContable[];
  unidadesOp: UnidadOp[];
  cajaCuentas: CajaCuentas[];
  servidores: string[];
  loading: boolean;
}

const initialState: CatalogosState = {
  cuentasContable: [],
  unidadesOp: [],
  cajaCuentas: [],
  loading: false,
  servidores: [],
};

export const CatalogosSlice = createSlice({
  name: "Catalogos",
  initialState,
  reducers: {
    setCajaCuentas: (state, action: PayloadAction<CajaCuentas[]>) => {
      state.cajaCuentas = action.payload;
    },
    setUnidadesOp: (state, action: PayloadAction<UnidadOp[]>) => {
      state.unidadesOp = action.payload;
    },
    setCuentasContable: (state, action: PayloadAction<CuentasContable[]>) => {
      state.cuentasContable = action.payload;
    },
    setServidores: (state, action: PayloadAction<string[]>) => {
      state.servidores = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUpdateCaja: (state, action: PayloadAction<CajaCuentas>) => {
      let ctac: CajaCuentas[] = [];
      for (let i = 0; i < state.cajaCuentas.length; i++) {
        const c = state.cajaCuentas[i];
        if (c.num_cta === action.payload.num_cta) ctac.push(action.payload);
        else ctac.push(c);
      }
      state.cajaCuentas = ctac;
    },
    setUpdateUnidadesOp: (state, action: PayloadAction<UnidadOp>) => {
      let unip: UnidadOp[] = [];
      for (let i = 0; i < state.unidadesOp.length; i++) {
        const c = state.unidadesOp[i];
        if (c.id === action.payload.id) unip.push(action.payload);
        else unip.push(c);
      }

      state.unidadesOp = unip;
    },
    setUpdateCuentasContable: (
      state,
      action: PayloadAction<CuentasContable>
    ) => {
      let ctac: CuentasContable[] = [];
      for (let i = 0; i < state.cuentasContable.length; i++) {
        const c = state.cuentasContable[i];
        if (c.id === action.payload.id) ctac.push(action.payload);
        else ctac.push(c);
      }

      state.cuentasContable = ctac;
    },
    addCaja: (state, action: PayloadAction<CajaCuentas>) => {
      state.cajaCuentas = [...state.cajaCuentas, action.payload];
    },
    addCuentasC: (state, action: PayloadAction<CuentasContable>) => {
      state.cuentasContable = [...state.cuentasContable, action.payload];
    },
    addUnidadOp: (state, action: PayloadAction<UnidadOp>) => {
      state.unidadesOp = [...state.unidadesOp, action.payload];
    },
  },
});

export const {
  setCajaCuentas,
  setCuentasContable,
  setUnidadesOp,
  setLoading,
  setUpdateCaja,
  setUpdateUnidadesOp,
  setUpdateCuentasContable,
  addCaja,
  addCuentasC,
  addUnidadOp,
  setServidores,
} = CatalogosSlice.actions;
