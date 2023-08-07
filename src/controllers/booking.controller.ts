import { ResponseError } from '@/models/CustomError.model'
import { Account, Booking, BookingPayment } from '@/models'
import type IResponseObject from '@/types/ResponseObject'
import type {
  NextFunction,
  Request,
  Response
} from 'express'
import type { IBooking } from '@/models/booking.model'
import Tour from '@/models/tour.model'
import TourAgentSales from '@/models/tourAgentSales.model'
import bookingService from '@/services/booking.service'

export async function create(
  req: Request<unknown, unknown, IBooking>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const record = await Booking.create({ ...req.body })
    const recordRes = await Booking.findByPk(record.id, {
      include: [
        { model: Tour, as: 'tour' },
        { model: Account, as: 'client' },
        { model: Account, as: 'sale' }
      ]
    })
    if (!recordRes)
      throw new ResponseError('Not found booking')
    const response: IResponseObject<Booking> = {
      message: 'query success',
      element: recordRes,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

export async function getByTourId(
  req: Request<{ tourId: string }, unknown>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const saleId = req.user?.id
    const { tourId } = req.params

    const isExist = await TourAgentSales.findOne({
      where: {
        tourId,
        saleId: saleId
      }
    })

    if (!isExist)
      throw new ResponseError(
        'bạn không có quyền để can thiệp vào phần này',
        403
      )

    const record = await Booking.findAll({
      where: {
        tourId: req.params.tourId
      },
      include: [
        { model: Tour, as: 'tour' },
        { model: Account, as: 'client' },
        { model: Account, as: 'sale' },
        { model: BookingPayment, as: 'bookingPayments' }
      ]
    })

    const response: IResponseObject<Booking[]> = {
      message: 'query success',
      element: record,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

export async function getBookingSalesWithTourMan(
  req: Request<{ tourId: string; saleId: string }>,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const tourManId = req.user.id
  const { tourId, saleId } = req.params

  const record =
    await bookingService.getSalesBookingByTourMan({
      tourId,
      saleId,
      userId: tourManId
    })

  const response: IResponseObject<typeof record> = {
    message: 'query success',
    element: record,
    status: 'ok'
  }

  return res.json(response)
}

export async function getByTourMan(
  req: Request<{ tourId: string }>,
  res: Response
) {
  const userId = req.user?.id ?? ''
  const { tourId } = req.params

  const record =
    await bookingService.getBookingsByTourManId(
      userId,
      tourId
    )

  const response: IResponseObject<typeof record> = {
    message: 'query success',
    element: record,
    status: 'ok'
  }

  return res.json(response)
}

export async function update(
  req: Request<{ id: string }, unknown, IBooking>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const [record] = await Booking.update(req.body, {
      where: { id: req.params.id }
    })

    const response: IResponseObject<number> = {
      message: 'query success',
      element: record,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

export async function remove(
  req: Request<{ id: string }, unknown>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const record = await Booking.destroy({
      where: { id: req.params.id }
    })
    if (!record) throw new ResponseError('delete faild')
    const response: IResponseObject<number> = {
      message: 'query success',
      element: record,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}
