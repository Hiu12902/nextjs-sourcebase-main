import { userStore } from '@/store/userStore'
import { BaseLayoutProps } from '@/types/layouts'
import { ADMIN_ROUTES, APP_ROUTES } from '@/utils/routers'
import { Layout } from 'antd'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import classes from './index.module.scss'
import { useEffect } from 'react'

const { Content } = Layout
export default function PermissionLayout({ children }: BaseLayoutProps) {
	const router = useRouter()

	const userState = useRecoilValue(userStore)
	useEffect(() => {
		if (userState.id && userState.account_type === 'master') {
			router.push(ADMIN_ROUTES.DASHBOARD)
		} else if (userState.id && userState.account_type === 'normal') {
			router.push(APP_ROUTES.HOME)
		}
	})

	return !userState.id ? (
		<Layout className={classes.layout} id="layout">
			<Content id="siteLayoutContent">{children}</Content>
		</Layout>
	) : null
}
