/** @param {Array<Post>} posts
 * @param {string} site
 * @returns string
 */
function renderPosts(posts, site) {
	return posts
		.map(
			(post) => `
            <url>
              <loc>${site}/${post.path}</loc>
              <lastmod>${post.metadata.date.split('T')[0]}</lastmod>
              <changefreq>monthly</changefreq>
            </url>
        `
		)
		.join('');
}

/**@type {import('../$types').PageLoad} */
export async function GET({ fetch, setHeaders }) {
	setHeaders({
		'Content-Type': 'application/xml'
	});
	const site = 'https://williansfaria.com';

	/** @type {Option<Post[]>} */
	const posts = await (await fetch('/api/blog?limit=3').map(async (res) => res.json()))
		.unwrap()
		.ok();

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

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url>
            <loc>${site}</loc>
            <changefreq>daily</changefreq>
            <priority>0.7</priority>
          </url>
          <url>
            <loc>${site}/about</loc>
          </url>
          <url>
            <loc>${site}/blog</loc>
          </url>
          <url>
            <loc>${site}/series</loc>
          </url>
          <url>
            <loc>${site}/index.xml</loc>
          </url>
          ${renderPosts(posts.unwrapOr([]), site)}
          ${renderPosts(everySeriePost, site)}
        </urlset>
    `;

	return new Response(sitemap);
}
