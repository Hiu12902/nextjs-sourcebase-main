/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Col, Row, Skeleton } from 'antd'
import classes from './style.module.scss'
import { BlogResponse } from '@/types/models/blog'

interface BlogDetailPageProps {
	blog: BlogResponse
}
export default function BlogDetailPage({ blog }: BlogDetailPageProps) {
	return (
		<Row gutter={16} className={classes.wrapper}>
			{blog ? (
				<Col className="gutter-row" style={{ padding: '0 10px' }}>
					<h1>{blog.blog?.title}</h1>
					<p>{blog.blog?.description}</p>
					<div className={classes.blogDetailImgContainer}>
						<img
							src={blog.blog?.image}
							alt={blog.blog?.title}
							className={classes.blogDetailImg}
						/>
					</div>
					<div className={classes.blogDetailContent}>
						<p style={{ whiteSpace: 'pre-line' }}>{blog.blog?.content}</p>
					</div>
				</Col>
			) : (
				<Col className="gutter-row" span={18}>
					<Skeleton active paragraph={{ rows: 10 }} />
				</Col>
			)}
		</Row>
	)
}
