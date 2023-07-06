import type { OSBookingCreationAttributes } from '@/models/otherServiceBooking.model'
import otherServiceBookingService from '@/services/otherServiceBooking.service'
import type IResponseObject from '@/types/ResponseObject'
import type { Request, Response } from 'express'

class OtherServiceBookingController {
  public async getAll(
    _req: Request<
      { id: string },
      unknown,
      OSBookingCreationAttributes
    >,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const { id } = _req.params
    const record =
      await otherServiceBookingService.getByOtherServiceId(
        id
      )
    const response: IResponseObject<typeof record> = {
      message: 'query success',
      element: record,
      status: 'ok'
    }

    return res.json(response)
  }

  public async create(
    _req: Request<
      unknown,
      unknown,
      OSBookingCreationAttributes
    >,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const record = await otherServiceBookingService.create(
      _req.body
    )

    const response: IResponseObject<typeof record> = {
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
      OSBookingCreationAttributes
    >,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const { id } = _req.params

    const record = await otherServiceBookingService.update(
      _req.body,
      id
    )

    const response: IResponseObject<typeof record> = {
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
      OSBookingCreationAttributes
    >,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const { id } = _req.params

    const record = await otherServiceBookingService.remove(
      id
    )

    const response: IResponseObject<typeof record> = {
      message: 'query success',
      element: record,
      status: 'ok'
    }

    return res.json(response)
  }
}

export default new OtherServiceBookingController()
