import type { Request, Response } from 'express'
import type IResponseObject from '@/types/ResponseObject'
import type {
  AirBookingCreationAttributes,
  IAirBooking
} from '@/models/airBooking.model'
import type AirBooking from '@/models/airBooking.model'
import airBookingService from '@/services/AirBooking.service'

class AirBookingController {
  public async create(
    _req: Request<
      unknown,
      unknown,
      AirBookingCreationAttributes
    >,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const record = await airBookingService.create(_req.body)
    const response: IResponseObject<AirBooking> = {
      message: 'query success',
      element: record,
      status: 'ok'
    }
    return res.json(response)
  }

  public async update(
    _req: Request<
      { id: string },
      unknown,
      AirBookingCreationAttributes
    >,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const { id } = _req.params
    const record = await airBookingService.update(
      _req.body,
      { id }
    )

    const response: IResponseObject<number> = {
      message: 'query success',
      element: record,
      status: 'ok'
    }

    return res.json(response)
  }

  public async remove(
    _req: Request<
      { id: string },
      unknown,
      AirBookingCreationAttributes
    >,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const { id } = _req.params
    const record = await airBookingService.remove(id)

    const response: IResponseObject<number> = {
      message: 'query success',
      element: record,
      status: 'ok'
    }

    return res.json(response)
  }

  public async getByTourId(
    _req: Request<
      { id: string },
      unknown,
      AirBookingCreationAttributes
    >,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const { id } = _req.params
    const record = await airBookingService.queryAirBooking({
      tourId: id
    })

    const response: IResponseObject<IAirBooking[]> = {
      message: 'query success',
      element: record,
      status: 'ok'
    }

    return res.json(response)
  }
}

export default new AirBookingController()
