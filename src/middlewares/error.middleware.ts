import { ResponseError } from '@/models/CustomError.model'
import type { NextFunction, Request, Response } from 'express'

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new ResponseError('not found', 404)
  console.log('not founnd')

  next(err)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export function handleError(error: any, request: Request, response: Response, next: NextFunction) {
  let customError = error

  console.log({ customError })

  if (!(error instanceof ResponseError)) {
    customError = new ResponseError(
      process.env.NODE_ENV === 'development'
        ? error.message
        : 'Oh no, this is embarrasing. We are having troubles my friend'
    )
  }
  return response.status((customError as ResponseError).status).json(customError)
}
