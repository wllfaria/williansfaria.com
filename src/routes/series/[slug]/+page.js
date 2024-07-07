import '$lib/asyncOption.js';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const slug = params.slug;

	/** @type {Option<Post[]>} */
	const posts = await (await fetch(`/api/${slug}`).map(async (res) => res.json())).unwrap().ok();

	return { posts: posts.unwrapOr([]) };
}
