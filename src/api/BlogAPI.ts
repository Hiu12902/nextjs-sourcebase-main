import axios from '@/axios'
import { BlogModel, BlogResponse, BlogsResponse } from '@/types/models/blog'
import { APIGetParams, exportResults } from '@/utils/api'
import { APP_ROUTES } from '@/utils/routers'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getList = async (params: APIGetParams): Promise<BlogsResponse> => {
	const response = exportResults(await axios.get(`${API_URL}${APP_ROUTES.BLOGS}`)).reverse()
	if (params.page && params.limit) {
		const { page, limit } = params
		const startIndex = (page - 1) * limit
		const pagination_response = response.slice(startIndex, startIndex + limit)

		return { total: response.length, rows: pagination_response }
	}
	return { total: response.length, rows: response }
}

export const findOne = async (id: string): Promise<BlogResponse> => {
	const response = exportResults(await axios.get(`${API_URL}${APP_ROUTES.BLOGS}/${id}`))
	return { blog: response }
}

export const updateBlog = async (id: string, payload: BlogModel) => {
	const res = await axios.put(`${API_URL}${APP_ROUTES.BLOGS}/${id}`, payload)
	return res
}

export const deleteBlog = async (id: string) => {
	const res = await axios.delete(`${API_URL}${APP_ROUTES.BLOGS}/${id}`)
	return res
}

export const createBlog = async (payload: BlogModel) => {
	const res = await axios.post(`${API_URL}${APP_ROUTES.BLOGS}`, payload)
	return res
}
