import { PokemonType } from "../types";

const formatPokemonTypes = (types: PokemonType[] | undefined): string[] => {
  if(!types) return [];
  return types?.map((type) => type.type.name);
};

export default formatPokemonTypes;