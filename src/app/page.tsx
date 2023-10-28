import { AlegreyaFont, RubikMonoOneFont } from '@/app/styles/fonts'
import Image from 'next/image'

import { BlogPostItem } from '@/app/components/BlogPostItem'
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
		<>
			<header className="pt-6 mb-8">
				<section className="flex gap-2 align-center">
					<Image
						src="/profile-picture.webp"
						alt="Me, looking to the left side with a big smile"
						width="1024"
						height="1024"
						className="rounded-full w-16 h-16"
					/>
					<hgroup>
						<h1 className={`${RubikMonoOneFont.className} text-3xl tracking-tighter text-red-500`}>Willians Faria</h1>
						<p>Software Engineer sharing his messy thoughts</p>
					</hgroup>
				</section>
			</header>
			<main>
				<h1 className={`${AlegreyaFont.className} font-black text-3xl text-red-500 mb-4`}>
					Heres something for you to read!
				</h1>
				{posts?.map((post) => <BlogPostItem post={post} key={post.attributes.slug} />)}
			</main>
			<footer className="mt-6 pb-12">
				<hr />
				<h1 className={`${AlegreyaFont.className} font-black text-2xl text-red-500 mt-4`}>Catch me online</h1>
				<ul className="flex gap-2 mt-2">
					<li>
						<a href="https://twitter.com/4wiru" target="_blank">
							Twitter
						</a>
					</li>
					<li>
						<a href="https://github.com/wllfaria" target="_blank">
							Github
						</a>
					</li>
				</ul>
			</footer>
		</>
	)
}
