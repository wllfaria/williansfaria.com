import { AlegreyaFont } from '@/app/styles/fonts'

import { Bio } from '@/app/components/Bio'
import { BlogPostItem } from '@/app/components/BlogPostItem'
import { Footer } from '@/app/components/Footer'
import initTranslations, { i18n } from '@/app/i18n'
import { RequestClient } from '@/domain/contracts/requestClient'
import { Post } from '@/domain/entities/post'
import { RequestClientFactory } from '@/main/factories/infra/requestClientFactory'
import { Metadata } from 'next'
import Link from 'next/link'

async function getPosts(locale: string) {
	const requestClient: RequestClient = RequestClientFactory.make()
	const posts: Post[] = await requestClient.getPosts(locale || i18n.defaultLocale)
	return posts
}

interface HomeProps {
	params: {
		locale: string
	}
}

export default async function Home({ params }: HomeProps) {
	const posts: Post[] = await getPosts(params.locale)
	const { t } = await initTranslations(params.locale, ['common'])

	return (
		<div className="px-6 pt-4 md:px-0 max-w-2xl mx-auto">
			<header>
				<section className="mb-12">
					<p className="text-gray-800 mb-1 dark:text-gray-100">{t('home.change_language')}</p>
					<div className="flex gap-4">
						<Link className="text-sm text-gray-800 dark:text-gray-400" href="/">
							{t('home.change_language_to_portuguese')}
						</Link>
						<Link className="text-sm text-gray-800 dark:text-gray-400" href="/en">
							{t('home.change_language_to_english')}
						</Link>
					</div>
				</section>
				<Bio locale={params.locale} />
			</header>
			<main>
				<h1 className={`${AlegreyaFont.className} font-black text-3xl text-red-500`}>
					{t('home.article_section.title')}
				</h1>
				{posts?.map((post) => <BlogPostItem locale={params.locale} post={post} key={post.attributes.slug} />)}
			</main>
			<Footer locale={params.locale} />
		</div>
	)
}

export async function generateMetadata(): Promise<Metadata> {
	const { t } = await initTranslations(i18n.defaultLocale, ['common'])

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
			url: `https://www.williansfaria.com`,
		},
	}
}
