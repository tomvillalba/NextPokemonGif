import Head from 'next/head';
import {FC} from 'react';
import {Children} from '../../interfaces';
import {Navbar} from '../ui/Navbar';
import {Container} from '@nextui-org/react';
import {useRouter} from 'next/router';

interface Props extends Children {
	title?: string;
}

const origin = typeof window === 'undefined' ? '' : window.location.origin;

export const Layout: FC<Props> = ({children, title}) => {
	return (
		<>
			<Head>
				<title>{title} | Pokedex</title>
				<meta
					name="author"
					content="Tomas Villalba"
				/>
				<meta
					name="description"
					content={`Informacion sobre el pokemon ${title}`}
				/>
				<meta
					name="keywords"
					content={`pokemon, nextjs, nextui, react, pokemon, pokedex, ${title} }`}
				/>
				<meta
					property="og:title"
					content={`Inforacion sobre ${title}`}
				/>
				<meta
					property="og:description"
					content={`Esta es la pagina sobre ${title}`}
				/>
				<meta
					property="og:image"
					content={`${origin}/img/banner.png`}
				/>
			</Head>
			<Navbar />
			<main>
				<Container>{children}</Container>
			</main>
		</>
	);
};
