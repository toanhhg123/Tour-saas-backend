import { client } from '@/config/db/redis.db'
import {
  Account,
  Entity,
  Permissions,
  Role
} from '@/models'
import { ResponseError } from '@/models/CustomError.model'
import type { IPermission } from '@/models/permission.model'
import { type IRole } from '@/models/role.model'
import JwtService from '@/services/jwt.service'
import type {
  NextFunction,
  Request,
  Response
} from 'express'
import type {
  IAuthRequest,
  IAuthResponse
} from '../types/IAuthType'
import type IResponseObject from '../types/ResponseObject'
import env from '@/config/env'
import winstonLogger from '@/utils/logger.utils'

export async function getAllRole(
  req: Request<unknown, unknown, Role>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const list = await Role.findAll({
      include: [
        {
          model: Permissions,
          as: 'permissions',
          include: [{ model: Entity }]
        }
      ]
    })

    const response: IResponseObject<Role[]> = {
      message: 'query success',
      element: list,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

//get one1 role
export async function finOneRole(
  req: Request<{ id: string }, unknown, Role>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const record = await Role.findByPk(req.params.id, {
      include: [
        {
          model: Permissions,
          as: 'permissions',
          include: [{ model: Entity }]
        }
      ]
    })

    if (!record)
      throw new ResponseError('role not found', 404)
    const response: IResponseObject<Role> = {
      message: 'query success',
      element: record,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

//create role
export async function createRole(
  req: Request<unknown, unknown, IRole>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    if (req.bodyValid?.error)
      throw new ResponseError(
        'is valid body',
        404,
        req.bodyValid.error
      )

    const record = await Role.create(req.body)

    const response: IResponseObject<Role> = {
      message: 'query success',
      element: record,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

// add permisstion
export async function createPremisstion(
  req: Request<unknown, unknown, IPermission>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    if (req.bodyValid?.error)
      throw new ResponseError(
        'is valid body',
        404,
        req.bodyValid.error
      )

    const record = new Permissions()
    record.setPerms(req.body.perms)
    record.roleId = req.body.roleId
    record.entityId = req.body.entityId

    const response: IResponseObject<Permissions> = {
      message: 'query success',
      element: await record.save(),
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

export async function deletePermisstion(
  req: Request<unknown, unknown, IRole>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    if (req.bodyValid?.error)
      throw new ResponseError(
        'is valid body',
        404,
        req.bodyValid.error
      )

    const record = await Role.create(req.body)

    const response: IResponseObject<Role> = {
      message: 'query success',
      element: record,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

export async function login(
  req: Request<unknown, unknown, IAuthRequest>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const user = await Account.findOne({
      where: { email: req.body.email },
      include: [{ model: Role, as: 'role' }]
    })

    if (!user)
      throw new ResponseError('email not found', 404)

    if (
      !(await Account.validPassword(
        user,
        req.body.password
      ))
    )
      throw new ResponseError('incorrect password')

    const userToken: IAuthResponse = {
      accessToken: JwtService.generateAccessToken({
        id: user.id as string,
        role: user.role?.name || ''
      }),
      refreshToken: JwtService.generateRefreshToken(
        user.id as string
      )
    }

    const tokenRedis = await client.set(
      user.id as string,
      userToken.refreshToken,
      { EX: env.AUTH_REFRESH_KEY_EXPIRES }
    )

    if (!tokenRedis)
      throw new ResponseError(
        'login faild not set refresh token'
      )

    req.session.userToken = userToken

    const response: IResponseObject<string> = {
      message: 'query success',
      element: 'success',
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

export async function refreshToken(
  req: Request<unknown, unknown, unknown>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const refreshToken = req.session.userToken?.refreshToken
    if (!refreshToken)
      throw new ResponseError('not found refresh token')
    const { id } =
      JwtService.decodeRefeshToken(refreshToken)
    console.log('<<========>>')

    console.log({ refreshToken, id })
    console.log('<<<===================>>>')

    if ((await client.get(id)) !== refreshToken) {
      await client.del(id)
      throw new ResponseError('refresh faild')
    }

    const user = await Account.findByPk(id, {
      include: [{ model: Role, as: 'role' }]
    })

    if (!user) throw new ResponseError('not found user')

    const userToken: IAuthResponse = {
      accessToken: JwtService.generateAccessToken({
        id: user.id as string,
        role: user.role?.name || ''
      }),
      refreshToken: JwtService.generateRefreshToken(
        user.id as string
      )
    }

    const tokenRedis = await client.set(
      user.id as string,
      userToken.refreshToken,
      { EX: env.AUTH_REFRESH_KEY_EXPIRES }
    )

    if (!tokenRedis)
      throw new ResponseError(
        'login faild not set refresh token'
      )

    req.session.userToken = userToken

    const response: IResponseObject<IAuthResponse> = {
      message: 'query success',
      element: userToken,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    req.session.destroy((e) => {
      winstonLogger.error(e)
    })
    next(error)
  }
}

export async function logout(
  req: Request<unknown, unknown, IAuthRequest>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    req.session.destroy((error) => {
      console.log(error)
    })

    res.clearCookie('SAAS_TRAVEL_', { path: '/' })
    await client.del(req.user?.id || '')
    const response: IResponseObject<string> = {
      message: 'query success',
      element: 'success',
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}
