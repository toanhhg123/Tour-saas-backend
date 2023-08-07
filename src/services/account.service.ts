import { Account, Role } from '@/models'
import { ResponseError } from '@/models/CustomError.model'
import type { AccountCreationAttributes } from '@/models/account.model'
import { AccountStatus } from '@/models/account.model'
import accountRepositoty from '@/repositories/account.repositoty'
import type { TypeRole } from '@/types/IAuthType'
import type { IPageAction } from '@/types/IPageAcction'

export class AccountService {
  //------------count-----------------//
  public async count(roleId: string): Promise<number> {
    return await accountRepositoty.countUser(roleId)
  }

  //---- getall-----//

  public async getAll(
    fill?: IPageAction,
    operatorId?: string
  ) {
    return accountRepositoty.query(fill, {
      operatorId: operatorId
    })
  }

  public async create(
    body: AccountCreationAttributes,
    operatorId: string
  ) {
    const { roleId } = body

    const [roleUser, myAccount] = await Promise.all([
      Role.findByPk(roleId),
      Account.findByPk(operatorId, {
        include: { model: Role, as: 'role' }
      })
    ])

    if (!roleUser)
      throw new ResponseError(
        'không tìm thấy quyền người dùng'
      )

    const myRoleName = myAccount?.role?.name

    if (!myRoleName)
      throw new ResponseError(
        'quyền hạn của bạn không dược tìm thấy'
      )

    if (
      !this.mapAccessRole(myRoleName).some(
        (x) => x === roleUser.name
      )
    )
      throw new ResponseError(
        'bạn không có quền hạn để tạo user này',
        403
      )

    const { phoneNumber, email } = body

    const isPhoneNumberExist = await Account.findOne({
      where: { phoneNumber }
    })

    if (isPhoneNumberExist)
      throw new ResponseError(
        'số điện thoại đã tồn tại',
        409
      )

    const isEmailExist = await Account.findOne({
      where: { email }
    })

    if (isEmailExist)
      throw new ResponseError('email đã tồn tại', 409)

    const newAccount = await Account.create({
      ...(body as Account),
      operatorId: operatorId
    })

    return {
      ...newAccount.get(),
      role: roleUser
    }
  }

  public async update(
    body: AccountCreationAttributes,
    updateById: string,
    id: string
  ) {
    const [myAccount, accountUpdate] = await Promise.all([
      Account.findByPk(updateById, {
        include: { model: Role, as: 'role' }
      }),

      Account.findByPk(id, {
        include: { model: Role, as: 'role' }
      })
    ])

    if (!myAccount || !accountUpdate || !myAccount.role)
      throw new ResponseError(
        'Không tìm thấy tài khoản update'
      )

    const { operatorId } = accountUpdate

    if (![operatorId, id].includes(updateById)) {
      throw new ResponseError(
        'Bạn không có quyền chỉnh sửa tài khoản này',
        403
      )
    }

    const { roleId: roleUpdateId } = body
    const { role } = myAccount

    if (roleUpdateId !== accountUpdate.roleId) {
      const roleUpdate = await Role.findByPk(roleUpdateId)

      if (!roleUpdate)
        throw new ResponseError(
          'không tìm thấy nhóm quyền cập nhật'
        )

      if (
        !this.mapAccessRole(role.name).some(
          (x) => x === roleUpdate.name
        )
      )
        throw new ResponseError(
          'bạn không có quền hạn để chỉnh sửa quyền user này',
          403
        )
    }

    return await accountUpdate.update({
      ...body
    })
  }

  public async getAllAccountWithOperIdAndRole(
    operId: string,
    role: TypeRole,
    attributes: string[]
  ) {
    return Account.findAll({
      where: { operatorId: operId },
      include: [
        {
          model: Role,
          as: 'role',
          where: { name: role }
        }
      ],
      attributes
    })
  }

  public async findAccountById(id: string) {
    const account = await Account.findByPk(id, {
      include: [{ model: Role, as: 'role' }]
    })
    if (!account)
      throw new ResponseError('Account not found', 400)
    return account
  }

  public async remove(id: string) {
    const record = await Account.findByPk(id)

    if (!record)
      throw new ResponseError('not found user', 404)

    record.status = AccountStatus.deleted
    return await record.save()
  }

  /// method sp
  private mapAccessRole = (
    roleName: TypeRole
  ): TypeRole[] => {
    type RecordType = Record<TypeRole, TypeRole[]>

    const allRole: TypeRole[] = [
      'Oper.Admin',
      'Sys.Admin',
      'Oper.Mamnager',
      'Oper.TourMan',
      'Oper.Sales',
      'Oper.Visa',
      'Oper.Acct',
      'Oper.Guide',
      'Agent.Sales',
      'Agent.Admin',
      'Client'
    ]

    const recordType: RecordType = {
      'Oper.Admin': [
        'Oper.Mamnager',
        'Oper.Visa',
        'Oper.Acct',
        'Oper.Sales'
      ],
      'Sys.Admin': [...allRole],
      'Oper.Mamnager': [
        'Oper.TourMan',
        'Oper.Sales',
        'Oper.Visa'
      ],
      'Oper.TourMan': [],
      'Oper.Sales': ['Agent.Sales', 'Agent.Admin'],
      'Oper.Visa': [],
      'Oper.Acct': [],
      'Oper.Guide': ['Client'],
      'Agent.Sales': ['Client'],
      'Agent.Admin': ['Agent.Sales'],
      Client: []
    }

    return recordType[roleName]
  }

  public async checkOper(operId: string, userId: string) {
    const user = await Account.findByPk(userId)

    if (operId !== user?.operatorId)
      throw new ResponseError('forbidden', 403)

    return true
  }
}

export default new AccountService()
