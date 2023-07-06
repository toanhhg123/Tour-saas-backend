import type { OtherServiceCreationAttributes } from '@/models/otherService.model'
import _otherService from '@/services/OtherService.service'
import type IResponseObject from '@/types/ResponseObject'
import type { Request, Response } from 'express'

class OtherServiceController {
  public async getAll(
    _req: Request<
      unknown,
      unknown,
      OtherServiceCreationAttributes
    >,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const record = await _otherService.getAll()

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
      OtherServiceCreationAttributes
    >,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const record = await _otherService.create(_req.body)

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
      OtherServiceCreationAttributes
    >,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const { id } = _req.params

    const record = await _otherService.update(_req.body, id)

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
      OtherServiceCreationAttributes
    >,
    res: Response
  ): Promise<Response<IResponseObject<unknown>> | void> {
    const { id } = _req.params

    const record = await _otherService.remove(id)

    const response: IResponseObject<typeof record> = {
      message: 'query success',
      element: record,
      status: 'ok'
    }

    return res.json(response)
  }
}

export default new OtherServiceController()
