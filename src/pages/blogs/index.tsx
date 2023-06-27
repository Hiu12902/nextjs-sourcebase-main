/* eslint-disable react-hooks/exhaustive-deps */
import BaseLayout from '@/layouts/BaseLayout'
import React, { useEffect, useState } from 'react'
import { Avatar, Divider, List, Skeleton } from 'antd'
import { BlogModel, BlogState } from '@/types/models/blog'
import * as BlogAPI from '@/api/BlogAPI'
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ROUTES } from '@/utils/routers'

export default function Blogs() {
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10,
		total: null,
	})
	const [loading, setLoading] = useState(false)
	const [blogState, setBlogState] = useState<BlogState>({
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
				fields: 'id,title,description,image',
				page: pagination.page,
				limit: pagination.limit,
			})
			setBlogState({
				total: res?.results?.pagination?.count,
				rows: blogState.rows.concat(res?.results?.rows),
			})
			setLoading(false)
		} catch (error) {
			setLoading(false)
		}
	}
	const fetchMoreData = () => {
		setPagination({
			...pagination,
			page: pagination.page + 1,
		})
	}
	useEffect(() => {
		// setTimeout(() => {
		getBlogList()
		// }, 3000)
	}, [pagination])

	return (
		<BaseLayout>
			<div
				// id="scrollableDiv"
				style={
					{
						// height: '100vh',
						// overflow: 'auto',
						// padding: '0 16px',
						// border: '1px solid rgba(140, 140, 140, 0.35)',
					}
				}
			>
				{blogState &&
				blogState?.rows &&
				blogState?.rows?.length > 0 &&
				blogState?.total ? (
					<InfiniteScroll
						dataLength={blogState?.rows?.length}
						next={fetchMoreData}
						hasMore={blogState?.rows?.length < blogState?.total}
						loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
						endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
						scrollableTarget="scrollableDiv"
					>
						<List
							dataSource={blogState?.rows}
							renderItem={(item: BlogModel) => (
								<List.Item key={item.id}>
									<List.Item.Meta
										avatar={<Avatar src={item.image} />}
										title={
											<Link href={`${ROUTES.BLOGS}/${item.id}`}>
												{item.title}
											</Link>
										}
										description={item.description}
									/>
									<div>{item.content}</div>
								</List.Item>
							)}
						/>
					</InfiniteScroll>
				) : (
					<Skeleton
						avatar
						paragraph={{ rows: 1 }}
						active
						style={{ marginTop: 20 }}
					/>
				)}
			</div>
		</BaseLayout>
	)
}
