<script>
	import PostList from '$lib/PostList.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<section class="mt-10 text-lg leading-8">
	<h2 class="text-2xl font-bold font-serif">
		I'm <a href="/about" class="underline decoration-purple-400 underline-offset-2"
			>Willians Faria</a
		>,
	</h2>
	<p class="mt-4">
		My goal is to take you on a journey through the world of computers and programming. Well,
		actually its a mishmash of my thoughts, discoveries, experiences, and the occasional burst of
		wisdom (or so I'd like to believe).
	</p>
	<p class="mt-4">Excited? Let's dive in!</p>
</section>

<section>
	<div class="flex mt-10 mb-4 items-center gap-5">
		<h3 class="text-xl font-bold font-serif">Latest Post</h3>
		<a
			href="/blog"
			class="underline decoration-purple-300 underline-offset-2 text-purple-300 font-bold"
			>» View all</a
		>
	</div>
	<PostList posts={[data.post]} />
</section>
