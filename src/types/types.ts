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

type PokemonType = {
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
