import { Account, Role, Supplier, TourService } from '@/models'
import { ResponseError } from '@/models/CustomError.model'
import AirBooking from '@/models/airBooking.model'
import { ITour, STRING_CONCAT } from '@/models/tour.model'
import Tour from '@/models/tour.model'
import type IResponseObject from '@/types/ResponseObject'
import type { Request, Response, NextFunction } from 'express'

export async function getAll(
  req: Request<unknown, unknown, Location>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const tours = await Tour.findAll({
      include: [
        { model: Account, as: 'tourMan' },
        { model: Account, as: 'tourGuide' }
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

export async function getTourByManager(
  req: Request<unknown, unknown, Location>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const user = req.user

    const tours = await Tour.findAll({
      where: {
        tourManId: user?.id ?? ''
      },
      include: [
        { model: Account, as: 'tourMan' },
        { model: Account, as: 'tourGuide' }
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
    const { route, ...rest } = req.body

    const tour = new Tour({ ...(rest as unknown as Tour), tourManId: req.user?.id ?? '' })
    tour.setRoute(route)

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

export async function findOne(
  req: Request<{ id: string }, unknown>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const tour = await Tour.findByPk(req.params.id, {
      include: [
        { model: Account, as: 'tourMan', include: [{ model: Role, as: 'role' }] },
        { model: Account, as: 'tourGuide', include: [{ model: Role, as: 'role' }] },
        { model: AirBooking, as: 'airBookings' },
        { model: TourService, as: 'tourServices', include: [{ model: Supplier, as: 'supplier' }] }
      ]
    })

    if (!tour) throw new ResponseError('not found', 404)

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

export async function update(
  req: Request<{ id: string }, unknown, ITour>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const [tour] = await Tour.update(
      {
        ...req.body,
        route: req.body.route.join(STRING_CONCAT)
      },
      { where: { id: req.params.id } }
    )

    if (!tour) throw new ResponseError('not found location', 404)

    const response: IResponseObject<number> = {
      message: 'query success',
      element: tour,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

// // export async function remove(
// //   req: Request<{ id: string }, unknown, Location>,
// //   res: Response,
// //   next: NextFunction
// // ): Promise<Response<IResponseObject<unknown>> | void> {
// //   try {
// //     const location = await Location.destroy({ where: { id: req.params.id } })

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
