import { json } from '@sveltejs/kit';

/**
 * @returns {Promise<Array<Post>>}
 */
async function getPosts() {
	/** @type {Array<Post>} */
	let posts = [];

	const postFiles = import.meta.glob('/content/blog/*.md');

	for (const [filePath, resolver] of Object.entries(postFiles)) {
		const { metadata } = /** @type {Metadata}*/ (await resolver());
		const path = filePath.replace('/content/', '').replace('.md', '');
		posts.push({ metadata, path });
	}

	return posts;
}

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
