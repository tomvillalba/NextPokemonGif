import {Container, Image, Text} from '@nextui-org/react';

export const NoFavorites = () => {
	return (
		<Container
			css={{
				display: 'flex',
				flexDirection: 'column',
				height: 'calc(100vh-100px)',
				alignItems: 'center',
				justifyContent: 'center',
				alignSelf: 'center',
			}}>
			<Text h1>No hay favoritos </Text>
			<Image
				src="https://projectpokemon.org/images/normal-sprite/bulbasaur.gif"
				alt="Pokemon de ejemplo"
				css={{
					opacity: 0.1,
				}}
			/>
		</Container>
	);
};
