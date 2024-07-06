<script>
	import Seo from '$lib/Seo.svelte';

	const seoData = {
		title: 'About',
		description: 'A blog about programming, technology and my messy thoughts',
		article: undefined,
		openGraph: {
			title: 'About',
			description: 'A blog about programming, technology and my messy thoughts',
			url: 'https://williansfaria.com/about',
			type: 'website',
			siteName: 'williansfaria.com',
			locale: 'en_US',
			image: {
				url: 'https://williansfaria.com/favicon.png',
				alt: 'Favicon that is a W letter'
			}
		},
		twitter: {
			title: 'About',
			description: 'A blog about programming, technology and my messy thoughts',
			site: '@4wiru',
			card: 'summary_large_image',
			creator: '@4wiru',
			url: 'https://williansfaria.com/about',
			image: {
				url: 'https://williansfaria.com/favicon.png',
				alt: 'Favicon that is a W letter'
			}
		}
	};
</script>

<Seo {...seoData} />

<h2 class="text-2xl font-bold font-reggae-one mt-10 mb-8">About</h2>

<section class="text-lg leading-8 mb-8">
	<p class="mb-4">
        I'm wiru, I'm a software engineer from brazil;
	</p>
	<p class="mb-4">
        I started my career as a web developer back in 2017, and over the years I started getting
        more and more interested about lower level software and backend. Nowadays, I mainly code
        Rust, and play with Ocaml all the time.
	</p>
	<p class="mb-4">
        I build all sorts of random things, and I'm really invested into making my own day to day
        tools. If you want to contact me you can email me at <a
			class="underline underline-offset-2 decoration-purple-300 text-purple-300"
			href="mailto:offwiru@gmail.com">offwiru@gmail.com</a
		>
	</p>
</section>

