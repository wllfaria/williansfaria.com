import { option, none, some } from '$lib/option'
import fs from 'fs/promises'
import path from 'path'
import { json } from '@sveltejs/kit';

/** @typedef {Record<string, () => Promise<SerieMeta | Metadata>>} MetadataGlob  */

/**
 * @param {Option<string>} maybeLimit
 * @returns {Promise<Serie[]>}
 * */
async function getSeries(maybeLimit) {
    const files = /** @type MetadataGlob */ (import.meta.glob("/src/content/series/**"));
    const entries = Object.entries(files);
    const length = entries.length;
    const limit = maybeLimit.map(limit => parseInt(limit, 10)).unwrapOr(length);

    /** @type {Record<string, Serie>} */
    const metadatas = {}
    const newSerie = {
        meta: /** @type SerieMeta */ ({}),
        chapters: [],
        totalChapters: 0,
        minutesToRead: 0,
    }

    for (let i = 0; i < Math.min(limit, length); ++i) {
        const [path, resolver] = entries[i]
        const dirname = path.replace("/src/content/series/", "").split('/')[0];
        const kind = path.includes('meta.json') ? 'metadata' : 'article'
        if (!metadatas[dirname]) metadatas[dirname] = { ...newSerie }

        const fileKind = {
            metadata: async () => {
                const maybeMetadata = await resolver().ok();
                if (maybeMetadata.isNone()) return;
                const metadata = /** @type {SerieMeta} */ (maybeMetadata.unwrap())
                metadatas[dirname].meta = metadata
            },
            article: async () => {
                const maybeArticle = await resolver().ok();
                if (maybeArticle.isNone()) return;
                const { metadata } =  /** @type {Metadata} */ (maybeArticle.unwrap())
                metadatas[dirname].minutesToRead += metadata.minutesToRead
                metadatas[dirname].totalChapters += 1
                metadatas[dirname].chapters.push(metadata);
            }
        }

        await fileKind[kind]()
    }

    return Object.values(metadatas).filter(serie => !serie.meta.draft)
}

/**
 * @param {string} serie
 * @returns {Promise<Post[]>}
 * */
async function getSerie(serie) {
    const filePath = path.join('.', 'src', 'content', 'series', serie)
    const maybeFiles = await fs.readdir(filePath).ok()
    if (maybeFiles.isNone()) throw new Error('failed to read dir')
    const filenames = maybeFiles.unwrap().filter(f => f.includes('.md'))
    /** @type {Post[]} */
    const chapters = [];
    for (const file of filenames) {
        const maybeChapter = /** @type {Option<Post>} */ (await import(/* @vite-ignore */`/src/content/series/${serie}/${file}`).ok())
        if (maybeChapter.isNone()) continue;
        const chapter = maybeChapter.unwrap();
        if (chapter.metadata.draft) continue;
        chapters.push(chapter);
    }

    return chapters
}

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
    const limit = option(event.url.searchParams.get('limit'))
    const serie = option(event.url.searchParams.get('serie'))
    const kind = serie.isSome() ? 'single' : 'list'

    const requestKind = {
        single: async () => await getSerie(serie.unwrap()),
        list: async () => await getSeries(limit),
    }

    return json(await requestKind[kind]())
}

