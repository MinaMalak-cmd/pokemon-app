import PokemonList from "./components/PokemonList";
import styles from "./styles/App.module.scss";

function App() {
  return (
    <div className={styles["App"]}>
      <header>
        <h1>Pokemon App</h1>
      </header>
      <main>
        <PokemonList /> {/* Render PokemonList component */}
      </main>
    </div>
  );
}

export default App;
