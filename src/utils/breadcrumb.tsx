import { MenuProps } from 'antd'
import Link from 'next/link'
import { APP_ROUTES } from './routers'

export const MenuData: MenuProps['items'] = [
	{
		label: <Link href={APP_ROUTES.BLOGS}>Blogs</Link>,
		key: 'blogs',
	},
	{
		label: <Link href={APP_ROUTES.LOGIN}>Login</Link>,
		key: 'login',
	},
]
