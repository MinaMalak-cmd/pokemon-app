import type { ReactNode } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import fetchMock from 'jest-fetch-mock';

import { store } from '../store/store';
import { useGetPokemonItemByIdQuery, useGetPokemonListQuery } from './pokemonApi';

function wrapper({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('retrieve pokemon by id', () => {
  const endpointName = 'getPokemonItemById';
  const pokemonId = '1';
  const data = {};

  beforeEach(() => {
    fetchMock.mockOnceIf(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({ data }),
      })
    );
  });

  it('renders hook', async () => {
    const { result } = renderHook(() => useGetPokemonItemByIdQuery(pokemonId), {
      wrapper,
    });

    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName,
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchMock).toBeCalledTimes(1);

    expect(result.current).toMatchObject({
      status: 'fulfilled',
      endpointName,
      data,
      isLoading: false,
      isSuccess: true,
      isError: false,
      currentData: data,
      isFetching: false,
    });
  });
});

describe('retrieve all pokemon data', () => {
    const endpointName = 'getPokemonList';
    const data = {};
  
    beforeEach(() => {
      fetchMock.mockOnceIf(`https://pokeapi.co/api/v2`, () =>
        Promise.resolve({
          status: 200,
          body: JSON.stringify({ data }),
        })
      );
    });
  
    it('renders hook', async () => {
      const { result } = renderHook(() => useGetPokemonListQuery(), {
        wrapper,
      });
  
      expect(result.current).toMatchObject({
        status: 'pending',
        endpointName,
        isLoading: true,
        isSuccess: false,
        isError: false,
        isFetching: true,
      });
  
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(fetchMock).toBeCalledTimes(1);
  
      expect(result.current).toMatchObject({
        status: 'fulfilled',
        endpointName,
        data,
        isLoading: false,
        isSuccess: true,
        isError: false,
        currentData: data,
        isFetching: false,
      });
    });
  });