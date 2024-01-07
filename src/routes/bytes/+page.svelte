<script>
	import PostList from '$lib/PostList.svelte';

	/** @type {{bytes: Array<Post>}} */
	export let data;
</script>

<section class="mt-10 text-lg leading-8 mb-10">
	<p class="mt-4">
		In my blog you will fing long form content, usually as standalone articles, that are meant to be
		read in one sitting, and are usually more than 5 minutes long.
	</p>
</section>

{#if data.bytes.length === 0}
	<p class="text-xl">No posts yet. Check back later!</p>
{:else}
	<PostList posts={data.bytes} />
{/if}
