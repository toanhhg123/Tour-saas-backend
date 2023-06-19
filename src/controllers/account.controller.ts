import { Account, Role } from '@/models'
import type { TypeRole } from '@/types/IAuthType'
import type IResponseObject from '@/types/ResponseObject'
import type { NextFunction, Request, Response } from 'express'
import { ResponseError } from '../models/CustomError.model'
import type { IAccount } from '../models/account.model'
import { AccountStatus } from '../models/account.model'
import { Op } from 'sequelize'

export async function getAll(
  _req: Request<unknown, unknown, Account>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const accounts = await Account.findAll({
      include: [{ model: Role, as: 'role' }]
    })
    const response: IResponseObject<Account[]> = {
      message: 'query success',
      element: accounts,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

export async function getAccountsByRoles(
  _req: Request<unknown, unknown, unknown, { typeRole: TypeRole }>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const accounts = await Account.findAll({ attributes: ['id', 'email'] })
    const response: IResponseObject<Account[]> = {
      message: 'query success',
      element: accounts,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

export async function getByCompanyId(
  req: Request<{ companyId: string }, unknown, Account>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
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
  } catch (error) {
    next(error)
  }
}

export async function searchEmail(
  req: Request<unknown, unknown, Account, { email: string }>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const accounts = await Account.findAll({
      where: { email: req.query.email },
      attributes: ['id', 'email']
    })
    const response: IResponseObject<Account[]> = {
      message: 'query success',
      element: accounts,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

export async function create(
  req: Request<unknown, unknown, IAccount, { typeRole: TypeRole }>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const role = await Role.findOne({ where: { name: req.query.typeRole } })
    if (!role) throw new ResponseError('not found role')

    const record = await Account.create(
      {
        ...(req.body as Account),
        roleId: role.id,
        operatorId: req.user?.id
      },
      {
        include: [{ model: Role, as: 'role' }]
      }
    )

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

export async function findeByIdAndEmail(
  req: Request<unknown, unknown, IAccount, { id?: string; email?: string }>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const { id, email } = req.query
    const account = await Account.findOne({
      where: {
        [Op.or]: [{ email }, { id }]
      }
    })
    if (!account) throw new ResponseError('not found account', 404)

    const response: IResponseObject<Account> = {
      message: 'query success',
      element: account,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

export async function getProfile(
  req: Request<unknown, unknown, IAccount, { typeRole: TypeRole }>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const record = await Account.findByPk(req.user?.id, {
      include: { model: Role, as: 'role' }
    })

    if (!record) throw new ResponseError('not found user', 404)

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
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const record = await Account.findByPk(req.params.id, {
      include: [{ model: Role, as: 'role' }]
    })
    if (!record) throw new ResponseError('not found user', 404)

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

export async function blockAccount(
  req: Request<{ id: string }, unknown, IAccount>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const record = await Account.findByPk(req.params.id)

    if (!record) throw new ResponseError('not found user', 404)

    record.status = AccountStatus.blocked
    await record.save()
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

export async function remove(
  req: Request<{ id: string }, unknown, IAccount>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const record = await Account.findByPk(req.params.id)

    if (!record) throw new ResponseError('not found user', 404)

    record.status = AccountStatus.deleted
    await record.save()
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

export async function update(
  req: Request<{ id: string }, unknown, IAccount, { typeRole: TypeRole }>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const role = await Role.findOne({ where: { name: req.query.typeRole } })
    if (!role) throw new ResponseError('not found role')

    const [record] = await Account.update(
      { ...req.body, roleId: role.id },
      {
        where: { id: req.params.id }
      }
    )

    if (!record) throw new ResponseError('not found user', 404)

    const response: IResponseObject<number> = {
      message: 'query success',
      element: record,
      status: 'ok'
    }
    return res.json(response)
  } catch (error) {
    next(error)
  }
}
