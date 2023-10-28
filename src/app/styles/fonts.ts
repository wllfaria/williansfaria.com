import { Alegreya, Literata, Rubik_Mono_One } from 'next/font/google'

export const RubikMonoOneFont = Rubik_Mono_One({
	preload: true,
	subsets: ['latin'],
	display: 'swap',
	weight: '400',
})

export const LiterataFont = Literata({
	preload: true,
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '700', '900'],
})

export const AlegreyaFont = Alegreya({
	preload: true,
	subsets: ['latin'],
	display: 'swap',
	weight: '700',
})
