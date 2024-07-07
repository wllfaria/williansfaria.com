import fs from 'fs';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	let results = fs.readdirSync('./src/content/series');

	/** @type {{ slug: string, chapter: string}[]} */
	const allPaths = [];

	for (const result of results) {
		const chapters = fs.readdirSync(`./src/content/series/${result}`);
		for (const chapter of chapters) {
			if (!chapter.includes('.md')) continue;
			allPaths.push({ slug: result, chapter: chapter.replace('.md', '') });
		}
	}

	return allPaths;
}

export const prerender = true;
