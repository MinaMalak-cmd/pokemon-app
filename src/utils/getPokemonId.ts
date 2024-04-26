const getPokemonId = (url: string): number | null => {
  const idMatch = url.match(/\/pokemon\/(\d+)\/?$/);

  if (idMatch) {
    const id = parseInt(idMatch[1]);
    return isNaN(id) ? null : id;
  }

  return null;
};
export default getPokemonId;
