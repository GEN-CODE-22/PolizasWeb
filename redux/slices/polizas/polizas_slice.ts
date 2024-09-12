import { Poliza } from "@/interfaces/Poliza";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { CheckedPoliza, PostedPoliza } from "./thunks";

export interface PolizasState {
  polizas: Poliza[];
  currentPoliza?: Poliza;
  loading: boolean;
  FechaInicio?: Date;
  FechaFin?: Date;
  tipoP?: string;
  error?: string;
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
  extraReducers(builder) {
    builder
      .addCase(CheckedPoliza.fulfilled, (state, action) => {
        state.polizas = [
          ...state.polizas.map((item) =>
            item.id === action.payload.id
              ? { ...item, ...action.payload }
              : item
          ),
        ];
      })
      .addCase(CheckedPoliza.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(PostedPoliza.fulfilled, (state, action) => {
        ///Si se completo la tarea con exito poner en estatus "M" de proceso en PS
        if (action.payload) {
          state.polizas = [
            ...state.polizas.map((item) =>
              item.estatus === "T" && item?.check === 1
                ? { ...item, estatus: "M" }
                : item
            ),
          ];
        }
      })
      .addCase(PostedPoliza.rejected, (state, action) => {
        state.error = action.error.message;
      });
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
