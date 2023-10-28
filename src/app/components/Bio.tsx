import { RubikMonoOneFont } from '@/app/styles/fonts'
import Image from 'next/image'
import initTranslations from '../i18n'

interface BioProps {
	locale: string
}

export async function Bio({ locale }: BioProps) {
	const { t } = await initTranslations(locale, ['common'])

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
				<p className="text-md sm:text-lg text-gray-800 dark:text-gray-100">{t('bio.headline')}</p>
			</hgroup>
		</section>
	)
}
