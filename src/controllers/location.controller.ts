// import { Location, Tour } from '@/models'
// import { ResponseError } from '@/models/CustomError.model'
// import type IResponseObject from '@/types/ResponseObject'
// import type { NextFunction, Request, Response } from 'express'

// export async function getAll(
//   req: Request<unknown, unknown, Location>,
//   res: Response,
//   next: NextFunction
// ): Promise<Response<IResponseObject<unknown>> | void> {
//   try {
//     const location = await Location.findAll({ include: [{ model: Tour, as: 'tours' }] })

//     const response: IResponseObject<Location[]> = {
//       message: 'query success',
//       element: location,
//       status: 'ok'
//     }

//     return res.json(response)
//   } catch (error) {
//     next(error)
//   }
// }

// export async function create(
//   req: Request<unknown, unknown, Location>,
//   res: Response,
//   next: NextFunction
// ): Promise<Response<IResponseObject<unknown>> | void> {
//   try {
//     const location = await Location.create(req.body)

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
