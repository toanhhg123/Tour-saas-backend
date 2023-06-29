import { ResponseError } from '@/models/CustomError.model'
import type { IUserJwt } from '@/services/jwt.service'
import JwtService from '@/services/jwt.service'
import type { TypeRole } from '@/types/IAuthType'
import type {
  NextFunction,
  Request,
  Response
} from 'express'

export const authorize =
  (arr?: TypeRole[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token =
        req.session.userToken?.accessToken ||
        req.headers.authorization?.split(' ')?.at(1) ||
        undefined

      if (!token)
        throw new ResponseError('no authencation', 401)

      const decode = JwtService.decodeToken<IUserJwt>(token)
      const { role } = decode
      if (arr && !arr.some((ar) => ar === role))
        throw new ResponseError('forbidden', 403)

      req.user = decode
      return next()
    } catch (error) {
      throw error
    }
  }
