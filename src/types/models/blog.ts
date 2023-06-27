export type BlogModel = {
	id: string
	title: string
	content: string
	image: string
	description: string
}

export type BlogState = {
	total: number | undefined
	rows: Array<BlogModel>
}

export type BlogResponse = {
	status: {
		code: number
		msg: string
	}
	results: {
		rows: Array<BlogModel>
	}
}
