/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import * as BlogAPI from '@/api/BlogAPI'
import { Breadcrumb, Modal } from 'antd'
import classes from './style.module.scss'
import { ADMIN_ROUTES, APP_ROUTES } from '@/utils/routers'
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil'
import {} from 'recoil'
import { useRouter } from 'next/router'
import AdminLayout from '@/layouts/AdminLayout'
import { useEffect } from 'react'
import { blogStore } from '@/store/blogStore'
import { userStore } from '@/store/userStore'
import { CreateForm } from './components'

function CreateBlog() {
	const resetState = useResetRecoilState(blogStore)
	const setBlogState = useSetRecoilState(blogStore)
	const blogState = useRecoilValue(blogStore)

	const userState = useRecoilValue(userStore)

	async function handleSubmit() {
		if (blogState.title === '') {
			Modal.error({
				title: 'Title is required',
				content: 'Please enter title!',
			})
		} else {
			const res = await BlogAPI.createBlog(blogState)
			if (res.status === 201) {
				Modal.success({
					title: 'Success',
					content: 'Successfully created blog!',
				})
				router.push(ADMIN_ROUTES.DASHBOARD)
			} else {
				Modal.error({
					title: 'Error',
					content: 'Something went wrong!',
				})
			}
		}
	}

	const handleReset = () => {
		resetState()
		setBlogState({
			...blogState,
			image:
				'https://liftlearning.com/wp-content/uploads/2020/09/default-image.png',
		})
	}

	const router = useRouter()
	if (!userState.id) {
		router.push(APP_ROUTES.LOGIN)
	}

	useEffect(() => {
		setBlogState({
			...blogState,
			image:
				'https://liftlearning.com/wp-content/uploads/2020/09/default-image.png',
		})
	}, [])

	return userState.id ? (
		<AdminLayout>
			<div className={classes.breadcrumb}>
				<Breadcrumb
					className="breadcrumb"
					items={[
						{
							key: 'dashboard',
							href: '/dashboard',
							title: 'Dashboard',
						},
						{
							key: 'create',
							href: './create',
							title: 'Create new Blog',
						},
					]}
				/>
			</div>
			<CreateForm onSave={handleSubmit} onReset={handleReset} />
		</AdminLayout>
	) : (
		<></>
	)
}

export default CreateBlog
