import { CodeResponse } from '@react-oauth/google'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type RegisterParams = {
  email: string
  name: string
  password: string
}

export type Role = {
  _id: string
  tenantId?: string | null
  title: string
  permissions: any
}

export type UserDataType = {
  id: number
  role: Role
  email: string
  name: string
  fullName: string
  username: string
  password: string
  picture?: string | null
  tenantId: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  loginGoogle: (params: CodeResponse, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
}

export type LoginGoogleParams = {
  code: string
  authuser: string
  hd: string
  prompt: string
  scope: string
}
