/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Button, Col, Input, Row, Skeleton } from 'antd'
import classes from './style.module.scss'
import { useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import { blogStore } from '@/store/blogStore'
import { BlogResponse } from '@/types/models/blog'

interface FormProps {
	blog: BlogResponse
    onSave: (id: string) => void
    onDelete: (id: string) => void
}

export default function Form({ blog, onSave, onDelete }: FormProps) {
	const [imgInput, setImgInput] = useState('') as any
	const { TextArea } = Input
	const [blogState, setBlogState] = useRecoilState(blogStore)

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
				image: blog.blog?.image,
			})
		} else {
			setBlogState({
				...blogState,
				image: imgInput,
			})
			setImgInput('')
		}
	}

	useEffect(() => {
		setBlogState({
			...blog.blog,
		})
	}, [])

	return (
		<Row>
			{blog ? (
				<Col className="gutter-row" span={24}>
					<form>
						<div className={classes.blogDetailTitle}>
							<h3>Title</h3>
							<Input
								type="text"
								placeholder={blog.blog?.title}
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
									placeholder={blog.blog?.description}
									value={blogState?.description}
									onChange={onChangeDescription}
								/>
								<h3>Content</h3>
								<TextArea
									showCount
									autoSize={{ minRows: 5, maxRows: 100 }}
									placeholder={blog.blog?.content}
									value={blogState?.content}
									onChange={onChangeContent}
								/>
							</div>
							<div className={classes.blogDetailImg}>
								<div className={classes.blogDetailImgHolder}>
									<h3>Image</h3>
									<img src={blogState?.image} alt={blogState?.title} />
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
										<Button type="primary" onClick={() => onSave(blog.blog?.id)}>
											Save changes
										</Button>
									</div>
									<div>
										<Button
											type="primary"
											onClick={() => onDelete(blog.blog?.id)}
											className={classes.deleteBtn}
										>
											Delete post
										</Button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</Col>
			) : (
				<Col className="gutter-row" span={18}>
					<Skeleton active paragraph={{ rows: 10 }} />
				</Col>
			)}
		</Row>
	)
}
