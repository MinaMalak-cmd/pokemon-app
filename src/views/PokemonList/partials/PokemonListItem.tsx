import { FC, memo } from "react";
import { PokemonResult } from "../../../types/types";
import getPokemonId from "../../../utils/getPokemonId";
import styles from "./PokemonListItem.module.scss";
import getPokemonImageUrl from "../../../utils/getPokemonImageUrl";
interface PokemonListItemProps {
  pokemon: PokemonResult;
  pokemonClickHandler: Function;
}
const PokemonListItem: FC<PokemonListItemProps> = ({ pokemon, pokemonClickHandler }) => {
  const id = getPokemonId(pokemon.url) || "";
  const imgSrc = getPokemonImageUrl(id);
  return (
    <li
      key={getPokemonId(pokemon.url)}
      className={styles["pokemon-item-wrapper"]}
      onClick={() => pokemonClickHandler(id)}
    >
      <img src={imgSrc} alt="pokemon" />
      <p>{pokemon.name}</p>
    </li>
  );
};

export default memo(PokemonListItem);
