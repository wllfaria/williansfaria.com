/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	output: 'export',
	images: {
		unoptimized: true,
		remotePatterns: [{ hostname: 'localhost' }, { hostname: 'res.cloudinary.com' }],
	},
}

module.exports = nextConfig
