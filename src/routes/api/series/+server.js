import { json } from '@sveltejs/kit';

/** @typedef {Record<string, () => Promise<SerieMeta | Metadata>>} MetadataGlob  */

/** @returns {Promise<Serie[]>} */
async function getSeries() {
	const files = /** @type MetadataGlob */ (import.meta.glob('/src/content/series/**'));
	const entries = Object.entries(files);
	const length = entries.length;

	/** @type {Record<string, Serie>} */
	const metadatas = {};
	const newSerie = {
		meta: /** @type SerieMeta */ ({}),
		chapters: [],
		totalChapters: 0,
		minutesToRead: 0
	};

	for (let i = 0; i < length; ++i) {
		const [path, resolver] = entries[i];
		const dirname = path.replace('/src/content/series/', '').split('/')[0];
		const kind = path.includes('meta.json') ? 'metadata' : 'article';
		if (!metadatas[dirname]) metadatas[dirname] = { ...newSerie };

		const fileKind = {
			metadata: await resolver().map(
				(metadata) => (metadatas[dirname].meta = /** @type {SerieMeta} */ (metadata))
			),
			article: await resolver().map((m) => {
				const { metadata } = /** @type {Metadata} */ (m);
				if (metadata.draft) return;
				metadatas[dirname].minutesToRead += metadata.minutesToRead;
				metadatas[dirname].totalChapters += 1;
				metadatas[dirname].chapters.push(metadata);
			})
		};

		fileKind[kind];
	}

	return Object.values(metadatas).filter((serie) => !serie.meta.draft);
}

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return json(await getSeries());
}
