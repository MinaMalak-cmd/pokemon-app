import { initialPokemonState } from "./slices/pokemonSlice"
export const testPokemonSelector = (f:Function) => f(initialPokemonState)