/**@type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch('/api/blog');
	const posts = /** @type {Array<Post>} */ (await res.json());

	return { posts };
}
