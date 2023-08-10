import { Account } from '@/models'
import { ResponseError } from '@/models/CustomError.model'
import TourAgentSales from '@/models/tourAgentSales.model'

class PermissionService {
  public async checkOper(operId: string, userId: string) {
    const account = await Account.findByPk(userId)

    if (account?.operatorId !== operId)
      throw new ResponseError('forbidden', 403)

    return true
  }

  public async checkSameCompany(
    firstId: string,
    secondId: string
  ) {
    const [account1, account2] = await Promise.all([
      Account.findByPk(firstId),
      Account.findByPk(secondId)
    ])

    if (account1?.operatorId !== account2?.operatorId)
      throw new ResponseError('forbidden', 403)
    return true
  }

  public async checkAgentSaleInTour(
    tourId: string,
    saleId: string
  ) {
    const isExist = await TourAgentSales.findOne({
      where: {
        tourId,
        saleId: saleId
      }
    })
    if (!isExist) throw new ResponseError('forbidden', 403)
    return true
  }
}

export default new PermissionService()
