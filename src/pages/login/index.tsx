/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import classes from './style.module.scss'
import { LoginForm } from './components'
import { userStore } from '@/store/userStore'
import { ADMIN_ROUTES, APP_ROUTES } from '@/utils/routers'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import { Modal } from 'antd'
import * as AuthAPI from '@/api/AuthAPI'
import { LoginResponse } from '@/types/models/auth'
import { PermissionLayout } from '@/layouts'
interface FormData {
	email: string
	password: string
}

export default function LoginPage() {
	const router = useRouter()
	const setUserState = useSetRecoilState(userStore)
	const onSubmit = async (data: FormData) => {
		try {
			const res: LoginResponse = await AuthAPI.login({
				email: data?.email,
				password: data?.password,
			})
			const { id, email, username, account_type, name, gender, phone } =
				res?.user
			const token = res?.accessToken
			setUserState({
				id,
				email,
				username,
				account_type,
				name,
				gender,
				phone,
				token,
			})
			if (token && account_type === 'master') {
				router.push(ADMIN_ROUTES.DASHBOARD)
			} else if (token && account_type === 'normal') {
				router.push(APP_ROUTES.HOME)
			}
		} catch (error) {
			console.log(error)
			Modal.error({
				title: 'Error',
				content: 'Your account do not correct!',
			})
		}
	}
	return (
		<PermissionLayout>
			<div className={classes.loginPage}>
				<div className={classes.leftSide}>
					<img
						src="https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
						alt="login banner"
					/>
				</div>
				<div className={classes.rightSide}>
					<div className={classes.headSide}>
						<img
							src="https://hitek.com.vn/wp-content/uploads/2022/08/logo-300x82.png"
							alt=""
						/>
						<h3>Welcome to Hitek </h3>
					</div>
					<div className={classes.contentSide}>
						<LoginForm onSubmit={onSubmit} />
					</div>
				</div>
			</div>
		</PermissionLayout>
	)
}
