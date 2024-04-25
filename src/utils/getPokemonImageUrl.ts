const getPokemonImageUrl = (id:string|number|undefined) : string => {
    if(!id) return '';
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
}
export default getPokemonImageUrl;