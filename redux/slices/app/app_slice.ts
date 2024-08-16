import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  server?: string;
  user?: string;
  serverAuth: string[];
}

const initialState: AppState = {
  serverAuth: [],
};

export const AppSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setServer: (state, action: PayloadAction<string>) => {
      state.server = action.payload;
    },
    setUser: (
      state,
      action: PayloadAction<{ user: string; serverAuth?: string[] }>
    ) => {
      state.user = action.payload.user;
      state.serverAuth = action.payload.serverAuth ?? state.serverAuth;
    },
  },
});

export const { setServer, setUser } = AppSlice.actions;
