import { AlegreyaFont } from '@/app/styles/fonts'
import { Post } from '@/domain/entities/post'
import Link from 'next/link'

interface BlogPostCardProps {
	post: Post
}

export function BlogPostItem({ post }: BlogPostCardProps) {
	return (
		<article className="mt-10">
			<h1 className={`${AlegreyaFont.className} font-black text-2xl text-red-500 mb-2`}>
				<Link href={`/blog/${post.attributes.slug}`}>{post.attributes.title}</Link>
			</h1>
			<p>{post.attributes.excerpt}</p>
			<div className="mt-4">
				{post.attributes.tags.data?.map((tag) => (
					<span
						key={tag.attributes.name}
						className={`${
							tag.attributes.color ? '' : 'bg-red-500'
						} inline-block rounded-full px-4 py-1 text-xs text-gray-100 mr-2`}
						style={{ backgroundColor: tag.attributes.color }}
					>
						{tag.attributes.name}
					</span>
				))}
			</div>
		</article>
	)
}
