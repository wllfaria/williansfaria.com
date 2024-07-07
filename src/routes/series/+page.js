import '$lib/asyncOption.js';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch('/api/series').ok();
	const series = /** @type {Option<Serie[]>} */ (await res.unwrap().json().ok());
	return { series: series.unwrapOr([]) };
}
