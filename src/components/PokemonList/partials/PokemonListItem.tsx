import { FC, memo } from "react";
import {PokemonResult} from "../../../types/types";
import getPokemonId from "../../../utils/getPokemonId";
import styles from "./PokemonListItem.module.scss";
import getPokemonImageUrl from "../../../utils/getPokemonImageUrl";

const PokemonListItem:FC<{pokemon:PokemonResult}> = ({pokemon}) => {
    const id = getPokemonId(pokemon.url) || '';
    console.log("🚀 ~ id:", id)
    return ( 
         <div key={getPokemonId(pokemon.url)} className={styles['pokemon-item-wrapper']}>
          <img src={getPokemonImageUrl(id)} alt="pokemon"/>
          <span>{pokemon.name}</span>
        </div>
     );
}
 
export default memo(PokemonListItem);