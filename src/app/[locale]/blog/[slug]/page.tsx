import ReadBlogPost, { ReadBlogPostProps } from '@/app/blog/[slug]/page'
import { i18n } from '@/app/i18n'
import { RequestClient } from '@/domain/contracts/requestClient'
import { RequestClientFactory } from '@/main/factories/infra/requestClientFactory'
import { Metadata } from 'next'

// We just use the default home page with the locale param
// this is a workaround as NextJS don't support SSG i18n yet
export default function LocalizedReadBlogPost({ params }: ReadBlogPostProps) {
	return <ReadBlogPost params={params} />
}

export async function generateMetadata({ params }: ReadBlogPostProps): Promise<Metadata> {
	const { locale, slug } = params

	const requestClient: RequestClient = RequestClientFactory.make()
	const post = await requestClient.getPost(slug, locale || i18n.defaultLocale)

	return {
		metadataBase: new URL('https://www.williansfaria.com'),
		title: post.attributes.title,
		description: post.attributes.excerpt,
		twitter: {
			card: 'summary_large_image',
			site: '@4wiru',
			title: post.attributes.title,
			description: post.attributes.excerpt,
		},
		openGraph: {
			type: 'website',
			title: post.attributes.title,
			description: post.attributes.excerpt,
			url: `https://www.williansfaria.com/${locale}/blog/${post.attributes.slug}`,
		},
	}
}

export async function generateStaticParams() {
	const requestClient = RequestClientFactory.make()
	const params = []

	for (const locale of i18n.locales) {
		const slugs = (await requestClient.getPostSlugs(locale)).map((post) => post.attributes.slug)
		for (const slug of slugs) params.push({ locale, slug })
	}

	return params
}
