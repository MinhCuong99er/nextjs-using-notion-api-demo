import { action, observable, makeObservable, flow } from 'mobx'
import { persist } from 'mobx-persist'
import RootStore from './RootStore'
import * as userServices from '@src/services/user.service'
import HttpStatusCode from '@src/contains/HttpStatusCode'
import { IUserResponse, StoreInfo, User } from '@src/interfaces/User'
import { STATE } from '@src/interfaces/enums'
import { IApiResponse, IBodyError } from '@src/utils/request'
import { DEFAULT_ERROR_MESSAGE, UNAUTHORIZED_ERROR_MESSAGE } from '@src/contains/contants'
import { ResponseType } from '@src/interfaces/dto/common.dto'
import { wait } from '@src/helpers/wait'

export type AuthHydration = {
	state?: STATE
	token?: string
	tokenChat?: string
	chatId?: string
	storeInfo?: StoreInfo
	role?: string
	auth?: User

	setToken?: (token: string) => void
	setTokenChat?: (data: string) => void
	setChatId?: (data: string) => void
	setStoreInfo?: (data: StoreInfo) => void
	setRole?: (data: string) => void
	setAuth?: (data: { token?: string; auth: any }) => void

	login?: (username: string, password: string) => Promise<any>
}

export default class AuthStore {
	@observable state = 'pending'
	@observable root: RootStore
	@persist @observable token = null
	@observable tokenChat = null
	@observable chatId = null
	@observable storeInfo: Partial<StoreInfo> = {}
	@observable role: string = null
	@persist('object') @observable auth: Partial<User> = {}

	constructor(root: RootStore) {
		this.root = root
		makeObservable(this)
		// this.disposeInfo = autorun(
		//   () => {
		//     // if (this.isRunUpdateInfo) {
		//       // console.log(`🚀 ~ file: auth.store.ts ~ line 94 ~ AuthStore ~ this.isRunUpdateInfo`, this.isRunUpdateInfo);
		//       // this?.getCustomerInfo()
		//     // }
		//   }
		//   /* {
		//     scheduler: (run) => {
		//       console.log(
		//         `🚀 ~ file: HeaderHomeDesktop.tsx ~ line 77 ~ autorun ~ run`,
		//         run
		//       )
		//       setTimeout(run, 1000)
		//     },
		//   } */
		// )
	}

	@action setToken(_token: string) {
		this.token = _token
	}

	@action setTokenChat(_data: string) {
		this.tokenChat = _data
	}

	@action setChatId(_data: string) {
		this.chatId = _data
	}

	@action setRole(_data: string) {
		this.role = _data
	}

	@action setStoreInfo(_data: StoreInfo) {
		this.storeInfo = _data
	}

	@action setAuth(data: { token?: string; auth: any }) {
		if (data.token) {
			this.token = data.token
		}
		this.auth = data.auth
	}

	@action getAccumulatInfo() {
		this.getCustomerInfo()
		wait(100)
		return {
			point: this.auth.point,
			percent: this.auth.percent,
		}
	}

	@flow *login(username: string, password: string) {
		this.state = STATE.PROCESSING
		try {
			const res: IApiResponse<IUserResponse | IBodyError> = yield userServices.login<IApiResponse<IUserResponse>>(
				username,
				password
			)
			this.state = STATE.DONE
			if (res.status === HttpStatusCode.OK) {
				const data = res?.data as IUserResponse
				this.auth = data?.data?.userInfo || {}
				this.token = data?.data?.token || null
				this.tokenChat = data?.data?.tokenChat || null
				this.storeInfo = data?.data?.storeInfo || {}
				this.chatId = data?.data.chatId || null
				this.role = data?.data.role || null
				return res.data
			}
			return {
				errorCode: (res.data as IBodyError).errorCode || HttpStatusCode.UNKNOW_ERROR,
				message: (res.data as IBodyError).message || DEFAULT_ERROR_MESSAGE,
			}
		} catch (error) {
			this.state = STATE.ERROR
			return {
				errorCode: HttpStatusCode.UNKNOW_ERROR,
				message: error.message,
			}
		}
	}

	@flow *getCustomerInfo() {
		this.state = STATE.PROCESSING
		try {
			const token = this.token
			if (!token) {
				return {
					errorCode: HttpStatusCode.UNAUTHORIZED,
					message: UNAUTHORIZED_ERROR_MESSAGE,
				}
			}
			const res: IApiResponse<
				ResponseType<{
					point: number
					percent: number
				}>
			> = yield userServices.getCustomerInfo<
				IApiResponse<
					ResponseType<{
						point: number
						percent: number
					}>
				>
			>(token)
			this.state = STATE.DONE
			if (res.status === HttpStatusCode.OK && res.data && res.data?.code == 0) {
				const data = res?.data || {}
				this.auth = {
					...this.auth,
					...data,
				}
				return res.data
			}
			return {
				errorCode: (res.data as IBodyError).errorCode || HttpStatusCode.UNKNOW_ERROR,
				message: (res.data as IBodyError).message || DEFAULT_ERROR_MESSAGE,
			}
		} catch (error) {
			this.state = STATE.ERROR
			return {
				errorCode: HttpStatusCode.UNKNOW_ERROR,
				message: error.message,
			}
		}
	}

	@action hydrate(data?: AuthHydration) {
		if (data && data.token) {
			this.token = data.token
		}
		if (data && data.auth) {
			this.auth = data.auth
		}
		if (data && data.tokenChat) {
			this.tokenChat = data.tokenChat
		}
		if (data && data.chatId) {
			this.chatId = data.chatId
		}
		if (data && data.role) {
			this.role = data.role
		}
		if (data && data.storeInfo) {
			this.storeInfo = data.storeInfo
		}
	}
}
