import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetPokemonItemByIdQuery } from "../services/pokemonApi";
// import {setSelectedPokemon} from "../store/slices/pokemonSlice";

const useFetchPokemonDetails = (pokemonId: string | number) => {
  const dispatch = useDispatch();
  const { data } = useGetPokemonItemByIdQuery(pokemonId);
  useEffect(() => {
    const fetchPokemonDetails =  () => {
      if (data) {
        // pokemonSlice.
        // dispatch(setSelectedPokemon(data));
      }
    };

    fetchPokemonDetails();

    return () => {};
  }, [data]);
};
export default useFetchPokemonDetails;