<script>
	import PostList from '$lib/PostList.svelte';
	import Seo from '$lib/Seo.svelte';

	/** @type {{posts: Array<Post>}} */
	export let data;

	const seoData = {
		title: 'Blog',
		description: 'A blog about programming, technology and my messy thoughts',
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

<section class="mt-10 text-lg leading-8 mb-10">
	<p class="mt-4">
		In my blog you will fing long form content, usually as standalone articles, that are meant to be
		read in one sitting, and are usually more than 5 minutes long.
	</p>
</section>

{#if data.posts.length === 0}
	<p class="text-xl">No posts yet. Check back later!</p>
{:else}
	<PostList posts={data.posts} />
{/if}

<section class="mt-8">
	<p>
		Looking for
		<a class="underline underline-offset-2 decoration-purple-400 text-purple-400" href="/"
			>the way home?</a
		>
	</p>
</section>
