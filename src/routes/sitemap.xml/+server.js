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
    const postsRes = await fetch('/api/blog').map(v => v);

    const posts = /** @type {Option<Post[]>} */ (await postsRes.unwrap().json().map(v => v));

    const site = 'https://williansfaria.com';

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
            <loc>${site}/index.xml</loc>
          </url>
          ${renderPosts(posts.unwrap(), site)}
        </urlset>
    `;

    return new Response(sitemap);
}
