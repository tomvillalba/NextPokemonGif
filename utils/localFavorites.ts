import {PokemonBasic} from '../interfaces';

const toggleFavorite = (pokemon: PokemonBasic) => {
	let favorites: PokemonBasic[] = JSON.parse(localStorage.getItem('favorites') || '[]');
	const index = favorites.findIndex((poke) => poke.name === pokemon.name);
	if (index !== -1) {
		favorites.splice(index, 1);
	} else {
		favorites.push(pokemon);
	}
	localStorage.setItem('favorites', JSON.stringify(favorites));
};

const existInFavorites = (pokemon: PokemonBasic): boolean => {
	if (typeof window === 'undefined') return false;
	const favorites: PokemonBasic[] = JSON.parse(localStorage.getItem('favorites') || '[]');
	return !!favorites.find((favorite) => favorite.name === pokemon.name);
};

const pokemons = (): PokemonBasic[] => {
	return JSON.parse(localStorage.getItem('favorites') || '[]');
};

export default {toggleFavorite, existInFavorites, pokemons};
