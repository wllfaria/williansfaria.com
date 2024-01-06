<script>
	import { longDate } from '$lib';
	import '../../../articles.css';
	import '../../../code.css';
	export let /** @type {PostDetail} */ data;
</script>

<article class="markdown">
	<header>
		<time>{longDate(data.date)}</time>
		<h2>{data.title}</h2>
		<time>Get that coffee brewing; it's a quick {data.minutesToRead}-minute read!</time>
	</header>
	<svelte:component this={data.content} />
</article>
