import { ResponseError } from '@/models/CustomError.model'
import { Company } from '@/models'
import type IResponseObject from '@/types/ResponseObject'
import type { NextFunction, Request, Response } from 'express'
import { ICompany } from '@/models/company.model'

export async function getAll(
  req: Request<unknown, unknown, unknown>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const data = await Company.findAll()
    const response: IResponseObject<Company[]> = {
      message: 'query success',
      element: data,
      status: 'ok'
    }
    return res.json(response)
  } catch (error) {
    next(error)
  }
}

export async function create(
  req: Request<unknown, unknown, ICompany>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const data = await Company.create(req.body)
    const response: IResponseObject<Company> = {
      message: 'query success',
      element: data,
      status: 'ok'
    }
    return res.json(response)
  } catch (error) {
    next(error)
  }
}

export async function update(
  req: Request<{ id: string }, unknown, ICompany>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const [data] = await Company.update(req.body, {
      where: { id: req.params.id }
    })

    if (!data) throw new ResponseError('update faild')

    const response: IResponseObject<number> = {
      message: 'query success',
      element: data,
      status: 'ok'
    }
    return res.json(response)
  } catch (error) {
    next(error)
  }
}
