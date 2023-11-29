import { GENDER } from './enums'

export interface IUserResponse {
  code: number
  message: number
  data: {
    userInfo: User
    token?: string
  }
}

export interface User {
  createdAt: number
  updatedAt: number
  id: number
  name: string
  phone: string
  facebookId: string
  googleId: string
  email: string
  birth: number
  gender: GENDER
  address: string
  avatar: string
  provinceId: number
  districtId: number
  wardId: number
  contact: string
  exchangeId: string
  tierId: number
  inviteCode: string
  secure: string
  merchantId: string
  merchantRef: string
  mpoint: number
  totalMpoint: number
  codeCount: number
  countNotiUnRead: number
  isBlock: boolean
}
