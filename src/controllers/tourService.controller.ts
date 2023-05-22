// import { TourService } from '@/models'
// import { ResponseError } from '@/models/CustomError.model'
// import type IResponseObject from '@/types/ResponseObject'
// import type { NextFunction, Request, Response } from 'express'

// export async function create(
//   req: Request<unknown, unknown, TourService>,
//   res: Response,
//   next: NextFunction
// ): Promise<Response<IResponseObject<unknown>> | void> {
//   try {
//     if (req.bodyValid?.error) throw new ResponseError('Invalid information submitted', 400, req.bodyValid.error)

//     const tourService = await TourService.create(req.body)

//     const response: IResponseObject<TourService> = {
//       message: 'query success',
//       element: tourService,
//       status: 'ok'
//     }

//     return res.json(response)
//   } catch (error) {
//     next(error)
//   }
// }

// // export async function findOne(
// //   req: Request<{ id: string }, unknown, Location>,
// //   res: Response,
// //   next: NextFunction
// // ): Promise<Response<IResponseObject<unknown>> | void> {
// //   try {
// //     const location = await Location.findByPk(req.params.id)

// //     if (!location) throw new ResponseError('not found', 404)

// //     const response: IResponseObject<Location> = {
// //       message: 'query success',
// //       element: location,
// //       status: 'ok'
// //     }

// //     return res.json(response)
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // export async function update(
// //   req: Request<{ id: string }, unknown, Location>,
// //   res: Response,
// //   next: NextFunction
// // ): Promise<Response<IResponseObject<unknown>> | void | void> {
// //   try {
// //     const [location] = await Location.update(req.body, { where: { id: req.params.id } })

// //     if (!location) throw new ResponseError('not found location', 404)

// //     const response: IResponseObject<number> = {
// //       message: 'query success',
// //       element: location,
// //       status: 'ok'
// //     }

// //     return res.json(response)
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// export async function remove(
//   req: Request<{ id: string }, unknown, unknown>,
//   res: Response,
//   next: NextFunction
// ): Promise<Response<IResponseObject<unknown>> | void> {
//   try {
//     const rowDeleted = await TourService.destroy({ where: { id: req.params.id } })

//     if (!rowDeleted) throw new ResponseError('delete faild', 404)

//     const response: IResponseObject<number> = {
//       message: 'query success',
//       element: rowDeleted,
//       status: 'ok'
//     }

//     return res.json(response)
//   } catch (error) {
//     next(error)
//   }
// }
