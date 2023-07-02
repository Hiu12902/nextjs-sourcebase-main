const BASE_URL = 'https://nextjs-sourcebase-json-server.vercel.app/' 
// user routes
export const APP_ROUTES = {
	// homepage
	HOME: `${BASE_URL}/`,

	// authentication
	LOGIN: `${BASE_URL}/login`,
	SIGNUP: `${BASE_URL}/signup`,

	// blogs
	BLOGS: `${BASE_URL}/blogs`,
}

export const ADMIN_ROUTES = {
	DASHBOARD: `${BASE_URL}/dashboard`,

	// blogs
	CREATE: `${BASE_URL}/dashboard/create`,
}
