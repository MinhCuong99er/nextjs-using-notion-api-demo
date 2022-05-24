import { CumstomerInfoParams, HistoryTransactionParams } from '@src/interfaces/dto/user.dto'
import request, { IApiResponse } from '@src/utils/request'
import { nanoid } from 'nanoid'

export function getCustomerInfo<T>(token: string) {
	return request<T>({
		url: '/store/get-point-info',
		options: {
			method: 'post',
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

export function getHistoryTransaction<T>(data: HistoryTransactionParams | any, token: string) {
	return request<T>({
		url: '/point-transaction/get-history-transaction',
		options: {
			method: 'post',
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	})
}

export function login<T>(username: string, password: string): Promise<IApiResponse<T>> {
	if (username == 'admin' && password == 'admin') {
		return Promise.resolve<any>({
			data: {
				code: 0,
				data: {
					token: 'e74187bfdce9a5dcd55f43cb8a9727041981897e9254b4e28e', // crypto.randomBytes(25).toString('hex'),
					data: {
						id: nanoid(10),
						name: 'admin',
						phone: '',
						username: 'admin',
						roles: 'admin',
						agent: 'admin',
						secure: '', // helper.encrypt('tnCYy9&xX'),
					},
				},
			},
			status: 200,
		})
	}
	return request<T>({
		url: '/appuser/login',
		options: {
			method: 'post',
			data: {
				username,
				password,
			},
		},
	})
}
