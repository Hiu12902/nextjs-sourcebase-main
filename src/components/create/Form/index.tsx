/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Button, Col, Input, Row } from 'antd'
import classes from './style.module.scss'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import { blogStore } from '@/store/blogStore'
import { userStore } from '@/store/userStore'
import { useRouter } from 'next/router'
import { ADMIN_ROUTES, APP_ROUTES } from '@/utils/routers'

interface FormProps {
	onSave: () => void
	onReset: () => void
}

export default function Form({ onSave, onReset }: FormProps) {
	const [imgInput, setImgInput] = useState('') as any
	const { TextArea } = Input

	const setBlogState = useSetRecoilState(blogStore)
	const blogState = useRecoilValue(blogStore)

	const userState = useRecoilValue(userStore)

	const onChangeTitle = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setBlogState({
			...blogState,
			title: e.target.value,
		})
	}
	const onChangeDescription = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setBlogState({
			...blogState,
			description: e.target.value,
		})
	}
	const onChangeContent = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setBlogState({
			...blogState,
			content: e.target.value,
		})
	}
	const onChangeImage = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setImgInput(e.target.value)
	}
	const onLoadImage = () => {
		if (imgInput.length === 0) {
			setBlogState({
				...blogState,
				image:
					'https://liftlearning.com/wp-content/uploads/2020/09/default-image.png',
			})
		} else {
			setBlogState({
				...blogState,
				image: imgInput,
			})
			setImgInput('')
		}
	}

	const router = useRouter()
	if (!userState.id) {
		router.push(APP_ROUTES.LOGIN)
	}

	useEffect(() => {
		setBlogState({
			...blogState,
			image:
				'https://liftlearning.com/wp-content/uploads/2020/09/default-image.png',
		})
	}, [])

	return (
		<Row>
			<Col className="gutter-row" span={24}>
				<form>
					<div className={classes.blogDetailTitle}>
						<h3>Title</h3>
						<Input
							type="text"
							placeholder="Enter new title"
							value={blogState?.title}
							onChange={onChangeTitle}
						/>
					</div>
					<div className={classes.blogDetail}>
						<div className={classes.blogDetailContent}>
							<h3>Description</h3>
							<TextArea
								showCount
								rows={5}
								placeholder="Enter new description"
								value={blogState?.description}
								onChange={onChangeDescription}
							/>
							<h3>Content</h3>
							<TextArea
								showCount
								autoSize={{ minRows: 5, maxRows: 100 }}
								placeholder="Enter new content"
								value={blogState?.content}
								onChange={onChangeContent}
							/>
						</div>
						<div className={classes.blogDetailImg}>
							<div className={classes.blogDetailImgHolder}>
								<h3>Image</h3>
								<img
									src={blogState?.image}
									alt={blogState?.title}
									placeholder={
										'https://liftlearning.com/wp-content/uploads/2020/09/default-image.png'
									}
								/>
							</div>
							<div style={{ margin: '10px 0' }}>
								<h3 style={{ margin: '10px 0' }}>Image link</h3>
								<div className={classes.imageGroup}>
									<Input
										type="text"
										value={imgInput}
										onChange={onChangeImage}
									/>
									<Button onClick={onLoadImage}>Load image</Button>
								</div>
							</div>
							<div className={classes.btnGroup}>
								<div className={classes.saveBtn}>
									<Button type="primary" onClick={onSave}>
										Save changes
									</Button>
								</div>
								<div className={classes.resetBtn}>
									<Button type="primary" onClick={onReset}>
										Reset
									</Button>
								</div>
								<div className={classes.resetBtn}>
									<Button type="primary" onClick={() => router.push(ADMIN_ROUTES.DASHBOARD)}>
										Cancel
									</Button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</Col>
		</Row>
	)
}
