/** @typedef PostMetadata
 * @property title {string}
 * @property date {string}
 * @property description {string}
 * @property tags {string[]}
 * @property categories {string[]}
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