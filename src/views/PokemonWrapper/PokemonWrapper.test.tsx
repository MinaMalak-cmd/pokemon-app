import { ReactNode } from "react";
import {
  render,
  renderHook,
  waitFor,
  screen,
  fireEvent,
} from "@testing-library/react";
import { store } from "../../store/store";
import { useGetPokemonItemByIdQuery, useGetPokemonListQuery } from "../../services/pokemonApi";
import { Provider } from "react-redux";
import fetchMock from "jest-fetch-mock";
import App from "../../App";
import getPokemonId from "../../utils/getPokemonId";
import { PokemonPartial } from "../../types";

// const mockedStore = store();
function wrapper({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
beforeEach(() => {
  fetchMock.resetMocks();
});
const BASE_URL = `https://pokeapi.co/api/v2`;
describe("PokemonWrapper Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const endpointName = "getPokemonList";
  const data = {};
  beforeEach(() => {
    fetchMock.mockOnceIf(BASE_URL, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({ data }),
      })
    );
  });
  console.log("🚀 ~ describe ~ data:", data);

  it("Check loading component renders", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const loadingCompId = screen.getByTestId("pokemon-loading");
    expect(loadingCompId).toBeInTheDocument();
    const { result } = renderHook(() => useGetPokemonListQuery(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    console.log(
      "🚀 ~ expect ~ result.current:",
      result.current.data?.results.length,
      JSON.stringify(result.current.data?.results),
      result.current.data?.results[0]
    );
    expect(result.current).toMatchObject({
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
    console.log("🚀 ~ it ~ pokemonListTitle:", pokemonListTitle);
    const pokemonUrl = result?.current?.data?.results[0].url;
    expect(pokemonUrl).toMatch(/^https:\/\/pokeapi\.co\/api\/v2\/pokemon\/\d+\/$/);;
    const id = getPokemonId(pokemonUrl);
    expect(id).toBeGreaterThan(-1);
    console.log("🚀 ~ it ~ id:", id);
    const pokemonListItem = screen.getByTestId(`pokemon-list-item-${id}`);
    console.log("🚀 ~ it ~ pokemonListItem:", pokemonListItem);
    expect(pokemonListItem).toBeInTheDocument();
    fireEvent(
      pokemonListItem,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(fetchMock).toBeCalledTimes(1);
    // expect(loadingCompId).toBeInTheDocument();
    // (await waitFor(() => expect(screen.getByTestId("pokemon-details")))).toBeInTheDocument();
    await screen.findByTestId("pokemon-details");
    console.log(
      "🚀 ~ it ~ screen.getByTestId(pokemon-details):",
      screen.getByTestId("pokemon-details")
    );

    // fetchMock.mockOnceIf(`${BASE_URL}/pokemon/${id}`, () =>
    //     Promise.resolve({
    //         status: 200,
    //         body: JSON.stringify({data:pokemonItemData})
    //     })
    // );
    const { result: pokemonDetails } = renderHook(() => useGetPokemonItemByIdQuery(id? id : -1), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const pokemonItemData = pokemonDetails.current.data as PokemonPartial;

    console.log("dataaaaa", pokemonItemData);
    expect(screen.getByText(pokemonItemData.name)).toBeInTheDocument();
    expect(screen.getByText(`${pokemonItemData.height} cm`)).toBeInTheDocument();
    expect(screen.getByText(`${pokemonItemData.weight} kg`)).toBeInTheDocument();
    // // Check if the types are rendered correctly
    // mockPokemonItemResponse.types.forEach(type => {
    //   expect(screen.getByText(type.type.name)).toBeInTheDocument();
    // });
  });
});
