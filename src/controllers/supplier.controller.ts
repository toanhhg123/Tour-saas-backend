import { Supplier } from '@/models'
import type { SupplierCreationAttributes } from '@/models/supplier.model'
import supplierService from '@/services/supplier.service'
import type IResponseObject from '@/types/ResponseObject'
import type {
  NextFunction,
  Request,
  Response
} from 'express'

export async function getAll(
  req: Request<unknown, unknown, unknown>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const data = await Supplier.findAll()
    const response: IResponseObject<Supplier[]> = {
      message: 'query success',
      element: data,
      status: 'ok'
    }
    return res.json(response)
  } catch (error) {
    next(error)
  }
}

export async function getSupplierByOperator(
  req: Request,
  res: Response
) {
  const record =
    await supplierService.getSuplierByOperatorId(
      req.user.id
    )

  const response: IResponseObject<typeof record> = {
    message: 'query success',
    element: record,
    status: 'ok'
  }

  return res.status(200).json(response)
}

export async function create(
  req: Request<
    unknown,
    unknown,
    SupplierCreationAttributes
  >,
  res: Response
) {
  const record = await supplierService.create({
    ...req.body,
    operatorId: req.user.id
  })

  const response: IResponseObject<typeof record> = {
    message: 'query success',
    element: record,
    status: 'ok'
  }

  return res.status(201).json(response)
}

export async function update(
  req: Request<
    { id: string },
    unknown,
    SupplierCreationAttributes
  >,
  res: Response
) {
  const record = await supplierService.update({
    body: req.body,
    userUpdateId: req.user.id,
    id: req.params.id
  })

  const response: IResponseObject<typeof record> = {
    message: 'query success',
    element: record,
    status: 'ok'
  }

  return res.status(200).json(response)
}
