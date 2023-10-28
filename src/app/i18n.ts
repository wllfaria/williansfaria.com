import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'

export interface LocalizedPageProps {
	params: {
		locale: string
	}
}

export const i18n = {
	defaultLocale: 'pt-BR',
	locales: ['en', 'pt-BR'],
}

export default async function initTranslations(locale: string, namespaces: string[]) {
	const i18nInstance = createInstance()

	await i18nInstance
		.use(initReactI18next)
		.use(
			resourcesToBackend(
				(language: string, namespace: string) => import(`../../public/locales/${language}/${namespace}.json`),
			),
		)
		.init({
			lng: locale,
			fallbackLng: i18n.defaultLocale,
			supportedLngs: i18n.locales,
			defaultNS: namespaces[0],
			fallbackNS: namespaces[0],
			ns: namespaces,
			preload: typeof window === 'undefined' ? i18n.locales : [],
		})

	return i18nInstance
}
