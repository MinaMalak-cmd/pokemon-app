import PokemonList from "./views/PokemonList";
import styles from "./styles/App.module.scss";
import PokemonDetails from "./views/PokemonDetails";
import { useSelector } from "react-redux";
import { useSelectState } from "./store/slices/pokemonSlice";
import { memo } from "react";
import Loader from "./components/Loader";
import Error from "./components/Error";

const App = () => {
  const pokemonId = useSelector(useSelectState('pokemonId'));
  const loading = useSelector(useSelectState('loading'));
  const error = useSelector(useSelectState('error'));
  return (
    <div className={styles["App"]}>
      <header>
        <h1>Pokemon App</h1>
      </header>
      <main className={styles["app-pokemon-list"]}>
        {error ? <Error /> : loading? <Loader />: 
        pokemonId ? <PokemonDetails pokemonId={pokemonId}/> : <PokemonList />}
      </main>
    </div>
  );
};

export default memo(App);
