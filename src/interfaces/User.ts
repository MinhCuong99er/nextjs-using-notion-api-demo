export interface IUserResponse {
	code: number
	message?: number
	data?: {
		userInfo: User
		token: string
		tokenChat: string
		chatId: string
		storeInfo: StoreInfo
		role: string
	}
}

export interface StoreInfo {
	name: string
	address: string
	province: string
	district: string
	ward: string
	phone: string
}

export interface User {
	total: number
	balance: number
	id: string
	refId: string
	customerId: string
	phone: string
	points_by_type?: any
	storeOwnerName: string
	storeOwnerPhone: string
	point?: number
	percent?: number
}
