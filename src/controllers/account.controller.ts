import { Account, Role } from '@/models'
import type { TypeRole } from '@/types/IAuthType'
import type IResponseObject from '@/types/ResponseObject'
import type {
  NextFunction,
  Request,
  Response
} from 'express'
import { ResponseError } from '../models/CustomError.model'
import type {
  AccountCreationAttributes,
  IAccount
} from '../models/account.model'
import { AccountStatus } from '../models/account.model'
import { Op } from 'sequelize'
import accountService from '@/services/account.service'
import type { IPageAction } from '@/types/IPageAcction'

export async function getAll(
  _req: Request<unknown, unknown, Account, IPageAction>,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const { _page, _totalPage } = _req.query
  const accounts = await accountService.getAll({
    ..._req.query,
    _page: Number(_page ?? 1),
    _totalPage: Number(_totalPage ?? 1)
  })

  const response: IResponseObject<typeof accounts> = {
    message: 'query success',
    element: accounts,
    status: 'ok'
  }

  return res.json(response)
}

export async function getAccountsByRoles(
  _req: Request<
    unknown,
    unknown,
    unknown,
    { typeRole: TypeRole }
  >,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const accounts = await Account.findAll({
    attributes: ['id', 'email']
  })
  const response: IResponseObject<Account[]> = {
    message: 'query success',
    element: accounts,
    status: 'ok'
  }

  return res.json(response)
}

export async function countUser(
  _req: Request<
    unknown,
    unknown,
    unknown,
    { typeRole: string }
  >,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const countUser = await accountService.count(
    _req.query.typeRole
  )
  const response: IResponseObject<number> = {
    message: 'query success',
    element: countUser,
    status: 'ok'
  }

  return res.json(response)
}

export async function getByCompanyId(
  req: Request<{ companyId: string }, unknown, Account>,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const accounts = await Account.findAll({
    where: { companyId: req.params.companyId },
    include: [{ model: Role, as: 'role' }]
  })
  const response: IResponseObject<Account[]> = {
    message: 'query success',
    element: accounts,
    status: 'ok'
  }

  return res.json(response)
}

export async function searchEmail(
  req: Request<
    unknown,
    unknown,
    Account,
    { email: string }
  >,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const accounts = await Account.findAll({
    where: { email: { [Op.like]: `%${req.query.email}%` } },
    attributes: ['id', 'email'],
    limit: 10
  })

  const response: IResponseObject<Account[]> = {
    message: 'query success',
    element: accounts,
    status: 'ok'
  }

  return res.json(response)
}

export async function create(
  req: Request<
    unknown,
    unknown,
    AccountCreationAttributes,
    { typeRole: TypeRole }
  >,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const role = await Role.findOne({
    where: { name: req.query.typeRole }
  })
  if (!role) throw new ResponseError('not found role')

  const record = await accountService.create(
    req.body,
    role,
    req.user?.id || ''
  )

  const response: IResponseObject<any> = {
    message: 'query success',
    element: {
      ...record.get(),
      role
    },
    status: 'ok'
  }

  return res.json(response)
}

export async function findeByIdAndEmail(
  req: Request<
    unknown,
    unknown,
    IAccount,
    { id?: string; email?: string }
  >,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const { id, email } = req.query
  const account = await Account.findOne({
    where: {
      [Op.or]: [{ email }, { id }]
    }
  })
  if (!account)
    throw new ResponseError('not found account', 404)

  const response: IResponseObject<Account> = {
    message: 'query success',
    element: account,
    status: 'ok'
  }

  return res.json(response)
}

export async function getProfile(
  req: Request<
    unknown,
    unknown,
    IAccount,
    { typeRole: TypeRole }
  >,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const record = await Account.findByPk(req.user?.id, {
      include: { model: Role, as: 'role' }
    })

    if (!record)
      throw new ResponseError('not found user', 404)

    record.password = ''
    const response: IResponseObject<Account> = {
      message: 'query success',
      element: record,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

export async function findOne(
  req: Request<{ id: string }, unknown, IAccount>,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const record = await Account.findByPk(req.params.id, {
    include: [{ model: Role, as: 'role' }]
  })
  if (!record)
    throw new ResponseError('not found user', 404)

  const response: IResponseObject<Account> = {
    message: 'query success',
    element: record,
    status: 'ok'
  }

  return res.json(response)
}

export async function blockAccount(
  req: Request<{ id: string }, unknown, IAccount>,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const record = await Account.findByPk(req.params.id)

  if (!record)
    throw new ResponseError('not found user', 404)

  record.status = AccountStatus.blocked
  await record.save()
  const response: IResponseObject<Account> = {
    message: 'query success',
    element: record,
    status: 'ok'
  }
  return res.json(response)
}

export async function remove(
  req: Request<{ id: string }, unknown, IAccount>,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const record = await accountService.remove(req.params.id)

  const response: IResponseObject<Account> = {
    message: 'query success',
    element: record,
    status: 'ok'
  }
  return res.json(response)
}

export async function update(
  req: Request<
    { id: string },
    unknown,
    IAccount,
    { typeRole: TypeRole }
  >,
  res: Response
): Promise<Response<IResponseObject<unknown>> | void> {
  const role = await Role.findOne({
    where: { name: req.query.typeRole }
  })
  if (!role) throw new ResponseError('not found role')

  const [record] = await Account.update(
    { ...req.body, roleId: role.id },
    {
      where: { id: req.params.id }
    }
  )

  if (!record)
    throw new ResponseError('not found user', 404)

  const response: IResponseObject<number> = {
    message: 'query success',
    element: record,
    status: 'ok'
  }
  return res.json(response)
}
