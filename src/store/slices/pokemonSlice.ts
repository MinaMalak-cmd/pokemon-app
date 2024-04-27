import { createSlice, isAllOf, PayloadAction, isAnyOf } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PokemonPartial, PokemonState } from "../../types";
import { pokemonApi } from "../../services/pokemonApi";

export const initialPokemonState: PokemonState = {
  list: [],
  loading: false,
  error: false,
  selectedPokemon: undefined,
  pokemonId: undefined
  
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: initialPokemonState,
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
          state.error = false;
          state.loading = false;
        }
      )
      .addMatcher(
        isAllOf(pokemonApi.endpoints.getPokemonItemById.matchFulfilled),
        (state, action) => {
          state.selectedPokemon = action?.payload;
          state.error = false;
          state.loading = false;
        }
      )
      .addMatcher(
        isAnyOf(pokemonApi.endpoints.getPokemonItemById.matchPending, pokemonApi.endpoints.getPokemonList.matchPending),
        (state, action) => {
          state.error = false;
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(pokemonApi.endpoints.getPokemonItemById.matchRejected, pokemonApi.endpoints.getPokemonList.matchRejected),
        (state, action) => {
          state.loading = false;
          state.error = true;
        }
      )
  },
});
export const { setSelectedPokemon, setPokemonId } = pokemonSlice.actions;
export const selectPokemonId = (state: RootState) =>
  state.pokemonSlice.pokemonId;
export const useSelectState = <T extends keyof PokemonState>(key: T) => (state: RootState): PokemonState[T] => state.pokemonSlice[key];
export default pokemonSlice.reducer;
