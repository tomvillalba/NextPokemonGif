import {Link, Navbar as NextNavbar, Text} from '@nextui-org/react';
import Image from 'next/image';
import {useRouter} from 'next/router';
import NextLink from 'next/link';
export const Navbar = () => {
	const router = useRouter();

	const onClick = () => {
		if (router.pathname !== '/') router.push('/');
	};

	return (
		<NextNavbar
			isBordered
			variant={'static'}>
			<NextNavbar.Brand
				onClick={onClick}
				css={{cursor: 'pointer'}}>
				<Text h3>Pokémon App</Text>
				<Image
					src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
					alt="icono de la app"
					priority
					width={70}
					height={70}
				/>
			</NextNavbar.Brand>
			<NextNavbar.Content hideIn="xs">
				<Link href="/favorites">
					<Text>Favoritos</Text>
				</Link>
			</NextNavbar.Content>
		</NextNavbar>
	);
};
