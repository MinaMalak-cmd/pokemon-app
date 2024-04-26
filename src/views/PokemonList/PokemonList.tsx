import { FC, memo, useEffect, useState } from 'react';
import { useGetPokemonListQuery } from '../../services/pokemonApi';
import styles from "./PokemonList.module.scss";
import PokemonListItem from './partials/PokemonListItem';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemonId, useSelectState } from '../../store/slices/pokemonSlice';
const PokemonList: FC = () => {
  const dispatch = useDispatch();
  const pokemonList = useSelector(useSelectState('list'));
  useGetPokemonListQuery();
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | string>('');
  const pokemonClickHandler =  (id: number|string) => {
    setSelectedPokemonId(id)
  }
  useEffect(() => {
    if(selectedPokemonId){
      dispatch(setPokemonId(selectedPokemonId))
    }
  }, [selectedPokemonId, dispatch])
  
  return (
    <section>
      <h3 className={styles['pokemon-list-header']}>PokeReact</h3>
      <ul className={styles['pokemon-list']}>
        {pokemonList?.map((pokemon) => (
          <PokemonListItem pokemon={pokemon} pokemonClickHandler={pokemonClickHandler} key={Math.random()}/>
        ))}
      </ul>
    </section>
  );
};

export default memo(PokemonList);