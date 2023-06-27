export const ROUTES = {
	HOME: '/',
	ABOUT: '/about',
	PRODUCTS: '/products',
	PRODUCT: '/product/:id',
	LOGIN: '/login',
	CONTACT: '/contact',
	BLOGS: '/blogs',
	BLOG: '/blog/:id',
	PROFILE: '/profile',
	SIGNUP: '/signup',
}

export const USER_API_ROUTES = {
	USERS: '/api/users',
	USER_DELETE: '/:id',
	USER_FIND_BY_ID: '/:id',
	USER_GET_LIST: '/',
}

export const AUTH_API_ROUTES = {
	AUTH_REGISTER: '/register',
	AUTH_LOGIN: 'auth/login',
}

export const BLOG_API_ROUTES = {
	BLOGS: '/blogs',
	GET_LIST: '/',
	CREATE: '/',
	FIND_BY_ID: '/:id',
	PATCH: '/:id',
	DELETE: '/:id',
}
