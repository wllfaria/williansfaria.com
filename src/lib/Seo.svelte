<script>
	/**
	 * @typedef Article
	 * @property {string} publisher
	 * @property {string} section
	 * @property {string} tags
	 */

	/**
	 * @typedef OpenGraph
	 * @property {string} title
	 * @property {string} description
	 * @property {string} url
	 * @property {string} type
	 * @property {string} siteName
	 * @property {string} locale
	 * @property {{url: string, alt: string}} image
	 */

	/**
	 * @typedef Twitter
	 * @property {string} title
	 * @property {string} description
	 * @property {string} card
	 * @property {string} site
	 * @property {string} creator
	 * @property {string} url
	 * @property {{url: string, alt: string}} image
	 */

	export let /** @type {string} */ title;
	export let /** @type {string} */ description;
	export let /** @type {Article | undefined} */ article;
	export let /** @type {OpenGraph | undefined} */ openGraph;
	export let /** @type {Twitter | undefined} */ twitter;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	{#if openGraph !== undefined}
		<meta property="og:title" content={openGraph.title} />
		<meta property="og:description" content={openGraph.description} />
		<meta property="og:image" content={openGraph.image.url} />
		<meta property="og:image:alt" content={openGraph.image.alt} />
		<meta property="og:url" content={openGraph.url} />
		<meta property="og:type" content={openGraph.type} />
		<meta property="og:site_name" content={openGraph.siteName} />
		<meta property="og:locale" content={openGraph.locale} />
	{/if}

	{#if article !== undefined}
		<meta property="article:publisher" content={article.publisher} />
		<meta property="article:section" content={article.section} />
		<meta property="article:tag" content={article.tags} />
	{/if}

	{#if twitter !== undefined}
		<meta property="twitter:card" content={twitter.card} />
		<meta property="twitter:site" content={twitter.site} />
		<meta property="twitter:creator" content={twitter.creator} />
		<meta property="twitter:title" content={twitter.title} />
		<meta property="twitter:description" content={twitter.description} />
		<meta property="twitter:image" content={twitter.image.url} />
		<meta property="twitter:image:alt" content={twitter.image.alt} />
		<meta property="twitter:url" content={twitter.url} />
	{/if}
</svelte:head>
