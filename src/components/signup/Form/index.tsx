/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Button, Form, Input, Select } from 'antd'
import classes from './style.module.scss'
import { useRouter } from 'next/router'
import { APP_ROUTES } from '@/utils/routers'

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
interface SignupFormProps {
	onSubmit: (data: FormData) => void
}
const SignupForm = ({ onSubmit }: SignupFormProps) => {
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
				label="Name"
				name="name"
				// rules={[{ required: true, message: 'Please input your fullname!' }]}
				className={classes.formGroup}
			>
				<Input className={classes.input} />
			</Form.Item>

			<Form.Item
				label="Username"
				name="username"
				// rules={[{ required: true, message: 'Please input your username!' }]}
				className={classes.formGroup}
			>
				<Input className={classes.input} />
			</Form.Item>

			<Form.Item
				label="Email"
				name="email"
				rules={[{ required: true, message: 'Please input your email!' }]}
				className={classes.formGroup}
			>
				<Input className={classes.input} />
			</Form.Item>

			<Form.Item
				name="phone"
				label="Phone Number"
				// rules={[
				// 	{ required: true, message: 'Please input your phone number!' },
				// ]}
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
			<Form.Item
				name="gender"
				label="Gender"
				// rules={[{ required: true, message: 'Please select gender!' }]}
			>
				<Select placeholder="Select your gender">
					<Select.Option value="male">Male</Select.Option>
					<Select.Option value="female">Female</Select.Option>
					<Select.Option value="other">Other</Select.Option>
				</Select>
			</Form.Item>

			<Form.Item
				name="account_type"
				label="You are: "
				// rules={[{ required: true, message: 'Please select your role!' }]}
			>
				<Select placeholder="Select your role">
					<Select.Option value="master">Master</Select.Option>
					<Select.Option value="normal">Normal</Select.Option>
				</Select>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" className={classes.btnSide}>
					Sign up
				</Button>
			</Form.Item>

			<div className={classes.signupSide}>
				<div>Already have an account?</div>
				<div>
					<a
						onClick={() => {
							router.push(APP_ROUTES.LOGIN)
						}}
					>
						Let's login
					</a>
				</div>
			</div>
		</Form>
	)
}
export default SignupForm
