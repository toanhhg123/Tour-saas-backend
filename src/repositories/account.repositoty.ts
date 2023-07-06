import { Account, Role } from '@/models'
import type {
  IPageAction,
  IPageActionResponse
} from '@/types/IPageAcction'
import { initPageAction } from '@/types/IPageAcction'
import { Op } from 'sequelize'

class AccountRepository {
  public countUser = async (
    role: string
  ): Promise<number> => {
    role = role ?? 'ALL'

    const qty = await Account.count({
      where: role === 'ALL' ? {} : { roleId: role }
    })
    return qty
  }

  public async query(
    fill?: IPageAction
  ): Promise<IPageActionResponse<Account[]>> {
    let { _search, _page } = fill ?? initPageAction

    const limit = 20
    _page = _page ?? 1
    _search = _search ?? ''

    const skip = (_page - 1) * limit

    let objSearch = {}
    if (_search)
      objSearch = { email: { [Op.like]: `%${_search}%` } }

    const { rows, count } = await Account.findAndCountAll({
      limit,
      offset: skip,
      where: {
        ...objSearch
      },
      include: [{ model: Role, as: 'role' }]
    })
    return {
      _search,
      _page,
      data: rows,
      _totalPage: Math.ceil(count / limit)
    }
  }
}

export default new AccountRepository()
