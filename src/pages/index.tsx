/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { userStore } from '@/store/userStore'
import { MenuData } from '@/utils/menu'
import React, { useEffect, useState } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import classes from './style.module.scss'
import { useRouter } from 'next/router'
import { ADMIN_ROUTES } from '@/utils/routers'
import { Layout, Menu, Modal } from 'antd'

const { Header } = Layout

export default function Home() {
	const [menuState, setMenuState] = useState() as any
	const router = useRouter()
	const userState = useRecoilValue(userStore)
	const resetUserState = useResetRecoilState(userStore)
	const renderMenu = MenuData?.filter((item: any) => item.key !== 'login')

	useEffect(() => {
		if (userState?.account_type === 'master') {
			router.push(ADMIN_ROUTES.DASHBOARD)
		}
		setMenuState(
			userState?.id
				? renderMenu &&
						renderMenu.concat({
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
						})
				: MenuData,
		)
	}, [userState])
	return (
		<Layout className={classes.layout}>
			<Header className={classes.header}>
				<Menu
					className={classes.menu}
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={['2']}
					items={menuState}
				/>
			</Header>

			<div className={classes.wrapper}>
				<img
					src="https://unbounce.com/photos/Gradient-Background.png"
					alt="background"
					className={classes.background}
				/>
			</div>
		</Layout>
	)
}
