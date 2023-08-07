import { ResponseError } from '@/models/CustomError.model'
import type { TourOperSalesCreationAttributes } from '@/models/TourOperSales.model'
import type TourOperSales from '@/models/TourOperSales.model'
import TourOperSalesService from '@/services/TourOperSales.service'
import accountService from '@/services/account.service'
import type IResponseObject from '@/types/ResponseObject'
import type { Request, Response } from 'express'

class TourOperSalesController {
  public async create(
    _req: Request<
      unknown,
      IResponseObject<TourOperSales>,
      TourOperSalesCreationAttributes,
      TourOperSalesCreationAttributes
    >,
    res: Response
  ) {
    const body = _req.body

    const record = await TourOperSalesService.create(body)

    const response: IResponseObject<typeof record> = {
      message: 'success',
      element: record,
      status: 'suceess'
    }

    return res.json(response)
  }

  public async getByTourId(
    _req: Request<
      { tourId: string },
      unknown,
      unknown,
      unknown
    >,
    res: Response
  ) {
    const record =
      await TourOperSalesService.getByOperSaleId(
        _req.params.tourId
      )

    const response: IResponseObject<typeof record> = {
      message: 'success',
      element: record,
      status: 'suceess'
    }

    return res.json(response)
  }

  public async getAll(
    _req: Request<unknown, unknown, unknown, unknown>,
    res: Response
  ) {
    const record =
      await TourOperSalesService.getByOperSaleId(
        _req.user.id
      )

    const response: IResponseObject<typeof record> = {
      message: 'success',
      element: record,
      status: 'suceess'
    }

    return res.json(response)
  }

  public async remove(
    _req: Request<
      { id: string },
      unknown,
      unknown,
      unknown
    >,
    res: Response
  ) {
    const { id } = _req.params

    const recordDelete =
      await TourOperSalesService.findByid(id)

    if (!recordDelete)
      throw new ResponseError('not found record', 400)

    await accountService.checkOper(
      _req.user.id,
      recordDelete.operSaleId
    )

    await recordDelete.destroy()

    const response: IResponseObject<typeof recordDelete> = {
      message: 'success',
      element: recordDelete,
      status: 'suceess'
    }

    return res.json(response)
  }
}

export default new TourOperSalesController()
