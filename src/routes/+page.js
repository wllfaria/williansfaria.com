/**@type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch('/api/posts');
	const posts = /** @type {Array<Post>} */ (await res.json());

	return {
		post: posts[0]
	};
}
