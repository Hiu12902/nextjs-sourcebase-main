import { UserModal } from './user'

export type LoginPayload = {
	email: string
	password: string
}

export type SignupPayload = {
	username: string
	email: string
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
