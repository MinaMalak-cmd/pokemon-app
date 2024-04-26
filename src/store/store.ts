import { configureStore } from '@reduxjs/toolkit'
import pokemonSlice from "./slices/pokemonSlice";
import { pokemonApi } from "../services/pokemonApi";

export const createStore = () => configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    pokemonSlice
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export const store = createStore();
export type RootState = ReturnType<typeof store.getState>
