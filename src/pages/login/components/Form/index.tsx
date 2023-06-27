/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Button, Form, Input } from 'antd'
import classes from './style.module.scss'
import { useRouter } from 'next/router'
import { APP_ROUTES } from '@/utils/routers'

interface FormData {
	email: string
	password: string
}
interface LoginFormProps {
	onSubmit: (data: FormData) => void
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
	const router = useRouter()
	return (
		<Form
			name="basic"
			layout="vertical"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 24 }}
			initialValues={{ remember: true }}
			onFinish={onSubmit}
			className={classes.wrapper}
		>
			<Form.Item
				label="Email"
				name="email"
				rules={[{ required: true, message: 'Please input your email!' }]}
				className={classes.formGroup}
			>
				<Input className={classes.input} />
			</Form.Item>

			<Form.Item
				label="Password"
				name="password"
				rules={[{ required: true, message: 'Please input your password!' }]}
				className={classes.formGroup}
			>
				<Input.Password className={classes.input} />
			</Form.Item>

			<div className={classes.forgotPassword}>
				<p>Forgot Password?</p>
			</div>

			<Form.Item>
				<Button type="primary" htmlType="submit" className={classes.btnSide}>
					Login
				</Button>
			</Form.Item>
			
			<div className={classes.signupSide}>
				<div>Don't have an account?</div>
				<div>
					<a
						onClick={() => {
							router.push(APP_ROUTES.SIGNUP)
						}}
					>
						Sign up for free
					</a>
				</div>
			</div>
		</Form>
	)
}
export default LoginForm
