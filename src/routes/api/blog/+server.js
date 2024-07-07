import { json } from '@sveltejs/kit';

/** @typedef {Record<string, () => Promise<Metadata>>} MetadataGlob  */

/** @returns {Promise<Post[]>} */
async function getPosts() {
	/** @type {Post[]} */
	const posts = [];
	const postFiles = /** @type MetadataGlob */ (import.meta.glob('/src/content/*.md'));
	const entries = Object.entries(postFiles);
	const length = entries.length;

	for (let i = 0; i < length; ++i) {
		const [filePath, resolver] = entries[i];

		const maybeMetadata = await resolver().map((value) => value.metadata);
		if (maybeMetadata.isNone()) continue;
		const metadata = maybeMetadata.unwrap();
		const path = filePath.replace('/src/content/', 'blog/').replace('.md', '');
		if (metadata.draft) continue;
		posts.push({ metadata, path });
	}

	posts.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
	return posts;
}

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
