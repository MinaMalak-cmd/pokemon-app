import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Pokemon {
  id: number;
  name: string;
}

interface PokemonState {
  list: Pokemon[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  list: [],
  loading: false,
  error: null,
};

// export const fetchPokemonList = createAsyncThunk('pokemon/fetchList', async () => {
//   const response = await fetchPokemonListAPI(); // Fetch Pokemon list from API
//   return response.data;
// });

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
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

export default pokemonSlice.reducer;
