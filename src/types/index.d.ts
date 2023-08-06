import type Joi from 'joi'
import type { IAuthResponse } from './IAuthType'
import type { IUserJwt } from '../services/jwt.service'

declare global {
  namespace Express {
    interface Request {
      bodyValid?: Joi.ValidationResult<unknown>
      user: IUserJwt
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    userToken: IAuthResponse
  }
}
