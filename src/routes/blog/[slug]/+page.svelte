<script>
	import Article from '$lib/Article.svelte';
	import Seo from '$lib/Seo.svelte';
	export let /** @type {PostDetail} */ data;

	const seoData = {
		title: data.title,
		description: data.description,
		article: {
			publisher: 'https://williansfaria.com',
			section: data.categories[0],
			tags: data.tags.join(', ')
		},
		openGraph: {
			title: data.title,
			description: data.description,
			url: 'https://williansfaria.com/blog' + data.slug,
			type: 'article',
			siteName: 'williansfaria.com',
			locale: 'en_US',
			image: {
				url: 'https://williansfaria.com/favicon.png',
				alt: 'Favicon that is a W letter'
			}
		},
		twitter: {
			title: data.title,
			description: data.description,
			site: '@4wiru',
			card: 'summary_large_image',
			creator: '@4wiru',
			url: 'https://williansfaria.com/blog/' + data.slug,
			image: {
				url: 'https://williansfaria.com/favicon.png',
				alt: 'Favicon that is a W letter'
			}
		}
	};
</script>

<Seo {...seoData} />

<Article {data} />
