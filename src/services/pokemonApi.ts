import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonListResponse, PokemonPartial } from '../types/types';

const BASE_URL = 'https://pokeapi.co/api/v2';


// Define an API slice with RTK Query
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, void>({
      query: () => '/pokemon',
    }),
    getPokemonItemById: builder.query<Partial<PokemonPartial>, string | number>({
      query: (id:string | number) => `/pokemon/${id}`,
    }),
    // Add other endpoints as needed
  }),
});

// Export hooks for using the API endpoints
export const { useGetPokemonListQuery, useGetPokemonItemByIdQuery } = pokemonApi;
