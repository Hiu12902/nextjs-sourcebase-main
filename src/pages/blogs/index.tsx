/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import BaseLayout from '@/layouts/BaseLayout'
import React, { useEffect, useState } from 'react'
import { Breadcrumb, List, Pagination, PaginationProps, Skeleton } from 'antd'
import { BlogModel, BlogsModel } from '@/types/models/blog'
import * as BlogAPI from '@/api/BlogAPI'
import { ListItem } from './components'
import classes from './style.module.scss'

export default function Blogs() {
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
					]}
				/>
			</div>
			<div>
				{blogsState &&
				blogsState?.rows &&
				blogsState?.total &&
				blogsState?.total > 0 ? (
					<div>
						<List
							itemLayout="vertical"
							size="large"
							dataSource={blogsState?.rows}
							renderItem={(item: BlogModel) => (
								<ListItem item={item} key={item.id} />
							)}
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
		</BaseLayout>
	)
}
