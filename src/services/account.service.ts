import accountRepositoty from '@/repositories/account.repositoty'
import type { IPageAction } from '@/types/IPageAcction'
import { Account, Role } from '@/models'
import {
  AccountCreationAttributes,
  AccountStatus
} from '@/models/account.model'
import { ResponseError } from '@/models/CustomError.model'

export class AccountService {
  //------------count-----------------//
  public async count(roleId: string): Promise<number> {
    return await accountRepositoty.countUser(roleId)
  }

  //---- getall-----//

  public async getAll(fill?: IPageAction) {
    return accountRepositoty.query(fill)
  }

  public async create(
    body: AccountCreationAttributes,
    role: Role,
    operatorId: string
  ) {
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

    return await Account.create(
      {
        ...(body as Account),
        roleId: role.id,
        operatorId: operatorId
      },
      {
        include: [{ model: Role, as: 'role' }]
      }
    )
  }

  public async remove(id: string) {
    const record = await Account.findByPk(id)

    if (!record)
      throw new ResponseError('not found user', 404)

    record.status = AccountStatus.deleted
    return await record.save()
  }
}

export default new AccountService()
