import { action, observable, makeObservable, computed, flow } from 'mobx'
import { clone, isEmpty } from 'lodash'
import { persist } from 'mobx-persist'
import RootStore from './RootStore'
import { STATE } from '@src/interfaces/enums'
import HttpStatusCode from '@src/contains/HttpStatusCode'
import { IApiResponse, IBodyError } from '@src/utils/request'
import { DEFAULT_ERROR_MESSAGE, UNAUTHORIZED_ERROR_MESSAGE } from '@src/contains/contants'
import { ResponseType } from '@src/interfaces/dto/common.dto'
import { ChangePasswordParams, LoginByPasswordParams, LoginByPhoneParams } from '@src/interfaces/dto/user.dto'
import * as authServices from '@src/services/auth.service'
import { User } from '@src/interfaces/User'
import { removeTokenCookieClient } from '@src/lib/auth-cookies'

export type AuthHydration = {
	state?: string
	token?: string
	tokenUser?: string
	auth?: any
	authUser?: User
	loginParams?: Partial<LoginByPasswordParams>

	setToken?: (value: string) => void
	setAuth?: (data: { token?: string; auth: any }) => void
}

export default class AuthStore {
	@observable state = STATE.PENDING
	@observable root: RootStore
	@persist @observable token = null
	@persist @observable tokenUser = null
	@persist('object') @observable auth = null
	@persist('object') @observable authUser: Partial<User> = {}
	@persist('object') @observable loginParams: Partial<LoginByPasswordParams> = {}

	constructor(root: RootStore) {
		this.root = root
		makeObservable(this)
	}

	@computed get isChangedToken() {
		return this.token == null
	}

	@computed get isChangeSubDomain() {
		return this.token
	}

	@computed get isLogin() {
		return !isEmpty(this.tokenUser) && !isEmpty(this.authUser)
	}
	@computed get isValidKOCDomain() {
		return !isEmpty(this.token) && !isEmpty(this.auth)
	}

	@action setToken(value: string) {
		this.token = value
	}

	@action setLoginParams(_data: Partial<LoginByPasswordParams>) {
		const _params = clone(this.loginParams)
		Object.assign(_params, _data)
		this.loginParams = _params
	}

	@action removeLoginParams() {
		this.loginParams = {}
	}

	@action setAuth(data: { token?: string; auth: any }) {
		if (data.token) {
			this.token = data.token
		}
		this.auth = data.auth
	}

	@action logout() {
		this.state = STATE.PROCESSING
		this.root.loading = true
		try {
			this.tokenUser = null
			this.authUser = {}
			if (typeof window != 'undefined') {
				localStorage.clear()
			}
			removeTokenCookieClient()
			this.state = STATE.DONE
			this.root.loading = false
		} catch (error) {
			this.state = STATE.ERROR
			this.root.loading = false
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
		if (data && data.tokenUser) {
			this.tokenUser = data.tokenUser
		}
		if (data && data.auth) {
			this.auth = data.auth
		}
		if (data && data.authUser) {
			this.authUser = data.authUser
		}
	}

	@flow *checkUserExist(phone: string) {
		this.root.loading = true
		this.state = STATE.PROCESSING
		try {
			const res = yield authServices.checkUserExist(phone)
			this.state = STATE.DONE
			this.root.loading = false
			this.loginParams.phone = phone
			if (res.status === HttpStatusCode.OK && res.data && res.data.code === 0) {
				return res.data
			}
			return {
				errorCode: res.data?.code || (res.data as IBodyError).errorCode || HttpStatusCode.UNKNOW_ERROR,
				message: (res.data as IBodyError).message || DEFAULT_ERROR_MESSAGE,
			}
		} catch (error) {
			this.state = STATE.ERROR
			this.root.loading = false
			return {
				errorCode: HttpStatusCode.UNKNOW_ERROR,
				message: error.message,
			}
		}
	}

	@flow *sendOtp(phone: string, hash: string) {
		this.root.loading = true
		this.state = STATE.PROCESSING
		try {
			const res = yield authServices.sendOtp(phone, hash)
			this.state = STATE.DONE
			this.root.loading = false
			if (res.status === HttpStatusCode.OK && res.data && res.data.code === 0) {
				this.loginParams.tokenSendOtp = res.data.token
				return res.data
			}
			return {
				errorCode: res.data?.code || (res.data as IBodyError).errorCode || HttpStatusCode.UNKNOW_ERROR,
				message: (res.data as IBodyError).message || DEFAULT_ERROR_MESSAGE,
			}
		} catch (error) {
			this.state = STATE.ERROR
			this.root.loading = false
			return {
				errorCode: HttpStatusCode.UNKNOW_ERROR,
				message: error.message,
			}
		}
	}

	@flow *verifyOtp(otp: string, token: string) {
		this.root.loading = true
		this.state = STATE.PROCESSING
		try {
			const res = yield authServices.verifyOtp(otp, token)
			this.state = STATE.DONE
			this.root.loading = false
			if (res.status === HttpStatusCode.OK && res.data && res.data.code === 0) {
				this.loginParams.tokenVerifyOtp = res.data.token
				return res.data
			}
			return {
				errorCode: res.data?.code || (res.data as IBodyError).errorCode || HttpStatusCode.UNKNOW_ERROR,
				message: (res.data as IBodyError).message || DEFAULT_ERROR_MESSAGE,
			}
		} catch (error) {
			this.state = STATE.ERROR
			this.root.loading = false
			return {
				errorCode: HttpStatusCode.UNKNOW_ERROR,
				message: error.message,
			}
		}
	}

	@flow *loginByPhone(data: LoginByPhoneParams) {
		this.root.loading = true
		this.state = STATE.PROCESSING
		try {
			const res = yield authServices.loginByPhone(data)
			this.state = STATE.DONE
			this.root.loading = false
			if (res.status === HttpStatusCode.OK && res.data && res.data.code === 0) {
				this.authUser = res.data.userInfo as User
				this.tokenUser = res.data.accessToken
				this.loginParams = {}
				return res.data
			}
			return {
				errorCode: res.data?.code || (res.data as IBodyError).errorCode || HttpStatusCode.UNKNOW_ERROR,
				message: (res.data as IBodyError).message || DEFAULT_ERROR_MESSAGE,
			}
		} catch (error) {
			this.state = STATE.ERROR
			this.root.loading = false
			return {
				errorCode: HttpStatusCode.UNKNOW_ERROR,
				message: error.message,
			}
		}
	}

	@flow *loginByPassword(data: LoginByPasswordParams) {
		this.root.loading = true
		this.state = STATE.PROCESSING
		try {
			const res = yield authServices.loginByPassword(data)
			this.state = STATE.DONE
			this.root.loading = false
			if (res.status === HttpStatusCode.OK && res.data && res.data.code === 0) {
				this.authUser = res.data.userInfo as User
				this.tokenUser = res.data.accessToken
				this.loginParams = {}
				return res.data
			}
			return {
				errorCode: res.data?.code || (res.data as IBodyError).errorCode || HttpStatusCode.UNKNOW_ERROR,
				message: (res.data as IBodyError).message || DEFAULT_ERROR_MESSAGE,
			}
		} catch (error) {
			this.state = STATE.ERROR
			this.root.loading = false
			return {
				errorCode: HttpStatusCode.UNKNOW_ERROR,
				message: error.message,
			}
		}
	}

	@flow *setPassword(password: string) {
		this.root.loading = true
		this.state = STATE.PROCESSING
		try {
			const res = yield authServices.setPassword(password, this.tokenUser)
			this.state = STATE.DONE
			this.root.loading = false
			if (res.status === HttpStatusCode.OK && res.data && res.data.code === 0) {
				return res.data
			}
			return {
				errorCode: res.data?.code || (res.data as IBodyError).errorCode || HttpStatusCode.UNKNOW_ERROR,
				message: (res.data as IBodyError).message || DEFAULT_ERROR_MESSAGE,
			}
		} catch (error) {
			this.state = STATE.ERROR
			this.root.loading = false
			return {
				errorCode: HttpStatusCode.UNKNOW_ERROR,
				message: error.message,
			}
		}
	}

	@flow *createCaptcha() {
		this.root.loading = true
		this.state = STATE.PROCESSING
		try {
			const res = yield authServices.createCaptcha()
			this.state = STATE.DONE
			this.root.loading = false
			if (res.status === HttpStatusCode.OK && res.data && res.data.code === 0) {
				this.loginParams.tokenCaptcha = res.data.tokenCapcha
				return res.data
			}
			return {
				errorCode: res.data?.code || (res.data as IBodyError).errorCode || HttpStatusCode.UNKNOW_ERROR,
				message: (res.data as IBodyError).message || DEFAULT_ERROR_MESSAGE,
			}
		} catch (error) {
			this.state = STATE.ERROR
			this.root.loading = false
			return {
				errorCode: HttpStatusCode.UNKNOW_ERROR,
				message: error.message,
			}
		}
	}

	@flow *getUserInfo() {
		this.root.loading = true
		this.state = STATE.PROCESSING
		try {
			const res = yield authServices.getUserInfo(this.tokenUser)
			this.state = STATE.DONE
			this.root.loading = false
			if (res.status === HttpStatusCode.OK && res.data && res.data.code === 0) {
				this.authUser = res.data.customerInfo as User
				return res.data
			}
			return {
				errorCode: res.data?.code || (res.data as IBodyError).errorCode || HttpStatusCode.UNKNOW_ERROR,
				message: (res.data as IBodyError).message || DEFAULT_ERROR_MESSAGE,
			}
		} catch (error) {
			this.state = STATE.ERROR
			this.root.loading = false
			return {
				errorCode: HttpStatusCode.UNKNOW_ERROR,
				message: error.message,
			}
		}
	}

	@flow *changePassword(params: ChangePasswordParams) {
		this.state = STATE.PROCESSING
		try {
			const token = this.tokenUser
			if (!token) {
				return {
					errorCode: HttpStatusCode.UNAUTHORIZED,
					message: UNAUTHORIZED_ERROR_MESSAGE,
				}
			}
			const res = yield authServices.changePassword<IApiResponse<ResponseType<any>>>(
				params,
				token
			)
			this.state = STATE.DONE
			if (res.status === HttpStatusCode.OK && res.data && res.data?.code == 0) {
				return res.data
			}
			return {
				errorCode: res.data?.code || (res.data as IBodyError).errorCode || HttpStatusCode.UNKNOW_ERROR,
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
}
