import { FC, useEffect, memo } from 'react';
import { useGetPokemonListQuery, useGetPokemonItemByIdQuery } from '../../services/pokemonApi';
// import { fetchPokemonList, selectPokemonList } from '../../store/slices/pokemonSlice';
import styles from "./PokemonList.module.scss";
import PokemonListItem from './partials/PokemonListItem';

const PokemonList: FC = () => {
  // const dispatch: any = useDispatch();
  // const pokemonList = useSelector(selectPokemonList) as any;
  const { data, error, isLoading, refetch, isFetching, status, isError } = useGetPokemonListQuery();
  const pokemonList = data?.results;
  const { data:pokemonData } = useGetPokemonItemByIdQuery(1);
  if (isError) return <div>An error has occurred!</div>

  if (isLoading) return <div>Loading ...</div>
  return (
    <section>
      <h3 className={styles['pokemon-list-header']}>PokeReact</h3>
      <ul className={styles['pokemon-list']}>
        {pokemonList?.map((pokemon) => (
          <PokemonListItem pokemon={pokemon}/>
        ))}
      </ul>
    </section>
  );
};

export default memo(PokemonList);