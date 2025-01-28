import { Poliza } from "@/interfaces/Poliza";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import {
  AjustarPoliza,
  CheckedPoliza,
  PostedPoliza,
  RecoveryPostedPoliza,
  RefreshPoliza,
} from "./thunks";

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
    setTipoPoliza: (state, action: PayloadAction<string | undefined>) => {
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
    checkedAll: (state) => {
      state.polizas = [
        ...state.polizas.map((p) => {
          if ((p.estatus === "M" || p.estatus === "G") && p.check === 1)
            return p;

          return {
            ...p,
            check: p.check === 1 ? 0 : 1,
            estatus: p.estatus === "T" ? "P" : "T",
          };
        }),
      ];
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
      .addCase(RefreshPoliza.fulfilled, (state, action) => {
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
        state.polizas = state.polizas.map((polizaExistente) => {
          // Intentamos encontrar la nueva póliza que coincida con el ID de la póliza existente
          const nuevaPoliza = action.payload.find(
            (p) => p.id === polizaExistente.id
          );

          // Si encontramos una coincidencia, la reemplazamos; si no, mantenemos la póliza existente
          return nuevaPoliza ? nuevaPoliza : polizaExistente;
        });
      })
      .addCase(PostedPoliza.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(AjustarPoliza.fulfilled, (state, action) => {
        const nuevasPolizas = action.payload;

        state.polizas = state.polizas
          .filter(
            (existingPoliza) =>
              !nuevasPolizas.some(
                (nuevaPoliza) => nuevaPoliza.id === existingPoliza.id
              )
          )
          .concat(nuevasPolizas)
          .sort(
            (a, b) =>
              new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
          );
      })
      .addCase(AjustarPoliza.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(RecoveryPostedPoliza.fulfilled, (state, action) => {
        state.polizas = state.polizas.map((polizaExistente) => {
          // Intentamos encontrar la nueva póliza que coincida con el ID de la póliza existente
          const nuevaPoliza = action.payload.find(
            (p) => p.id === polizaExistente.id
          );

          // Si encontramos una coincidencia, la reemplazamos; si no, mantenemos la póliza existente
          return nuevaPoliza ? nuevaPoliza : polizaExistente;
        });
      })
      .addCase(RecoveryPostedPoliza.rejected, (state, action) => {
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
  checkedAll,
} = PolizasSlice.actions;
