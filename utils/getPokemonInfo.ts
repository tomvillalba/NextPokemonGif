import {pokeApi, pokeGifUrl} from '../api';
import {Pokemon, PokemonJSON} from '../interfaces';

export const getPokemonInfo = async (nameOrId: string | number) => {
	try {
		const {data} = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);
		const {id, name, sprites}: PokemonJSON = data;

		if (data.name.includes('-')) {
			data.name = data.name.split('-')[0] + '_' + data.name.split('-')[1];
		}
		if (data.name === 'mr_mime') {
			data.name = 'mr.mime';
		}

		return {
			id,
			name,
			sprites,
			gif: pokeGifUrl.getNormal(name),
			gifShiny: pokeGifUrl.getShiny(name),
		} as PokemonJSON;
	} catch (error) {
		return null;
	}
};
