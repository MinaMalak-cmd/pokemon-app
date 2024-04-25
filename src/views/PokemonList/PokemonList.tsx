import { FC, useEffect, memo, useState } from 'react';
import { useGetPokemonListQuery, useGetPokemonItemByIdQuery } from '../../services/pokemonApi';
// import { fetchPokemonList, selectPokemonList } from '../../store/slices/pokemonSlice';
import styles from "./PokemonList.module.scss";
import PokemonListItem from './partials/PokemonListItem';
import { PokemonResult } from '../../types/types';
import useFetchPokemonDetails from "../../hooks/useFetchPokemonDetails";

const PokemonList: FC = () => {
  // const dispatch: any = useDispatch();
  // const pokemonList = useSelector(selectPokemonList) as any;
  const { data, error, isLoading, refetch, isFetching, status, isError } = useGetPokemonListQuery();
  const pokemonList = data?.results;
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | string>('');
  useFetchPokemonDetails(selectedPokemonId);
  const pokemonClickHandler =  (id: number|string) => {
    setSelectedPokemonId(id)
  }
  if (isError) return <div>An error has occurred!</div>

  if (isLoading) return <div>Loading ...</div>
  return (
    <section>
      <h3 className={styles['pokemon-list-header']}>PokeReact</h3>
      <ul className={styles['pokemon-list']}>
        {pokemonList?.map((pokemon) => (
          <PokemonListItem pokemon={pokemon} pokemonClickHandler={pokemonClickHandler}/>
        ))}
      </ul>
    </section>
  );
};

export default memo(PokemonList);