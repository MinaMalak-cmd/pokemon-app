import styles from "./styles/App.module.scss";
import { useSelector } from "react-redux";
import { useSelectState } from "./store/slices/pokemonSlice";
import { memo, useMemo } from "react";
import Loader from "./components/Loader";
import Error from "./components/Error";
import PokemonWrapper from "./views/PokemonWrapper";

const App = () => {
  const pokemonId = useSelector(useSelectState('pokemonId'));
  const loading = useSelector(useSelectState('loading'));
  const error = useSelector(useSelectState('error'));
  const renderLayout = useMemo(() => {
    return error ? <Error /> : loading? <Loader />: <PokemonWrapper pokemonId={pokemonId}/>
  }, [error, loading, pokemonId])
  return (
    <div className={styles["App"]}>
      <header>
        <h1>Pokemon App</h1>
      </header>
      <main className={styles["app-pokemon-list"]}>
        {renderLayout}
      </main>
    </div>
  );
};

export default memo(App);
