const pokeGifUrl = {
	normal: 'https://projectpokemon.org/images/normal-sprite/',
	shiny: 'https://projectpokemon.org/images/shiny-sprite/',
	getNormal(pokemon: string) {
		return this.normal + pokemon + '.gif';
	},
	getShiny(pokemon: string) {
		return this.shiny + pokemon + '.gif';
	},
};

export default pokeGifUrl;
