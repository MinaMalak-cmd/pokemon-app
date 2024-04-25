import React, { FC, useEffect } from 'react';
import { useGetPokemonListQuery, useGetPokemonItemByIdQuery } from '../../services/pokemonApi';
// import { fetchPokemonList, selectPokemonList } from '../../store/slices/pokemonSlice';
import getPokemonId from "../../utils/getPokemonId";
import styles from "./PokemonList.module.scss";
import PokemonListItem from './partials/PokemonListItem';

const PokemonList: FC = () => {
  // const dispatch: any = useDispatch();
  // const pokemonList = useSelector(selectPokemonList) as any;
  const { data, error, isLoading, refetch, isFetching, status, isError } = useGetPokemonListQuery();
  const pokemonList = data?.results;
  const { data:pokemonData } = useGetPokemonItemByIdQuery(1);
  console.log("🚀 ~ data:", { data, error, isLoading, refetch, isFetching, status, pokemonData }, pokemonData?.id);
  if (isError) return <div>An error has occurred!</div>

  if (isLoading) return <div>Loading ...</div>
  return (
    <div>
      <h3 className={styles['pokemon-list-header']}>PokeReact</h3>
      {pokemonList?.map((pokemon) => (
        // <div key={getPokemonId(pokemon.url)}>
        // <div key={pokemon.name} className={styles['pokem']}>
        //   <span>{pokemon.name} {getPokemonId(pokemon.url)}</span>
        // </div>
        <PokemonListItem pokemon={pokemon}/>
      ))}
    </div>
  );
};

export default PokemonList;