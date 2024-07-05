import '$lib/asyncOption.js';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    const slug = params.slug;
    const res = await fetch(`/api/series?serie=${slug}`).ok()
    const posts = /** @type {Option<PostMetadata[]>} */ (await res.unwrap().json().ok())
    return { posts: posts.unwrap() };
}

