<script>
	/** @type {Serie[]} */
	export let series;
</script>

{#each series as serie}
	<div>
		<a
			href="/series/{serie.meta.slug}"
			class="font-bold hover:text-purple-400 decoration-purple-300 hover:decoration-purple-400 underline-offset-4 font-serif text-xl"
		>
			<p
				class="hover:text-purple-400 decoration-purple-300 hover:decoration-purple-400 underline-offset-4 font-serif text-xl"
			>
				{serie.meta.name}
			</p>
		</a>
		<p class="mt-4 text-gray-400">{serie.meta.description}</p>
		<div class="flex gap-5">
			<p class="mt-4 text-sm text-gray-400">Time to read: {serie.minutesToRead} minutes</p>
			<p class="mt-4 text-sm text-gray-400">Chapters: {serie.totalChapters}</p>
			<p class="mt-4 text-sm text-gray-400">
				Status: {serie.meta.finished ? 'Finished' : 'Ongoing'}
			</p>
		</div>
	</div>
{/each}
