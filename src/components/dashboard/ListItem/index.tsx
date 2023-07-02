/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { List } from 'antd'
import Link from 'next/link'
import { ADMIN_ROUTES } from '@/utils/routers'
import classes from './style.module.scss'
import { BlogModel } from '@/types/models/blog'

export interface ListItemProps {
	item: BlogModel
}

export default function ListItem({ item }: ListItemProps) {
	return (
		<List.Item
			key={item.id}
			extra={
				<div className={classes.blogThumbnailExtra}>
					<img
						src={item.image}
						width={300}
						height={200}
						alt={item.title}
						className={classes.blogThumbnailExtraImg}
					/>
				</div>
			}
		>
			<List.Item.Meta
				title={
					<Link href={`${ADMIN_ROUTES.DASHBOARD}/${item.id}`}>{item.title}</Link>
				}
				description={
					<div className={classes.blogThumbnailDesc}> {item.description} </div>
				}
			/>
			<div className={classes.blogThumbnailContent}>{item.content}</div>
		</List.Item>
	)
}
