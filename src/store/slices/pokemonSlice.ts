import { createSlice, isAllOf, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PokemonPartial, PokemonResult } from "../../types/types";
import { pokemonApi } from "../../services/pokemonApi";


interface PokemonState {
  list: PokemonResult[];
  loading: boolean;
  error: string | null;
  selectedPokemon: PokemonPartial | undefined;
}

const initialState: PokemonState = {
  list: [],
  loading: false,
  error: null,
  selectedPokemon: undefined,
};

// export const fetchPokemonList = createAsyncThunk('pokemon/fetchList', async () => {
//   const response = await fetchPokemonListAPI(); // Fetch Pokemon list from API
//   return response.data;
// });

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
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAllOf(pokemonApi.endpoints.getPokemonList.matchFulfilled),
        (state, action) => {
          console.log("🚀 ~ state:", state, action)
          state.list = action.payload.results;
          // state.error = action.error.message ?? "Failed to fetch Pokemon list";
        }
      )
      .addMatcher(
        isAllOf(pokemonApi.endpoints.getPokemonItemById.matchFulfilled),
        (state, action) => {
          console.log("🚀 ~ state:", state, action)
          // state.selectedPokemon = action?.payload;
          // state.error = action.error.message ?? "Failed to fetch Pokemon list";
        }
      );
  },
});
export const { setSelectedPokemon } = pokemonSlice.actions;
export const selectPokemonList = (state: RootState) => state.pokemonSlice.list;
export const selectedPokemon = (state: RootState) =>
  state.pokemonSlice.selectedPokemon;

export default pokemonSlice.reducer;
