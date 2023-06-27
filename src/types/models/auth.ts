import { UserModal } from './user'

export type AuthModel = {
	email: string
	password: string
}

export type AuthResponse = {
	status: {
		code: number
		msg: string
	}
	results: {
		row: UserModal
		accessToken: string
	}
}

export type LoginPayload = {
	email: string
	password: string
}

export type SignupPayload = {
    username: string
    password: string
    account_type: string
    name: string
    dob: string
    gender: number
    phone: string
}

export type LoginResponse = {
    accessToken: string
	user: UserModal
}