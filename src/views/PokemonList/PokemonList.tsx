import { FC, memo, useState } from 'react';
import { useGetPokemonListQuery } from '../../services/pokemonApi';
// import { fetchPokemonList, selectPokemonList } from '../../store/slices/pokemonSlice';
import styles from "./PokemonList.module.scss";
import PokemonListItem from './partials/PokemonListItem';
import useFetchPokemonDetails from "../../hooks/useFetchPokemonDetails";
import { useSelector } from 'react-redux';
import { selectPokemonList } from '../../store/slices/pokemonSlice';

const PokemonList: FC = () => {
  const pokemonList = useSelector(selectPokemonList);
  useGetPokemonListQuery();
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | string>('');
  useFetchPokemonDetails(selectedPokemonId);
  const pokemonClickHandler =  (id: number|string) => {
    setSelectedPokemonId(id)
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