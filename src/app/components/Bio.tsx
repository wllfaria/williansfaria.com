import Image from 'next/image'
import { RubikMonoOneFont } from '../styles/fonts'

export function Bio() {
	return (
		<section className="flex gap-3 align-center mb-8 items-center">
			<Image
				src="/profile-picture.webp"
				alt="Me, looking to the left side with a big smile"
				width="1024"
				height="1024"
				className="rounded-full w-16 h-16"
			/>
			<hgroup>
				<h1 className={`${RubikMonoOneFont.className} text-xl sm:text-3xl md:text-4xl tracking-tighter text-red-500`}>
					Willians Faria
				</h1>
				<p className="text-md sm:text-lg text-gray-800 dark:text-gray-100">A Tech Junkie&rsquo;s Unfiltered Musings</p>
			</hgroup>
		</section>
	)
}
