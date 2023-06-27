import { MenuProps } from 'antd'
import Link from 'next/link'
import { APP_ROUTES } from './routers'

export const MenuData: MenuProps['items'] = [
	{
		label: <Link href={APP_ROUTES.HOME}>Home</Link>,
		key: 'home',
	},
	{
		label: 'About',
		key: 'about',
		children: [
			{
				type: 'group',
				label: 'Item 1',
				children: [
					{
						label: 'Option 1',
						key: 'setting:1',
					},
					{
						label: 'Option 2',
						key: 'setting:2',
					},
				],
			},
			{
				type: 'group',
				label: 'Item 2',
				children: [
					{
						label: 'Option 3',
						key: 'setting:3',
					},
					{
						label: 'Option 4',
						key: 'setting:4',
					},
				],
			},
		],
	},
	{
		label: <Link href={APP_ROUTES.BLOGS}>Blogs</Link>,
		key: 'blogs',
	},
	{
		label: <Link href={APP_ROUTES.LOGIN}>Login</Link>,
		key: 'login',
	},
]

export const ListData = [
	'Racing car sprays burning fuel into crowd.',
	'Japanese princess to wed commoner.',
	'Australian walks 100km after outback crash.',
	'Man charged over missing wedding girl.',
	'Los Angeles battles huge wildfires.',
]