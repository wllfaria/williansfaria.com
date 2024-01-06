/** @typedef PostMetadata
 * @property title {string}
 * @property date {string}
 * @property description {string}
 * @property tags {string[]}
 * @property categories {string[]}
 * @property minutesToRead {number}
 * @property secondsToRead {number}
 */
/** @typedef Metadata
 * @property default {Record<string, unknown>}
 * @property metadata {PostMetadata}
 */
/**
 * @typedef Post
 * @property metadata {PostMetadata}
 * @property path {string}
 */
/**
 * @typedef PostDetail
 * @property date {string}
 * @property tags {string[]}
 * @property title {string}
 * @property categories {string[]}
 * @property description {string}
 * @property content {import("svelte").ComponentType}
 * @property slug {string}
 * @property minutesToRead {number}
 * @property secondsToRead {number}
 */
