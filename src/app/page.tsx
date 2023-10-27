import Image from 'next/image'
import { AlegreyaFont, RubikMonoOneFont } from '@/app/styles/fonts'

export default function Home() {
	return (
		<>
			<header className="pt-6 mb-8">
				<section className="flex gap-2 align-center">
					<Image
						src="/profile-picture.webp"
						alt="Me, looking to the left side with a big smile"
						width="1024"
						height="1024"
						className="rounded-full w-16 h-16"
					/>
					<hgroup>
						<h1 className={`${RubikMonoOneFont.className} text-3xl tracking-tighter text-red-500`}>Willians Faria</h1>
						<p>Software Engineer sharing his messy thoughts</p>
					</hgroup>
				</section>
			</header>
			<main>
				<h1 className={`${AlegreyaFont.className} font-black text-3xl text-red-500`}>Check a few of my posts</h1>

				<article></article>
			</main>
			<footer>
				<h1>asdsadfhusdg</h1>
			</footer>
		</>
	)
}
