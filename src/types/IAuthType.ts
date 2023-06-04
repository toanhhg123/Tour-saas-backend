export type TypeEntity = 'Accounts' | 'Roles' | 'Companies' | 'Permissions' | 'Entities' | string

export type TypePermission = 'ALL' | 'EDIT' | 'READ' | 'DELETE' | 'CREATE'

export interface IEntity {
  Account: TypeEntity
  Role: TypeEntity
  Company: TypeEntity
  Permission: TypeEntity
  Entity: TypeEntity
  Supplier: TypeEntity
  TourPayment: TypeEntity
}

export interface IAuthRequest {
  email: string
  password: string
}

export interface IAuthResponse {
  accessToken: string
  refreshToken: string
}

export interface ITokenRefresh {
  id: string
  accessToken: string
  refreshToken: string
}

export interface IRoleAttribuite {
  entity: TypeEntity
  permission: TypePermission[]
}

export type TypeRole =
  | 'Oper.Admin'
  | 'Sys.Admin'
  | 'Oper.Mamnager'
  | 'Oper.TourMan'
  | 'Oper.Sales'
  | 'Oper.Visa'
  | 'Oper.Acct'
  | 'Oper.Guide'
  | 'Agent.Sales'
  | 'Agent.Admin'
  | 'Client'
