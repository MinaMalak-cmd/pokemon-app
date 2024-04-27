import styles from "./styles/App.module.scss";
import { useSelectState } from "./store/slices/pokemonSlice";
import { memo, useMemo } from "react";
import Loader from "./components/Loader";
import Error from "./components/Error";
import PokemonWrapper from "./views/PokemonWrapper";
import { useTypedSelector } from "./store/store-hooks";

const App = () => {
  const pokemonId = useTypedSelector(useSelectState('pokemonId'));
  const loading = useTypedSelector(useSelectState('loading'));
  const error = useTypedSelector(useSelectState('error'));
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
