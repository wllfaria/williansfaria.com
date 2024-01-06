/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				base: '#181616'
			},
			fontFamily: {
				sans: ['Open Sans', 'sans-serif'],
				mono: ['DM Mono', 'monospace'],
				serif: ['Playfair Display', 'serif']
			}
		}
	},
	plugins: []
};
