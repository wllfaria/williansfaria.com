/** @type {import("./$types").PageLoad} */
export async function load({ fetch }) {
	const res = await fetch('/api/bytes');
	const bytes = await res.json();

	return { bytes };
}
