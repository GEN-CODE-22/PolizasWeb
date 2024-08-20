import { Breadcrumb } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  server?: string;
  user?: string;
  serverAuth: string[];
  breadcrumb: Breadcrumb[];
}

const initialState: AppState = {
  serverAuth: [],
  breadcrumb: [],
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
    pushBreadcrumb: (state, action: PayloadAction<Breadcrumb>) => {
      state.breadcrumb.push(action.payload);
    },
    popBreadcrumb: (state) => {
      state.breadcrumb.pop();
    },
  },
});

export const { setServer, setUser, pushBreadcrumb, popBreadcrumb } =
  AppSlice.actions;
