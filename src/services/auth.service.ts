import { ChangePasswordParams, CumstomerInfoParams, LoginByPasswordParams, LoginByPhoneParams } from '@src/interfaces/dto/user.dto'
import request, { IApiResponse } from '@src/utils/request'

export function checkUserExist<T>(_phone: string): Promise<IApiResponse<T>> {
	return request<T>({
		url: '/customer/check-user-exist',
		options: {
			method: 'post',
			data: {
				phone: _phone,
			},
		},
	})
}

export function sendOtp<T>(_phone: string, _hash: string): Promise<IApiResponse<T>> {
	return request<T>({
		url: '/otp/send-otp',
		options: {
			method: 'post',
			data: {
				phone: _phone,
				hash: _hash,
			},
		},
	})
}

export function verifyOtp<T>(_otp: string, _tokenSendOtp: string): Promise<IApiResponse<T>> {
	return request<T>({
		url: '/otp/verify-otp',
		options: {
			method: 'post',
			data: {
				otp: _otp,
				token: _tokenSendOtp,
			},
		},
	})
}

export function createCaptcha<T>(): Promise<IApiResponse<T>> {
	return request<T>({
		url: '/user/create-captcha',
		options: {
			method: 'post',
		},
	})
}

export function loginByPassword<T>(data: LoginByPasswordParams): Promise<IApiResponse<T>> {
	return request<T>({
		url: '/customer/login-by-password',
		options: {
			method: 'post',
			data,
		},
	})
}

export function loginByPhone<T>(data: LoginByPhoneParams): Promise<IApiResponse<T>> {
	return request<T>({
		url: '/customer/login-by-phone',
		options: {
			method: 'post',
			data
		},
	})
}

export function setPassword<T>(_password: string, _token: string): Promise<IApiResponse<T>> {
	return request<T>({
		url: '/customer/set-password',
		options: {
			method: 'post',
			data: {
				password: _password,
			},
			headers: {
				Authorization: `Bearer ${_token}`,
			},
		},
	})
}

export function getUserInfo<T>(token: string): Promise<IApiResponse<T>> {
	return request<T>({
		url: '/customer/get-customer-info',
		options: {
			method: 'get',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	})
}


export function updateCustomerInfo<T>(info: CumstomerInfoParams, token: string) {
	return request<T>({
		url: '/customer/update-customer-info',
		options: {
			method: 'post',
			data: {
				info,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	})
}

export function linkExchange<T>(phone: string, token: string) {
	return request<T>({
		url: '/customer/link-exchange',
		options: {
			method: 'post',
			data: {
				phone,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	})
}

export function verifyLinkExchange<T>(phone: string, code: string, token: string) {
	return request<T>({
		url: '/customer/verify-link-exchange',
		options: {
			method: 'post',
			data: {
				phone,
				code,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	})
}

export function updateCustomerInfoV2<T>(info: CumstomerInfoParams, token: string) {
	return request<T>({
		url: '/customers',
		options: {
			method: 'post',
			data: {
				info,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	})
}

export function changePassword<T>(data: ChangePasswordParams, token: string) {
	return request<T>({
		url: '/appuser/change-password',
		options: {
			method: 'post',
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	})
}
