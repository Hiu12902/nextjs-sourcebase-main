/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import AdminLayout from '@/layouts/AdminLayout'
import React, { useEffect, useState } from 'react'
import { Button, List, Pagination, PaginationProps, Skeleton } from 'antd'
import { BlogModel, BlogsModel } from '@/types/models/blog'
import * as BlogAPI from '@/api/BlogAPI'
import { ADMIN_ROUTES } from '@/utils/routers'
import { useResetRecoilState } from 'recoil'
import classes from './style.module.scss'
import { useRouter } from 'next/router'
import { blogStore } from '@/store/blogStore'
import { ListItem } from '@/components'

export default function Products() {
	const router = useRouter()
	const resetState = useResetRecoilState(blogStore)
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 5,
		total: null,
	})
	const [loading, setLoading] = useState(false)
	const [blogsState, setBlogsState] = useState<BlogsModel>({
		total: undefined,
		rows: [],
	})
	const getBlogList = async () => {
		if (loading) {
			return
		}
		setLoading(true)
		try {
			const res = await BlogAPI.getList({
				page: pagination.page,
				limit: pagination.limit,
			})
			setBlogsState({
				total: res?.total,
				rows: res?.rows,
			})
			setLoading(false)
		} catch (error) {
			setLoading(false)
		}
	}
	const handleChangePagination: PaginationProps['onChange'] = (page) => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		setPagination({
			...pagination,
			page: page,
		})
	}
	useEffect(() => {
		getBlogList()
	}, [pagination])

	return (
		<AdminLayout>
			<div>
				<div className={classes.createBtnContainer}>
					<Button
						type="primary"
						onClick={() => {
							resetState()
							router.push(`${ADMIN_ROUTES.CREATE}`)
						}}
						className={classes.createBtn}
					>
						Create new blog
					</Button>
				</div>
				{blogsState &&
				blogsState?.rows &&
				blogsState?.total &&
				blogsState?.total > 0 ? (
					<div>
						<List
							itemLayout="vertical"
							size="large"
							dataSource={blogsState?.rows}
							renderItem={(item: BlogModel) => <ListItem item={item} key={item.id}/>}
						/>
						<Pagination
							pageSize={pagination.limit}
							total={blogsState?.total}
							defaultCurrent={1}
							current={pagination.page}
							onChange={handleChangePagination}
						/>
					</div>
				) : (
					<Skeleton
						avatar
						paragraph={{ rows: 5 }}
						active
						style={{ marginTop: 20 }}
					/>
				)}
			</div>
		</AdminLayout>
	)
}
