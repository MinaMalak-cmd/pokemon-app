import PokemonList from "./views/PokemonList";
import styles from "./styles/App.module.scss";
import PokemonDetails from "./views/PokemonDetails";
import { useSelector } from "react-redux";
import { selectPokemonId } from "./store/slices/pokemonSlice";
import { memo } from "react";

const App = () => {
  const pokemonId = useSelector(selectPokemonId);

  return (
    <div className={styles["App"]}>
      <header>
        <h1>Pokemon App</h1>
      </header>
      <main className={styles["app-pokemon-list"]}>
        {pokemonId ? <PokemonDetails pokemonId={pokemonId}/> : <PokemonList />}
      </main>
    </div>
  );
};

export default memo(App);
