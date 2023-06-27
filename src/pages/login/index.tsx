/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import PermissionLayout from '@/layouts/PermissionLayout'
import { userStore } from '@/store/state'
import { ROUTES } from '@/utils/routers'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import classes from './style.module.scss'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { Modal } from 'antd'
import * as AuthAPI from '@/api/AuthAPI'
import { AuthResponse } from '@/types/models/auth'

interface FormData {
	email: string
	password: string
}

export default function LoginPage() {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			email: '',
			password: '',
		},
	})
	const setUserState = useSetRecoilState(userStore)
	const { data: session, status } = useSession()

	const onSubmit = async (data: FormData) => {
		try {
			const res: AuthResponse = await AuthAPI.login({
				email: data.email,
				password: data.password,
			})
			const { id, first_name, last_name, is_admin, phone, email, username } =
				res?.results?.row
			const token = res?.results.accessToken
			setUserState({
				id,
				first_name,
				last_name,
				is_admin,
				phone,
				email,
				username,
				token,
			})
			setTimeout(() => {
				router.push(ROUTES.HOME)
			}, 500)
		} catch (error) {
			Modal.error({
				title: 'Error',
				content: 'Your account do not correct!',
			})
		}
	}

	if (status === 'loading') {
		return null
	}

	if (session) {
		return (
			<>
				<Image
					src={session?.user?.image || ''}
					alt="avatar"
					width={25}
					height={25}
					className="h-48 w-48 rounded-full"
				/>
				<br />
				Signed in as {session?.user?.email} <br />
				<button onClick={() => signOut()}>Sign Out</button>
			</>
		)
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
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className={classes.formGroup}>
								<label>Email</label>
								<input
									placeholder="Enter your Email"
									type="email"
									{...register('email', {
										required: true,
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: 'Invalid email address',
										},
									})}
								/>
								{errors && errors.email && errors.email.type === 'required' && (
									<p className={classes.required}>Email is required</p>
								)}
							</div>
							<div className={classes.formGroup}>
								<label>Password</label>
								<input
									placeholder="Enter your password"
									type="password"
									{...register('password', { required: true })}
								/>
								{errors &&
									errors.password &&
									errors.password.type === 'required' && (
										<p className={classes.required}>Password is required</p>
									)}
							</div>
							<div className={classes.forgotPassword}>
								<p>Forgot Password?</p>
							</div>
							<div className={classes.btnSide}>
								<button type="submit">Log in</button>
								<p>
									Don't have an account?{' '}
									<a onClick={() => signIn()}>Sign up for free</a>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</PermissionLayout>
	)
}
