import { ResponseError } from '@/models/CustomError.model'
import type { IUserJwt } from '@/services/jwt.service'
import JwtService from '@/services/jwt.service'
import type { TypeRole } from '@/types/IAuthType'
import type {
  NextFunction,
  Request,
  Response
} from 'express'
import { asyncHandler } from './error.middleware'

export const authorize = (arr?: TypeRole[]) =>
  asyncHandler(
    async (
      req: Request,
      _res: Response,
      next: NextFunction
    ) => {
      // ====> get Token in cookies
      let token = req.session.userToken?.accessToken

      // ====> get Token in Header with starts Bearer
      if (!token) {
        const tokenHeader = req.headers.authorization
        if (
          !tokenHeader ||
          !tokenHeader.startsWith('Bearer')
        )
          throw new ResponseError('no authencation', 401)
        token = tokenHeader.slice(7)
      }

      if (!token)
        throw new ResponseError('no authencation', 401)

      const decode = JwtService.decodeToken<IUserJwt>(token)
      const { role } = decode
      if (
        arr &&
        arr.length &&
        !arr.some((ar) => ar === role)
      )
        throw new ResponseError('forbidden', 403)

      req.user = decode

      return next()
    }
  )
