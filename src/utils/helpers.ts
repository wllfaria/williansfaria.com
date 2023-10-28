export function getTimeToRead(postContent: string) {
	const wordsPerMinute = 200
	const numberOfWords = postContent.split(/\s/g).length
	const minutes = numberOfWords / wordsPerMinute
	const readTime = Math.ceil(minutes)
	return readTime
}

export function getReadablePostDate(postDate: string) {
	const date = new Date(postDate)
	return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
