/** @type {import("./$types").PageLoad} */
export async function load({ params }) {
	const slug = params.slug;
	const post = /** @type {Metadata} */ (await import(`../../../content/blog/${slug}.md`));
	const { date, tags, title, categories, description, minutesToRead, secondsToRead } =
		post.metadata;
	const content = post.default;

	return {
		date,
		tags,
		title,
		categories,
		description,
		slug,
		content,
		minutesToRead,
		secondsToRead
	};
}
