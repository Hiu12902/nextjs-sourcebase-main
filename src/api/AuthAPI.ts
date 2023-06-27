import axios from '@/axios'
import { LoginPayload, SignupPayload } from '@/types/models/auth'
import { exportResults } from '@/utils/api'
import { APP_ROUTES } from '@/utils/routers'

export const login = async (payload: LoginPayload): Promise<any> => {
	return exportResults(await axios.post(APP_ROUTES.LOGIN, payload))
}

export const signup = async (payload: SignupPayload): Promise<any> => {
	return exportResults(await axios.post(APP_ROUTES.SIGNUP, payload))
}
