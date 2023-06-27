import AuthLayout from '@/layouts/AuthLayout'
import { userStore } from '@/store/state'
import { useRecoilValue } from 'recoil'

export default function ProfilePage() {
	const userState = useRecoilValue(userStore)

	return (
		<AuthLayout>
			<div>{userState.id}</div>
			<div>{userState.first_name}</div>
			<div>{userState.last_name}</div>
			<div>{userState.email}</div>
			<div>{userState.phone}</div>
		</AuthLayout>
	)
}
