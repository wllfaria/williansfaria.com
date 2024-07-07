import fs from 'fs/promises';
import path from 'path';
import { json } from '@sveltejs/kit';

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
 * @param {Post} post
 * @returns {string}
 * */
function makePath(serie, post) {
	return `series/${serie}/${post.metadata.title.replaceAll(' ', '-').toLowerCase()}`;
}

/**
 * @param {string} filePath
 * @param {string} serie
 * @returns {Promise<Post[]>}
 * */
async function readDir(filePath, serie) {
	return (
		await fs
			.readdir(filePath)
			.map((files) => files.filter((f) => f.includes('.md')))
			.andThen((f) => f.map((files) => Promise.all(files.map((file) => importFile(serie, file)))))
	).unwrap();
}

/**
 * @param {string} serie
 * @returns {Promise<Post[]>}
 * */
async function getSerie(serie) {
	const filePath = path.join('.', 'src', 'content', 'series', serie);
	return (await readDir(filePath, serie).map((res) => res.filter((post) => !post.metadata.draft)))
		.unwrapOr([])
		.map((post) => ({
			...post,
			path: makePath(serie, post)
		}));
}

/** @type {import('../$types').RequestHandler} */
export async function GET({ params }) {
	const serie = /** @type {{ serie: string }} */ (params).serie;
	return json(await getSerie(serie));
}
