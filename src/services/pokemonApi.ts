import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonListResponse, PokemonPartial } from '../types';

export const BASE_URL = process.env.REACT_APP_BASE_URL?.trim() || 'https://pokeapi.co/api/v2';
// Define an API slice with RTK Query
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, void>({
      query: () => '/pokemon',
    }),
    getPokemonItemById: builder.query<PokemonPartial, string | number>({
      query: (id:string | number) => `/pokemon/${id}`,
    }),
    // Add other endpoints as needed
  }),
});

// Export hooks for using the API endpoints
export const { useGetPokemonListQuery, useGetPokemonItemByIdQuery } = pokemonApi;
