/** @type {import("./$types").PageLoad} */
export async function load({ params }) {
    const slug = params.slug;
    const post = /** @type {Option<Metadata>} */ (await import(`../../../content/${slug}.md`).map(v => v));
    const {
        date,
        tags,
        title,
        categories,
        description,
        minutesToRead,
        secondsToRead
    } = post.unwrap().metadata;

    const content = post.unwrap().default;

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
