/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import classes from './style.module.scss'
import { APP_ROUTES } from '@/utils/routers'
import { useRouter } from 'next/router'
import * as AuthAPI from '@/api/AuthAPI'
import { Modal } from 'antd'
import { PermissionLayout } from '@/layouts'
import { SignupForm } from '@/components'

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
			<div className={classes.signupPage}>
				<div className={classes.leftSide}>
					<img
						src="https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
						alt="register banner"
					/>
				</div>
				<div className={classes.rightSide}>
					<div className={classes.headSide}>
						<img
							src="https://hitek.com.vn/wp-content/uploads/2022/08/logo-300x82.png"
							alt=""
						/>
					</div>
					<div className={classes.contentSide}>
						<SignupForm onSubmit={onSubmit} />
					</div>
				</div>
			</div>
		</PermissionLayout>
	)
}
