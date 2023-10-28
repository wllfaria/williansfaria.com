import { i18n } from '@/app/i18n'

export function getTimeToRead(postContent: string) {
	const wordsPerMinute = 200
	const numberOfWords = postContent.split(/\s/g).length
	const minutes = numberOfWords / wordsPerMinute
	const readTime = Math.ceil(minutes)
	return readTime
}

export function getReadablePostDate(postDate: string, locale: string) {
	const date = new Date(postDate)
	return date.toLocaleDateString(locale || i18n.defaultLocale, { year: 'numeric', month: 'long', day: 'numeric' })
}
