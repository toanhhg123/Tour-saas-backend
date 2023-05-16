import type Joi from 'joi'

declare global {
  namespace Express {
    interface Request {
      bodyValid?: Joi.ValidationResult<unknown>
    }
  }
}
