import {FC} from 'react';
import {Pokemon, PokemonBasic, SmallPokemon} from '../../interfaces';
import {Grid, Card, Row, Text} from '@nextui-org/react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {pokeGifUrl} from '../../api';

interface Props {
	pokemon?: SmallPokemon | Pokemon;
	pokemonBasic?: PokemonBasic;
	shiny?: boolean;
}

export const PokemonCard: FC<Props> = ({pokemon = {}, pokemonBasic = {}, shiny = false}) => {
	const router = useRouter();

	const onClick = () => {
		router.push(`/name/${pokemon.name || pokemonBasic.name}`);
	};

	const imgUrl = (): string => {
		if (pokemon.gif) return pokemon.gif;
		return shiny
			? pokeGifUrl.getShiny(pokemonBasic.name || 'bulbasaur')
			: pokeGifUrl.getNormal(pokemonBasic.name || 'bulbasaur');
	};

	return (
		<Grid
			xs={6}
			sm={4}
			md={2}
			key={pokemon.id || pokemonBasic.id}>
			<Card
				isHoverable
				isPressable
				css={{padding: 2}}
				onClick={onClick}>
				<Card.Body css={{p: 15, placeContent: 'center'}}>
					<Image
						src={imgUrl()}
						width="0"
						height="0"
						alt={pokemon.name || 'gif de pokemon'}
						className="pokemon-img"
					/>
				</Card.Body>
				{(pokemon.gif || pokemonBasic.name) && (
					<Card.Footer>
						<Row justify="space-between">
							<Text>#{pokemon.id || pokemonBasic.id}</Text>
							<Text transform="capitalize">{pokemon.name || pokemonBasic.name}</Text>
						</Row>
					</Card.Footer>
				)}
			</Card>
		</Grid>
	);
};
