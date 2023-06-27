/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import PermissionLayout from '@/layouts/PermissionLayout'
import classes from './style.module.scss'
import { LoginForm } from './components'
import { userStore } from '@/store/state'
import { ADMIN_ROUTES, APP_ROUTES } from '@/utils/routers'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import { Modal } from 'antd'
import * as AuthAPI from '@/api/AuthAPI'
import { LoginResponse } from '@/types/models/auth'
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
			if (token && account_type === 'admin') {
				router.push(ADMIN_ROUTES.DASHBOARD)
			} else if (token && account_type === 'admin') {
				router.push(APP_ROUTES.HOME)
			}
		} catch (error) {
			console.log(error);
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
						src="https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
						alt="login"
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
