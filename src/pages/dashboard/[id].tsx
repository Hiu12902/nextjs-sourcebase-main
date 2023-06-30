/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import * as BlogAPI from '@/api/BlogAPI'
import { Breadcrumb, Modal } from 'antd'
import { InferGetServerSidePropsType } from 'next'
import classes from './style.module.scss'
import { ADMIN_ROUTES, APP_ROUTES } from '@/utils/routers'
import { useRecoilValue } from 'recoil'
import { useRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import AdminLayout from '@/layouts/AdminLayout'
import { useEffect } from 'react'
import { blogStore } from '@/store/blogStore'
import { userStore } from '@/store/userStore'
import { EditForm } from './components'

export default function BlogDetailPage({
	blog,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [blogState, setBlogState] = useRecoilState(blogStore)
	const userState = useRecoilValue(userStore)

	async function handleSubmit(id: string) {
		const res = await BlogAPI.updateBlog(id, blogState)
		if (res.status === 200) {
			Modal.success({
				title: 'Success',
				content: 'Successfully updated blog!',
			})
			router.push(ADMIN_ROUTES.DASHBOARD)
		} else {
			Modal.error({
				title: 'Error',
				content: 'Something wrong happened!',
			})
		}
	}
	async function handleDelete(id: string) {
		Modal.confirm({
			title: 'Are you sure to delete this blog?',
			content: 'This action cannot be undone!',
			async onOk() {
				console.log('Delete')
				const res = await BlogAPI.deleteBlog(id)
				if (res.status === 200) {
					Modal.success({
						title: 'Success',
						content: 'Successfully deleted blog!',
					})
					router.push(ADMIN_ROUTES.DASHBOARD)
				}
			},
			onCancel() {
				console.log('Cancel deletion')
			},
		})
	}

	const router = useRouter()
	if (!userState.id) {
		router.push(APP_ROUTES.LOGIN)
	}

	useEffect(() => {
		setBlogState({
			...blog.blog,
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
							key: `${blog.blog?.title}`,
							href: `/dashboard/${blog.blog?.id}`,
							title: `${blog.blog?.title}`,
						},
					]}
				/>
			</div>
			<EditForm blog={blog} onSave={handleSubmit} onDelete={handleDelete} />
		</AdminLayout>
	) : (
		<></>
	)
}

export const getServerSideProps = async ({ query }: any) => {
	const { id } = query
	try {
		const res = await BlogAPI.findOne(id)
		return {
			props: {
				blog: res,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}
