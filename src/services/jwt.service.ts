import env from '@/config/env'
import type { TypeRole } from '@/types/IAuthType'
import jwt from 'jsonwebtoken'

export interface IUserJwt {
  id: string
  role: string
  [key: string]: string
}

export interface IDecodeRefesh {
  id: string
  role: TypeRole | string
  [key: string]: string
}

export default class JwtService {
  public static generateAccessToken = (data: IUserJwt) => {
    try {
      if (!data) throw new Error('data null')
      return jwt.sign(
        { ...data },
        env.AUTH_SECRET_KEY_ACCESS_TOKEN,
        {
          expiresIn: env.AUTH_SECRET_KEY_EXPIRES
        }
      )
    } catch (error) {
      throw error
    }
  }

  public static decodeToken = <T = unknown>(
    token: string
  ): T => {
    try {
      const payload = jwt.verify(
        token,
        env.AUTH_SECRET_KEY_ACCESS_TOKEN
      )
      return payload as T
    } catch (error) {
      throw error
    }
  }

  public static generateRefreshToken = (id: string) => {
    try {
      return jwt.sign(
        { id },
        env.AUTH_SECRET_KEY_REFRESH_TOKEN,
        {}
      )
    } catch (error) {
      throw error
    }
  }

  public static decodeRefeshToken = (
    token: string
  ): IDecodeRefesh => {
    try {
      const payload = jwt.verify(
        token,
        env.AUTH_SECRET_KEY_REFRESH_TOKEN
      )
      return payload as IDecodeRefesh
    } catch (error) {
      throw error
    }
  }
}
