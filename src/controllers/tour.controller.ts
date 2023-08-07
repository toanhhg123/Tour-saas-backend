import { Account, Booking, TourService } from '@/models'
import { ResponseError } from '@/models/CustomError.model'
import AirBooking from '@/models/airBooking.model'
import type { ITour } from '@/models/tour.model'
import Tour from '@/models/tour.model'
import TourAgentSales from '@/models/tourAgentSales.model'
import accountService from '@/services/account.service'
import tourService from '@/services/tour.service'
import type {
  IPageAction,
  IPageActionResponse
} from '@/types/IPageAcction'
import type IResponseObject from '@/types/ResponseObject'
import type {
  Request,
  Response,
  NextFunction
} from 'express'

export async function getAll(
  _req: Request<unknown, unknown, unknown, IPageAction>,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const { id } = _req.user

  const user = await accountService.findAccountById(id)
  const roleName = user.role?.name

  let tours: IPageActionResponse<Tour[]> = {
    data: []
  }

  switch (roleName) {
    case 'Oper.TourMan': {
      tours = await tourService.getAll({
        ..._req.query,
        userId: id
      })

      break
    }

    case 'Oper.Mamnager': {
      const tourMans =
        await accountService.getAllAccountWithOperIdAndRole(
          id,
          'Oper.TourMan',
          ['id']
        )

      const ids = tourMans.map((x) => x.id)

      tours = await tourService.getByListTourManId(
        ids,
        _req.query
      )

      break
    }

    case 'Oper.Sales': {
      const tourMans =
        await accountService.getAllAccountWithOperIdAndRole(
          user.operatorId,
          'Oper.TourMan',
          ['id']
        )

      const ids = tourMans.map((x) => x.id)

      tours = await tourService.getByListTourManId(
        ids,
        _req.query
      )

      break
    }
  }

  const response: IResponseObject<typeof tours> = {
    message: 'query success',
    element: tours,
    status: 'ok'
  }

  return res.json(response)
}

export async function getByListId(
  _req: Request<
    unknown,
    unknown,
    unknown,
    { ids: string[] }
  >,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const { ids } = _req.query
  console.log({ ids })
  const tours = await tourService.getByListId(ids)

  const response: IResponseObject<typeof tours> = {
    message: 'query success',
    element: tours,
    status: 'ok'
  }

  return res.json(response)
}

export async function getToursByManager(
  _req: Request<
    unknown,
    unknown,
    unknown,
    { pageActions: IPageAction }
  >,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const { id } = _req.user

  const tourMans =
    await accountService.getAllAccountWithOperIdAndRole(
      id,
      'Oper.TourMan',
      ['id']
    )

  const ids = tourMans.map((x) => x.id)

  const tours = await tourService.getByListTourManId(
    ids,
    _req.query.pageActions
  )

  const response: IResponseObject<typeof tours> = {
    message: 'query success',
    element: tours,
    status: 'ok'
  }

  return res.json(response)
}

export async function getByCompanyId(
  req: Request<{ companyId: string }, unknown, Location>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const tours = await Tour.findAll({
      where: {
        companyId: req.params.companyId
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
    const tour = new Tour({
      ...req.body,
      tourManId: req.user?.id || ''
    })

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
        {
          model: Account,
          as: 'tourMan'
        },
        {
          model: Account,
          as: 'tourGuide'
        },
        {
          model: TourService,
          as: 'tourServices'
        },
        { model: AirBooking, as: 'airBookings' },
        { model: TourAgentSales, as: 'tourAgentSales' },
        { model: Booking, as: 'bookings' }
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
        ...req.body
      },
      { where: { id: req.params.id } }
    )

    if (!tour)
      throw new ResponseError('not found location', 404)

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

export async function remove(
  req: Request<{ id: string }, unknown, Location>,
  res: Response,
  _next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  const num = await tourService.remove(req.params.id)

  const response: IResponseObject<typeof num> = {
    message: 'query success',
    element: num,
    status: 'ok'
  }

  return res.json(response)
}
