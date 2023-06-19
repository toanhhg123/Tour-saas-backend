import { ResponseError } from '@/models/CustomError.model'
import type { NextFunction, Request, Response } from 'express'
import type Joi from 'joi'

export const validateBody = <T>(
  validate: (object: T) => Joi.ValidationResult<T>
) => {
  const middleware = (req: Request, res: Response, next: NextFunction) => {
    const valid = validate(req.body)
    if (valid.error) throw new ResponseError('is valid body', 400, valid.error)
    req.bodyValid = valid
    next()
  }

  return middleware
}
