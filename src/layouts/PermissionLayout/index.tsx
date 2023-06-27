import { userStore } from '@/store/state'
import { BaseLayoutProps } from '@/types/layouts'
import { ROUTES } from '@/utils/routers'
import { Layout } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import classes from './index.module.scss'

const { Content } = Layout
export default function PermissionLayout({ children }: BaseLayoutProps) {
	const router = useRouter()
	const userState = useRecoilValue(userStore)
	const [isSSR, setIsSSR] = useState(false)

	useEffect(() => {
		setIsSSR(true)
	}, [])

	if (!isSSR) return null
	if (userState.id) {
		router.push(ROUTES.HOME)
	}

	return isSSR && !userState.id ? (
		<Layout className={classes.layout} id="layout">
			<Content id="siteLayoutContent">{children}</Content>
		</Layout>
	) : null
}
