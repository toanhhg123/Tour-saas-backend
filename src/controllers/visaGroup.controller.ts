import type IResponseObject from '@/types/ResponseObject'
import { VisaGroup } from '@/models'
import type { Response, Request } from 'express'
import type { IVisaGroup } from '@/models/VisaGroup.model'
import visaGroupService from '@/services/visaGroup.service'

export async function create(
  req: Request<unknown, unknown, IVisaGroup>,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const record = await VisaGroup.create({
    ...req.body,
    operVisaId: req.user.id
  })

  const response: IResponseObject<VisaGroup> = {
    message: 'query success',
    element: record,
    status: 'ok'
  }
  return res.json(response)
}

export async function getAll(
  _req: Request<unknown, unknown>,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const record = await visaGroupService.getByOperVisaId(
    _req.user.id
  )

  const response: IResponseObject<VisaGroup[]> = {
    message: 'query success',
    element: record,
    status: 'ok'
  }
  return res.json(response)
}

export async function update(
  req: Request<{ id: string }, unknown, IVisaGroup>,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const [record] = await VisaGroup.update(req.body, {
    where: { id: req.params.id }
  })

  const response: IResponseObject<number> = {
    message: 'query success',
    element: record,
    status: 'ok'
  }
  return res.json(response)
}

export async function remove(
  req: Request<{ id: string }, unknown>,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const record = await VisaGroup.destroy({
    where: { id: req.params.id }
  })

  const response: IResponseObject<number> = {
    message: 'query success',
    element: record,
    status: 'ok'
  }
  return res.json(response)
}
