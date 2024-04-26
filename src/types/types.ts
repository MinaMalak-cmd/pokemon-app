export type PokemonResult = {
  name: string;
  url: string;
};

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResult[];
}

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};
export interface PokemonPartial {
  name: string;
  weight: number;
  height: number;
  id: string;
  types: PokemonType[];
}

export interface PokemonState {
  list: PokemonResult[];
  loading: boolean;
  error: string | null;
  selectedPokemon: PokemonPartial | undefined;
  pokemonId : string | number | undefined;
}
