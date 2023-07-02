/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { List } from 'antd'
import { BlogModel } from '@/types/models/blog'
import Link from 'next/link'
import { APP_ROUTES } from '@/utils/routers'
import classes from './style.module.scss'

interface ListItemProps {
	item: BlogModel
}

export default function ListItem({ item }: ListItemProps) {
	return (
		<List.Item
			className={classes.blogThumbnail}
			key={item.id}
			extra={
				<div className={classes.blogThumbnailExtra}>
					<img
						src={item.image}
						width={300}
						height={150}
						alt={item.title}
						className={classes.blogThumbnailExtraImg}
					/>
				</div>
			}
		>
			<List.Item.Meta
				title={
					<div className={classes.blogThumbnailTitle}>
						<Link
							href={`${APP_ROUTES.BLOGS}/${item.id}`}
							style={{ color: 'black' }}
						>
							{item.title}
						</Link>
					</div>
				}
				description={
					<div className={classes.blogThumbnailDesc}> {item.description} </div>
				}
			/>
			<div className={classes.blogThumbnailContent}> {item.content} </div>
		</List.Item>
	)
}
