import IResponseObject from '@/types/ResponseObject'
import { BookingPayment } from '@/models'
import type { Response, Request } from 'express'
import { IBookingPayment } from '@/models/bookingPayment.model'

export async function create(
  req: Request<unknown, unknown, IBookingPayment>,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const record = await BookingPayment.create(req.body)

  const response: IResponseObject<BookingPayment> = {
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
  const record = await BookingPayment.findAll()

  const response: IResponseObject<BookingPayment[]> = {
    message: 'query success',
    element: record,
    status: 'ok'
  }
  return res.json(response)
}

export async function getByBookingId(
  req: Request<{ id: string }, unknown>,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const record = await BookingPayment.findAll({ where: { id: req.params.id } })

  const response: IResponseObject<BookingPayment[]> = {
    message: 'query success',
    element: record,
    status: 'ok'
  }
  return res.json(response)
}

export async function update(
  req: Request<{ id: string }, unknown, IBookingPayment>,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const [record] = await BookingPayment.update(req.body, {
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
  const record = await BookingPayment.destroy({
    where: { id: req.params.id }
  })

  const response: IResponseObject<number> = {
    message: 'query success',
    element: record,
    status: 'ok'
  }
  return res.json(response)
}
