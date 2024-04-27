import { ReactNode } from "react";
import {
  render,
  renderHook,
  waitFor,
  screen,
  fireEvent,
} from "@testing-library/react";
import { store } from "../../store/store";
import {
  BASE_URL,
  useGetPokemonListQuery,
} from "../../services/pokemonApi";
import { Provider } from "react-redux";
import fetchMock from "jest-fetch-mock";
import App from "../../App";
import getPokemonId from "../../utils/getPokemonId";

function wrapper({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
beforeEach(() => {
  fetchMock.resetMocks();
});
describe("PokemonWrapper Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const endpointName = "getPokemonList";
  const data = {};
  const data2 = {};
  let id: number | null = null;
  beforeEach(() => {
    fetchMock.mockOnceIf(BASE_URL, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({ data }),
      })
    );
    fetchMock.mockOnceIf(`${BASE_URL}/pokemon/${id}`, () =>
        Promise.resolve({
          status: 200,
          body: JSON.stringify({ data: data2 }),
        })
      );
  });

  it("Check dynamic rendering and switching between pokemon list and pokemon details", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const loadingCompId = screen.getByTestId("pokemon-loading");
    expect(loadingCompId).toBeInTheDocument();
    const { result: pokemonListResult } = renderHook(
      () => useGetPokemonListQuery(),
      {
        wrapper,
      }
    );
    await waitFor(() => expect(pokemonListResult.current.isSuccess).toBe(true));
    expect(pokemonListResult.current).toMatchObject({
      status: "fulfilled",
      endpointName,
      data,
      isLoading: false,
      isSuccess: true,
      isError: false,
      currentData: data,
      isFetching: false,
    });
    const pokemonListTitle = screen.getByText(/PokeReact/i);
    expect(pokemonListTitle).toBeInTheDocument();
    const selectedPokemon = pokemonListResult?.current?.data?.results[0];
    const pokemonUrl = selectedPokemon?.url;
    expect(pokemonUrl).toMatch(
      /^https:\/\/pokeapi\.co\/api\/v2\/pokemon\/\d+\/$/
    );
    id = getPokemonId(pokemonUrl);
    expect(id).toBeGreaterThan(-1);
    const pokemonListItem = screen.getByTestId(`pokemon-list-item-${id}`);
    expect(pokemonListItem).toBeInTheDocument();
    fireEvent(
      pokemonListItem,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(fetchMock).toBeCalledTimes(1);
    await screen.findByTestId("pokemon-details");
    const nameElements = await waitFor(() => screen.findAllByText(selectedPokemon?.name || Math.random.toString()));
    expect(nameElements.length).toBe(2);
  });
});
