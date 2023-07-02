/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	reactStrictMode: true,
	images: {
		domains: ['scontent.fsgn2-8.fna.fbcdn.net'],
	},
	distDir: "_next",
	generateBuildId: async () => { if (process.env.BUILD_ID) { return process.env.BUILD_ID; } else { return `${new Date().getTime()}`; } },
}

module.exports = nextConfig
