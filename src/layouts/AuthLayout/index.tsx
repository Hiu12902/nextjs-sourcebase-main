/* eslint-disable react-hooks/exhaustive-deps */
import { userStore } from '@/store/state'
import { BaseLayoutProps } from '@/types/layouts'
import { MenuData } from '@/utils/mockData'
import { ROUTES } from '@/utils/routers'
import { Breadcrumb, Layout, Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import classes from './index.module.scss'

const { Content, Footer, Header } = Layout
export default function AuthLayout({ children }: BaseLayoutProps) {
	const router = useRouter()
	const userState = useRecoilValue(userStore)
	const [isSSR, setIsSSR] = useState(false)

	const [menuState, setMenuState] = useState() as any
	const setUserState = useSetRecoilState(userStore)
	const renderMenu = MenuData?.filter((item: any) => item.key !== 'login')

	useEffect(() => {
		setMenuState(
			userState?.id
				? renderMenu &&
						renderMenu.concat(
							{
								label: <Link href={ROUTES.PROFILE}>{userState.last_name}</Link>,
								key: 'info',
							},
							{
								label: (
									<span
										onClick={() => {
											setUserState({
												id: '',
												first_name: '',
												last_name: '',
												is_admin: '',
												phone: '',
												email: '',
												username: '',
												token: '',
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
		setIsSSR(true)
	}, [userState])

	if (!isSSR) return null
	if (!userState.id) {
		router.push(ROUTES.HOME)
	}

	return isSSR && userState.id ? (
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
			<Breadcrumb
				className="breadcrumb"
				items={[
					{
						key: 'home',
						href: '',
						title: 'Home',
					},
					{
						key: 'list',
						href: '',
						title: 'List',
					},
					{
						key: 'app',
						href: '',
						title: 'App',
					},
				]}
			/>
			<Content id="siteLayoutContent">{children}</Content>
			<Footer className={classes.footer}>
				Ant Design ©2023 Created by Ant UED
			</Footer>
		</Layout>
	) : null
}
