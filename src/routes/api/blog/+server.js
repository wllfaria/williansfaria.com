import { json } from '@sveltejs/kit';
import { option } from '$lib/option'


/** @typedef {Record<string, () => Promise<Metadata>>} MetadataGlob  */

/**
 * @param {Option<string>} maybeLimit
 * @returns {Promise<Post[]>} 
 * */
async function getPosts(maybeLimit) {
    /** @type {Post[]} */
    const posts = [];
    const postFiles = /** @type MetadataGlob */ (import.meta.glob('/src/content/*.md'));
    const entries = Object.entries(postFiles);
    const length = entries.length;
    let limit = maybeLimit.map((value) => parseInt(value, 10)).unwrapOr(length);

    for (let i = 0; i < Math.min(limit, length); ++i) {
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
export async function GET(event) {
    const limit = event.url.searchParams.get('limit')
    const posts = await getPosts(option(limit));
    return json(posts);
}
