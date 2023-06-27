import axios from '@/axios'
import { APIGetParams, convertParams, exportResults } from '@/utils/api'
import { BLOG_API_ROUTES } from '@/utils/routers'

export const getList = async (params: APIGetParams) =>
	exportResults(
		await axios.get(BLOG_API_ROUTES.BLOGS, {
			params: convertParams(params),
		}),
	)

export const findOne = async (id: string, params: APIGetParams) =>
	exportResults(
		await axios.get(`${BLOG_API_ROUTES.BLOGS}/${id}`, {
			params: convertParams(params),
		}),
	)
