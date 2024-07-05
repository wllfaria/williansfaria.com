<script>
	import Seo from '$lib/Seo.svelte';
	import SerieList from './SerieList.svelte';

	/** @type {{series: Serie[]}} */
	export let data;

	const seoData = {
		title: 'Series',
		description: 'A serie of articles about programming, technology and my messy thoughts',
		article: undefined,
		openGraph: {
			title: 'Blog',
			description: 'A blog about programming, technology and my messy thoughts',
			url: 'https://williansfaria.com/blog',
			type: 'website',
			siteName: 'williansfaria.com',
			locale: 'en_US',
			image: {
				url: 'https://williansfaria.com/favicon.png',
				alt: 'Favicon that is a W letter'
			}
		},
		twitter: {
			title: 'Blog',
			description: 'A blog about programming, technology and my messy thoughts',
			site: '@4wiru',
			card: 'summary_large_image',
			creator: '@4wiru',
			url: 'https://williansfaria.com/blog',
			image: {
				url: 'https://williansfaria.com/favicon.png',
				alt: 'Favicon that is a W letter'
			}
		}
	};
</script>

<Seo {...seoData} />

<section class="mt-8">
	{#if data.series.length === 0}
		<p class="text-center text-xl font-bold text-red-300">
			Nothing but us chickens here. Check back later!
		</p>
	{:else}
		<SerieList series={data.series} />
	{/if}
</section>
