import { Poliza } from "@/interfaces/Poliza";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

export interface PolizasState {
  polizas: Poliza[];
  currentPoliza?: Poliza;
  loading: boolean;
  FechaInicio?: Date;
  FechaFin?: Date;
  tipoP?: string;
}

const initialState: PolizasState = {
  polizas: [],
  loading: false,
};

export const PolizasSlice = createSlice({
  name: "Polizas",
  initialState,
  reducers: {
    setPolizas: (state, action: PayloadAction<Poliza[]>) => {
      state.polizas = action.payload.sort((a, b) =>
        moment(a.createAt).diff(moment(b.createAt))
      );
    },
    setPoliza: (state, action: PayloadAction<Poliza | undefined>) => {
      state.currentPoliza = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTipoPoliza: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.polizas = [];
      state.tipoP = action.payload;
    },
    addPoliza: (state, action: PayloadAction<Poliza>) => {
      state.currentPoliza = action.payload;
      state.polizas = [
        ...state.polizas.filter((p) => p.id !== action.payload.id),
        action.payload,
      ];
    },
    setFiltros: (
      state,
      action: PayloadAction<{
        FechaInicio?: Date;
        FechaFin?: Date;
        tipoP?: string;
      }>
    ) => {
      state.FechaFin = action.payload?.FechaFin ?? state.FechaFin;
      state.FechaInicio = action.payload?.FechaInicio ?? state.FechaInicio;
      state.tipoP = action.payload?.tipoP ?? state.tipoP;
    },
    addPolizas: (state, action: PayloadAction<Poliza[]>) => {
      state.polizas = [...state.polizas, ...action.payload].sort((a, b) =>
        moment(a.createAt).diff(moment(b.createAt))
      );
    },
  },
});

export const {
  setFiltros,
  setPolizas,
  setPoliza,
  setLoading,
  setTipoPoliza,
  addPoliza,
  addPolizas,
} = PolizasSlice.actions;
