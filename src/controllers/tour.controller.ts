import { Location, Tour, TourImage } from '@/models'
import { ResponseError } from '@/models/CustomError.model'
import { type ITour } from '@/models/tour.model'
import type IResponseObject from '@/types/ResponseObject'
import type { NextFunction, Request, Response } from 'express'

export async function getAll(
  req: Request<unknown, unknown, Location>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const tours = await Tour.findAll({
      include: [
        { model: Location, as: 'location' },
        { model: TourImage, as: 'tourImages' }
      ]
    })

    const response: IResponseObject<Tour[]> = {
      message: 'query success',
      element: tours,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

export async function create(
  req: Request<unknown, unknown, ITour>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    if (req.bodyValid?.error) throw new ResponseError('is valid body', 404, req.bodyValid.error)

    const { transports, itineraries, accommodations, ...rest } = req.body

    const tour = new Tour({ ...(rest as Tour) })
    tour.setTransports(transports)
    tour.setItineraries(itineraries)
    tour.setAccommodations(accommodations)

    await tour.save()
    const response: IResponseObject<Tour> = {
      message: 'query success',
      element: tour,
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
