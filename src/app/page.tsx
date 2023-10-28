import { AlegreyaFont } from '@/app/styles/fonts'

import { Bio } from '@/app/components/Bio'
import { BlogPostItem } from '@/app/components/BlogPostItem'
import { Footer } from '@/app/components/Footer'
import { RequestClient } from '@/domain/contracts/requestClient'
import { Post } from '@/domain/entities/post'
import { RequestClientFactory } from '@/main/factories/infra/requestClientFactory'

async function getPosts() {
	const requestClient: RequestClient = RequestClientFactory.make()
	const posts: Post[] = await requestClient.getPosts()
	return posts
}

export default async function Home() {
	const posts: Post[] = await getPosts()

	return (
		<div className="px-6 pt-16 md:px-0 max-w-2xl mx-auto">
			<header>
				<Bio />
			</header>
			<main>
				<h1 className={`${AlegreyaFont.className} font-black text-3xl text-red-500`}>Time for some reading fun!</h1>
				{posts?.map((post) => <BlogPostItem post={post} key={post.attributes.slug} />)}
			</main>
			<Footer />
		</div>
	)
}
