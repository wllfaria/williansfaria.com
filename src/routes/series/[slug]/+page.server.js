import fs from 'fs';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	let results = fs.readdirSync('./src/content/series');

	/** @type {{ slug: string }[]} */
	const allPaths = [];

	for (const result of results) {
		allPaths.push({ slug: result });
	}

	return allPaths;
}

export const prerender = true;
