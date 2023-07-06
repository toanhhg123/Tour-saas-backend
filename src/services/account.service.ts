import accountRepositoty from '@/repositories/account.repositoty'
import type { IPageAction } from '@/types/IPageAcction'

export class AccountService {
  //------------count-----------------//
  public async count(roleId: string): Promise<number> {
    return await accountRepositoty.countUser(roleId)
  }

  //---- getall-----//

  public async getAll(fill?: IPageAction) {
    return accountRepositoty.query(fill)
  }
}

export default new AccountService()
