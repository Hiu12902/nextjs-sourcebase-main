/* eslint-disable react-hooks/exhaustive-deps */
import { userStore } from '@/store/userStore'
import { AdminLayoutProps } from '@/types/layouts'
import { MenuData } from '@/utils/menu'
import { ADMIN_ROUTES, APP_ROUTES } from '@/utils/routers'
import { Layout, Menu, Modal } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useResetRecoilState, useRecoilValue } from 'recoil'
import classes from './index.module.scss'
import Link from 'next/link'

const { Content, Footer, Header } = Layout
export default function AdminLayout({ children }: AdminLayoutProps) {
	const router = useRouter()
	const userState = useRecoilValue(userStore)
	const resetUserState = useResetRecoilState(userStore)

	const [menuState, setMenuState] = useState() as any
	const renderMenu = MenuData?.filter(
		(item: any) => item.key !== 'blogs' && item.key !== 'login',
	)

	useEffect(() => {
		setMenuState(
			userState?.id
				? renderMenu &&
						renderMenu.concat(
							{
								label: <Link href={ADMIN_ROUTES.DASHBOARD}>Dashboard</Link>,
								key: 'dashboard',
							},
							{
								label: (
									<span
										className={classes.logout}
										onClick={() => {
											Modal.confirm({
												title: 'Logout',
												content: 'Are you sure you want to logout?',
												onOk: () => {
													resetUserState()
												},
											})
										}}
									>
										Logout
									</span>
								),
								key: 'logout',
							},
						)
				: MenuData,
		)
	}, [userState])

	useEffect(() => {
		if (
			(userState.id && userState.account_type === 'normal') ||
			!userState.id
		) {
			router.push(APP_ROUTES.HOME)
		}
	})

	return userState.id && userState.account_type === 'master' ? (
		<Layout className={classes.layout} id="layout">
			<Header className={classes.header}>
				<div className="logo" />
				<Menu
					className={classes.menu}
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={['2']}
					items={menuState}
				/>
			</Header>
			<Content id="siteLayoutContent">{children}</Content>
			<Footer className={classes.footer}>
				Internship exam @2023 Created by Nguyen Tri Hieu
			</Footer>
		</Layout>
	) : null
}
