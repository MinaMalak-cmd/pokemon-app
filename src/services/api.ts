import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://pokeapi.co/api/v2';

// Define an API slice with RTK Query
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchPokemonList: builder.query<any, void>({
      query: () => '/pokemon',
    }),
    // Add other endpoints as needed
  }),
});

// Export hooks for using the API endpoints
export const { useFetchPokemonListQuery } = pokemonApi;
