/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import * as BlogAPI from '@/api/BlogAPI'
import BaseLayout from '@/layouts/BaseLayout'
import { Breadcrumb, Modal } from 'antd'
import { InferGetServerSidePropsType } from 'next'
import classes from './style.module.scss'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'
import { userStore } from '@/store/userStore'
import { APP_ROUTES } from '@/utils/routers'
import { useEffect } from 'react'
import { BlogCard } from '@/components'

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
export default function BlogDetailPage({
	blog,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const userState = useRecoilValue(userStore)
	const router = useRouter()
	useEffect(() => {
		if (!userState.id) {
			Modal.confirm({
				title: 'Oops!',
				content: 'Please login to continue!',
				onOk: () => {
					router.push(APP_ROUTES.LOGIN)
				},
				onCancel: () => {
					router.push(APP_ROUTES.HOME)
				},
			})
		}
	}, [])

	return userState.id ? (
		<BaseLayout>
			<div className={classes.breadcrumb}>
				<Breadcrumb
					className="breadcrumb"
					items={[
						{
							key: 'home',
							href: '/',
							title: 'Home',
						},
						{
							key: 'blogs',
							href: '/blogs',
							title: 'Blogs',
						},
						{
							key: `${blog.blog?.title}`,
							href: `/blogs/${blog.blog?.id}`,
							title: (
								<div className={classes.breadcrumbTitle}>
									{blog.blog?.title}
								</div>
							),
						},
					]}
				/>
			</div>
			<BlogCard blog={blog} />
		</BaseLayout>
	) : (
		<></>
	)
}
