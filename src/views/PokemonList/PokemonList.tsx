import { FC, memo, useState } from 'react';
import { useGetPokemonItemByIdQuery, useGetPokemonListQuery } from '../../services/pokemonApi';
// import { fetchPokemonList, selectPokemonList } from '../../store/slices/pokemonSlice';
import styles from "./PokemonList.module.scss";
import PokemonListItem from './partials/PokemonListItem';
import { useSelector } from 'react-redux';
import { selectPokemonList } from '../../store/slices/pokemonSlice';

const PokemonList: FC = () => {
  const pokemonList = useSelector(selectPokemonList);
  useGetPokemonListQuery();
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | string>('');
  useGetPokemonItemByIdQuery(1); // use dynamic value
  const pokemonClickHandler =  (id: number|string) => {
    // setSelectedPokemonId(id)
    // setSelectedPokemonId(1)
  }
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