import { BlogModel, BlogsModel } from '@/types/models/blog'
import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const blogStore = atom<BlogModel>({
	key: 'blogState',
	default: {
		id: '',
		title: '',
		image: '',
		content: '',
		description: '',
	},
	effects_UNSTABLE: [persistAtom],
})

export const blogsStore = atom<BlogsModel>({
	key: 'blogsState',
	default: {
		total: 0,
		rows: [],
	},
	effects_UNSTABLE: [persistAtom],
})
