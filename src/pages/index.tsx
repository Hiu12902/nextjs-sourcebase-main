import BaseLayout from '@/layouts/BaseLayout'
import { Breadcrumb, Col, Row } from 'antd'
import classes from './style.module.scss'

export default function Home() {
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
					]}
				/>
			</div>
			<Row gutter={16}>
				<Col className="gutter-row" span={12}></Col>
			</Row>
		</BaseLayout>
	)
}
