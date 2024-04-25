import PokemonList from "./views/PokemonList";
import styles from "./styles/App.module.scss";
import PokemonDetails from "./views/PokemonDetails";
import { useGetPokemonItemByIdQuery } from "./services/pokemonApi";
import { useSelector } from 'react-redux';
import { selectedPokemon } from "./store/slices/pokemonSlice";
import { memo } from "react";

const App = () => {
  const { data:pokemonData } = useGetPokemonItemByIdQuery(7);
  const selectedPokemonItem = useSelector(selectedPokemon);
  console.log("🚀 ~ App ~ selectedPokemon:", selectedPokemonItem)
  console.log("🚀 ~ App ~ pokemonData:", pokemonData)
  return (
    <div className={styles["App"]}>
      <header>
        <h1>Pokemon App</h1>
      </header>
      <main className={styles["app-pokemon-list"]}>
        {/* {selectedPokemonItem ?  */}
        {/* <PokemonList /> */}
        {pokemonData && <PokemonDetails pokemonData={pokemonData}/>}
      </main>
    </div>
  );
}

export default memo(App);
