import { RequestClient } from '@/domain/contracts/requestClient'
import { RequestClientFactory } from '@/main/factories/infra/requestClientFactory'

async function getPost(postSlug: string) {
	const requestClient: RequestClient = RequestClientFactory.make()
	const post = await requestClient.getPost(postSlug)

	return post
}

interface ReadBlogPostProps {
	params: { slug: string }
}

export default function ReadBlogPost({ params }: ReadBlogPostProps) {
	const post = getPost(params.slug)

	return (
		<>
			<header></header>
			<main></main>
			<footer></footer>
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
