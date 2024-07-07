import '$lib/asyncOption.js';

/**@type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	/** @type {Option<Post[]>} */
	const posts = await (await fetch('/api/blog').map(async (res) => res.json())).unwrap().ok();

	/** @type {Option<Serie[]>} */
	const series = await (await fetch('/api/series').map(async (res) => await res.json()))
		.unwrap()
		.ok();

	return {
		posts: posts.unwrapOr([]),
		series: series.unwrapOr([])
	};
}
