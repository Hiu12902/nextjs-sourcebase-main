/* eslint-disable react-hooks/exhaustive-deps */
import { userStore } from '@/store/userStore'
import { BaseLayoutProps } from '@/types/layouts'
import { Layout, Menu, Modal } from 'antd'
import { MenuData } from '@/utils/menu'
import React, { useEffect, useState } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import classes from './index.module.scss'

const { Header, Content, Footer } = Layout

export default function BaseLayout({ children }: BaseLayoutProps) {
	const [menuState, setMenuState] = useState() as any
	const userState = useRecoilValue(userStore)
	const resetUserState = useResetRecoilState(userStore)
	const renderMenu = MenuData?.filter((item: any) => item.key !== 'login')

	useEffect(() => {
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
				Ant Design ©2023 Created by Ant UED
			</Footer>
		</Layout>
	)
}
