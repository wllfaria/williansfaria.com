<script>
	import { shortDate } from '$lib';
	/** @type {Array<Post>} */
	export let posts;
</script>

{#each posts as post}
	<div>
		<p class="mb-1 text-sm text-gray-400">{shortDate(post.metadata.date)}</p>
		<a
			href="/{post.path}"
			class="font-bold underline hover:text-purple-400 decoration-purple-300 hover:decoration-purple-400 underline-offset-4 font-serif text-xl"
		>
			<p class="text-xl">{post.metadata.title}</p>
		</a>
		<p class="mt-2 text-gray-400">{post.metadata.description}</p>
		<div class="flex gap-5">
			{#each post.metadata.tags as tag}
				<p class="mt-2 text-purple-300 text-sm">{tag}</p>
			{/each}
		</div>
	</div>
{/each}
