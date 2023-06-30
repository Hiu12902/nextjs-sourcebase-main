export type BlogModel = {
	id: string
	title: string
	content: string
	image: string
	description: string
}

export type BlogsModel = {
	total: number | undefined
	rows: Array<BlogModel>
}

export type BlogResponse = {
	blog: BlogModel
}
export type BlogsResponse = {
	total: number
	rows: Array<BlogModel>
}
