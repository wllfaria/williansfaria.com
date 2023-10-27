/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				gray: {
					100: '#F6F7EB',
					800: '#393E41',
				},
				red: {
					500: '#E94F37',
				},
			},
		},
	},
	plugins: [],
}
