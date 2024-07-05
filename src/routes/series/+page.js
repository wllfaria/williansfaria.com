import '$lib/asyncOption.js';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const res = await fetch('/api/series').map(v => v);
    const series = /** @type {Option<Serie[]>} */ (await res.unwrap().json().map(v => v));
    return { series: series.unwrap() };
}

