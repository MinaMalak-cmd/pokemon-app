import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://pokeapi.co/api/v2';

type PokemonResult = {
  name: string;
  url: string;
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResult[];
}


// Define an API slice with RTK Query
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, void>({
      query: () => '/pokemon',
    }),
    getPokemonItemById: builder.query<any, string | number>({
      query: (id:string | number) => `/pokemon/${id}`,
    }),
    // Add other endpoints as needed
  }),
});

// Export hooks for using the API endpoints
export const { useGetPokemonListQuery, useGetPokemonItemByIdQuery } = pokemonApi;
