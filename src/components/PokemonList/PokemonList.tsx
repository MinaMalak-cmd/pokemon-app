import React, { FC, useEffect } from 'react';
import { useGetPokemonListQuery, useGetPokemonItemByIdQuery } from '../../services/pokemonApi';
// import { fetchPokemonList, selectPokemonList } from '../../store/slices/pokemonSlice';

const PokemonList: FC = () => {
  // const dispatch: any = useDispatch();
  // const pokemonList = useSelector(selectPokemonList) as any;
  const { data, error, isLoading, refetch, isFetching, status } = useGetPokemonListQuery();
  console.log("🚀 ~ data:", { data, error, isLoading, refetch, isFetching, status }, data?.results);

  return (
    <div>
      <h2>Pokemon List</h2>
      {/* {pokemonList.map((pokemon:any) => (
        <div key={pokemon.id}>
          <span>{pokemon.name}</span>
        </div>
      ))} */}
      {/* Hello */}
    </div>
  );
};

export default PokemonList;