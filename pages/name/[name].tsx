import {useEffect, useState} from 'react';

import {GetStaticProps, NextPage, GetStaticPaths} from 'next';
import {Card, Container, Grid, Image, Text} from '@nextui-org/react';

import confetti from 'canvas-confetti';

import {Layout} from '../../components/layouts';
import {pokeApi} from '../../api';
import {Pokemon, PokemonBasic, PokemonListResponse} from '../../interfaces';
import NextImage from 'next/image';
import {getPokemonInfo, localFavorites} from '../../utils';
interface Props {
	pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({pokemon}) => {
	const [isInFavorites, setIsInFavorites] = useState(false);

	const pokemonBasic: PokemonBasic = {
		name: pokemon.name,
		id: pokemon.id,
	};

	useEffect(() => {
		setIsInFavorites(localFavorites.existInFavorites(pokemonBasic));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pokemon]);

	const onToggleFavorite = () => {
		localFavorites.toggleFavorite(pokemonBasic);
		setIsInFavorites(!isInFavorites);
		if (isInFavorites) return;
		confetti({
			zIndex: 999,
			particleCount: 100,
			spread: 160,
			angle: -100,
			origin: {
				x: 0.35,
				y: 0.1,
			},
		});
	};

	return (
		<Layout title={pokemon.name}>
			<Grid.Container
				css={{mt: '5px'}}
				gap={2}>
				<Grid
					xs={12}
					sm={4}>
					<Card
						isHoverable
						css={{p: '30px'}}>
						<Card.Body>
							<div className="addFavorite">
								<NextImage
									src={isInFavorites ? '/star_full.svg' : '/star.svg'}
									alt="add favorites"
									width={70}
									height={50}
									onClick={onToggleFavorite}
								/>
							</div>
							<Card.Image
								src={pokemon.gif || '/no-image.png'}
								alt={`image of ${pokemon.name}`}
								width="100%"
								height={200}
								objectFit="contain"
							/>
						</Card.Body>
					</Card>
				</Grid>

				<Grid
					xs={12}
					sm={8}>
					<Card isHoverable>
						<Card.Header css={{display: 'flex', justifyContent: 'space-between'}}>
							<Text
								h1
								transform="capitalize">
								{pokemon.name}
							</Text>
							<Text h1>#{pokemon.id}</Text>
						</Card.Header>
						<Card.Body>
							<Text size={30}>Sprites:</Text>
							<Container
								direction="row"
								display="flex"
								gap={0}>
								<Image
									src={pokemon.sprites.front_default}
									alt={`front image of ${pokemon.name}`}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites.back_default}
									alt={`back image of ${pokemon.name}`}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites.front_shiny}
									alt={`front shiny image of ${pokemon.name}`}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites.back_shiny}
									alt={`back shiny image of ${pokemon.name}`}
									width={100}
									height={100}
								/>
							</Container>
						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>
		</Layout>
	);
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
	const pokemons151: string[] = data.results.map((pokemon) => pokemon.name);

	return {
		paths: pokemons151.map((name) => ({params: {name}})),
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async ({params}) => {
	const {name} = params as {name: string};

	function contieneLetra(str: any) {
		return /[a-zA-Z]/.test(str);
	}

	if (!contieneLetra(name)) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	const pokemon = await getPokemonInfo(name);
	if (!pokemon) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			pokemon: await getPokemonInfo(name),
			revalidate: 86400,
		},
	};
};

export default PokemonPage;
