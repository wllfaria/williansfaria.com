<script>
	import { longDate } from '$lib';
	import '../articles.css';
	import '../code.css';
	export let /** @type {PostDetail} */ data;
</script>

<article id="main">
	<header>
		<time>{longDate(data.date)}</time>
		<h2>{data.title}</h2>
		<time>{data.minutesToRead} minutes read</time>
	</header>
	<svelte:component this={data.content} />
</article>
