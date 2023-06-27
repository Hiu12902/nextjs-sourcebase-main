import axios from '@/axios'
import { exportResults } from '@/utils/api'
import { AUTH_API_ROUTES } from '@/utils/routers'

export const login = async (payload: { email: string; password: string }) =>
	exportResults(await axios.post(AUTH_API_ROUTES.AUTH_LOGIN, payload))
