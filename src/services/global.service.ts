import request, { IApiResponse } from '@src/utils/request'

export function upload<T>(file: File, token: string): Promise<IApiResponse<T>> {
	const data = new FormData()
	data.append('images', file)
	return request<T>({
		url: '/file/upload-image',
		options: {
			method: 'post',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
			data,
		},
	})
}
