<script>
	import PostList from '$lib/PostList.svelte';

	/** @type {{posts: Array<Post>}} */
	export let data;
</script>

<section class="mt-10 text-lg leading-8 mb-10">
	<p class="mt-4">
		In my blog you will fing long form content, usually as standalone articles, that are meant to be
		read in one sitting, and are usually more than 5 minutes long.
	</p>
</section>

<PostList posts={data.posts} />

<section class="mt-8">
	<p>
		Looking for
		<a class="underline underline-offset-2 decoration-purple-400 text-purple-400" href="/"
			>the way home?</a
		>
	</p>
</section>
