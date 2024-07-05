import '$lib/asyncOption.js';

/**@type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const res = await fetch('/api/blog?limit=3').ok()
    const posts = /** @type {Option<Post[]>} */ (await res.unwrap().json().ok())
    return { posts: posts.unwrap() };
}
