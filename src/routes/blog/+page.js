import '$lib/asyncOption.js';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const res = await fetch('/api/blog').map(v => v);
    const posts = /** @type {Option<Post[]>} */ (await res.unwrap().json().map(v => v));
    return { posts: posts.unwrap() };
}
