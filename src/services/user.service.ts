import request, { IApiResponse } from '@src/utils/request'

export function getCustomerInfo<T>(domain: string): Promise<IApiResponse<T>> {
  return request<T>({
    url: '/koc/create-token',
    options: {
      method: 'post',
      data: {
        domain,
      },
    },
  })
}
