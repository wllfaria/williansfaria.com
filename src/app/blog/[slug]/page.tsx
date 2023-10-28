import { Bio } from '@/app/components/Bio'
import { BlogPostTag } from '@/app/components/BlogPostTag'
import { Footer } from '@/app/components/Footer'
import { GoBack } from '@/app/components/GoBack'
import { AlegreyaFont } from '@/app/styles/fonts'
import { RequestClient } from '@/domain/contracts/requestClient'
import { Post } from '@/domain/entities/post'
import { RequestClientFactory } from '@/main/factories/infra/requestClientFactory'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

async function getPost(postSlug: string): Promise<Post> {
	const requestClient: RequestClient = RequestClientFactory.make()
	const post: Post = await requestClient.getPost(postSlug)

	return post
}

interface ReadBlogPostProps {
	params: { slug: string }
}

export default async function ReadBlogPost({ params }: ReadBlogPostProps) {
	const post = await getPost(params.slug)

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
					<GoBack />
				</div>
				<div className="px-6 md:px-0 max-w-2xl mx-auto">
					{!post.attributes.cover.data && <Bio />}
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
				<Footer />
			</div>
		</>
	)
}

export async function generateStaticParams() {
	const requestClient = RequestClientFactory.make()
	const posts = await requestClient.getPostSlugs()

	return posts.map((post) => ({
		slug: post.attributes.slug,
	}))
}
