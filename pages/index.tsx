import type {NextPage, GetStaticProps} from 'next';
import {Layout} from '../components/layouts';
import {pokeApi, pokeGifUrl} from '../api';
import {PokemonListResponse, SmallPokemon} from '../interfaces';
import {Grid, Image} from '@nextui-org/react';
import {PokemonCard} from '../components/pokemon';

interface Props {
	pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({pokemons}) => {
	return (
		<>
			<Layout title="listado de pokemon">
				<Grid.Container
					gap={4}
					justify="flex-start">
					{pokemons.map((pokemon) => (
						<PokemonCard
							pokemon={pokemon}
							key={pokemon.id}
						/>
					))}
				</Grid.Container>
			</Layout>
		</>
	);
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
	const pachirisu = await pokeApi.get('/pokemon/pachirisu');
	const pokemon = [...data.results, pachirisu.data];

	const pokemons: SmallPokemon[] = pokemon.map((pokemon, index) => {
		// console.log(pachirisu.data);

		if (pokemon.name.includes('-')) {
			pokemon.name = pokemon.name.split('-')[0] + '_' + pokemon.name.split('-')[1];
		}
		if (pokemon.name === 'mr_mime') {
			pokemon.name = 'mr.mime';
		}
		return {
			...pokemon,
			id: index + 1,
			img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
				index + 1
			}.png`,
			gif: pokeGifUrl.getNormal(pokemon.name),
			gifShiny: pokeGifUrl.getShiny(pokemon.name),
		};
	});
	return {
		props: {pokemons},
	};
};
export default Home;
