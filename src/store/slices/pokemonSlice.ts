import { createSlice, isAllOf, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PokemonPartial, PokemonState } from "../../types/types";
import { pokemonApi } from "../../services/pokemonApi";

const initialState: PokemonState = {
  list: [],
  loading: false,
  error: null,
  selectedPokemon: undefined,
  pokemonId: undefined
  
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setSelectedPokemon(
      state,
      action: PayloadAction<PokemonPartial | undefined>
    ) {
      state.selectedPokemon = action.payload;
    },
    setPokemonId(
      state,
      action: PayloadAction<string | number | undefined>
    ) {
      state.pokemonId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAllOf(pokemonApi.endpoints.getPokemonList.matchFulfilled),
        (state, action) => {
          state.list = action.payload.results;
          // state.error = action.error.message ?? "Failed to fetch Pokemon list";
        }
      )
      .addMatcher(
        isAllOf(pokemonApi.endpoints.getPokemonItemById.matchFulfilled),
        (state, action) => {
          console.log("🚀 ~ state:", state, action)
          state.selectedPokemon = action?.payload;
          // state.error = action.error.message ?? "Failed to fetch Pokemon list";
        }
      );
  },
});
export const { setSelectedPokemon, setPokemonId } = pokemonSlice.actions;
export const selectPokemonList = (state: RootState) => state.pokemonSlice.list;
export const selectedPokemon = (state: RootState) =>
  state.pokemonSlice.selectedPokemon;
export const selectPokemonId = (state: RootState) =>
  state.pokemonSlice.pokemonId;
// export const useSelectState = (key: keyof PokemonState) => (state: RootState) => state.pokemonSlice[key];
export const useSelectState = <T extends keyof PokemonState>(key: T) => (state: RootState): PokemonState[T] => state.pokemonSlice[key];
export default pokemonSlice.reducer;
