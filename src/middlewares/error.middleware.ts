import { CustomError } from '@/models/CustomError.model'
import type { NextFunction, Request, Response } from 'express'

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new CustomError('not found', 404)
  console.log('not founnd')

  next(err)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleError(err: TypeError | CustomError, req: Request, res: Response, _next: NextFunction) {
  let customError = err

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Oh no, this is embarrasing. We are having troubles my friend'
    )
  }
  return res.status((customError as CustomError).status).json(customError)
}

export default handleError
