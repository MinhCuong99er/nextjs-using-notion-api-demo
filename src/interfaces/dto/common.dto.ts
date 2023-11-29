export interface ListParam {
  skip: number
  limit: number
}

export interface ResponseType<T> {
  code: number
  message: string
  data: Array<T> | T
  total?: number
  errorCode?: number
}

export interface IPagination {
  skip?: number
  page?: number
  limit?: number
  totalPage?: number
  total?: number
  loadMore?: boolean
}
