import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../store';
import { fetchPokemonList, selectPokemonList } from '../../store/slices/pokemonSlice';

const PokemonList: FC = () => {
  const dispatch: any = useDispatch();
  const pokemonList = useSelector(selectPokemonList) as any;

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch]);

  return (
    <div>
      <h2>Pokemon List</h2>
      {pokemonList.map((pokemon:any) => (
        <div key={pokemon.id}>
          <span>{pokemon.name}</span>
        </div>
      ))}
      {/* Hello */}
    </div>
  );
};

export default PokemonList;
