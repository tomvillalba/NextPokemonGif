import {useEffect, useState} from 'react';
import {Layout} from '../../components/layouts';
import {NoFavorites} from '../../components/ui';
import {localFavorites} from '../../utils';
import {PokemonBasic} from '../../interfaces';
import {FavoritePokemons} from '../../components/pokemon/FavoritePokemons';

const Favorites = () => {
	const [favoritePokemons, setfavoritePokemons] = useState<PokemonBasic[]>([]);

	useEffect(() => {
		setfavoritePokemons(localFavorites.pokemons);
	}, []);

	return (
		<Layout title="Pokemon - Favoritos">
			{favoritePokemons.length === 0 ? (
				<NoFavorites />
			) : (
				<FavoritePokemons pokemon={favoritePokemons} />
			)}
		</Layout>
	);
};

export default Favorites;
