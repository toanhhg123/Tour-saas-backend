import { ResponseError } from '@/models/CustomError.model'
import type {
  NextFunction,
  Request,
  Response
} from 'express'

export const notFound = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const err = new ResponseError('not found', 404)
  next(err)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleErrorResponse = (
  error: any
): ResponseError => {
  let customError = error
  if (!(error instanceof ResponseError)) {
    customError = new ResponseError(
      process.env.NODE_ENV === 'development'
        ? error.message
        : 'Oh no, this is embarrasing. We are having troubles my friend'
    )
  }
  return customError
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const asyncHandler = (
  fn: (
    request: Request<any, any, any, any>,
    response: Response,
    next: NextFunction
  ) => Promise<unknown | void>
) => {
  const cb = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    fn(request, response, next).catch(next)
  }

  return cb
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export function handleError(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  const errorRes = handleErrorResponse(error)
  return response.status(errorRes.status).json(errorRes)
}
