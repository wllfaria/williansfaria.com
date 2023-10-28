import initTranslations, { i18n, LocalizedPageProps } from '@/app/i18n'
import HomePage from '@/app/page'
import { Metadata } from 'next'

// We just use the default home page with the locale param
// this is a workaround as NextJS don't support SSG i18n yet
export default function LocalizedHomePage({ params }: LocalizedPageProps) {
	return <HomePage params={params} />
}

export function generateStaticParams() {
	return i18n.locales.map((locale) => ({
		locale,
	}))
}

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
	const { locale } = params
	const { t } = await initTranslations(locale, ['common'])

	return {
		metadataBase: new URL('https://www.williansfaria.com'),
		title: 'Willians Faria',
		description: t('bio.headline'),
		twitter: {
			card: 'summary_large_image',
			site: '@4wiru',
			title: 'Willians Faria',
			description: t('bio.headline'),
		},
		openGraph: {
			type: 'website',
			title: 'Willians Faria',
			description: t('bio.headline'),
			url: `https://www.williansfaria.com/${locale}`,
		},
	}
}
