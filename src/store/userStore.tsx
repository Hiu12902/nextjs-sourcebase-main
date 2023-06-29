import { UserModal } from '@/types/models/user'
import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const userStore = atom<UserModal>({
	key: 'userStore',
	default: {
		id: '',
		email: '',
		username: '',
		account_type: '',
		name: '',
		gender: '',
		phone: '',
		token: '',
	},
	effects_UNSTABLE: [persistAtom],
})

export const getTokenOfUSerStore = selector({
	key: 'tokenStore',
	get: ({ get }) => {
		return get(userStore).token
	},
})
