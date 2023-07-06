import { OSBookingPaymentCreationAttributes } from '@/models/otherServiceBookingPayment.model'
import otherServiceBookingPaymentService from '@/services/otherServiceBookingPayment.service'
import IResponseObject from '@/types/ResponseObject'
import { Request, Response } from 'express'

class OtherServiceBookingPaymentController {
  public async getAll(
    _req: Request<
      { id: string },
      unknown,
      OSBookingPaymentCreationAttributes
    >,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const { id } = _req.params
    const record =
      await otherServiceBookingPaymentService.getByOtherServiceBookingId(
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
      OSBookingPaymentCreationAttributes
    >,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const record =
      await otherServiceBookingPaymentService.create(
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
      OSBookingPaymentCreationAttributes
    >,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const { id } = _req.params

    const record =
      await otherServiceBookingPaymentService.update(
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
      OSBookingPaymentCreationAttributes
    >,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const { id } = _req.params

    const record =
      await otherServiceBookingPaymentService.remove(id)

    const response: IResponseObject<typeof record> = {
      message: 'query success',
      element: record,
      status: 'ok'
    }

    return res.json(response)
  }
}

export default new OtherServiceBookingPaymentController()
