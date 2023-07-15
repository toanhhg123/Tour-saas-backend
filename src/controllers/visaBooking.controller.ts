import type { Response, Request } from 'express'
import type IResponseObject from '@/types/ResponseObject'
import visaBookingService from '@/services/visaBooking.service'
import type { VisaBookingCreationAttributes } from '@/models/visaBooking.model'

class VisaBookingController {
  public async getByVisaGrId(
    req: Request<{ id: string }, unknown>,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const { id } = req.params

    const record = await visaBookingService.getByVisaGrId(
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
    req: Request<
      { id: string },
      unknown,
      VisaBookingCreationAttributes
    >,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const record = await visaBookingService.create({
      ...req.body,
      saleId: req.user?.id ?? ''
    })

    const response: IResponseObject<typeof record> = {
      message: 'query success',
      element: record,
      status: 'ok'
    }

    return res.json(response)
  }

  public async update(
    req: Request<
      { id: string },
      unknown,
      VisaBookingCreationAttributes
    >,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const { id } = req.params

    const record = await visaBookingService.update(
      req.body,
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
    req: Request<{ id: string }>,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const { id } = req.params

    const record = await visaBookingService.remove(id)

    const response: IResponseObject<typeof record> = {
      message: 'query success',
      element: record,
      status: 'ok'
    }
    return res.json(response)
  }
}

export default new VisaBookingController()
