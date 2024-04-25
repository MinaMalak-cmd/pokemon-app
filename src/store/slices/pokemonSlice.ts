import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { PokemonPartial } from '../../types/types';

interface Pokemon {
  id: number;
  name: string;
}

interface PokemonState {
  list: Pokemon[];
  loading: boolean;
  error: string | null;
  selectedPokemon: PokemonPartial | undefined;
}

const initialState: PokemonState = {
  list: [],
  loading: false,
  error: null,
  selectedPokemon: undefined
};

// export const fetchPokemonList = createAsyncThunk('pokemon/fetchList', async () => {
//   const response = await fetchPokemonListAPI(); // Fetch Pokemon list from API
//   return response.data;
// });

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSelectedPokemon(state, action: PayloadAction<PokemonPartial | undefined>) {
      state.selectedPokemon = action.payload;
    }
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(fetchPokemonList.pending, state => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchPokemonList.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.list = action.payload;
  //     })
  //     .addCase(fetchPokemonList.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.error.message ?? 'Failed to fetch Pokemon list';
  //     });
  // },
});

export const selectPokemonList = (state: RootState) => state.pokemonSlice.list;
export const selectedPokemon = (state: RootState) => state.pokemonSlice.selectedPokemon;

export default pokemonSlice.reducer;
