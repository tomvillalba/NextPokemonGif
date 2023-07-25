import {Grid} from '@nextui-org/react';
import {PokemonCard} from '../../components/pokemon';
import {PokemonBasic} from '../../interfaces';

interface props {
	pokemon: PokemonBasic[];
}

export const FavoritePokemons = ({pokemon}: props) => {
	return (
		<Grid.Container
			gap={2}
			direction="row"
			justify="flex-start">
			{pokemon.map((pokemon) => (
				<PokemonCard
					pokemonBasic={pokemon}
					key={pokemon.id}
				/>
			))}
		</Grid.Container>
	);
};
