import type { TourAgentSalesCreationAttributes } from '@/models/tourAgentSales.model'
import tourAgentSalesService from '@/services/tourAgentSales.service'
import type IResponseObject from '@/types/ResponseObject'
import type { Request, Response } from 'express'

class TourAgentSalesController {
  async getByTourId(
    req: Request<{ id: string }>,
    res: Response
  ) {
    const { id } = req.params
    const record = await tourAgentSalesService.getByTourId(
      id
    )
    const response: IResponseObject<typeof record> = {
      message: 'success',
      element: record,
      status: 'success'
    }
    return res.json(response)
  }

  async getBySaleId(req: Request, res: Response) {
    const id = req.user?.id ?? ''

    const record = await tourAgentSalesService.getBySaleId(
      id
    )

    const response: IResponseObject<typeof record> = {
      message: 'success',
      element: record,
      status: 'success'
    }
    return res.json(response)
  }

  async create(
    req: Request<
      unknown,
      unknown,
      TourAgentSalesCreationAttributes,
      unknown
    >,
    res: Response
  ) {
    const body = req.body
    const record = await tourAgentSalesService.create(body)
    const response: IResponseObject<typeof record> = {
      message: 'success',
      element: record,
      status: 'success'
    }
    return res.json(response)
  }

  async remove(
    req: Request<{ id: string }>,
    res: Response
  ) {
    const { id } = req.params
    const record = await tourAgentSalesService.remove(id)

    const response: IResponseObject<typeof record> = {
      message: 'success',
      element: record,
      status: 'success'
    }
    return res.json(response)
  }
}

export default new TourAgentSalesController()
