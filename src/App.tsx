import PokemonList from "./views/PokemonList";
import styles from "./styles/App.module.scss";
import PokemonDetails from "./views/PokemonDetails";
import { useGetPokemonItemByIdQuery } from "./services/pokemonApi";

const App = () => {
  const { data:pokemonData } = useGetPokemonItemByIdQuery(1);
  console.log("🚀 ~ App ~ pokemonData:", pokemonData)
  return (
    <div className={styles["App"]}>
      <header>
        <h1>Pokemon App</h1>
      </header>
      <main className={styles["app-pokemon-list"]}>
        {/* <PokemonList /> */}
        {pokemonData && <PokemonDetails pokemonData={pokemonData}/>}
      </main>
    </div>
  );
}

export default App;
