import { ResponseError } from '@/models/CustomError.model'
import { Supplier } from '@/models'
import type IResponseObject from '@/types/ResponseObject'
import type { NextFunction, Request, Response } from 'express'
import type { ISupplier } from '@/models/supplier.model'

export async function getAll(
  req: Request<unknown, unknown, unknown>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const data = await Supplier.findAll()
    const response: IResponseObject<Supplier[]> = {
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
  req: Request<unknown, unknown, ISupplier>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const data = await Supplier.create(req.body)

    const response: IResponseObject<Supplier> = {
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
  req: Request<{ id: string }, unknown, ISupplier>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const [number] = await Supplier.update(req.body, { where: { id: req.params.id } })
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

// export async function findOne(
//   req: Request<{ id: string }, unknown, Location>,
//   res: Response,
//   next: NextFunction
// ): Promise<Response<IResponseObject<unknown>> | void> {
//   try {
//     const location = await Location.findByPk(req.params.id)

//     if (!location) throw new ResponseError('not found', 404)

//     const response: IResponseObject<Location> = {
//       message: 'query success',
//       element: location,
//       status: 'ok'
//     }

//     return res.json(response)
//   } catch (error) {
//     next(error)
//   }
// }

// export async function update(
//   req: Request<{ id: string }, unknown, Location>,
//   res: Response,
//   next: NextFunction
// ): Promise<Response<IResponseObject<unknown>> | void | void> {
//   try {
//     const [location] = await Location.update(req.body, { where: { id: req.params.id } })

//     if (!location) throw new ResponseError('not found location', 404)

//     const response: IResponseObject<number> = {
//       message: 'query success',
//       element: location,
//       status: 'ok'
//     }

//     return res.json(response)
//   } catch (error) {
//     next(error)
//   }
// }

// export async function remove(
//   req: Request<{ id: string }, unknown, Location>,
//   res: Response,
//   next: NextFunction
// ): Promise<Response<IResponseObject<unknown>> | void> {
//   try {
//     const location = await Location.destroy({ where: { id: req.params.id } })

//     const response: IResponseObject<number> = {
//       message: 'query success',
//       element: location,
//       status: 'ok'
//     }

//     return res.json(response)
//   } catch (error) {
//     next(error)
//   }
// }
