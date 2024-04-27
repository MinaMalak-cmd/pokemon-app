import React, { ReactNode } from "react";
import { render, screen, renderHook, waitFor } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useTypedSelector } from "./store/store-hooks";
import { testPokemonSelector } from "./store/test-pokemon-selector";
import fetchMock from "jest-fetch-mock";
import { useGetPokemonListQuery, useGetPokemonItemByIdQuery } from './services/pokemonApi';
// jest.mock("./store/store-hooks")
// jest.mock('react-redux', () => ({
//   // useSelector: jest.fn(),
//   ...jest.requireActual('react-redux'), // Preserve other functionalities
//   useDispatch: jest.fn(),
//   useSelector: jest.fn(),
//   useStore: jest.fn(),
// }));
fetchMock.enableMocks();

function wrapper({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
beforeEach(() => {
  fetchMock.resetMocks();
});
describe("PokemonApp", () => {
  const endpointName = 'getPokemonItemById';
  const pokemonId = '1';
  const data = {};
  // beforeEach(() => {
  //   // useTypedSelector.mockImplementation(testPokemonSelector);
  //   // fetchMock.resetMocks();
  // })
  // beforeAll(() => {
  //   fetchMock.mockOnceIf('https://pokeapi.co/api/v2/pokemon/1', () =>
  //     Promise.resolve({
  //       status: 200,
  //       body: JSON.stringify({ data }),
  //     })
  //   );
  // });
  beforeEach(() => {
    fetchMock.mockOnceIf(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({ data }),
      })
    );
  });
  test("renders App component header successfully", () => {
    render(<Provider store={store}><App /></Provider>);
    const linkElement = screen.getByText(/Pokemon App/i);
    expect(linkElement).toBeInTheDocument();
  });
  // it('renders hook', async () => {
  //   // renderHook(() => useGetPokemonItemByIdQuery('1'), { wrapper: Wrapper });
  //   const { result } = renderHook(() => useGetPokemonItemByIdQuery('1'), {
  //     wrapper: Wrapper,
  //   });
  //   console.log("🚀 ~ const{result}=renderHook ~ result:", result);
  //   // expect(result.current).toMatchObject({
  //   //   status: 'pending',
  //   //   endpointName: 'getPokemonItemById',
  //   //   isLoading: true,
  //   //   isSuccess: false,
  //   //   isError: false,
  //   //   isFetching: true,
  //   // });
    
  //   await waitFor(() => expect(result.current.isSuccess).toBe(true));
  //   console.log("🚀 ~ expect ~ result.current:", result.current)
  //   expect(fetchMock).toBeCalledTimes(1);
  //   // expect(fetchMock).toBeCalled();
  // });
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
