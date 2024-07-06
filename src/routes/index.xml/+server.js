/**
 * @param {Array<Post>} posts
 * @param {string} site
 * @returns string
 */
function renderPosts(posts, site) {
	return posts
		.map(
			(post) => `
            <item>
                <title>${post.metadata.title}</title>
                <link>${site}/${post.path}</link>
                <pubDate>${new Date(post.metadata.date).toUTCString()}</pubDate>

                <guid>${site}/${post.path}</guid>
                <description>${post.metadata.description}</description>
            </item>
        `
		)
		.join('');
}

/**@type {import('../$types').PageLoad} */
export async function GET({ fetch, setHeaders }) {
	setHeaders({
		'Content-Type': 'application/xml'
	});
	const postsRes = await fetch('/api/blog').map((v) => v);

	const posts = /** @type {Option<Post[]>} */ (
		await postsRes
			.unwrap()
			.json()
			.map((v) => v)
	);

	const site = 'https://williansfaria.com';

	/** @type {Post[]} */
	let everySeriePost = [];

	/** @type {Option<Serie[]>} */
	const series = await (await fetch('/api/series').map(async (res) => await res.json()))
		.unwrap()
		.ok();

	for (const serie of series.unwrapOr([])) {
		const slug = serie.meta.slug;
		/** @type {Post[]} */
		const seriePosts = (
			await (await fetch(`/api/series?serie=${slug}`).map(async (res) => res.json())).unwrap().ok()
		).unwrapOr([]);
		everySeriePost = [...everySeriePost, ...seriePosts];
	}

	const rss = `<?xml version="1.0" encoding="utf-8" standalone="yes"?>
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
            <title>Wiru&#39;s Blog</title>
            <link>${site}/</link>
            <description>Recent content on Wiru&#39;s Blog</description>
            <generator>javascript</generator>
            <language>en-us</language>
            <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
            <atom:link href="${site}/index.xml" rel="self" type="application/rss+xml" />
            ${renderPosts(posts.unwrap(), site)}
            ${renderPosts(everySeriePost, site)}
        </channel>
        </rss>
    `;

	return new Response(rss);
}
