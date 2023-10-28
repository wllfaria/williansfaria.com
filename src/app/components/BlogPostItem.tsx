import { BlogPostTag } from '@/app/components/BlogPostTag'
import initTranslations from '@/app/i18n'
import { AlegreyaFont } from '@/app/styles/fonts'
import { Post } from '@/domain/entities/post'
import { getReadablePostDate, getTimeToRead } from '@/utils/helpers'
import Link from 'next/link'
import Markdown from 'react-markdown'

interface BlogPostCardProps {
	post: Post
	locale: string
}

export async function BlogPostItem({ post, locale }: BlogPostCardProps) {
	const { t } = await initTranslations(locale, ['common'])

	const readingTime = getTimeToRead(post.attributes.content)

	return (
		<article className="mt-10 first-of-type:mt-6">
			<h1 className={`${AlegreyaFont.className} font-black text-2xl text-red-500 dark:text-red-500`}>
				<Link href={`/${post.attributes.locale}/blog/${post.attributes.slug}`}>{post.attributes.title}</Link>
			</h1>
			<section className="mb-3 flex justify-between">
				<p className="text-sm text-gray-500 dark:text-gray-400">
					{getReadablePostDate(post.attributes.createdAt, locale)}
				</p>
				<p className="text-sm text-gray-500 dark:text-gray-400">
					{readingTime} {t('home.article_section.reading_time', { count: readingTime })}
				</p>
			</section>
			<section>
				<Link href={`${post.attributes.locale}/blog/${post.attributes.slug}`}>
					<Markdown className="prose dark:text-gray-100">{post.attributes.excerpt}</Markdown>
				</Link>
			</section>
			<div className="flex flex-wrap gap-2 mt-4">
				{post.attributes.tags.data.map((tag) => (
					<BlogPostTag tag={tag} key={tag.id} />
				))}
			</div>
		</article>
	)
}
