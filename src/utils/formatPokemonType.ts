import { PokemonType } from "../types/types";

const formatPokemonTypes = (types: PokemonType[]): string[] => {
  return types.map((type) => type.type.name);
};

export default formatPokemonTypes;