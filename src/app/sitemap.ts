import { RequestClientFactory } from '@/main/factories/infra/requestClientFactory'
import { MetadataRoute } from 'next'
import { i18n } from './i18n'

async function getPosts() {
	const requestClient = RequestClientFactory.make()
	const params = []

	for (const locale of i18n.locales) {
		const slugs = (await requestClient.getPostSlugs(locale)).map((post) => post.attributes.slug)
		for (const slug of slugs) params.push({ locale, slug })
	}

	return params
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const params = await getPosts()
	const url = 'https://www.williansfaria.com'

	const paths: MetadataRoute.Sitemap = [
		{
			url,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
	]

	params.forEach((param) => {
		paths.push({
			url: `${url}/${param.locale}/blog/${param.slug}`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		})
	})

	return paths
}
