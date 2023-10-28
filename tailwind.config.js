/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				gray: {
					100: '#F6F7EB',
					800: '#282828',
				},
				red: {
					500: '#FB4934',
				},
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
