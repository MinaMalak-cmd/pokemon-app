import { FC, memo } from "react";
import PokemonDetails from "../PokemonDetails";
import PokemonList from "../PokemonList";

interface PokemonWrapperProps {
  pokemonId: string | number | undefined;
}
const PokemonWrapper:FC<PokemonWrapperProps> = ({pokemonId}) => {
  return pokemonId ? <PokemonDetails /> : <PokemonList />;
};

export default memo(PokemonWrapper);
