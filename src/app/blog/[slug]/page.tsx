import { Bio } from '@/app/components/Bio'
import { BlogPostTag } from '@/app/components/BlogPostTag'
import { Footer } from '@/app/components/Footer'
import { GoBack } from '@/app/components/GoBack'
import { LocalizedPageProps, i18n } from '@/app/i18n'
import { AlegreyaFont } from '@/app/styles/fonts'
import { RequestClient } from '@/domain/contracts/requestClient'
import { Post } from '@/domain/entities/post'
import { RequestClientFactory } from '@/main/factories/infra/requestClientFactory'
import { Metadata } from 'next'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

export interface ReadBlogPostProps extends LocalizedPageProps {
	params: { slug: string; locale: string }
}

async function getPost(postSlug: string, locale: string): Promise<Post> {
	const requestClient: RequestClient = RequestClientFactory.make()
	const post: Post = await requestClient.getPost(postSlug, locale || i18n.defaultLocale)

	return post
}

export default async function ReadBlogPost({ params }: ReadBlogPostProps) {
	const post = await getPost(params.slug, params.locale)

	return (
		<>
			<header className="mb-8">
				{!!post.attributes.cover.data && (
					<Image
						src={post.attributes.cover.data.attributes.url}
						height="400"
						width="1920"
						alt={post.attributes.cover.data.attributes.alternativeText}
						className="h-96 w-full object-cover mb-6"
					/>
				)}
				<div className="px-6 md:px-0 pt-3 max-w-2xl mx-auto mb-6">
					<GoBack locale={params.locale} />
				</div>
				<div className="px-6 md:px-0 max-w-2xl mx-auto">
					{!post.attributes.cover.data && <Bio locale={params.locale} />}
					<h1 className={`${AlegreyaFont.className} text-6xl text-red-500 mb-4`}>{post.attributes.title}</h1>
					{post.attributes.tags.data.map((tag) => (
						<BlogPostTag tag={tag} key={tag.id} />
					))}
				</div>
			</header>

			<div className="px-6 md:px-0 max-w-2xl mx-auto">
				<main>
					<ReactMarkdown className="prose prose-sm prose-red dark:prose-invert">
						{post.attributes.content}
					</ReactMarkdown>
				</main>
				<Footer locale={params.locale} />
			</div>
		</>
	)
}

export async function generateMetadata({ params }: ReadBlogPostProps): Promise<Metadata> {
	const { slug } = params

	const requestClient: RequestClient = RequestClientFactory.make()
	const post = await requestClient.getPost(slug, i18n.defaultLocale)

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
			url: `https://www.williansfaria.com/blog/${post.attributes.slug}`,
		},
	}
}

export async function generateStaticParams() {
	const requestClient = RequestClientFactory.make()
	const posts = await requestClient.getPostSlugs(i18n.defaultLocale)

	console.log(posts)

	return posts.map((post) => ({
		slug: post.attributes.slug,
	}))
}
