/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import PermissionLayout from '@/layouts/PermissionLayout'
import classes from './style.module.scss'
import { SignupForm } from './components'
import { APP_ROUTES } from '@/utils/routers'
import { useRouter } from 'next/router'
import * as AuthAPI from '@/api/AuthAPI'
import { Modal } from 'antd'

interface FormData {
	username: string
	email: string
	password: string
	account_type: string
	name: string
	dob: string
	gender: number
	phone: string
}

export default function SignupPage() {
	const router = useRouter()
	const onSubmit = async (data: FormData) => {
		try {
			await AuthAPI.signup({
				username: data?.username,
				email: data?.email,
				password: data?.password,
				account_type: data?.account_type || 'normal',
				name: data?.name,
				dob: data?.dob,
				gender: data?.gender,
				phone: data?.phone,
			})
			router.push(APP_ROUTES.LOGIN)
		} catch (error) {
			console.log(error);
			Modal.error({
				title: 'Error',
				content: 'Something went wrong!',
			})
		}
	}
	return (
		<PermissionLayout>
			<div className={classes.loginPage}>
				<div className={classes.leftSide}>
					<img
						src="https://source.unsplash.com/random/?banner/1790x80"
						alt="register banner"
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
						<SignupForm onSubmit={onSubmit} />
					</div>
				</div>
			</div>
		</PermissionLayout>
	)
}
