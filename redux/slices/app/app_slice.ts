import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  server?: string;
  user?: string;
}

const initialState: AppState = {};

export const AppSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setServer: (state, action: PayloadAction<string>) => {
      state.server = action.payload;
    },
    setUser: (state, action: PayloadAction<{ user: string }>) => {
      state.user = action.payload.user;
    },
  },
});

export const { setServer, setUser } = AppSlice.actions;
