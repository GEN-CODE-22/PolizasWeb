import { configureStore } from "@reduxjs/toolkit";
import { CatalogosSlice, CatalogosState } from "./slices/catalogos";
import { AppSlice, AppState } from "./slices/app";

export interface StoreApp {
  catalogos: CatalogosState;
  app: AppState;
}

export const store = configureStore({
  reducer: {
    catalogos: CatalogosSlice.reducer,
    app: AppSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
