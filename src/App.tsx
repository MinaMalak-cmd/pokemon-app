import PokemonList from "./components/PokemonList";
// import styles from "./styles/App.module.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokemon App</h1>
      </header>
      <main>
        <PokemonList /> {/* Render PokemonList component */}
      </main>
    </div>
  );
}

export default App;
