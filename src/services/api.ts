import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonListAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon`);
    return response.data.results; // Assuming the API returns an array of Pokemon objects
  } catch (error) {
    throw new Error('Failed to fetch Pokemon list');
  }
};

// Function to fetch details of a specific Pokemon
export const fetchPokemonDetailsAPI = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
    return response.data; // Assuming the API returns details of the specified Pokemon
  } catch (error) {
    throw new Error(`Failed to fetch details for Pokemon with ID: ${id}`);
  }
};
