import { json } from '@sveltejs/kit';

/**
 * @returns {Promise<Array<Post>>}
 */
async function getPosts() {
	/** @type {Array<Post>} */
	let posts = [];

	const postFiles = import.meta.glob('/src/content/blog/*.md');

	for (const [filePath, resolver] of Object.entries(postFiles)) {
		const { metadata } = /** @type {Metadata}*/ (await resolver());
		const path = filePath.replace('/src/content/', '').replace('.md', '');
		if (metadata.draft) continue;
		posts.push({ metadata, path });
	}
	posts.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
	return posts;
}

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
