import BaseLayout from '@/layouts/BaseLayout'
import { ListData } from '@/utils/breadcrumb'
import { Col, Divider, List, Row } from 'antd'
// import classes from './style.module.scss'

export default function Home() {
	return (
		<BaseLayout>
			<Row gutter={16}>
				<Col className="gutter-row" span={12}>
					<Divider orientation="left">Default Size</Divider>
					<List
						header={<div>Header</div>}
						footer={<div>Footer</div>}
						bordered
						dataSource={ListData}
						renderItem={(item) => <List.Item>{item}</List.Item>}
					/>
				</Col>
			</Row>
		</BaseLayout>
	)
}
