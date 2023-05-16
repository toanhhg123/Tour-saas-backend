import type { NextFunction, Request, Response } from 'express'
import type Joi from 'joi'

export const validateBody = <T>(validate: (object: T) => Joi.ValidationResult<T>) => {
  const middleware = (req: Request, res: Response, next: NextFunction) => {
    try {
      const valid = validate(req.body)
      req.bodyValid = valid
    } catch (error) {
      next()
    }
    next()
  }

  return middleware
}
