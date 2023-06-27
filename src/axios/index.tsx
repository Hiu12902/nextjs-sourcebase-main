import axios from 'axios'
import Cookies from 'universal-cookie'

// Setup Base URL
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

// Request interceptor
axios.interceptors.request.use(
	(config) => {
		// Add common headers, query parameters, or any other modifications to the request
		const cookies = new Cookies()
		const token = cookies.get('TOKEN')

		config.headers['Authorization'] = 'Bearer ' + token
		return config
	},
	(error) => Promise.reject(error),
)

// Response interceptor
axios.interceptors.response.use(
	(response) => {
		// Handle common response data, such as extracting a token for authentication
		return response
	},
	(error) => {
		// Handle common error cases, such as unauthorized access or network errors
		if (error.response.status === 401) {
			// Redirect to login page
			console.log('Fobidden !')
		}
		return Promise.reject(error)
	},
)

export default axios
