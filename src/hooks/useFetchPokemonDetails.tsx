import { useGetPokemonItemByIdQuery } from "../services/pokemonApi";

const useFetchPokemonDetails = (pokemonId: string | number) => {
  useGetPokemonItemByIdQuery(pokemonId);
};
export default useFetchPokemonDetails;