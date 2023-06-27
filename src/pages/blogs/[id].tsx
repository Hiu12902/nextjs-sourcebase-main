/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import * as BlogAPI from '@/api/BlogAPI'
import BaseLayout from '@/layouts/BaseLayout'
import { Col, Row, Skeleton } from 'antd'
import { InferGetServerSidePropsType } from 'next'
import classes from './style.module.scss'

const mockData = [
	{
		id: 1,
		title: 'Quốc gia hạnh phúc nhất thế giới năm thứ 6 liên tiếp',
		image:
			'https://znews-photo.zingcdn.me/w360/Uploaded/gtntnn/2023_03_20/tai_xuong_17_.jpeg',
	},
	{
		id: 2,
		title: 'Quốc gia hạnh phúc nhất thế giới năm thứ 6 liên tiếp',
		image:
			'https://znews-photo.zingcdn.me/w360/Uploaded/gtntnn/2023_03_20/tai_xuong_17_.jpeg',
	},
]
export default function BlogDetailPage({
	blog,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<BaseLayout>
			<Row gutter={16}>
				{blog ? (
					<Col className="gutter-row" span={18}>
						<h1>{blog?.title}</h1>
						<img src={blog?.image} alt={blog?.title} />
						<h3>{blog?.description}</h3>
						<p>{blog?.content}</p>
					</Col>
				) : (
					<Col className="gutter-row" span={18}>
						<Skeleton active paragraph={{ rows: 10 }} />
					</Col>
				)}
				{mockData ? (
					<Col className="gutter-row" span={6}>
						<div className={classes.rightSide}>
							<h3>Next</h3>
							{mockData &&
								mockData.length > 0 &&
								mockData.map((item) => (
									<div className={classes.nextBox} key={item.id}>
										<img src={item.image} alt="" />
										<p>{item.title}</p>
									</div>
								))}
						</div>
					</Col>
				) : (
					<Col className="gutter-row" span={6}>
						<Skeleton active paragraph={{ rows: 3 }} />
					</Col>
				)}
			</Row>
		</BaseLayout>
	)
}

// export const getStaticPaths = async () => {
// 	const res: BlogResponse = await BlogAPI.getList({
// 		fields: 'id',
// 		page: 1,
// 		limit: 99999,
// 	})
// 	const blogs = res?.results?.rows

// 	// Get the paths we want to pre-render based on posts
// 	const paths = blogs.map((blog) => ({
// 		params: { id: blog.id.toString() },
// 	}))
// 	return {
// 		paths,
// 		fallback: false, // can also be true or 'blocking'
// 	}
// }

// export const getStaticProps = async (context: { params: { id: string } }) => {
// 	const res = await BlogAPI.findOne(context.params.id, {
// 		fields: 'id,title,image,description,content',
// 	})
// 	const blog = res?.results?.rows

// 	return {
// 		props: { blog },
// 	}
// }

export const getServerSideProps = async ({ query }: any) => {
	const { id } = query
	try {
		const res = await BlogAPI.findOne(id, {
			fields: 'id,title,image,description,content',
		})

		return {
			props: {
				blog: res?.results?.rows,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}
