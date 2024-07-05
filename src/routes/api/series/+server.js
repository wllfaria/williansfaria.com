import { option } from '$lib/option';
import fs from 'fs/promises';
import path from 'path';
import { json } from '@sveltejs/kit';

/** @typedef {Record<string, () => Promise<SerieMeta | Metadata>>} MetadataGlob  */

/**
 * @param {Option<string>} maybeLimit
 * @returns {Promise<Serie[]>}
 * */
async function getSeries(maybeLimit) {
	const files = /** @type MetadataGlob */ (import.meta.glob('/src/content/series/**'));
	const entries = Object.entries(files);
	const length = entries.length;
	const limit = maybeLimit.map((limit) => parseInt(limit, 10)).unwrapOr(length);

	/** @type {Record<string, Serie>} */
	const metadatas = {};
	const newSerie = {
		meta: /** @type SerieMeta */ ({}),
		chapters: [],
		totalChapters: 0,
		minutesToRead: 0
	};

	for (let i = 0; i < Math.min(limit, length); ++i) {
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

/**
 * @param {string} serie
 * @param {string} file
 * @returns {Promise<Post>}
 * */
function importFile(serie, file) {
	return import(/* @vite-ignore */ `/src/content/series/${serie}/${file}`);
}

/**
 * @param {string} serie
 * @returns {Promise<Post[]>}
 * */
async function getSerie(serie) {
	const filePath = path.join('.', 'src', 'content', 'series', serie);
	const result = await fs
		.readdir(filePath)
		.map((files) => files.filter((f) => f.includes('.md')))
		.andThen((f) => f.map((files) => Promise.all(files.map((file) => importFile(serie, file)))));

	const posts = await result.unwrap().map((posts) => posts.filter((post) => !post.metadata.draft));
	return posts.unwrap();
}

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
	const limit = option(event.url.searchParams.get('limit'));
	const serie = option(event.url.searchParams.get('serie'));
	const kind = serie.isSome() ? 'single' : 'list';

	const requestKind = {
		single: async () => await getSerie(serie.unwrap()),
		list: async () => await getSeries(limit)
	};

	return json(await requestKind[kind]());
}
