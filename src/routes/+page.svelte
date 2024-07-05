<script>
	import PostList from './blog/PostList.svelte';
	import Seo from '$lib/Seo.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	const seoData = {
		title: 'williansfaria.com',
		description: 'A blog about programming, technology and my messy thoughts',
		article: undefined,
		openGraph: {
			title: 'williansfaria.com',
			description: 'I build stuff, I write about them... sometimes.',
			url: 'https://williansfaria.com/',
			type: 'website',
			siteName: 'williansfaria.com',
			locale: 'en_US',
			image: {
				url: 'https://williansfaria.com/favicon.png',
				alt: 'Favicon that is a W letter'
			}
		},
		twitter: {
			title: 'williansfaria.com',
			description: 'I build stuff, I write about them... sometimes.',
			site: '@4wiru',
			card: 'summary_large_image',
			creator: '@4wiru',
			url: 'https://williansfaria.com/',
			image: {
				url: 'https://williansfaria.com/favicon.png',
				alt: 'Favicon that is a W letter'
			}
		}
	};
</script>

<Seo {...seoData} />

<section class="mt-10 text-lg leading-8">
	<h1 class="text-2xl font-bold font-serif">
		Hi, I'm <a href="/about" class="underline decoration-purple-400 underline-offset-2">Wiru</a>,
	</h1>
	<p class="mt-4">I build a lot of things and I'm trying to start sharing them...</p>
</section>

<section>
	<div class="flex mt-10 mb-4 items-center gap-5">
		<h3 class="text-2xl font-bold font-serif">Latest Serie</h3>
		<a href="/series" class="decoration-purple-300 underline-offset-2 text-purple-300 font-bold"
			>» View all</a
		>
	</div>
	<PostList posts={data.posts} />
</section>

<section>
	<div class="flex mt-10 mb-4 items-center gap-5">
		<h3 class="text-2xl font-bold font-serif">Latest Posts</h3>
		<a href="/blog" class="decoration-purple-300 underline-offset-2 text-purple-300 font-bold"
			>» View all</a
		>
	</div>
	<PostList posts={data.posts} />
</section>
