import { TourService } from '@/models'
import { ResponseError } from '@/models/CustomError.model'
import { ITourService } from '@/models/tourService.model'
import type IResponseObject from '@/types/ResponseObject'
import type { NextFunction, Request, Response } from 'express'

export async function create(
  req: Request<unknown, unknown, ITourService>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    if (req.bodyValid?.error) throw new ResponseError('Invalid information submitted', 400, req.bodyValid.error)

    const tourService = await TourService.create(req.body)

    const response: IResponseObject<TourService> = {
      message: 'query success',
      element: tourService,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

export async function findOne(
  req: Request<{ id: string }, unknown>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const data = await TourService.findByPk(req.params.id)

    if (!data) throw new ResponseError('not found', 409)

    const response: IResponseObject<TourService> = {
      message: 'query success',
      element: data,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

export async function findByTourId(
  req: Request<{ id: string }, unknown>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const data = await TourService.findAll({ where: { tourId: req.params.id } })

    if (!data) throw new ResponseError('not found', 409)

    const response: IResponseObject<TourService[]> = {
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
  req: Request<{ id: string }, unknown, ITourService>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void | void> {
  try {
    const [number] = await TourService.update(req.body, { where: { id: req.params.id } })

    if (!number) throw new ResponseError('update faild', 409)

    const response: IResponseObject<number> = {
      message: 'query success',
      element: number,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

export async function remove(
  req: Request<{ id: string }, unknown, unknown>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const rowDeleted = await TourService.destroy({ where: { id: req.params.id } })

    if (!rowDeleted) throw new ResponseError('delete faild', 409)

    const response: IResponseObject<number> = {
      message: 'query success',
      element: rowDeleted,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}
